// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  primeRuntimeConfig,
  resetRuntimeConfig,
} from "@tracht-digital-solutions/tds-shared/api";
import ToolGate from "./ToolGate";

/**
 * The access gate for login-required and premium tools. It is a paywall UI, not
 * DRM — premium tools are client-side, so the bundle ships either way. What the
 * tests pin is that the *flow* is right:
 *
 *  - no session → login prompt, never the tool body,
 *  - premium + session but no entitlement → purchase prompt, body still hidden,
 *  - entitled (or free-but-logged-in) → body revealed and the gate removes
 *    itself,
 *  - a failed probe shows an error rather than silently granting access.
 *
 * The last one is the important direction: every failure path must fall back to
 * *closed*, not open.
 */

const API = "https://api.tracht-digital.de";

let fetchMock: ReturnType<typeof vi.fn>;

const body = () => document.querySelector<HTMLElement>("#tool-body")!;

function renderGate(props: Partial<React.ComponentProps<typeof ToolGate>> = {}) {
  document.body.innerHTML = '<div id="host"></div><section id="tool-body" hidden></section>';
  return render(
    <ToolGate
      toolId="pdf-tools"
      requiresLogin={true}
      isPremium={false}
      priceCents={0}
      bodySelector="#tool-body"
      {...props}
    />,
    { container: document.getElementById("host")! },
  );
}

function res(status: number, body: unknown = {}) {
  return { ok: status >= 200 && status < 300, status, json: async () => body } as unknown as Response;
}

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  // The gate resolves the host's runtime config before its first probe.
  // Priming it to "absent" keeps these tests about the ACCESS flow and pins the
  // unconfigured behaviour — the build-time endpoints, exactly as before. The
  // configured path is covered in tds-shared's own api suite.
  primeRuntimeConfig(null);
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: { href: "https://tools.tracht-digital.de/tools/pdf-werkzeuge" },
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  resetRuntimeConfig();
  document.body.innerHTML = "";
});

describe("session probe", () => {
  it("shows a checking state first", () => {
    fetchMock.mockReturnValue(new Promise(() => {}));
    renderGate();

    expect(screen.getByText("Zugang wird geprüft …")).toBeDefined();
    expect(body().hidden).toBe(true);
  });

  it("probes the shared session with credentials", async () => {
    fetchMock.mockResolvedValue(res(200));
    renderGate({ isPremium: false });

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${API}/auth/me`);
    // The cross-subdomain cookie is the session — without credentials the gate
    // would treat every visitor as logged out.
    expect(init.credentials).toBe("include");
  });

  it("prompts for login when there is no session", async () => {
    fetchMock.mockResolvedValue(res(401));
    renderGate();

    expect(await screen.findByText("Anmeldung erforderlich")).toBeDefined();
    expect(body().hidden).toBe(true);
  });

  it("prompts for login when the probe itself fails", async () => {
    // Network failure must NOT open the gate.
    fetchMock.mockRejectedValue(new TypeError("offline"));
    renderGate();

    expect(await screen.findByRole("link", { name: "Anmelden" })).toBeDefined();
    expect(body().hidden).toBe(true);
  });

  it("labels the prompt differently for a premium tool", async () => {
    fetchMock.mockResolvedValue(res(401));
    renderGate({ isPremium: true, priceCents: 500 });

    expect(await screen.findByText("Premium-Tool")).toBeDefined();
  });

  it("sends the current page as an encoded next on the login link", async () => {
    fetchMock.mockResolvedValue(res(401));
    renderGate();

    const link = await screen.findByRole("link", { name: "Anmelden" });
    const href = new URL(link.getAttribute("href")!);
    expect(href.searchParams.get("next")).toBe(
      "https://tools.tracht-digital.de/tools/pdf-werkzeuge",
    );
  });

  it("points at the CENTRAL login site, not at the customer portal", async () => {
    // The fallback used to be `https://app.tracht-digital.de/login` — the
    // portal, which is not the login UI and no longer serves that route. It
    // survived because production supplies `loginUrl` through
    // `tds-runtime.json`, so the wrong default was invisible everywhere except
    // on a fresh host. The test above parses the href as a URL and therefore
    // never looked at the origin; this one does.
    fetchMock.mockResolvedValue(res(401));
    renderGate();

    const link = await screen.findByRole("link", { name: "Anmelden" });
    const href = new URL(link.getAttribute("href")!);
    expect(href.origin).toBe("https://auth.tracht-digital.de");
    expect(link.getAttribute("href")).not.toContain("app.tracht-digital.de");
  });
});

