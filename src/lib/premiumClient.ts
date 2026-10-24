/**
 * The premium area's browser half (`PremiumSection.astro`). Bundled into the
 * catalog page; imports nothing heavy.
 *
 * 1. Ask `GET /tools/premium/status` (with the shared session cookie) who is
 *    looking. A failed answer leaves the page as rendered: the offer stays,
 *    which is the right default for a visitor nobody knows.
 * 2. A premium account: the premium cells move up into the catalog grid at
 *    their sort position, the offer is hidden, "Premium ist aktiv" shows, and
 *    "Abo verwalten" opens the Stripe customer portal (only with a
 *    subscription — an admin is premium without one).
 * 3. Everyone else: "Freischalten" books the stage. Signed out it goes to the
 *    registration (with `?next=` back to this block); signed in it opens the
 *    monthly Stripe checkout; an already running subscription sends the
 *    visitor to the portal instead of a second one.
 */
export interface PremiumStatus {
  authenticated: boolean;
  admin: boolean;
  premium: boolean;
  subscriptions: unknown[];
}

export interface Endpoints {
  api: string;
  login: string;
}

/** The registration page of the central login site, with `next` back to here. */
export function signupUrl(login: string, back: string): string {
  const base = login.endsWith("/") ? login : `${login}/`;
  const url = new URL("registrieren", base);
  url.searchParams.set("next", back);
  return url.toString();
}

/** The login itself (its index route), as the tool gate builds it. */
export function signinUrl(login: string, back: string): string {
  return `${login}?next=${encodeURIComponent(back)}`;
}

/** Insert `cell` into `grid` before the first cell with a higher `data-order`. */
export function insertByOrder(grid: HTMLElement, cell: HTMLElement): void {
  const order = Number(cell.dataset.order ?? "0");
  const after = Array.from(grid.children).find(
    (el) => el instanceof HTMLElement && Number(el.dataset.order ?? "0") > order,
  );
  grid.insertBefore(cell, after ?? null);
}

async function postJson(url: string, body?: unknown): Promise<{ status: number; data: Record<string, unknown> | null }> {
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  return { status: res.status, data };
}

export async function mountPremium(
  area: HTMLElement,
  catalogGrid: HTMLElement | null,
  endpoints: Endpoints,
  navigate: (url: string) => void = (url) => window.location.assign(url),
): Promise<void> {
  const message = area.querySelector<HTMLElement>("[data-premium-message]");
  const say = (text: string) => {
    if (message) message.textContent = text;
  };
  const { redirecting = "", failed = "" } = { redirecting: area.dataset.copyRedirecting, failed: area.dataset.copyFailed };
  const back = `${location.origin}${location.pathname}#premium`;

  for (const link of area.querySelectorAll<HTMLAnchorElement>("[data-signup-link]")) link.href = signupUrl(endpoints.login, back);
  for (const link of area.querySelectorAll<HTMLAnchorElement>("[data-signin-link]")) link.href = signinUrl(endpoints.login, back);

  let status: PremiumStatus | null = null;
  try {
    const res = await fetch(`${endpoints.api}/tools/premium/status`, { credentials: "include" });
    status = res.ok ? ((await res.json()) as PremiumStatus) : null;
  } catch {
    status = null;
  }

  const portal = async () => {
    say(redirecting);
    try {
      const { status: code, data } = await postJson(`${endpoints.api}/tools/billing-portal`);
      if (code === 201 && typeof data?.url === "string") return navigate(data.url);
      say(typeof data?.error === "string" ? data.error : failed);
    } catch {
      say(failed);
    }
  };

  if (status?.premium) {
    if (catalogGrid) {
      for (const cell of area.querySelectorAll<HTMLElement>("[data-premium-grid] > .tool-grid__cell")) {
        insertByOrder(catalogGrid, cell);
      }
    }
    area.querySelector<HTMLElement>("[data-premium-offer]")?.setAttribute("hidden", "");
    area.querySelector<HTMLElement>("[data-premium-active]")?.removeAttribute("hidden");
    const manage = area.querySelector<HTMLButtonElement>("[data-premium-manage]");
    if (manage && status.subscriptions.length > 0) {
      manage.hidden = false;
      manage.addEventListener("click", () => void portal());
    }
    area.dataset.state = "premium";
    return;
  }

  if (status?.authenticated) {
    area.querySelector<HTMLElement>("[data-premium-signup]")?.setAttribute("hidden", "");
  }
  area.dataset.state = status?.authenticated ? "member" : "guest";

  for (const button of area.querySelectorAll<HTMLButtonElement>("[data-subscribe]")) {
    button.addEventListener("click", async () => {
      if (!status?.authenticated) return navigate(signupUrl(endpoints.login, back));
      button.disabled = true;
      say(redirecting);
      try {
        const { status: code, data } = await postJson(`${endpoints.api}/tools/subscribe`, { tier: button.dataset.subscribe });
        if (code === 201 && typeof data?.url === "string") return navigate(data.url);
        if (code === 401) return navigate(signinUrl(endpoints.login, back));
        if (code === 409 && data?.code === "has_subscription") return void (await portal());
        say(typeof data?.error === "string" ? data.error : failed);
      } catch {
        say(failed);
      } finally {
        button.disabled = false;
      }
    });
  }
}
