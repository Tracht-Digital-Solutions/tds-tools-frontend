// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { insertByOrder, mountPremium, signinUrl, signupUrl } from "./premiumClient";

/**
 * The premium area in the browser. The page is the same cached HTML for
 * everyone, so this half decides what a visitor actually gets:
 *
 *  - a premium account sees its tools IN the catalog, in their sort place,
 *    and no offer;
 *  - a guest's "Freischalten" leads to the registration, back to the block;
 *  - a member's books the stage; a running subscription goes to the portal,
 *    never to a second checkout;
 *  - a failed status answer leaves the offer as rendered.
 */
const API = "https://api.example";
const LOGIN = "https://auth.example";

function page() {
  document.body.innerHTML = `
    <ul data-catalog-grid>
      <li class="tool-grid__cell" data-order="0" id="a"></li>
      <li class="tool-grid__cell" data-order="3" id="d"></li>
    </ul>
    <section data-premium-area data-copy-redirecting="Weiter …" data-copy-failed="Fehlgeschlagen">
      <div data-premium-offer>
        <ul data-premium-grid>
          <li class="tool-grid__cell" data-order="1" id="b"></li>
          <li class="tool-grid__cell" data-order="2" id="c"></li>
        </ul>
        <button data-subscribe="buero">Freischalten</button>
        <p data-premium-signup><a data-signup-link href="#premium"></a><a data-signin-link href="#premium"></a></p>
      </div>
      <div data-premium-active hidden><button data-premium-manage hidden>Abo verwalten</button></div>
      <p data-premium-message></p>
    </section>`;
  return {
    area: document.querySelector<HTMLElement>("[data-premium-area]")!,
    grid: document.querySelector<HTMLElement>("[data-catalog-grid]")!,
  };
}

const json = (status: number, body: unknown) => ({ ok: status < 300, status, json: async () => body }) as Response;
let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

const flush = () => new Promise((r) => setTimeout(r, 0));

describe("urls", () => {
  it("builds the registration and the sign-in with next", () => {
    expect(signupUrl("https://auth.example", "https://tools.example/#premium")).toBe(
      "https://auth.example/registrieren?next=https%3A%2F%2Ftools.example%2F%23premium",
    );
    expect(signupUrl("https://auth.example/", "x")).toBe("https://auth.example/registrieren?next=x");
    expect(signinUrl("https://auth.example", "https://tools.example/")).toBe("https://auth.example?next=https%3A%2F%2Ftools.example%2F");
  });

  it("inserts a cell at its sort place", () => {
    const { grid } = page();
    const cell = document.getElementById("c")!;
    insertByOrder(grid, cell);
    expect(Array.from(grid.children).map((el) => el.id)).toEqual(["a", "c", "d"]);
  });
});

describe("a premium account", () => {
  it("gets its tools in the catalog and the management instead of the offer", async () => {
    const { area, grid } = page();
    fetchMock.mockResolvedValueOnce(json(200, { authenticated: true, premium: true, subscriptions: [{ tier: "buero" }] }));
    const navigate = vi.fn();
    await mountPremium(area, grid, { api: API, login: LOGIN }, navigate);

    expect(Array.from(grid.children).map((el) => el.id)).toEqual(["a", "b", "c", "d"]);
    expect(area.querySelector("[data-premium-offer]")!.hasAttribute("hidden")).toBe(true);
    expect(area.querySelector("[data-premium-active]")!.hasAttribute("hidden")).toBe(false);

    const manage = area.querySelector<HTMLButtonElement>("[data-premium-manage]")!;
    expect(manage.hidden).toBe(false);
    fetchMock.mockResolvedValueOnce(json(201, { url: "https://billing.stripe.example/p" }));
    manage.click();
    await flush();
    await flush();
    expect(fetchMock.mock.calls[1]![0]).toBe(`${API}/tools/billing-portal`);
    expect(navigate).toHaveBeenCalledWith("https://billing.stripe.example/p");
  });

  it("hides the management for an admin without a subscription", async () => {
    const { area, grid } = page();
    fetchMock.mockResolvedValueOnce(json(200, { authenticated: true, admin: true, premium: true, subscriptions: [] }));
    await mountPremium(area, grid, { api: API, login: LOGIN }, vi.fn());
    expect(area.querySelector<HTMLButtonElement>("[data-premium-manage]")!.hidden).toBe(true);
  });
});

describe("everyone else", () => {
  it("sends a guest to the registration, back to the block", async () => {
    const { area, grid } = page();
    fetchMock.mockResolvedValueOnce(json(200, { authenticated: false, premium: false, subscriptions: [] }));
    const navigate = vi.fn();
    await mountPremium(area, grid, { api: API, login: LOGIN }, navigate);

    expect(area.querySelector<HTMLAnchorElement>("[data-signup-link]")!.href).toContain("https://auth.example/registrieren?next=");
    area.querySelector<HTMLButtonElement>("[data-subscribe]")!.click();
    expect(navigate.mock.calls[0]![0]).toMatch(/^https:\/\/auth\.example\/registrieren\?next=.*%23premium$/);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("books the stage for a member and follows Stripe", async () => {
    const { area, grid } = page();
    fetchMock.mockResolvedValueOnce(json(200, { authenticated: true, premium: false, subscriptions: [] }));
    const navigate = vi.fn();
    await mountPremium(area, grid, { api: API, login: LOGIN }, navigate);
    expect(area.querySelector("[data-premium-signup]")!.hasAttribute("hidden")).toBe(true);

    fetchMock.mockResolvedValueOnce(json(201, { url: "https://checkout.stripe.example/s" }));
    area.querySelector<HTMLButtonElement>("[data-subscribe]")!.click();
    await flush();
    await flush();
    const [url, init] = fetchMock.mock.calls[1]!;
    expect(url).toBe(`${API}/tools/subscribe`);
    expect(JSON.parse(String((init as RequestInit).body))).toEqual({ tier: "buero" });
    expect((init as RequestInit).credentials).toBe("include");
    expect(navigate).toHaveBeenCalledWith("https://checkout.stripe.example/s");
  });

  it("sends a running subscription to the portal instead of a second checkout", async () => {
    const { area, grid } = page();
    fetchMock.mockResolvedValueOnce(json(200, { authenticated: true, premium: false, subscriptions: [] }));
    const navigate = vi.fn();
    await mountPremium(area, grid, { api: API, login: LOGIN }, navigate);

    fetchMock
      .mockResolvedValueOnce(json(409, { code: "has_subscription", error: "läuft schon" }))
      .mockResolvedValueOnce(json(201, { url: "https://billing.stripe.example/p" }));
    area.querySelector<HTMLButtonElement>("[data-subscribe]")!.click();
    await flush();
    await flush();
    await flush();
    expect(fetchMock.mock.calls[2]![0]).toBe(`${API}/tools/billing-portal`);
    expect(navigate).toHaveBeenCalledWith("https://billing.stripe.example/p");
  });

  it("leaves the offer as rendered when nobody can be asked", async () => {
    const { area, grid } = page();
    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    await mountPremium(area, grid, { api: API, login: LOGIN }, vi.fn());

    expect(grid.children).toHaveLength(2);
    expect(area.querySelector("[data-premium-offer]")!.hasAttribute("hidden")).toBe(false);
    expect(area.dataset.state).toBe("guest");
  });
});
