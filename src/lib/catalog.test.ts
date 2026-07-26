import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Build-time catalog resolution. Two properties here have consequences beyond
 * a broken page:
 *
 *  - **Ads default OFF.** AdSense is only baked in when the backend explicitly
 *    says `enabled: true` AND supplies a non-empty publisher id. Any other
 *    shape — unreachable API, partial config, `"true"` as a string — must fall
 *    back to ads off. Shipping a wrong/empty publisher id is a policy problem,
 *    not a cosmetic one.
 *  - **The build must never fail on the backend.** A missing, erroring or
 *    unreachable catalog API falls back to manifest defaults so the public site
 *    still builds — the same contract `tds-blog` has.
 *
 * `toolsData()` memoises for the whole build, so every test re-imports the
 * module via `vi.resetModules()` to get a fresh cache.
 */

let fetchMock: ReturnType<typeof vi.fn>;

async function loadCatalog(env: Record<string, string> = {}) {
  vi.resetModules();
  vi.unstubAllEnvs();
  for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
  return import("./catalog");
}

function apiResponse(body: unknown, ok = true) {
  return { ok, json: async () => body } as unknown as Response;
}

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("manifest defaults (no admin overrides)", () => {
  it("marks every tool enabled by default", async () => {
    fetchMock.mockResolvedValue(apiResponse({ tools: [] }));
    const { toolsData } = await loadCatalog();

    const { tools } = await toolsData();
    expect(tools.map((t) => t.enabled)).toEqual([true, true, true]);
  });

  it("carries requiresLoginDefault / premiumDefault / priceCentsDefault through", async () => {
    fetchMock.mockResolvedValue(apiResponse({ tools: [] }));
    const { toolsData } = await loadCatalog();

    const byId = Object.fromEntries((await toolsData()).tools.map((t) => [t.id, t]));
    expect(byId["free-tool"]).toMatchObject({
      requiresLogin: false,
      isPremium: false,
      priceCents: 0,
    });
    expect(byId["login-tool"]).toMatchObject({ requiresLogin: true, isPremium: false });
    expect(byId["premium-tool"]).toMatchObject({ isPremium: true, priceCents: 500 });
  });

  it("preserves the manifest fields the pages render", async () => {
    fetchMock.mockResolvedValue(apiResponse({ tools: [] }));
    const { toolsData } = await loadCatalog();

    const free = (await toolsData()).tools.find((t) => t.id === "free-tool");
    expect(free?.slug).toBe("kostenloses-tool");
    expect(free?.name).toBe("Kostenloses Tool");
  });
});

describe("admin overrides win over manifest defaults", () => {
  it("can disable a tool", async () => {
    fetchMock.mockResolvedValue(
      apiResponse({ tools: [{ id: "free-tool", enabled: false }] }),
    );
    const { toolsData, enabledTools } = await loadCatalog();

    expect((await toolsData()).tools.find((t) => t.id === "free-tool")?.enabled).toBe(false);
    expect((await enabledTools()).map((t) => t.id)).toEqual(["login-tool", "premium-tool"]);
  });

  it("can make a free tool premium and price it", async () => {
    fetchMock.mockResolvedValue(
      apiResponse({ tools: [{ id: "free-tool", is_premium: true, price_cents: 250 }] }),
    );
    const { toolsData } = await loadCatalog();

    expect((await toolsData()).tools.find((t) => t.id === "free-tool")).toMatchObject({
      isPremium: true,
      priceCents: 250,
    });
  });

  it("can make a premium tool free", async () => {
    fetchMock.mockResolvedValue(
      apiResponse({ tools: [{ id: "premium-tool", is_premium: false }] }),
    );
    const { toolsData } = await loadCatalog();

    expect((await toolsData()).tools.find((t) => t.id === "premium-tool")?.isPremium).toBe(false);
  });

  it("can drop the login requirement", async () => {
    fetchMock.mockResolvedValue(
      apiResponse({ tools: [{ id: "login-tool", requires_login: false }] }),
    );
    const { toolsData } = await loadCatalog();

    expect((await toolsData()).tools.find((t) => t.id === "login-tool")?.requiresLogin).toBe(
      false,
    );
  });

  it("applies overrides per tool, leaving the others on their defaults", async () => {
    fetchMock.mockResolvedValue(
      apiResponse({ tools: [{ id: "premium-tool", price_cents: 900 }] }),
    );
    const { toolsData } = await loadCatalog();

    const byId = Object.fromEntries((await toolsData()).tools.map((t) => [t.id, t]));
    expect(byId["premium-tool"]?.priceCents).toBe(900);
    expect(byId["login-tool"]?.requiresLogin).toBe(true);
  });

  it("ignores rows for tools that are not composed in", async () => {
    // A tool removed from the site but still in the backend registry.
    fetchMock.mockResolvedValue(
      apiResponse({ tools: [{ id: "ghost-tool", enabled: true }] }),
    );
    const { toolsData } = await loadCatalog();

    expect((await toolsData()).tools.map((t) => t.id)).toEqual([
      "free-tool",
      "login-tool",
      "premium-tool",
    ]);
  });
});

