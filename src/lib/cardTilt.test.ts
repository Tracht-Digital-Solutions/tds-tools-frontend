import { describe, expect, it } from "vitest";
import { tiltFor } from "./cardTilt";

const rect = { left: 100, top: 50, width: 300, height: 200 };

describe("tiltFor", () => {
  it("rests at the centre", () => {
    expect(tiltFor(250, 150, rect)).toEqual({ rx: 0, ry: 0, gx: 50, gy: 50 });
  });

  it("sends the edge under the pointer back, by at most maxDeg", () => {
    // Top-left corner: top edge back (positive rotateX), left edge back
    // (negative rotateY).
    expect(tiltFor(100, 50, rect, 6)).toEqual({ rx: 6, ry: -6, gx: 0, gy: 0 });
    // Bottom-right corner: the mirror image.
    expect(tiltFor(400, 250, rect, 6)).toEqual({ rx: -6, ry: 6, gx: 100, gy: 100 });
  });

  it("clamps a pointer outside the card instead of over-rotating", () => {
    expect(tiltFor(-500, 9999, rect, 6)).toEqual({ rx: -6, ry: -6, gx: 0, gy: 100 });
  });

  it("scales with maxDeg and places the glare in percent", () => {
    expect(tiltFor(175, 100, rect, 10)).toEqual({ rx: 5, ry: -5, gx: 25, gy: 25 });
  });

  it("does not divide by zero for a collapsed cell", () => {
    expect(tiltFor(10, 10, { left: 0, top: 0, width: 0, height: 0 })).toEqual({
      rx: 0,
      ry: 0,
      gx: 50,
      gy: 50,
    });
  });
});
