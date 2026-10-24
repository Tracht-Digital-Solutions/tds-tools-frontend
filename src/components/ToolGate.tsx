import { useEffect, useState } from "react";
import { runtimeSetting } from "@tracht-digital-solutions/tds-shared/api";
import { signupUrl } from "~/lib/premiumClient";

interface Props {
  toolId: string;
  isPremium: boolean;
  /**
   * What "Freischalten" books: the cheapest premium stage on sale with this
   * tool and its FIXED monthly price. Null when no stage has it — then the
   * gate says so instead of offering a button that cannot work.
   */
  unlock?: { name: string; priceCents: number; currency: string } | null;
  /** CSS selector of the (initially hidden) tool body to reveal on access. */
  bodySelector: string;
  /** The page language. Every string here was German, on `/en/` pages too. */
  lang?: "de" | "en";
}

const TX = {
  de: {
    checking: "Zugang wird geprüft …",
    premium: "Premium-Tool",
    loginRequired: "Anmeldung erforderlich",
    loginPremium: "Mit einem Konto lässt sich dieses Premium-Tool freischalten.",
    loginFree: "Dieses Tool steht nach der Anmeldung zur Verfügung.",
    login: "Anmelden",
    signup: "Konto anlegen",
    unlockTitle: "Dieses Tool freischalten",
    monthly: (stage: string, price: string) => `Enthalten in „${stage}“: ${price} im Monat, monatlich kündbar.`,
    notBookable: "Premium ist gerade nicht buchbar.",
    allPlans: "Alle Premium-Stufen",
    redirecting: "Weiterleitung …",
    unlock: "Freischalten",
    httpError: (status: number) => `Fehler (HTTP ${status}).`,
    payFailed: "Zahlung konnte nicht gestartet werden.",
    failed: "Der Zugang konnte nicht geprüft werden. Bitte später erneut versuchen.",
    locale: "de-DE",
  },
  en: {
    checking: "Checking access …",
    premium: "Premium tool",
    loginRequired: "Sign-in required",
    loginPremium: "With an account you can unlock this premium tool.",
    loginFree: "Please sign in to use this tool.",
    login: "Sign in",
    signup: "Create account",
    unlockTitle: "Unlock this tool",
    monthly: (stage: string, price: string) => `Included in “${stage}”: ${price} per month, cancellable monthly.`,
    notBookable: "Premium cannot be booked right now.",
    allPlans: "All premium plans",
    redirecting: "Redirecting …",
    unlock: "Unlock",
    httpError: (status: number) => `Error (HTTP ${status}).`,
    payFailed: "The payment could not be started.",
    failed: "Access could not be checked. Please try again later.",
    locale: "en-GB",
  },
} as const;

/**
 * Build-time fallbacks. A host configured with `/install/` overrides
 * both through `tds-runtime.json`, which is also what switches this gate onto
 * the same-origin proxy (`/api/auth/me` instead of the API domain).
 */
const API = import.meta.env.PUBLIC_API_URL ?? "https://api.tracht-digital.de";
/**
 * The CENTRAL login site, and the same default `tds-core-frontend-pkg` uses.
 *
 * This used to fall back to `https://app.tracht-digital.de/login` — the customer
 * PORTAL, which is not the login UI and no longer even serves that route (the
 * host's in-app `/login` was deleted when login moved to the central site). It
 * only ever worked because the production host happens to supply `loginUrl`
 * through `tds-runtime.json`; on a fresh host, or if that file were lost, the
 * gate would have sent people to the wrong domain with nothing to explain it.
 *
 * No path: the login form is the index route of `tds-auth-frontend`, and the
 * `?next=` is appended directly, exactly as `lib/auth.ts` does in the frontend
 * host. The login site validates that value against a `*.tracht-digital.de`
 * allow-list, which this origin satisfies.
 */
const LOGIN = import.meta.env.PUBLIC_LOGIN_URL ?? "https://auth.tracht-digital.de";

type State = "checking" | "login" | "buy" | "granted" | "error";

/**
 * Client-side access gate for login-required / premium tools. On mount it probes
 * the shared session (`/auth/me`, cross-subdomain cookie), then — for premium —
 * the entitlement (`/tools/entitlement`). On access it reveals the tool body and
 * removes itself; otherwise it shows a login prompt (with "Konto anlegen") or
 * the "Freischalten" button, which opens the MONTHLY checkout of the cheapest
 * premium stage with this tool (2026-10-24; one-off purchases are no longer
 * sold, earlier ones still pass the entitlement check). Free tools never
 * render this.
 *
 * Note: premium tools are client-side, so their code ships to everyone — this is
 * a convenience/paywall gate, not DRM. The value is the polished UI + the
 * purchase flow, not withholding the bundle.
 */