describe("ads are off unless explicitly configured", () => {
  const ADS_OFF = { enabled: false, publisherId: "", slotCatalog: "", slotTool: "" };

  it("bakes a complete, explicitly-enabled config", async () => {
    fetchMock.mockResolvedValue(
      apiResponse({
        tools: [],
        ads: { enabled: true, publisherId: "ca-pub-123", slotCatalog: "111", slotTool: "222" },
      }),
    );
    const { adsConfig } = await loadCatalog();

    expect(await adsConfig()).toEqual({
      enabled: true,
      publisherId: "ca-pub-123",
      slotCatalog: "111",
      slotTool: "222",
    });
  });

  it("keeps ads off when the backend sends no ads block", async () => {
    fetchMock.mockResolvedValue(apiResponse({ tools: [] }));
    const { adsConfig } = await loadCatalog();

    expect(await adsConfig()).toEqual(ADS_OFF);
  });

  it("keeps ads off when enabled is true but the publisher id is missing", async () => {
    // Half-configured AdSense must not ship.
    fetchMock.mockResolvedValue(apiResponse({ tools: [], ads: { enabled: true } }));
    const { adsConfig } = await loadCatalog();

    expect(await adsConfig()).toEqual(ADS_OFF);
  });

  it("keeps ads off for an empty publisher id", async () => {
    fetchMock.mockResolvedValue(
      apiResponse({ tools: [], ads: { enabled: true, publisherId: "" } }),
    );
    const { adsConfig } = await loadCatalog();

    expect(await adsConfig()).toEqual(ADS_OFF);
  });

  it("requires a real boolean — the string \"true\" does not enable ads", async () => {
    fetchMock.mockResolvedValue(
      apiResponse({ tools: [], ads: { enabled: "true", publisherId: "ca-pub-123" } }),
    );
    const { adsConfig } = await loadCatalog();

    expect(await adsConfig()).toEqual(ADS_OFF);
  });

  it("keeps ads off when explicitly disabled", async () => {
    fetchMock.mockResolvedValue(
      apiResponse({ tools: [], ads: { enabled: false, publisherId: "ca-pub-123" } }),
    );
    const { adsConfig } = await loadCatalog();

    expect(await adsConfig()).toEqual(ADS_OFF);
  });

  it("tolerates missing slot ids on an otherwise valid config", async () => {
    fetchMock.mockResolvedValue(
      apiResponse({ tools: [], ads: { enabled: true, publisherId: "ca-pub-123" } as unknown }),
    );
    const { adsConfig } = await loadCatalog();

    const ads = await adsConfig();
    expect(ads.enabled).toBe(true);
    expect(ads.slotCatalog).toBe("");
    expect(ads.slotTool).toBe("");
  });
});

describe("the build never fails on the backend", () => {
  it("ignores the body of a non-OK response entirely", async () => {
    // The body must carry data that WOULD change the result if wrongly applied
    // — otherwise this test passes with or without the `res.ok` guard and
    // asserts nothing. A misconfigured proxy returning 500 with a JSON payload
    // is exactly the case the guard exists for.
    fetchMock.mockResolvedValue(
      apiResponse(
        {
          tools: [{ id: "free-tool", enabled: false, is_premium: true, price_cents: 9999 }],
          ads: { enabled: true, publisherId: "ca-pub-BOGUS" },
        },
        false,
      ),
    );
    const { toolsData } = await loadCatalog();

    const { tools, ads } = await toolsData();
    const free = tools.find((t) => t.id === "free-tool");
    expect(free?.enabled).toBe(true);
    expect(free?.isPremium).toBe(false);
    expect(free?.priceCents).toBe(0);
    // And crucially: no ads from an error response.
    expect(ads.enabled).toBe(false);
    expect(ads.publisherId).toBe("");
  });

  it("falls back when the API is unreachable", async () => {
    fetchMock.mockRejectedValue(new TypeError("ECONNREFUSED"));
    const { toolsData } = await loadCatalog();

    const { tools, ads } = await toolsData();
    expect(tools).toHaveLength(3);
    expect(ads.enabled).toBe(false);
  });

  it("falls back when the response is not JSON", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => {
        throw new SyntaxError("not json");
      },
    } as unknown as Response);
    const { toolsData } = await loadCatalog();

    expect((await toolsData()).tools).toHaveLength(3);
  });

  it("skips the backend entirely in demo mode", async () => {
    const { toolsData } = await loadCatalog({ PUBLIC_DEMO_MODE: "true" });

    const { tools, ads } = await toolsData();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(tools).toHaveLength(3);
    expect(ads.enabled).toBe(false);
  });
});

describe("memoisation", () => {
  it("fetches the catalog once per build", async () => {
    fetchMock.mockResolvedValue(apiResponse({ tools: [] }));
    const { toolsData, enabledTools, adsConfig } = await loadCatalog();

    await toolsData();
    await enabledTools();
    await adsConfig();
    await toolsData();

    // One catalog GET, no registry sync (no token).
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("registry sync", () => {
  it("does not run without a token", async () => {
    fetchMock.mockResolvedValue(apiResponse({ tools: [] }));
    const { toolsData } = await loadCatalog();
    await toolsData();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]?.[0]).toContain("/tools/catalog");
  });

  it("posts the composed tool list when a token is set", async () => {
    fetchMock.mockResolvedValue(apiResponse({ tools: [] }));
    const { toolsData } = await loadCatalog({ TOOLS_REGISTRY_TOKEN: "secret" });
    await toolsData();

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/tools/registry");
    expect(init.method).toBe("POST");

    const body = JSON.parse(init.body as string);
    expect(body.token).toBe("secret");
    expect(body.tools.map((t: { id: string }) => t.id)).toEqual([
      "free-tool",
      "login-tool",
      "premium-tool",
    ]);
    // Defaults are sent in the backend's snake_case shape.
    expect(body.tools[2]).toMatchObject({ premium_default: true, price_cents_default: 500 });
  });

  it("never fails the build when the sync errors", async () => {
    fetchMock
      .mockRejectedValueOnce(new TypeError("registry down"))
      .mockResolvedValueOnce(apiResponse({ tools: [] }));

    const { toolsData } = await loadCatalog({ TOOLS_REGISTRY_TOKEN: "secret" });

    await expect(toolsData()).resolves.toMatchObject({ tools: expect.any(Array) });
  });
});
