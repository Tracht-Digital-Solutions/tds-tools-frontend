import { useEffect, useState } from "react";

interface Props {
  toolId: string;
  requiresLogin: boolean;
  isPremium: boolean;
  priceCents: number;
  /** CSS selector of the (initially hidden) tool body to reveal on access. */
  bodySelector: string;
}

const API = import.meta.env.PUBLIC_API_URL ?? "https://api.tracht-digital.de";
const LOGIN = import.meta.env.PUBLIC_LOGIN_URL ?? "https://app.tracht-digital.de/login";

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
export default function ToolGate({ toolId, requiresLogin, isPremium, priceCents, bodySelector }: Props) {
  const [state, setState] = useState<State>("checking");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reveal = () => {
    const el = document.querySelector<HTMLElement>(bodySelector);
    if (el) el.hidden = false;
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await fetch(`${API}/auth/me`, { credentials: "include" }).catch(() => null);
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
        const res = await fetch(`${API}/tools/entitlement?tool=${encodeURIComponent(toolId)}`, {
          credentials: "include",
        }).catch(() => null);
        const ent = res && res.ok ? await res.json() : null;
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

  const loginHref = `${LOGIN}?next=${encodeURIComponent(typeof location !== "undefined" ? location.href : "")}`;

  const buy = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`${API}/tools/checkout`, {
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
      setError(data?.error ?? `Fehler (HTTP ${res.status}).`);
    } catch {
      setError("Zahlung konnte nicht gestartet werden.");
    } finally {
      setBusy(false);
    }
  };

  if (state === "granted") return null;

  const box = "rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] p-6 text-center";

  if (state === "checking") {
    return <div className={box}><p className="text-[color:var(--color-muted)]">Zugang wird geprüft …</p></div>;
  }

  if (state === "login") {
    return (
      <div className={box}>
        <p className="mb-1 text-lg font-semibold">{isPremium ? "Premium-Tool" : "Anmeldung erforderlich"}</p>
        <p className="mb-4 text-sm text-[color:var(--color-muted)]">
          {isPremium
            ? "Melde dich an, um dieses Premium-Tool freizuschalten."
            : "Bitte melde dich an, um dieses Tool zu nutzen."}
        </p>
        <a href={loginHref} className="inline-block rounded-lg bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white no-underline">
          Anmelden
        </a>
      </div>
    );
  }

  if (state === "buy") {
    return (
      <div className={box}>
        <span className="tool-badge tool-badge--premium mb-2 inline-flex">Premium</span>
        <p className="mb-1 text-lg font-semibold">Dieses Tool freischalten</p>
        <p className="mb-4 text-sm text-[color:var(--color-muted)]">
          Einmalig {(priceCents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" })} — danach dauerhaft nutzbar.
        </p>
        {error && <p className="status-pill status-pill--danger mb-3 text-sm">{error}</p>}
        <button type="button" onClick={buy} disabled={busy} className="rounded-lg bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
          {busy ? "Weiterleitung …" : "Jetzt freischalten"}
        </button>
      </div>
    );
  }

  return (
    <div className={box}>
      <p className="text-[color:var(--color-muted)]">Der Zugang konnte nicht geprüft werden. Bitte später erneut versuchen.</p>
    </div>
  );
}
