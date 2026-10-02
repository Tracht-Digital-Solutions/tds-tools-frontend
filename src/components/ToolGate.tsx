import { useEffect, useState } from "react";
import { runtimeSetting } from "@tracht-digital-solutions/tds-shared/api";

interface Props {
  toolId: string;
  isPremium: boolean;
  priceCents: number;
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
    loginPremium: "Melde dich an, um dieses Premium-Tool freizuschalten.",
    loginFree: "Bitte melde dich an, um dieses Tool zu nutzen.",
    login: "Anmelden",
    unlockTitle: "Dieses Tool freischalten",
    once: (price: string) => `Einmalig ${price} — danach dauerhaft nutzbar.`,
    redirecting: "Weiterleitung …",
    unlock: "Jetzt freischalten",
    httpError: (status: number) => `Fehler (HTTP ${status}).`,
    payFailed: "Zahlung konnte nicht gestartet werden.",
    failed: "Der Zugang konnte nicht geprüft werden. Bitte später erneut versuchen.",
    locale: "de-DE",
  },
  en: {
    checking: "Checking access …",
    premium: "Premium tool",
    loginRequired: "Sign-in required",
    loginPremium: "Sign in to unlock this premium tool.",
    loginFree: "Please sign in to use this tool.",
    login: "Sign in",
    unlockTitle: "Unlock this tool",
    once: (price: string) => `One-off ${price} — yours to use from then on.`,
    redirecting: "Redirecting …",
    unlock: "Unlock now",
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
 * removes itself; otherwise it shows a login prompt or a "Freischalten" purchase
 * button (Stripe Checkout). Free tools never render this.
 *
 * Note: premium tools are client-side, so their code ships to everyone — this is
 * a convenience/paywall gate, not DRM. The value is the polished UI + the
 * purchase flow, not withholding the bundle.
 */
export default function ToolGate({ toolId, isPremium, priceCents, bodySelector, lang = "de" }: Props) {
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

  const loginHref = `${endpoints.login}?next=${encodeURIComponent(typeof location !== "undefined" ? location.href : "")}`;

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
        <a href={loginHref} className="btn btn-primary no-underline">
          {t.login}
        </a>
      </div>
    );
  }

  if (state === "buy") {
    return (
      <div className={box}>
        <span className="chip chip--warning mb-2 inline-flex">Premium</span>
        <p className="mb-1 text-lg font-semibold">{t.unlockTitle}</p>
        <p className="mb-4 text-sm text-[color:var(--color-muted)]">
          {t.once((priceCents / 100).toLocaleString(t.locale, { style: "currency", currency: "EUR" }))}
        </p>
        {error && <p className="tds-alert tds-alert--danger mb-3">{error}</p>}
        <button type="button" className="btn btn-primary" onClick={buy} disabled={busy}>
          {busy ? t.redirecting : t.unlock}
        </button>
      </div>
    );
  }

  return (
    <div className={box}>
      <p className="text-[color:var(--color-muted)]">{t.failed}</p>
    </div>
  );
}
