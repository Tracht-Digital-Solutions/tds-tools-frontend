import { createHash } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

import {
  connectionStatusResponse,
  runtimeConfigResponse,
  siteConnection,
  type SiteConnection,
} from "@tracht-digital-solutions/tds-shared/connection";

const DEFAULT_API_BASE = "https://api.tracht-digital.de";

function buildApiBase(): string {
  return ((import.meta.env.PUBLIC_API_URL as string | undefined) ?? DEFAULT_API_BASE)
    .trim()
    .replace(/\/+$/, "");
}

async function syncCatalog(paired: SiteConnection): Promise<void> {
  const catalogPath = join(process.cwd(), "client", "tools-catalog.json");
  let document: unknown;
  try {
    document = JSON.parse(await readFile(catalogPath, "utf8"));
  } catch {
    // During `astro build` the client tree does not exist yet. The same module
    // is evaluated again when the packed server boots, where it does.
    return;
  }
  const tools = Array.isArray(document)
    ? document
    : (document as { tools?: unknown[] } | null)?.tools;
  if (!Array.isArray(tools)) throw new Error("invalid_tools_catalog");

  const hash = createHash("sha256").update(JSON.stringify(tools)).digest("hex");
  const marker = join(connection.store.directory, "catalog.sha256");
  try {
    if ((await readFile(marker, "utf8")).trim() === hash) return;
  } catch {
    // First sync or marker removed — send the catalog.
  }

  const response = await fetch(`${paired.apiBase}/tools/registry`, {
    method: "POST",
    redirect: "error",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "X-TDS-Site-Key": paired.siteKey,
    },
    body: JSON.stringify({ tools }),
    signal: typeof AbortSignal.timeout === "function" ? AbortSignal.timeout(10_000) : undefined,
  });
  await response.arrayBuffer();
  if (!response.ok) throw new Error(`tools_registry_${response.status}`);

  await mkdir(connection.store.directory, { recursive: true, mode: 0o700 });
  const temporary = `${marker}.${process.pid}.${crypto.randomUUID()}.tmp`;
  try {
    await writeFile(temporary, `${hash}\n`, { encoding: "utf8", flag: "wx", mode: 0o600 });
    await rename(temporary, marker);
  } catch (error) {
    await rm(temporary, { force: true });
    throw error;
  }
}

export const connection = siteConnection({
  profile: "tools",
  fallbackApiBase: buildApiBase,
  fallbackSiteKey: () => process.env.TDS_SITE_KEY ?? "",
  fallbackCacheToken: () => process.env.TDS_CACHE_TOKEN ?? "",
  fallbackRuntime: () => ({
    apiBase: buildApiBase(),
    loginUrl: "https://auth.tracht-digital.de",
    liveChatFrontend: "tools",
  }),
  onConnected: syncCatalog,
});

let bootSync: Promise<void> | null = null;

/** Sync once per process; the hash marker makes restarts with no change free. */
export function ensureCatalogSynced(): Promise<void> {
  if (bootSync) return bootSync;
  const paired = connection.current();
  if (!paired) return Promise.resolve();
  bootSync = syncCatalog(paired).catch((error) => {
    bootSync = null;
    throw error;
  });
  return bootSync;
}

// Middleware modules are loaded when the standalone server boots. Start the
// hash check then; a failure is retried on the first request.
if (process.env.NODE_ENV === "production") {
  void ensureCatalogSynced().catch((error) => {
    console.warn(`[tds-tools] catalog sync deferred: ${String(error)}`);
  });
}

export const apiBase = (): string => connection.apiBase() || DEFAULT_API_BASE;
export const connectResponse = (request: Request): Promise<Response> => connection.handleConnect(request);
export const connectStatusResponse = (): Response => connectionStatusResponse(connection);
export const publicRuntimeResponse = (): Response => runtimeConfigResponse(connection);