export default function ToolGate({ toolId, isPremium, unlock = null, bodySelector, lang = "de" }: Props) {
  const t = TX[lang];
  const [state, setState] = useState<State>("checking");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Held in state because `buy()` and the login link render outside the effect
  // that resolves them. Seeded with the build-time values, so an unconfigured
  // host behaves exactly as before.
  const [endpoints, setEndpoints] = useState({ api: API, login: LOGIN });

  const reveal = () => {
    const el = document.querySelector<HTMLElement>(bodySelector);
    if (el) el.hidden = false;
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const api = await runtimeSetting("apiBase", API);
        const login = await runtimeSetting("loginUrl", LOGIN);
        if (cancelled) return;
        setEndpoints({ api, login });

        const me = await fetch(`${api}/auth/me`, { credentials: "include" }).catch(() => null);
        const authed = !!me && me.ok;
        if (cancelled) return;
        if (!authed) {
          setState("login");
          return;
        }
        if (!isPremium) {
          reveal();
          setState("granted");
          return;
        }
        const res = await fetch(`${api}/tools/entitlement?tool=${encodeURIComponent(toolId)}`, {
          credentials: "include",
        }).catch(() => null);
        // A failed check is an ERROR, not "not entitled": offering the purchase
        // on a network blip asked somebody who had already paid to pay again.
        // Still closed either way. Only an answer (403, or `entitled: false`)
        // means the tool has not been bought.
        if (!res || (!res.ok && res.status !== 403)) {
          if (!cancelled) setState("error");
          return;
        }
        const ent = res.ok ? await res.json() : null;
        if (cancelled) return;
        if (ent?.entitled) {
          reveal();
          setState("granted");
        } else {
          setState("buy");
        }
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [toolId, isPremium]);

  const here = typeof location !== "undefined" ? location.href : "";
  const loginHref = `${endpoints.login}?next=${encodeURIComponent(here)}`;
  const signupHref = signupUrl(endpoints.login, here);
  const catalogHref = lang === "de" ? "/#premium" : "/en/#premium";

  /** A running subscription on another stage: change it in the portal, never book a second. */
  const portal = async () => {
    const res = await fetch(`${endpoints.api}/tools/billing-portal`, { method: "POST", credentials: "include" });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.url) {
      window.location.href = data.url;
      return;
    }
    setError(data?.error ?? t.httpError(res.status));
  };

  const buy = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`${endpoints.api}/tools/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: toolId }),
      });
      if (res.status === 401) {
        window.location.href = loginHref;
        return;
      }
      const data = await res.json().catch(() => null);
      if (res.ok && data?.url) {
        window.location.href = data.url;
        return;
      }
      if (res.status === 409 && data?.code === "has_subscription") {
        await portal();
        return;
      }
      setError(data?.error ?? t.httpError(res.status));
    } catch {
      setError(t.payFailed);
    } finally {
      setBusy(false);
    }
  };

  if (state === "granted") return null;

  // Surface, border, radius and elevation come from `.tds-card` — this used to
  // hand-roll the same card at rounded-2xl (16px) while the panel card token is
  // 8px, so the gate box and the tool box below it rounded differently on the
  // very same page.
  const box = "tds-card p-6 text-center";

  if (state === "checking") {
    return <div className={box}><p className="text-[color:var(--color-muted)]">{t.checking}</p></div>;
  }

  if (state === "login") {
    return (
      <div className={box}>
        <p className="mb-1 text-lg font-semibold">{isPremium ? t.premium : t.loginRequired}</p>
        <p className="mb-4 text-sm text-[color:var(--color-muted)]">{isPremium ? t.loginPremium : t.loginFree}</p>
        <div className="tds-toolbar justify-center">
          {isPremium && (
            <a href={signupHref} className="btn btn-primary no-underline">
              {t.signup}
            </a>
          )}
          <a href={loginHref} className={`btn ${isPremium ? "btn-ghost" : "btn-primary"} no-underline`}>
            {t.login}
          </a>
        </div>
      </div>
    );
  }

  if (state === "buy") {
    return (
      <div className={box}>
        <span className="chip chip--warning mb-2 inline-flex">Premium</span>
        <p className="mb-1 text-lg font-semibold">{t.unlockTitle}</p>
        <p className="mb-4 text-sm text-[color:var(--color-muted)]">
          {unlock
            ? t.monthly(unlock.name, (unlock.priceCents / 100).toLocaleString(t.locale, { style: "currency", currency: unlock.currency }))
            : t.notBookable}
        </p>
        {error && <p className="tds-alert tds-alert--danger mb-3">{error}</p>}
        <div className="tds-toolbar justify-center">
          {unlock && (
            <button type="button" className="btn btn-primary" onClick={buy} disabled={busy}>
              {busy ? t.redirecting : t.unlock}
            </button>
          )}
          <a href={catalogHref} className="btn btn-ghost no-underline">
            {t.allPlans}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={box}>
      <p className="text-[color:var(--color-muted)]">{t.failed}</p>
    </div>
  );
}
