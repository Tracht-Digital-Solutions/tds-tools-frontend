import { afterEach, describe, expect, it, vi } from "vitest";
import * as route from "../pages/tds/studio/export";
import { newProject } from "@tracht-digital-solutions/tds-tool-devkit/studio/model";

/**
 * The Designsystem-Studio export as THIS site mounts it. The handler and its
 * policy are tested in the pack; what can break here is the mounting: the
 * route must be on-demand, POST-only, and ask the API for the visitor before
 * building a premium file.
 */
afterEach(() => vi.unstubAllGlobals());

const post = (format: string) =>
  (route.POST as unknown as (ctx: { request: Request }) => Promise<Response>)({
    request: new Request("https://tools.example/tds/studio/export", {
      method: "POST",
      headers: { "content-type": "application/json", cookie: "tds_session=s" },
      body: JSON.stringify({ format, project: newProject() }),
    }),
  });

describe("POST /tds/studio/export", () => {
  it("is server-rendered and accepts POST only", () => {
    expect(route.prerender).toBe(false);
    expect(Object.keys(route).filter((k) => /^[A-Z]+$/.test(k))).toEqual(["POST"]);
  });

  it("asks the API with the visitor's cookie and refuses premium without entitlement", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ enabled: true, authenticated: false, entitled: false }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const zip = await post("zip");
    expect(zip.status).toBe(403);
    const call = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(call[0]).toMatch(/\/tools\/studio\/access$/);
    expect((call[1].headers as Record<string, string>).Cookie).toBe("tds_session=s");

    const css = await post("css");
    expect(css.status).toBe(200);
    expect(css.headers.get("content-type")).toContain("text/css");
    expect(await css.text()).toContain("@layer ds-tokens");
  });
});
