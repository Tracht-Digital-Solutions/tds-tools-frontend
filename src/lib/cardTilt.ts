/**
 * The catalog cards' pointer tilt.
 *
 * A card turns toward the pointer: the edge under it recedes, and a soft
 * glare sits where the pointer is. The CSS in `global.css` (`.tool-grid`) owns
 * every visual — this module only writes four custom properties and a
 * `data-tilting` flag onto the card being hovered.
 *
 * Three rules that are not stylistic:
 *
 * - **Only a fine, hovering pointer, and never under reduced motion.** A tilt
 *   on touch would fire on the tap that navigates away, and a moving surface is
 *   exactly what `prefers-reduced-motion` asks to be spared. Both media queries
 *   are watched, so toggling the OS setting takes effect without a reload.
 * - **The rectangle comes from the `<li>`, never from the card.** The card is
 *   the element being transformed, and a transformed element's
 *   `getBoundingClientRect()` is its tilted, scaled bounding box — reading it
 *   would feed the tilt back into itself. The cell is never transformed. The
 *   rect is read once per hover and dropped on scroll/resize, so there is no
 *   layout read per pointer frame.
 * - **No `setPointerCapture`.** Capturing on pointerdown swallows the click
 *   that follows, and the card is a link.
 */

export interface TiltRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Tilt {
  /** rotateX in degrees. */
  rx: number;
  /** rotateY in degrees. */
  ry: number;
  /** Glare position across the card, 0–100 (%). */
  gx: number;
  /** Glare position down the card, 0–100 (%). */
  gy: number;
}

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));
const round2 = (value: number): number => Math.round(value * 100) / 100 + 0;

/**
 * Tilt for a pointer at (`clientX`, `clientY`) over `rect`.
 *
 * Centre → 0°, the edges → ±`maxDeg`. A pointer outside the rect (it can be,
 * for the frame in which it leaves) is clamped to the edge rather than
 * over-rotating the card.
 */
export function tiltFor(clientX: number, clientY: number, rect: TiltRect, maxDeg = 6): Tilt {
  if (!(rect.width > 0) || !(rect.height > 0)) return { rx: 0, ry: 0, gx: 50, gy: 50 };
  const px = clamp01((clientX - rect.left) / rect.width);
  const py = clamp01((clientY - rect.top) / rect.height);
  return {
    // CSS y runs downward: a positive rotateX sends the TOP edge back, so a
    // pointer near the top needs a positive angle for the edge under it to
    // recede. rotateY is the other way round — positive sends the RIGHT edge
    // back.
    rx: round2((0.5 - py) * 2 * maxDeg),
    ry: round2((px - 0.5) * 2 * maxDeg),
    gx: round2(px * 100),
    gy: round2(py * 100),
  };
}

const FINE_HOVER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const PROPS = ["--tilt-x", "--tilt-y", "--glare-x", "--glare-y"] as const;

/** Wire the tilt onto one grid. Returns a cleanup function. */
export function mountCardTilt(grid: HTMLElement, maxDeg = 6): () => void {
  const fine = window.matchMedia(FINE_HOVER);
  const reduced = window.matchMedia(REDUCED_MOTION);
  let enabled = fine.matches && !reduced.matches;

  let card: HTMLElement | null = null;
  let rect: DOMRect | null = null;
  let frame = 0;
  let lastX = 0;
  let lastY = 0;

  const release = () => {
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    if (!card) return;
    // Clearing the angles and the flag in the same frame lets the CSS
    // transition carry the card back to rest.
    card.removeAttribute("data-tilting");
    for (const name of PROPS) card.style.removeProperty(name);
    card = null;
    rect = null;
  };

  const paint = () => {
    frame = 0;
    if (!card) return;
    rect ??= (card.parentElement ?? card).getBoundingClientRect();
    const tilt = tiltFor(lastX, lastY, rect, maxDeg);
    card.style.setProperty("--tilt-x", `${tilt.rx}deg`);
    card.style.setProperty("--tilt-y", `${tilt.ry}deg`);
    card.style.setProperty("--glare-x", `${tilt.gx}%`);
    card.style.setProperty("--glare-y", `${tilt.gy}%`);
  };

  const onMove = (event: PointerEvent) => {
    if (!enabled || (event.pointerType !== "mouse" && event.pointerType !== "pen")) return;
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>(".tool-card") : null;
    if (target !== card) {
      release();
      if (!target || !grid.contains(target)) return;
      card = target;
      card.setAttribute("data-tilting", "");
    }
    lastX = event.clientX;
    lastY = event.clientY;
    if (!frame) frame = requestAnimationFrame(paint);
  };

  const dropRect = () => {
    rect = null;
  };

  const onMediaChange = () => {
    enabled = fine.matches && !reduced.matches;
    if (!enabled) release();
  };

  grid.addEventListener("pointermove", onMove);
  grid.addEventListener("pointerleave", release);
  window.addEventListener("scroll", dropRect, { passive: true, capture: true });
  window.addEventListener("resize", dropRect, { passive: true });
  fine.addEventListener("change", onMediaChange);
  reduced.addEventListener("change", onMediaChange);

  return () => {
    release();
    grid.removeEventListener("pointermove", onMove);
    grid.removeEventListener("pointerleave", release);
    window.removeEventListener("scroll", dropRect, { capture: true });
    window.removeEventListener("resize", dropRect);
    fine.removeEventListener("change", onMediaChange);
    reduced.removeEventListener("change", onMediaChange);
  };
}