describe("free tool behind a login", () => {
  it("reveals the body and removes the gate once logged in", async () => {
    fetchMock.mockResolvedValue(res(200));
    const { container } = renderGate({ isPremium: false });

    await waitFor(() => expect(body().hidden).toBe(false));
    // `granted` renders null — the gate must not linger above the tool.
    expect(container.innerHTML).toBe("");
  });

  it("does not probe the entitlement endpoint for a free tool", async () => {
    fetchMock.mockResolvedValue(res(200));
    renderGate({ isPremium: false });

    await waitFor(() => expect(body().hidden).toBe(false));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("premium entitlement", () => {
  const premium = { isPremium: true, priceCents: 500 };

  it("checks the entitlement for the specific tool", async () => {
    fetchMock
      .mockResolvedValueOnce(res(200)) // /auth/me
      .mockResolvedValueOnce(res(200, { entitled: true }));
    renderGate(premium);

    await waitFor(() => expect(body().hidden).toBe(false));
    expect(fetchMock.mock.calls[1]?.[0]).toBe(`${API}/tools/entitlement?tool=pdf-tools`);
  });

  it("url-encodes the tool id", async () => {
    fetchMock.mockResolvedValueOnce(res(200)).mockResolvedValueOnce(res(200, { entitled: false }));
    renderGate({ ...premium, toolId: "a/b c" });

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(fetchMock.mock.calls[1]?.[0]).toBe(`${API}/tools/entitlement?tool=a%2Fb%20c`);
  });

  it("reveals the tool when entitled", async () => {
    fetchMock.mockResolvedValueOnce(res(200)).mockResolvedValueOnce(res(200, { entitled: true }));
    renderGate(premium);

    await waitFor(() => expect(body().hidden).toBe(false));
  });

  it("offers the purchase when not entitled", async () => {
    fetchMock.mockResolvedValueOnce(res(200)).mockResolvedValueOnce(res(200, { entitled: false }));
    renderGate(premium);

    expect(await screen.findByRole("button", { name: "Jetzt freischalten" })).toBeDefined();
    expect(body().hidden).toBe(true);
  });

  it("offers the purchase when the entitlement call fails", async () => {
    // Closed by default: an unreachable entitlement API must not grant access.
    fetchMock.mockResolvedValueOnce(res(200)).mockRejectedValueOnce(new TypeError("offline"));
    renderGate(premium);

    expect(await screen.findByRole("button", { name: "Jetzt freischalten" })).toBeDefined();
    expect(body().hidden).toBe(true);
  });

  it("offers the purchase when the entitlement response is a 403", async () => {
    fetchMock.mockResolvedValueOnce(res(200)).mockResolvedValueOnce(res(403));
    renderGate(premium);

    expect(await screen.findByRole("button", { name: "Jetzt freischalten" })).toBeDefined();
  });

  it("formats the price in euros", async () => {
    fetchMock.mockResolvedValueOnce(res(200)).mockResolvedValueOnce(res(200, { entitled: false }));
    renderGate({ isPremium: true, priceCents: 500 });

    const line = await screen.findByText(/Einmalig/);
    expect(line.textContent).toContain("5,00");
  });
});

describe("checkout", () => {
  const premium = { isPremium: true, priceCents: 500 };

  const reachBuy = async () => {
    fetchMock.mockResolvedValueOnce(res(200)).mockResolvedValueOnce(res(200, { entitled: false }));
    renderGate(premium);
    return screen.findByRole("button", { name: "Jetzt freischalten" });
  };

  it("posts the tool id and follows the Stripe URL", async () => {
    const button = await reachBuy();
    fetchMock.mockResolvedValueOnce(res(200, { url: "https://checkout.stripe.com/c/session" }));

    await userEvent.setup({ delay: null }).click(button);

    await waitFor(() =>
      expect(location.href).toBe("https://checkout.stripe.com/c/session"),
    );
    const [url, init] = fetchMock.mock.calls[2] as [string, RequestInit];
    expect(url).toBe(`${API}/tools/checkout`);
    expect(init.method).toBe("POST");
    expect(init.credentials).toBe("include");
    expect(JSON.parse(init.body as string)).toEqual({ tool: "pdf-tools" });
  });

  it("sends an expired session to the login instead of erroring", async () => {
    const button = await reachBuy();
    fetchMock.mockResolvedValueOnce(res(401));

    await userEvent.setup({ delay: null }).click(button);

    await waitFor(() => expect(location.href).toContain("?next="));
  });

  it("surfaces the API's error message", async () => {
    const button = await reachBuy();
    fetchMock.mockResolvedValueOnce(res(400, { error: "Stripe ist nicht konfiguriert." }));

    await userEvent.setup({ delay: null }).click(button);

    expect(await screen.findByText("Stripe ist nicht konfiguriert.")).toBeDefined();
  });

  it("falls back to the status code when there is no message", async () => {
    const button = await reachBuy();
    fetchMock.mockResolvedValueOnce(res(500, {}));

    await userEvent.setup({ delay: null }).click(button);

    expect(await screen.findByText("Fehler (HTTP 500).")).toBeDefined();
  });

  it("reports a network failure", async () => {
    const button = await reachBuy();
    fetchMock.mockRejectedValueOnce(new TypeError("offline"));

    await userEvent.setup({ delay: null }).click(button);

    expect(await screen.findByText("Zahlung konnte nicht gestartet werden.")).toBeDefined();
  });

  it("re-enables the button after a failure so the user can retry", async () => {
    const button = await reachBuy();
    fetchMock.mockResolvedValueOnce(res(500, {}));

    await userEvent.setup({ delay: null }).click(button);

    await screen.findByText("Fehler (HTTP 500).");
    expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBe(false);
  });

  it("never reveals the tool body on a failed purchase", async () => {
    const button = await reachBuy();
    fetchMock.mockResolvedValueOnce(res(500, {}));

    await userEvent.setup({ delay: null }).click(button);

    await screen.findByText("Fehler (HTTP 500).");
    expect(body().hidden).toBe(true);
  });
});

describe("unmount safety", () => {
  it("does not set state after the gate is removed", async () => {
    let settle: (v: unknown) => void = () => {};
    fetchMock.mockReturnValue(new Promise((r) => (settle = r)));

    const { unmount } = renderGate();
    unmount();
    settle(res(200));
    await Promise.resolve();

    expect(body().hidden).toBe(true);
  });
});
