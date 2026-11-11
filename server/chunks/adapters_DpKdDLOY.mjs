// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/policy.ts
/**
* Export formats and the free/premium split.
*
* The split is configured in the admin panel (Einstellungen → Tools →
* Designsystem-Studio) and served by `GET /tools/studio/access`. The default
* here must stay identical to the PHP default in `tds-ext-tools-pkg`
* (`StudioPolicy::DEFAULT_PREMIUM`): it is what applies when the API cannot be
* reached, and then a premium format stays closed.
*/
var EXPORT_FORMATS = [
	"css",
	"variables",
	"html",
	"scss",
	"json",
	"tailwind",
	"bootstrap",
	"zip"
];
var DEFAULT_PREMIUM = [
	"scss",
	"tailwind",
	"bootstrap",
	"zip"
];
var isExportFormat = (v) => typeof v === "string" && EXPORT_FORMATS.includes(v);
function defaultPolicy() {
	return Object.fromEntries(EXPORT_FORMATS.map((f) => [f, DEFAULT_PREMIUM.includes(f) ? "premium" : "free"]));
}
/** Reads a policy from an API answer; unknown or missing formats fall back to the default. */
function parsePolicy(input) {
	const out = defaultPolicy();
	if (!input || typeof input !== "object") return out;
	for (const f of EXPORT_FORMATS) {
		const v = input[f];
		if (v === "free" || v === "premium") out[f] = v;
	}
	return out;
}
function parseAccess(input) {
	const r = input && typeof input === "object" ? input : {};
	const num = (v, d) => typeof v === "number" && Number.isFinite(v) ? v : d;
	return {
		enabled: r.enabled !== false,
		authenticated: r.authenticated === true,
		entitled: r.entitled === true,
		formats: parsePolicy(r.formats),
		priceCents: num(r.priceCents, 0),
		currency: typeof r.currency === "string" ? r.currency : "EUR",
		analysisEnabled: r.analysisEnabled !== false,
		projectLimit: num(r.projectLimit, 0)
	};
}
/** Fail-closed access when the API cannot be asked. */
function offlineAccess() {
	return {
		enabled: true,
		authenticated: false,
		entitled: false,
		formats: defaultPolicy(),
		priceCents: 0,
		currency: "EUR",
		analysisEnabled: false,
		projectLimit: 0
	};
}
function mayExport(access, format) {
	return access.enabled && (access.formats[format] === "free" || access.entitled);
}
/** The id the premium entitlement is stored under (the tool's catalog id). */
var STUDIO_TOOL_ID = "design-system-studio";
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/color.ts
var NAMED = Object.fromEntries("aliceblue:f0f8ff,antiquewhite:faebd7,aqua:00ffff,aquamarine:7fffd4,azure:f0ffff,beige:f5f5dc,bisque:ffe4c4,black:000000,blanchedalmond:ffebcd,blue:0000ff,blueviolet:8a2be2,brown:a52a2a,burlywood:deb887,cadetblue:5f9ea0,chartreuse:7fff00,chocolate:d2691e,coral:ff7f50,cornflowerblue:6495ed,cornsilk:fff8dc,crimson:dc143c,cyan:00ffff,darkblue:00008b,darkcyan:008b8b,darkgoldenrod:b8860b,darkgray:a9a9a9,darkgreen:006400,darkgrey:a9a9a9,darkkhaki:bdb76b,darkmagenta:8b008b,darkolivegreen:556b2f,darkorange:ff8c00,darkorchid:9932cc,darkred:8b0000,darksalmon:e9967a,darkseagreen:8fbc8f,darkslateblue:483d8b,darkslategray:2f4f4f,darkslategrey:2f4f4f,darkturquoise:00ced1,darkviolet:9400d3,deeppink:ff1493,deepskyblue:00bfff,dimgray:696969,dimgrey:696969,dodgerblue:1e90ff,firebrick:b22222,floralwhite:fffaf0,forestgreen:228b22,fuchsia:ff00ff,gainsboro:dcdcdc,ghostwhite:f8f8ff,gold:ffd700,goldenrod:daa520,gray:808080,green:008000,greenyellow:adff2f,grey:808080,honeydew:f0fff0,hotpink:ff69b4,indianred:cd5c5c,indigo:4b0082,ivory:fffff0,khaki:f0e68c,lavender:e6e6fa,lavenderblush:fff0f5,lawngreen:7cfc00,lemonchiffon:fffacd,lightblue:add8e6,lightcoral:f08080,lightcyan:e0ffff,lightgoldenrodyellow:fafad2,lightgray:d3d3d3,lightgreen:90ee90,lightgrey:d3d3d3,lightpink:ffb6c1,lightsalmon:ffa07a,lightseagreen:20b2aa,lightskyblue:87cefa,lightslategray:778899,lightslategrey:778899,lightsteelblue:b0c4de,lightyellow:ffffe0,lime:00ff00,limegreen:32cd32,linen:faf0e6,magenta:ff00ff,maroon:800000,mediumaquamarine:66cdaa,mediumblue:0000cd,mediumorchid:ba55d3,mediumpurple:9370db,mediumseagreen:3cb371,mediumslateblue:7b68ee,mediumspringgreen:00fa9a,mediumturquoise:48d1cc,mediumvioletred:c71585,midnightblue:191970,mintcream:f5fffa,mistyrose:ffe4e1,moccasin:ffe4b5,navajowhite:ffdead,navy:000080,oldlace:fdf5e6,olive:808000,olivedrab:6b8e23,orange:ffa500,orangered:ff4500,orchid:da70d6,palegoldenrod:eee8aa,palegreen:98fb98,paleturquoise:afeeee,palevioletred:db7093,papayawhip:ffefd5,peachpuff:ffdab9,peru:cd853f,pink:ffc0cb,plum:dda0dd,powderblue:b0e0e6,purple:800080,rebeccapurple:663399,red:ff0000,rosybrown:bc8f8f,royalblue:4169e1,saddlebrown:8b4513,salmon:fa8072,sandybrown:f4a460,seagreen:2e8b57,seashell:fff5ee,sienna:a0522d,silver:c0c0c0,skyblue:87ceeb,slateblue:6a5acd,slategray:708090,slategrey:708090,snow:fffafa,springgreen:00ff7f,steelblue:4682b4,tan:d2b48c,teal:008080,thistle:d8bfd8,tomato:ff6347,turquoise:40e0d0,violet:ee82ee,wheat:f5deb3,white:ffffff,whitesmoke:f5f5f5,yellow:ffff00,yellowgreen:9acd32".split(",").map((pair) => pair.split(":")));
var clamp$1 = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
/** Splits a functional notation's arguments, accepting comma and space syntax. */
function args(inner) {
	return inner.replace(/\s*\/\s*/g, " / ").split(/[\s,]+/).filter((part) => part.length > 0);
}
function num(token, percentOf = 1) {
	if (token === void 0) return null;
	if (token === "none") return 0;
	const m = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(%|deg|rad|turn|grad)?$/i.exec(token);
	if (!m) return null;
	const v = Number(m[1]);
	switch ((m[2] ?? "").toLowerCase()) {
		case "%": return v / 100 * percentOf;
		case "rad": return v * 180 / Math.PI;
		case "turn": return v * 360;
		case "grad": return v * .9;
		default: return v;
	}
}
/** Parses a CSS colour. Returns null for anything it cannot represent exactly. */
function parseColor(input) {
	const s = input.trim().toLowerCase();
	if (s === "") return null;
	if (s === "transparent") return {
		r: 0,
		g: 0,
		b: 0,
		a: 0
	};
	if (NAMED[s]) return parseColor(`#${NAMED[s]}`);
	if (s.startsWith("#")) {
		const hex = s.slice(1);
		if (!/^[0-9a-f]+$/.test(hex)) return null;
		if (hex.length === 3 || hex.length === 4) {
			const [r, g, b, a = "f"] = hex.split("");
			return {
				r: parseInt(r + r, 16),
				g: parseInt(g + g, 16),
				b: parseInt(b + b, 16),
				a: parseInt(a + a, 16) / 255
			};
		}
		if (hex.length === 6 || hex.length === 8) return {
			r: parseInt(hex.slice(0, 2), 16),
			g: parseInt(hex.slice(2, 4), 16),
			b: parseInt(hex.slice(4, 6), 16),
			a: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1
		};
		return null;
	}
	const fn = /^([a-z]+)\((.*)\)$/.exec(s);
	if (!fn) return null;
	const name = fn[1];
	const parts = args(fn[2] ?? "");
	const slash = parts.indexOf("/");
	const alphaToken = slash >= 0 ? parts[slash + 1] : parts[3];
	const channels = slash >= 0 ? parts.slice(0, slash) : parts.slice(0, 3);
	if (channels.length !== 3) return null;
	const alpha = alphaToken === void 0 ? 1 : num(alphaToken, 1);
	if (alpha === null) return null;
	if (name === "rgb" || name === "rgba") {
		const [r, g, b] = channels.map((c) => num(c, 255));
		if (r == null || g == null || b == null) return null;
		return {
			r: clamp$1(r, 0, 255),
			g: clamp$1(g, 0, 255),
			b: clamp$1(b, 0, 255),
			a: clamp$1(alpha, 0, 1)
		};
	}
	if (name === "hsl" || name === "hsla") {
		const h = num(channels[0]);
		const sat = num(channels[1], 1);
		const light = num(channels[2], 1);
		if (h == null || sat == null || light == null) return null;
		const sv = channels[1]?.endsWith("%") ? sat : sat / 100;
		const lv = channels[2]?.endsWith("%") ? light : light / 100;
		return {
			...hslToRgb(h, clamp$1(sv, 0, 1), clamp$1(lv, 0, 1)),
			a: clamp$1(alpha, 0, 1)
		};
	}
	if (name === "oklch") {
		const l = num(channels[0], 1);
		const c = num(channels[1], .4);
		const h = num(channels[2]);
		if (l == null || c == null || h == null) return null;
		return oklchToRgb({
			l: channels[0]?.endsWith("%") ? l : l > 1 ? l / 100 : l,
			c: Math.max(0, c),
			h,
			a: clamp$1(alpha, 0, 1)
		});
	}
	return null;
}
function hslToRgb(h, s, l) {
	const hue = (h % 360 + 360) % 360;
	const k = (n) => (n + hue / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	return {
		r: f(0) * 255,
		g: f(8) * 255,
		b: f(4) * 255
	};
}
function rgbToHsl({ r, g, b }) {
	const rn = r / 255;
	const gn = g / 255;
	const bn = b / 255;
	const max = Math.max(rn, gn, bn);
	const min = Math.min(rn, gn, bn);
	const l = (max + min) / 2;
	if (max === min) return {
		h: 0,
		s: 0,
		l
	};
	const d = max - min;
	const s = l > .5 ? d / (2 - max - min) : d / (max + min);
	let h;
	if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
	else if (max === gn) h = ((bn - rn) / d + 2) * 60;
	else h = ((rn - gn) / d + 4) * 60;
	return {
		h,
		s,
		l
	};
}
var hex2 = (v) => Math.round(clamp$1(v, 0, 255)).toString(16).padStart(2, "0");
function toHex(c) {
	const base = `#${hex2(c.r)}${hex2(c.g)}${hex2(c.b)}`;
	return c.a >= .999 ? base : `${base}${hex2(c.a * 255)}`;
}
/** Normalises any parsable colour to lower-case hex; returns the input otherwise. */
function normalizeColor(input) {
	const c = parseColor(input);
	return c ? toHex(c) : input;
}
function formatColor(c, format) {
	const a = Math.round(c.a * 1e3) / 1e3;
	const alpha = a < 1 ? ` / ${a}` : "";
	switch (format) {
		case "rgb": return `rgb(${Math.round(c.r)} ${Math.round(c.g)} ${Math.round(c.b)}${alpha})`;
		case "hsl": {
			const { h, s, l } = rgbToHsl(c);
			return `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%${alpha})`;
		}
		case "oklch": {
			const o = rgbToOklch(c);
			return `oklch(${(o.l * 100).toFixed(1)}% ${o.c.toFixed(3)} ${o.h.toFixed(1)}${alpha})`;
		}
		default: return toHex(c);
	}
}
var toLinear = (v) => {
	const x = v / 255;
	return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4;
};
var fromLinear = (v) => (v <= .0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - .055) * 255;
function rgbToOklch(c) {
	const r = toLinear(c.r);
	const g = toLinear(c.g);
	const b = toLinear(c.b);
	const l = Math.cbrt(.4122214708 * r + .5363325363 * g + .0514459929 * b);
	const m = Math.cbrt(.2119034982 * r + .6806995451 * g + .1073969566 * b);
	const s = Math.cbrt(.0883024619 * r + .2817188376 * g + .6299787005 * b);
	const L = .2104542553 * l + .793617785 * m - .0040720468 * s;
	const A = 1.9779984951 * l - 2.428592205 * m + .4505937099 * s;
	const B = .0259040371 * l + .7827717662 * m - .808675766 * s;
	const C = Math.sqrt(A * A + B * B);
	let h = Math.atan2(B, A) * 180 / Math.PI;
	if (h < 0) h += 360;
	return {
		l: L,
		c: C < 1e-4 ? 0 : C,
		h: C < 1e-4 ? 0 : h,
		a: c.a
	};
}
function oklchToLinear({ l: L, c: C, h }) {
	const hr = h * Math.PI / 180;
	const A = C * Math.cos(hr);
	const B = C * Math.sin(hr);
	const l = (L + .3963377774 * A + .2158037573 * B) ** 3;
	const m = (L - .1055613458 * A - .0638541728 * B) ** 3;
	const s = (L - .0894841775 * A - 1.291485548 * B) ** 3;
	return [
		4.0767416621 * l - 3.3077115913 * m + .2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - .3413193965 * s,
		-.0041960863 * l - .7034186147 * m + 1.707614701 * s
	];
}
var inGamut = (rgb) => rgb.every((v) => v >= -1e-4 && v <= 1.0001);
/** OKLCH → sRGB, reducing chroma (hue and lightness kept) until it fits. */
function oklchToRgb(o) {
	const L = clamp$1(o.l, 0, 1);
	let lin = oklchToLinear({
		...o,
		l: L
	});
	if (!inGamut(lin)) {
		let lo = 0;
		let hi = o.c;
		for (let i = 0; i < 24; i++) {
			const mid = (lo + hi) / 2;
			if (inGamut(oklchToLinear({
				...o,
				l: L,
				c: mid
			}))) lo = mid;
			else hi = mid;
		}
		lin = oklchToLinear({
			...o,
			l: L,
			c: lo
		});
	}
	const [r, g, b] = lin.map((v) => clamp$1(fromLinear(clamp$1(v, 0, 1)), 0, 255));
	return {
		r,
		g,
		b,
		a: o.a
	};
}
function oklch(l, c, h, a = 1) {
	return toHex(oklchToRgb({
		l,
		c,
		h,
		a
	}));
}
var wcagChannel = (v) => {
	const x = v / 255;
	return x <= .03928 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4;
};
function luminance(c) {
	return .2126 * wcagChannel(c.r) + .7152 * wcagChannel(c.g) + .0722 * wcagChannel(c.b);
}
/** Paints a translucent colour over an opaque backdrop. */
function composite(top, bottom) {
	const a = top.a;
	return {
		r: top.r * a + bottom.r * (1 - a),
		g: top.g * a + bottom.g * (1 - a),
		b: top.b * a + bottom.b * (1 - a),
		a: 1
	};
}
/**
* WCAG contrast ratio of two CSS colours. A translucent foreground is painted
* over the background first; a translucent background over white. Returns
* null when either side is not a plain colour (a gradient, a var()).
*/
function contrast(fg, bg) {
	const b0 = parseColor(bg);
	const f0 = parseColor(fg);
	if (!b0 || !f0) return null;
	const b = b0.a < 1 ? composite(b0, {
		r: 255,
		g: 255,
		b: 255,
		a: 1
	}) : b0;
	const l1 = luminance(f0.a < 1 ? composite(f0, b) : f0);
	const l2 = luminance(b);
	return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
}
var round2 = (n) => Math.round(n * 100) / 100;
/** The darker/lighter of two text colours that reads best on `bg`. */
function readableOn(bg, dark = "#111111", light = "#ffffff") {
	const d = contrast(dark, bg) ?? 0;
	return (contrast(light, bg) ?? 0) >= d ? light : dark;
}
/**
* Moves `fg` along OKLCH lightness (hue and chroma kept as far as the gamut
* allows) until it reaches `target` against `bg`. Picks the direction that
* needs the smaller step; returns `fg` unchanged when it already passes.
*/
function ensureContrast(fg, bg, target) {
	const current = contrast(fg, bg);
	const f = parseColor(fg);
	if (current === null || !f) return fg;
	if (current >= target) return toHex({
		...f,
		a: 1
	});
	const o = rgbToOklch({
		...f,
		a: 1
	});
	const tryDir = (dir) => {
		for (let step = 1; step <= 100; step++) {
			const l = o.l + dir * step * .01;
			if (l < 0 || l > 1) break;
			const candidate = oklch(l, o.c, o.h);
			if ((contrast(candidate, bg) ?? 0) >= target) return candidate;
		}
		return null;
	};
	const down = tryDir(-1);
	const up = tryDir(1);
	if (down && up) return Math.abs(rgbToOklch(parseColor(down)).l - o.l) <= Math.abs(rgbToOklch(parseColor(up)).l - o.l) ? down : up;
	return down ?? up ?? readableOn(bg, "#000000", "#ffffff");
}
/** Shifts lightness in OKLCH (positive = lighter). */
function shiftLightness(color, delta) {
	const c = parseColor(color);
	if (!c) return color;
	const o = rgbToOklch(c);
	return oklch(clamp$1(o.l + delta, 0, 1), o.c, o.h, c.a);
}
/** The OKLCH description of a CSS colour, or a neutral fallback. */
function describe(color) {
	const c = parseColor(color);
	return c ? rgbToOklch(c) : {
		l: .5,
		c: 0,
		h: 0,
		a: 1
	};
}
var HARMONIES = [
	"analogous",
	"complementary",
	"triadic",
	"split",
	"monochrome"
];
/** Secondary and accent hue offsets per harmony rule. */
function harmonyOffsets(harmony) {
	switch (harmony) {
		case "complementary": return [180, 30];
		case "triadic": return [120, 240];
		case "split": return [150, 210];
		case "monochrome": return [0, 0];
		default: return [-30, 30];
	}
}
var SEED_KINDS = [
	"button",
	"card",
	"input",
	"link"
];
/** The components the generated system contains (the agreed standard scope). */
var COMPONENT_KINDS = [
	"button",
	"buttonSecondary",
	"link",
	"heading",
	"text",
	"card",
	"input",
	"label",
	"formButton",
	"nav",
	"footer"
];
var VARIANTS = [
	"original",
	"minimal",
	"modern",
	"elegant",
	"playful",
	"technical"
];
var BORDER_STYLES = [
	"solid",
	"dashed",
	"dotted",
	"double",
	"none"
];
var ANIMATIONS = [
	"none",
	"fade-in",
	"slide-up",
	"pulse"
];
var sides = (v) => ({
	top: v,
	right: v,
	bottom: v,
	left: v
});
var corners = (v) => ({
	tl: v,
	tr: v,
	br: v,
	bl: v
});
var FONT_STACKS = {
	sans: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
	geometric: "\"Avenir Next\", \"Century Gothic\", \"Futura\", system-ui, sans-serif",
	humanist: "\"Gill Sans\", \"Trebuchet MS\", \"Segoe UI\", Calibri, sans-serif",
	serif: "Georgia, \"Times New Roman\", \"Iowan Old Style\", serif",
	rounded: "\"Nunito\", \"Varela Round\", \"Arial Rounded MT Bold\", system-ui, sans-serif",
	mono: "ui-monospace, \"SFMono-Regular\", \"JetBrains Mono\", Menlo, Consolas, monospace"
};
var DEFAULT_STATES = {
	hover: {
		translateY: 0,
		scale: 1
	},
	focus: {
		outlineWidth: 2,
		outlineOffset: 2
	},
	active: { scale: .98 },
	disabled: { opacity: .5 }
};
function defaultStyle(kind) {
	const common = {
		background: "#2563eb",
		gradientTo: "",
		gradientAngle: 135,
		color: "#ffffff",
		fontFamily: FONT_STACKS.sans,
		fontSize: 16,
		fontWeight: 600,
		lineHeight: 1.25,
		letterSpacing: 0,
		textTransform: "none",
		textAlign: "center",
		borderWidth: sides(0),
		borderStyle: "solid",
		borderColor: sides("#2563eb"),
		radius: corners(8),
		padding: {
			top: 12,
			right: 22,
			bottom: 12,
			left: 22
		},
		minHeight: 44,
		shadow: "0 1px 2px rgba(15, 23, 42, 0.12)",
		textShadow: "",
		filter: "",
		opacity: 1,
		transitionDuration: 160,
		transitionEasing: "ease-out",
		animation: "none",
		states: structuredCloneStates(DEFAULT_STATES)
	};
	switch (kind) {
		case "card": return {
			...common,
			background: "#ffffff",
			color: "#1f2937",
			fontWeight: 400,
			lineHeight: 1.6,
			textAlign: "left",
			borderWidth: sides(1),
			borderColor: sides("#e5e7eb"),
			radius: corners(12),
			padding: sides(24),
			minHeight: 0,
			shadow: "0 4px 16px rgba(15, 23, 42, 0.08)",
			states: {
				...structuredCloneStates(DEFAULT_STATES),
				active: {},
				hover: { translateY: -2 }
			}
		};
		case "input": return {
			...common,
			background: "#ffffff",
			color: "#1f2937",
			fontWeight: 400,
			lineHeight: 1.4,
			textAlign: "left",
			borderWidth: sides(1),
			borderColor: sides("#6b7280"),
			radius: corners(6),
			padding: {
				top: 10,
				right: 12,
				bottom: 10,
				left: 12
			},
			shadow: "none",
			states: {
				hover: { borderColor: "#374151" },
				focus: {
					borderColor: "#2563eb",
					outlineWidth: 2,
					outlineOffset: 1
				},
				active: {},
				disabled: { opacity: .55 }
			}
		};
		case "link": return {
			...common,
			background: "transparent",
			color: "#2563eb",
			fontWeight: 500,
			lineHeight: 1.5,
			textAlign: "left",
			borderColor: sides("#2563eb"),
			radius: corners(2),
			padding: sides(0),
			minHeight: 0,
			shadow: "none",
			states: {
				hover: { color: "#1d4ed8" },
				focus: {
					outlineWidth: 2,
					outlineOffset: 2
				},
				active: {},
				disabled: { opacity: .5 }
			}
		};
		default: return common;
	}
}
function structuredCloneStates(s) {
	return JSON.parse(JSON.stringify(s));
}
var DEFAULT_THEMES = [{
	id: "light",
	name: "Hell",
	base: "light",
	contrast: "normal",
	overrides: {}
}, {
	id: "dark",
	name: "Dunkel",
	base: "dark",
	contrast: "normal",
	overrides: {}
}];
function newProject(kind = "button") {
	return {
		schema: 1,
		name: "Mein Designsystem",
		prefix: "ds",
		seed: {
			kind,
			style: defaultStyle(kind)
		},
		variant: "original",
		harmony: "analogous",
		globals: {},
		locks: [],
		components: {},
		themes: DEFAULT_THEMES.map((t) => ({
			...t,
			overrides: {}
		})),
		customCss: "",
		imported: null
	};
}
/** Dotted-path read on a plain object. */
function getPath(obj, path) {
	let cur = obj;
	for (const key of path.split(".")) {
		if (cur === null || typeof cur !== "object") return void 0;
		cur = cur[key];
	}
	return cur;
}
/** Dotted-path write, returning a new object (structural sharing). */
function setPath(obj, path, value) {
	const [head, ...rest] = path.split(".");
	const src = obj ?? {};
	if (head === void 0) return obj;
	if (head === "__proto__" || head === "constructor" || head === "prototype") return obj;
	return {
		...src,
		[head]: rest.length === 0 ? value : setPath(src[head], rest.join("."), value)
	};
}
/** Applies a flat dotted-path patch onto a copy of `base`. */
function applyPatch(base, patch) {
	if (!patch) return base;
	let out = base;
	for (const key of Object.keys(patch).sort()) out = setPath(out, key, patch[key]);
	return out;
}
var PREFIX_RE = /^[a-z][a-z0-9-]{0,11}$/;
var isValidPrefix = (p) => PREFIX_RE.test(p);
var MAX_CUSTOM_CSS = 2e5;
/**
* Accepts an unknown value (a stored project, a file the user picked) and
* returns a complete, current-schema project — or null when it is not one.
* Missing fields are filled from the defaults, so a project saved by an older
* release opens with the same look plus whatever was added since.
*/
function parseProject(input) {
	if (!input || typeof input !== "object" || Array.isArray(input)) return null;
	const raw = input;
	const schema = typeof raw.schema === "number" ? raw.schema : NaN;
	if (!Number.isInteger(schema) || schema < 1 || schema > 1) return null;
	const seedRaw = raw.seed ?? {};
	const kind = SEED_KINDS.includes(seedRaw.kind) ? seedRaw.kind : "button";
	const base = newProject(kind);
	const style = mergeDeep(base.seed.style, seedRaw.style);
	const themes = Array.isArray(raw.themes) ? raw.themes.filter((t) => !!t && typeof t === "object").slice(0, 12).map((t, i) => ({
		id: typeof t.id === "string" && /^[a-z0-9-]{1,32}$/.test(t.id) ? t.id : `theme-${i + 1}`,
		name: typeof t.name === "string" ? t.name.slice(0, 40) : `Theme ${i + 1}`,
		base: t.base === "dark" ? "dark" : "light",
		contrast: t.contrast === "more" ? "more" : "normal",
		overrides: flatStrings(t.overrides)
	})) : base.themes;
	const components = {};
	if (raw.components && typeof raw.components === "object") for (const k of COMPONENT_KINDS) {
		const p = raw.components[k];
		if (p && typeof p === "object") components[k] = flatPatch(p);
	}
	return {
		schema: 1,
		name: typeof raw.name === "string" && raw.name.trim() ? raw.name.trim().slice(0, 120) : base.name,
		prefix: typeof raw.prefix === "string" && isValidPrefix(raw.prefix) ? raw.prefix : base.prefix,
		seed: {
			kind,
			style
		},
		variant: VARIANTS.includes(raw.variant) ? raw.variant : base.variant,
		harmony: [
			"analogous",
			"complementary",
			"triadic",
			"split",
			"monochrome"
		].includes(raw.harmony) ? raw.harmony : base.harmony,
		globals: flatPatch(raw.globals),
		locks: Array.isArray(raw.locks) ? raw.locks.filter((l) => typeof l === "string").slice(0, 200) : [],
		components,
		themes: themes.length > 0 ? dedupeThemes(themes) : base.themes,
		customCss: typeof raw.customCss === "string" ? raw.customCss.slice(0, MAX_CUSTOM_CSS) : "",
		imported: parseImport(raw.imported)
	};
}
function dedupeThemes(themes) {
	const seen = /* @__PURE__ */ new Set();
	return themes.filter((t) => seen.has(t.id) ? false : (seen.add(t.id), true));
}
function parseImport(v) {
	if (!v || typeof v !== "object") return null;
	const r = v;
	const kind = [
		"css",
		"html",
		"tokens",
		"url"
	].find((k) => k === r.kind);
	if (!kind) return null;
	const values = Array.isArray(r.values) ? r.values.filter((x) => !!x && typeof x === "object").filter((x) => typeof x.path === "string" && (typeof x.value === "string" || typeof x.value === "number")).slice(0, 300).map((x) => ({
		path: String(x.path),
		value: x.value,
		confidence: [
			"high",
			"medium",
			"low"
		].find((c) => c === x.confidence) ?? "low",
		source: typeof x.source === "string" ? x.source.slice(0, 200) : ""
	})) : [];
	return {
		kind,
		url: typeof r.url === "string" ? r.url.slice(0, 2048) : void 0,
		at: typeof r.at === "string" ? r.at : "",
		values,
		unmapped: Array.isArray(r.unmapped) ? r.unmapped.filter((x) => typeof x === "string").slice(0, 300) : [],
		preservedCss: typeof r.preservedCss === "string" ? r.preservedCss.slice(0, MAX_CUSTOM_CSS) : "",
		notes: Array.isArray(r.notes) ? r.notes.filter((x) => typeof x === "string").slice(0, 50) : []
	};
}
function flatPatch(v) {
	const out = {};
	if (!v || typeof v !== "object" || Array.isArray(v)) return out;
	for (const [k, val] of Object.entries(v)) {
		if (!/^[A-Za-z0-9_.-]{1,80}$/.test(k) || k.split(".").some((p) => p === "__proto__" || p === "constructor" || p === "prototype")) continue;
		if (typeof val === "string") out[k] = val.slice(0, 500);
		else if (typeof val === "number" && Number.isFinite(val)) out[k] = val;
		else if (typeof val === "boolean") out[k] = val;
	}
	return out;
}
function flatStrings(v) {
	const out = {};
	for (const [k, val] of Object.entries(flatPatch(v))) if (typeof val === "string") out[k] = val;
	return out;
}
function mergeDeep(base, over) {
	if (over === void 0 || over === null) return base;
	if (typeof base !== "object" || base === null || Array.isArray(base)) {
		if (typeof base === "number") return typeof over === "number" && Number.isFinite(over) ? over : base;
		if (typeof base === "string") return typeof over === "string" ? over.slice(0, 500) : base;
		if (typeof base === "boolean") return typeof over === "boolean" ? over : base;
		return base;
	}
	if (typeof over !== "object" || Array.isArray(over)) return base;
	const out = { ...base };
	for (const [k, v] of Object.entries(over)) {
		if (k === "__proto__" || k === "constructor" || k === "prototype") continue;
		if (k in out) out[k] = mergeDeep(out[k], v);
		else if (typeof v === "string" || typeof v === "number" && Number.isFinite(v)) out[k] = typeof v === "string" ? v.slice(0, 500) : v;
	}
	return out;
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/tokens.ts
/**
* Rule-based token derivation: seed component → base tokens → variant →
* imported values → user globals. Pure and deterministic — the same project
* always resolves to the same tokens (no randomness, no clock, no AI).
*/
/** Every editable token path, used by the UI and for provenance. */
var TOKEN_PATHS = [
	"color.primary",
	"color.secondary",
	"color.accent",
	"color.neutralChroma",
	"font.body",
	"font.heading",
	"font.size",
	"font.ratio",
	"font.lineHeight",
	"font.bodyWeight",
	"font.headingWeight",
	"font.headingTracking",
	"font.headingTransform",
	"space.unit",
	"radius.sm",
	"radius.md",
	"radius.lg",
	"radius.button",
	"border.width",
	"border.style",
	"shadow.sm",
	"shadow.md",
	"shadow.lg",
	"motion.duration",
	"motion.easing",
	"layout.container",
	"layout.gutter",
	"layout.fluid",
	"layout.navBreakpoint",
	"style.hover",
	"style.shadow",
	"style.buttonCase",
	"style.buttonTracking",
	"style.focus"
];
var clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
var round = (v, step = 1) => Math.round(v / step) * step;
var chroma = (color) => {
	const c = parseColor(color);
	return c && c.a > .2 ? describe(color).c : 0;
};
/** The seed's most brand-like colour: the first clearly chromatic candidate. */
function seedBrandColor(seed) {
	const s = seed.style;
	return (seed.kind === "button" ? [
		s.background,
		s.borderColor.top,
		s.color,
		s.states.focus.outlineColor ?? ""
	] : seed.kind === "link" ? [
		s.color,
		s.states.hover.color ?? "",
		s.borderColor.top
	] : [
		s.states.focus.borderColor ?? "",
		s.states.focus.outlineColor ?? "",
		s.borderColor.top,
		s.background,
		s.color
	]).find((c) => c && chroma(c) >= .04) ?? "#2563eb";
}
/** Reads the first layer of a box-shadow value. Null for `none` or unreadable. */
function parseShadow(value) {
	const v = value.trim();
	if (!v || v === "none") return null;
	let depth = 0;
	let first = v;
	for (let i = 0; i < v.length; i++) {
		const ch = v[i];
		if (ch === "(") depth++;
		else if (ch === ")") depth--;
		else if (ch === "," && depth === 0) {
			first = v.slice(0, i);
			break;
		}
	}
	const colorMatch = /(#[0-9a-f]{3,8}\b|(?:rgba?|hsla?|oklch)\([^)]*\)|\b[a-z]+\b(?!\())/i.exec(first.replace(/\binset\b/i, ""));
	const color = colorMatch && parseColor(colorMatch[0]) ? colorMatch[0] : "rgba(0, 0, 0, 0.2)";
	const lengths = [...first.replace(color, " ").matchAll(/(-?\d*\.?\d+)(px|rem|em)?/g)].map((m) => {
		const n = Number(m[1]);
		return m[2] === "rem" || m[2] === "em" ? n * 16 : n;
	});
	if (lengths.length < 2) return null;
	return {
		x: lengths[0] ?? 0,
		y: lengths[1] ?? 0,
		blur: lengths[2] ?? 0,
		spread: lengths[3] ?? 0,
		color,
		inset: /\binset\b/i.test(first)
	};
}
var shadowCss = (s) => `${s.inset ? "inset " : ""}${round(s.x, .5)}px ${round(s.y, .5)}px ${round(s.blur, .5)}px${s.spread ? ` ${round(s.spread, .5)}px` : ""} ${s.color}`;
function softShadows() {
	return {
		sm: "0 1px 2px rgba(15, 23, 42, 0.08)",
		md: "0 4px 12px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.06)",
		lg: "0 16px 40px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06)"
	};
}
function shadowsFrom(style) {
	const s = parseShadow(style.shadow);
	if (!s) return {
		shadow: {
			sm: "none",
			md: "none",
			lg: "none"
		},
		kind: "none"
	};
	if (s.blur === 0 && (s.x !== 0 || s.y !== 0)) return {
		kind: "hard",
		shadow: {
			sm: shadowCss({
				...s,
				x: s.x / 2,
				y: s.y / 2
			}),
			md: shadowCss(s),
			lg: shadowCss({
				...s,
				x: s.x * 1.5,
				y: s.y * 1.5
			})
		}
	};
	return {
		kind: "soft",
		shadow: {
			sm: shadowCss({
				...s,
				y: Math.max(1, s.y / 2),
				blur: Math.max(2, s.blur / 2),
				spread: 0
			}),
			md: shadowCss(s),
			lg: shadowCss({
				...s,
				y: s.y * 2.5 + 4,
				blur: s.blur * 2.5 + 8
			})
		}
	};
}
var avgRadius = (s) => (s.radius.tl + s.radius.tr + s.radius.br + s.radius.bl) / 4;
/** Layer 1: everything the seed component implies. */
function deriveBase(seed, harmony) {
	const s = seed.style;
	const primary = seedBrandColor(seed);
	const p = describe(primary);
	const [o2, o3] = harmonyOffsets(harmony);
	const mono = harmony === "monochrome";
	const secondary = oklch(mono ? clamp(p.l - .18, .25, .6) : clamp(p.l, .4, .62), mono ? p.c * .6 : Math.max(.06, p.c * .85), (p.h + o2 + 360) % 360);
	const accent = oklch(mono ? clamp(p.l + .15, .55, .8) : .68, Math.max(.1, p.c), (p.h + o3 + 360) % 360);
	const radius = avgRadius(s);
	const md = clamp(round(radius >= 999 ? 12 : radius), 0, 32);
	const { shadow, kind: shadowKind } = shadowsFrom(s);
	const unit = clamp(round((s.padding.top + s.padding.right + s.padding.bottom + s.padding.left) / 4 / 3 / 2) * 2, 2, 12) || 4;
	const bodySize = seed.kind === "button" ? 16 : clamp(round(s.fontSize), 14, 20);
	const hover = s.states.hover;
	const hoverEffect = (hover.translateY ?? 0) < 0 ? "lift" : (hover.scale ?? 1) > 1 ? "scale" : hover.shadow && hover.shadow !== "none" ? "glow" : seed.kind === "link" ? "underline" : "darken";
	const borderWidth = Math.max(s.borderWidth.top, s.borderWidth.right, s.borderWidth.bottom, s.borderWidth.left);
	return {
		color: {
			primary,
			secondary,
			accent,
			neutralHue: p.h,
			neutralChroma: .012
		},
		font: {
			body: s.fontFamily || FONT_STACKS.sans,
			heading: s.fontFamily || FONT_STACKS.sans,
			mono: FONT_STACKS.mono,
			size: bodySize,
			ratio: 1.25,
			lineHeight: seed.kind === "card" ? clamp(s.lineHeight, 1.4, 1.9) : 1.6,
			bodyWeight: 400,
			headingWeight: clamp(round(Math.max(s.fontWeight, 600), 100), 500, 900),
			headingTracking: clamp(s.letterSpacing, -.03, .12),
			headingLineHeight: 1.2,
			headingTransform: "none"
		},
		space: { unit },
		radius: {
			sm: round(md / 2),
			md,
			lg: clamp(round(md * 1.5), 0, 40),
			button: clamp(round(radius), 0, 9999)
		},
		border: {
			width: clamp(borderWidth || 1, 1, 4),
			style: s.borderStyle === "none" ? "solid" : s.borderStyle
		},
		shadow,
		motion: {
			duration: clamp(round(s.transitionDuration), 0, 1e3),
			easing: s.transitionEasing || "ease-out"
		},
		layout: {
			container: 1120,
			gutter: 24,
			fluid: true,
			navBreakpoint: 768
		},
		style: {
			hover: hoverEffect,
			shadow: shadowKind,
			buttonCase: s.textTransform === "uppercase" ? "uppercase" : "none",
			buttonTracking: clamp(s.letterSpacing, 0, .2),
			focus: (s.states.focus.outlineWidth ?? 2) >= 3 ? "outline" : "ring",
			hoverAmount: hoverEffect === "lift" ? clamp(Math.abs(hover.translateY ?? 2), 1, 8) : hoverEffect === "scale" ? clamp(hover.scale ?? 1.03, 1.01, 1.15) : 0
		}
	};
}
/**
* Layer 2: a style direction. Each variant changes STRUCTURE — geometry,
* typography, depth, motion — not just colour, so two variants of one seed
* are told apart at a glance in greyscale.
*/
function applyVariant(t, variant) {
	const v = JSON.parse(JSON.stringify(t));
	switch (variant) {
		case "original": return v;
		case "minimal":
			v.radius = {
				sm: Math.min(t.radius.sm, 2),
				md: Math.min(t.radius.md, 4),
				lg: Math.min(t.radius.lg, 6),
				button: Math.min(t.radius.button, 4)
			};
			v.shadow = {
				sm: "none",
				md: "none",
				lg: "none"
			};
			v.style.shadow = "none";
			v.border.width = 1;
			v.border.style = "solid";
			v.style.hover = "darken";
			v.style.hoverAmount = 0;
			v.font.headingWeight = 600;
			v.font.headingTracking = -.01;
			v.font.ratio = 1.2;
			v.space.unit = Math.max(t.space.unit, 6);
			v.motion.duration = Math.min(t.motion.duration || 120, 140);
			v.color.neutralChroma = .004;
			return v;
		case "modern":
			v.radius = {
				sm: 6,
				md: clamp(t.radius.md, 8, 14),
				lg: clamp(t.radius.lg, 14, 22),
				button: clamp(t.radius.button, 8, 9999)
			};
			v.shadow = softShadows();
			v.style.shadow = "soft";
			v.style.hover = "lift";
			v.style.hoverAmount = 2;
			v.font.headingWeight = 700;
			v.font.headingTracking = -.02;
			v.font.ratio = 1.25;
			v.motion = {
				duration: 180,
				easing: "cubic-bezier(0.2, 0.8, 0.2, 1)"
			};
			return v;
		case "elegant":
			v.font.heading = FONT_STACKS.serif;
			v.font.headingWeight = 500;
			v.font.headingTracking = .01;
			v.font.lineHeight = 1.75;
			v.font.ratio = 1.333;
			v.radius = {
				sm: 0,
				md: 2,
				lg: 2,
				button: 0
			};
			v.shadow = {
				sm: "0 1px 2px rgba(15, 23, 42, 0.05)",
				md: "0 6px 24px rgba(15, 23, 42, 0.06)",
				lg: "0 24px 60px rgba(15, 23, 42, 0.08)"
			};
			v.style.shadow = "soft";
			v.style.buttonCase = "uppercase";
			v.style.buttonTracking = .12;
			v.style.hover = "darken";
			v.border.width = 1;
			v.space.unit = Math.max(t.space.unit, 6);
			v.motion = {
				duration: 260,
				easing: "ease-in-out"
			};
			v.color.secondary = muted(t.color.secondary, .6);
			v.color.accent = muted(t.color.accent, .6);
			return v;
		case "playful":
			v.font.heading = FONT_STACKS.rounded;
			v.font.body = t.font.body === FONT_STACKS.sans ? FONT_STACKS.rounded : t.font.body;
			v.font.headingWeight = 800;
			v.font.ratio = 1.3;
			v.radius = {
				sm: 10,
				md: 18,
				lg: 28,
				button: 9999
			};
			v.border.width = 2;
			v.border.style = "solid";
			v.shadow = {
				sm: `2px 2px 0 ${oklch(.25, .04, t.color.neutralHue)}`,
				md: `4px 4px 0 ${oklch(.25, .04, t.color.neutralHue)}`,
				lg: `6px 6px 0 ${oklch(.25, .04, t.color.neutralHue)}`
			};
			v.style.shadow = "hard";
			v.style.hover = "scale";
			v.style.hoverAmount = 1.04;
			v.motion = {
				duration: 200,
				easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
			};
			v.color.accent = saturate(t.color.accent);
			return v;
		case "technical":
			v.font.heading = FONT_STACKS.mono;
			v.font.headingWeight = 600;
			v.font.headingTracking = -.01;
			v.font.headingTransform = "uppercase";
			v.font.ratio = 1.2;
			v.radius = {
				sm: 0,
				md: 0,
				lg: 0,
				button: 0
			};
			v.border.width = 2;
			v.border.style = "solid";
			v.shadow = {
				sm: "none",
				md: "none",
				lg: "none"
			};
			v.style.shadow = "none";
			v.style.buttonCase = "uppercase";
			v.style.buttonTracking = .06;
			v.style.focus = "dashed";
			v.style.hover = "underline";
			v.style.hoverAmount = 0;
			v.motion = {
				duration: 90,
				easing: "linear"
			};
			v.color.neutralChroma = .02;
			return v;
	}
}
function muted(color, factor) {
	const o = describe(color);
	return oklch(o.l, o.c * factor, o.h);
}
function saturate(color) {
	const o = describe(color);
	return oklch(clamp(o.l, .55, .75), Math.max(o.c, .17), o.h);
}
/** Casts a stored patch value to the type the token path holds. */
function coerce(current, value) {
	if (typeof current === "number") {
		const n = typeof value === "number" ? value : Number(value);
		return Number.isFinite(n) ? n : current;
	}
	if (typeof current === "boolean") return value === true || value === "true" || value === 1;
	return typeof value === "string" ? value : String(value);
}
/**
* Layers 1–3 for tokens. Imported values join the seed derivation as part of
* the base. Under `original` nothing changes them; a creative variant runs on
* top and re-interprets what it governs (geometry, type, depth), while values
* it does not touch — usually the brand colours — stay as imported.
*/
function resolveTokens(project) {
	const source = {};
	const base = deriveBase(project.seed, project.harmony);
	for (const p of TOKEN_PATHS) source[p] = "derived";
	let tokens = base;
	const imported = project.imported?.values ?? [];
	const applyImported = (t) => {
		let out = t;
		for (const iv of imported) {
			const cur = getPath(out, iv.path);
			if (cur === void 0) continue;
			out = applyPatch(out, { [iv.path]: coerce(cur, iv.value) });
			source[iv.path] = "imported";
		}
		return out;
	};
	tokens = applyImported(tokens);
	if (project.variant !== "original") {
		const varianted = applyVariant(tokens, project.variant);
		for (const p of TOKEN_PATHS) if (JSON.stringify(getPath(varianted, p)) !== JSON.stringify(getPath(tokens, p))) source[p] = "variant";
		tokens = varianted;
	}
	for (const [path, value] of Object.entries(project.globals)) {
		const cur = getPath(tokens, path);
		if (cur === void 0 || typeof cur === "object") continue;
		tokens = applyPatch(tokens, { [path]: coerce(cur, value) });
		source[path] = project.locks.includes(path) ? "locked" : "manual";
	}
	return {
		tokens,
		source
	};
}
/** Body and heading font sizes in px for a token set. */
function typeScale(t) {
	const b = t.font.size;
	const r = t.font.ratio;
	const f = (n) => Math.round(b * r ** n * 100) / 100;
	return {
		sm: f(-1),
		base: b,
		lg: f(1),
		xl: f(2),
		"2xl": f(3),
		"3xl": f(4)
	};
}
/** Spacing steps 1–8 in px, from the unit. */
function spaceScale(t) {
	const u = t.space.unit;
	return [
		1,
		2,
		3,
		4,
		6,
		8,
		12,
		16
	].map((m) => m * u);
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/components.ts
/**
* Component recipes: tokens → one fully specified {@link ComponentStyle} per
* standard component. Colours are role references (`var(--ds-color-…)`), so a
* theme switch restyles every component consistently.
*
* Under the `original` variant the seed's own kind keeps the seed geometry
* exactly — the button the user designed IS the system's button. A creative
* variant re-derives it from tokens like every other component.
*/
var kebab$2 = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
var roleVar = (prefix, role) => `var(--${prefix}-color-${kebab$2(role)})`;
/** The CSS class names of the standard components. */
function componentClass(prefix, kind) {
	return `${prefix}-${{
		button: "btn",
		buttonSecondary: "btn--secondary",
		link: "link",
		heading: "heading",
		text: "text",
		card: "card",
		input: "input",
		label: "label",
		formButton: "submit",
		nav: "nav",
		footer: "footer"
	}[kind]}`;
}
function focusState(t, c) {
	return {
		outlineColor: c("focus"),
		outlineWidth: t.style.focus === "outline" ? 3 : 2,
		outlineOffset: 2
	};
}
function hoverState(t, c, solid) {
	const base = solid ? { background: c("primaryHover") } : {};
	switch (t.style.hover) {
		case "lift": return {
			...base,
			translateY: -t.style.hoverAmount,
			shadow: t.shadow.md === "none" ? void 0 : t.shadow.md
		};
		case "scale": return {
			...base,
			scale: t.style.hoverAmount
		};
		case "glow": return {
			...base,
			shadow: `0 0 0 4px color-mix(in srgb, ${c("primary")} 30%, transparent)`
		};
		default: return base;
	}
}
function emptyStates() {
	return {
		hover: {},
		focus: {},
		active: {},
		disabled: {}
	};
}
function baseStyle(t) {
	return {
		background: "transparent",
		gradientTo: "",
		gradientAngle: 135,
		color: "inherit",
		fontFamily: t.font.body,
		fontSize: t.font.size,
		fontWeight: t.font.bodyWeight,
		lineHeight: t.font.lineHeight,
		letterSpacing: 0,
		textTransform: "none",
		textAlign: "left",
		borderWidth: sides(0),
		borderStyle: "solid",
		borderColor: sides("transparent"),
		radius: corners(0),
		padding: sides(0),
		minHeight: 0,
		shadow: "none",
		textShadow: "",
		filter: "",
		opacity: 1,
		transitionDuration: t.motion.duration,
		transitionEasing: t.motion.easing,
		animation: "none",
		states: emptyStates()
	};
}
/** Rewrites a seed colour to the role it was pinned to, so themes can move it. */
function mapSeedColor(value, pins, c) {
	const n = parseColor(value) ? normalizeColor(value) : null;
	if (!n) return value;
	for (const [literal, role] of pins) if (literal && parseColor(literal) && normalizeColor(literal) === n) return c(role);
	return value;
}
function seedAsComponent(project, c) {
	const s = JSON.parse(JSON.stringify(project.seed.style));
	const kind = project.seed.kind;
	const brandFill = parseColor(s.background) && normalizeColor(s.background) === normalizeColor(seedBrandColor(project.seed));
	const pins = kind === "button" && !brandFill ? [[s.states.focus.outlineColor, "focus"]] : kind === "button" ? [
		[s.background, "primary"],
		[s.gradientTo, "gradientTo"],
		[s.color, "onPrimary"],
		[s.states.hover.background, "primaryHover"],
		[s.states.active.background, "primaryActive"],
		[s.states.focus.outlineColor, "focus"]
	] : kind === "card" ? [
		[s.background, "surface"],
		[s.color, "text"],
		[s.borderColor.top, "border"]
	] : kind === "input" ? [
		[s.background, "field"],
		[s.color, "text"],
		[s.borderColor.top, "borderStrong"],
		[s.states.focus.outlineColor, "focus"],
		[s.states.focus.borderColor, "focus"]
	] : [
		[s.color, "link"],
		[s.states.hover.color, "linkHover"],
		[s.states.focus.outlineColor, "focus"]
	];
	const m = (v) => mapSeedColor(v, pins, c);
	s.background = m(s.background);
	if (s.gradientTo) s.gradientTo = m(s.gradientTo);
	s.color = m(s.color);
	s.borderColor = {
		top: m(s.borderColor.top),
		right: m(s.borderColor.right),
		bottom: m(s.borderColor.bottom),
		left: m(s.borderColor.left)
	};
	for (const st of Object.values(s.states)) {
		if (st.background) st.background = m(st.background);
		if (st.color) st.color = m(st.color);
		if (st.borderColor) st.borderColor = m(st.borderColor);
		if (st.outlineColor) st.outlineColor = m(st.outlineColor);
	}
	if (!s.states.focus.outlineColor && (s.states.focus.outlineWidth ?? 0) > 0) s.states.focus.outlineColor = c("focus");
	return s;
}
/** Generated recipe of a component from tokens alone (layer 1/2). */
function recipe(kind, t, prefix) {
	const c = (r) => roleVar(prefix, r);
	const sp = spaceScale(t);
	const ts = typeScale(t);
	const b = baseStyle(t);
	const u = t.space.unit;
	const hard = t.style.shadow === "hard";
	const framed = hard || t.style.focus === "dashed";
	switch (kind) {
		case "button":
		case "formButton": return {
			...b,
			background: c("primary"),
			color: c("onPrimary"),
			fontWeight: 600,
			lineHeight: 1.25,
			letterSpacing: t.style.buttonTracking,
			textTransform: t.style.buttonCase,
			textAlign: "center",
			borderWidth: sides(framed ? t.border.width : 0),
			borderStyle: "solid",
			borderColor: sides(hard ? c("text") : c("primary")),
			radius: corners(t.radius.button),
			padding: {
				top: sp[2],
				right: sp[4],
				bottom: sp[2],
				left: sp[4]
			},
			minHeight: 44,
			shadow: t.style.shadow === "none" ? "none" : t.shadow.sm,
			states: {
				hover: hoverState(t, c, true),
				focus: focusState(t, c),
				active: {
					background: c("primaryActive"),
					scale: hard ? 1 : .98,
					translateY: hard ? 2 : 0
				},
				disabled: {
					background: c("disabled"),
					color: c("onDisabled"),
					shadow: "none",
					opacity: 1
				}
			}
		};
		case "buttonSecondary": return {
			...b,
			background: "transparent",
			color: c("link"),
			fontWeight: 600,
			lineHeight: 1.25,
			letterSpacing: t.style.buttonTracking,
			textTransform: t.style.buttonCase,
			textAlign: "center",
			borderWidth: sides(Math.max(1, t.border.width)),
			borderStyle: "solid",
			borderColor: sides(c("link")),
			radius: corners(t.radius.button),
			padding: {
				top: sp[2] - 1,
				right: sp[4] - 1,
				bottom: sp[2] - 1,
				left: sp[4] - 1
			},
			minHeight: 44,
			states: {
				hover: {
					background: c("surfaceAlt"),
					color: c("linkHover"),
					borderColor: c("linkHover")
				},
				focus: focusState(t, c),
				active: { scale: .98 },
				disabled: {
					color: c("onDisabled"),
					borderColor: c("disabled"),
					opacity: 1
				}
			}
		};
		case "link": return {
			...b,
			color: c("link"),
			fontWeight: 500,
			radius: corners(2),
			states: {
				hover: { color: c("linkHover") },
				focus: {
					...focusState(t, c),
					outlineOffset: 2
				},
				active: {},
				disabled: { opacity: .5 }
			}
		};
		case "heading": return {
			...b,
			color: c("text"),
			fontFamily: t.font.heading,
			fontSize: ts["2xl"],
			fontWeight: t.font.headingWeight,
			lineHeight: t.font.headingLineHeight,
			letterSpacing: t.font.headingTracking,
			textTransform: t.font.headingTransform,
			transitionDuration: 0
		};
		case "text": return {
			...b,
			color: c("text"),
			transitionDuration: 0
		};
		case "card": return {
			...b,
			background: c("surface"),
			color: c("text"),
			borderWidth: sides(t.style.shadow === "soft" ? 1 : t.border.width),
			borderStyle: "solid",
			borderColor: sides(hard ? c("text") : c("border")),
			radius: corners(t.radius.lg),
			padding: sides(sp[4]),
			shadow: t.style.shadow === "none" ? "none" : t.shadow.md,
			states: {
				hover: t.style.hover === "lift" ? {
					translateY: -t.style.hoverAmount,
					shadow: t.shadow.lg
				} : {},
				focus: focusState(t, c),
				active: {},
				disabled: {}
			}
		};
		case "input": return {
			...b,
			background: c("field"),
			color: c("text"),
			fontSize: Math.max(16, t.font.size),
			lineHeight: 1.4,
			borderWidth: sides(Math.max(1, Math.min(t.border.width, 2))),
			borderStyle: "solid",
			borderColor: sides(c("borderStrong")),
			radius: corners(t.radius.md),
			padding: {
				top: Math.round(u * 2.5),
				right: u * 3,
				bottom: Math.round(u * 2.5),
				left: u * 3
			},
			minHeight: 44,
			states: {
				hover: { borderColor: c("text") },
				focus: {
					borderColor: c("focus"),
					outlineColor: c("focus"),
					outlineWidth: 2,
					outlineOffset: 1
				},
				active: {},
				disabled: {
					background: c("disabled"),
					color: c("onDisabled"),
					opacity: 1
				}
			}
		};
		case "label": return {
			...b,
			color: c("text"),
			fontSize: Math.max(14, ts.sm),
			fontWeight: 600,
			lineHeight: 1.4,
			transitionDuration: 0
		};
		case "nav": return {
			...b,
			background: c("surface"),
			color: c("text"),
			fontWeight: 500,
			borderWidth: {
				top: 0,
				right: 0,
				bottom: 1,
				left: 0
			},
			borderStyle: "solid",
			borderColor: sides(c("border")),
			padding: {
				top: sp[2],
				right: sp[4],
				bottom: sp[2],
				left: sp[4]
			},
			shadow: t.style.shadow === "soft" ? t.shadow.sm : "none",
			states: {
				hover: { color: c("link") },
				focus: focusState(t, c),
				active: {},
				disabled: {}
			}
		};
		case "footer": return {
			...b,
			background: c("surfaceAlt"),
			color: c("muted"),
			fontSize: Math.max(14, ts.sm),
			borderWidth: {
				top: 1,
				right: 0,
				bottom: 0,
				left: 0
			},
			borderStyle: "solid",
			borderColor: sides(c("border")),
			padding: {
				top: sp[5],
				right: sp[4],
				bottom: sp[5],
				left: sp[4]
			},
			transitionDuration: 0,
			states: {
				hover: { color: c("text") },
				focus: focusState(t, c),
				active: {},
				disabled: {}
			}
		};
	}
}
/** Flattens an object into dotted paths (leaves only). */
function flatten(obj, prefix = "") {
	const out = {};
	if (obj === null || typeof obj !== "object") return out;
	for (const [k, v] of Object.entries(obj)) {
		const p = prefix ? `${prefix}.${k}` : k;
		if (v !== null && typeof v === "object" && !Array.isArray(v)) Object.assign(out, flatten(v, p));
		else out[p] = v;
	}
	return out;
}
function resolveComponents(project, t) {
	const c = (r) => roleVar(project.prefix, r);
	const out = {};
	for (const kind of COMPONENT_KINDS) {
		const source = {};
		let style;
		const seedKind = project.seed.kind;
		if (project.variant === "original" && seedKind === kind) {
			style = seedAsComponent(project, c);
			for (const p of Object.keys(flatten(style))) source[p] = "seed";
		} else if (kind === "formButton") style = JSON.parse(JSON.stringify(out.button.style));
		else style = recipe(kind, t, project.prefix);
		const patch = project.components[kind];
		if (patch) {
			style = applyPatch(style, patch);
			for (const p of Object.keys(patch)) source[p] = "manual";
		}
		out[kind] = {
			kind,
			style,
			source
		};
	}
	return out;
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/themes.ts
/**
* Themes: every theme maps the SAME semantic colour roles, derived by rule from
* the brand tokens. Components only ever reference roles (`var(--ds-color-…)`),
* so light, dark and any named theme cannot contradict each other per component.
*/
var COLOR_ROLES = [
	"background",
	"surface",
	"surfaceAlt",
	"text",
	"muted",
	"border",
	"borderStrong",
	"field",
	"primary",
	"primaryHover",
	"primaryActive",
	"onPrimary",
	"gradientTo",
	"secondary",
	"onSecondary",
	"accent",
	"onAccent",
	"link",
	"linkHover",
	"focus",
	"success",
	"warning",
	"danger",
	"disabled",
	"onDisabled"
];
/** Ensures `fg` against every listed background. */
function ensureAll(fg, bgs, target) {
	let out = fg;
	for (let pass = 0; pass < 3; pass++) {
		for (const bg of bgs) out = ensureContrast(out, bg, target);
		if (bgs.every((bg) => (contrast(out, bg) ?? 0) >= target)) break;
	}
	return out;
}
/** The colour roles the designed seed component pins in the light theme. */
function seedRoles(seed, tokens) {
	const s = seed.style;
	const out = {};
	const ok = (c) => !!c && !!parseColor(c) && parseColor(c).a > 0;
	const brand = normalizeColor(seedBrandColor(seed));
	const brandUnchanged = normalizeColor(tokens.color.primary) === brand;
	switch (seed.kind) {
		case "button":
			if (brandUnchanged && ok(s.background) && normalizeColor(s.background) === brand) {
				if (ok(s.color)) out.onPrimary = normalizeColor(s.color);
				if (ok(s.states.hover.background)) out.primaryHover = normalizeColor(s.states.hover.background);
				if (ok(s.states.active.background)) out.primaryActive = normalizeColor(s.states.active.background);
				if (ok(s.gradientTo)) out.gradientTo = normalizeColor(s.gradientTo);
			}
			if (ok(s.states.focus.outlineColor)) out.focus = normalizeColor(s.states.focus.outlineColor);
			break;
		case "card":
			if (ok(s.background)) out.surface = normalizeColor(s.background);
			if (ok(s.color)) out.text = normalizeColor(s.color);
			if (ok(s.borderColor.top) && s.borderWidth.top > 0) out.border = normalizeColor(s.borderColor.top);
			break;
		case "input":
			if (ok(s.background)) out.field = normalizeColor(s.background);
			if (ok(s.color)) out.text = normalizeColor(s.color);
			if (ok(s.borderColor.top)) out.borderStrong = normalizeColor(s.borderColor.top);
			if (ok(s.states.focus.outlineColor)) out.focus = normalizeColor(s.states.focus.outlineColor);
			break;
		case "link":
			if (brandUnchanged && ok(s.color)) out.link = normalizeColor(s.color);
			if (brandUnchanged && ok(s.states.hover.color)) out.linkHover = normalizeColor(s.states.hover.color);
	}
	return out;
}
/** Rule-based colours for one theme, before seed pins and manual overrides. */
function deriveRoles(t, base, more, hasGradient) {
	const h = t.color.neutralHue;
	const nc = t.color.neutralChroma;
	const n = (l, c = nc) => oklch(l, c, h);
	const dark = base === "dark";
	const background = dark ? n(more ? .12 : .18, nc * 1.5) : n(more ? 1 : .985);
	const surface = dark ? n(more ? .16 : .22, nc * 1.5) : n(1, 0);
	const surfaceAlt = dark ? n(more ? .2 : .26, nc * 1.5) : n(more ? .95 : .96);
	const grounds = [
		background,
		surface,
		surfaceAlt
	];
	const text = dark ? n(more ? .99 : .94, nc) : n(more ? .12 : .22, nc * 2);
	const textTarget = more ? 7 : 4.5;
	const muted = ensureAll(dark ? n(.74) : n(.5), grounds, textTarget);
	const borderStrong = ensureAll(dark ? n(.5) : n(.62), grounds, more ? 4.5 : 3);
	const border = more ? borderStrong : dark ? n(.32, nc * 1.5) : n(.9);
	const uiTarget = more ? 4.5 : 3;
	const brand = (c) => dark || more ? ensureAll(c, [background, surface], uiTarget) : c;
	const primary = brand(t.color.primary);
	const step = dark ? .06 : -.06;
	const secondary = brand(t.color.secondary);
	const accent = brand(t.color.accent);
	const link = ensureAll(t.color.primary, grounds, more ? 7 : 4.5);
	const gradientTo = hasGradient ? brand(shiftLightness(t.color.primary, dark ? .1 : -.1)) : primary;
	const sem = (l, c, hue) => ensureAll(oklch(l, c, hue), grounds, textTarget);
	return {
		background,
		surface,
		surfaceAlt,
		text,
		muted,
		border,
		borderStrong,
		field: dark ? surfaceAlt : surface,
		primary,
		primaryHover: stateFill(primary, step, readableOn(primary)),
		primaryActive: stateFill(primary, step * 1.8, readableOn(primary)),
		onPrimary: readableOn(primary),
		gradientTo,
		secondary,
		onSecondary: readableOn(secondary),
		accent,
		onAccent: readableOn(accent),
		link,
		linkHover: ensureAll(shiftLightness(link, dark ? .08 : -.08), grounds, more ? 7 : 4.5),
		focus: ensureAll(t.color.primary, [background, surface], more ? 4.5 : 3),
		success: sem(dark ? .75 : .5, .14, 150),
		warning: sem(dark ? .8 : .52, .13, 70),
		danger: sem(dark ? .72 : .52, .19, 27),
		disabled: dark ? n(.3) : n(.92),
		onDisabled: dark ? n(.62) : n(.52)
	};
}
/**
* A hover/active fill that keeps the button text readable: shifted the
* preferred way if that still gives 4.5:1, else the other way, else whichever
* of the two reads better.
*/
function stateFill(fill, step, text) {
	const preferred = shiftLightness(fill, step);
	if ((contrast(text, preferred) ?? 0) >= 4.5) return preferred;
	const other = shiftLightness(fill, -step);
	return (contrast(text, other) ?? 0) > (contrast(text, preferred) ?? 0) ? other : preferred;
}
function resolveTheme(project, tokens, def) {
	const more = def.contrast === "more";
	const hasGradient = !!project.seed.style.gradientTo && project.seed.kind === "button";
	const colors = deriveRoles(tokens, def.base, more, hasGradient);
	const source = Object.fromEntries(COLOR_ROLES.map((r) => [r, "derived"]));
	if (!more) {
		const prefix = def.base === "light" ? "role." : "role.dark.";
		for (const v of project.imported?.values ?? []) {
			if (!v.path.startsWith(prefix)) continue;
			const role = v.path.slice(prefix.length);
			if (role.includes(".") || !COLOR_ROLES.includes(role) || typeof v.value !== "string" || !parseColor(v.value)) continue;
			colors[role] = normalizeColor(v.value);
			source[role] = "imported";
		}
	}
	if (def.base === "light" && !more) for (const [role, value] of Object.entries(seedRoles(project.seed, tokens))) {
		colors[role] = value;
		source[role] = "seed";
	}
	for (const [role, value] of Object.entries(def.overrides)) if (COLOR_ROLES.includes(role) && parseColor(value)) {
		colors[role] = normalizeColor(value);
		source[role] = "manual";
	}
	return {
		def,
		colors,
		source
	};
}
function resolveThemes(project, tokens) {
	return project.themes.map((def) => resolveTheme(project, tokens, def));
}
/** The theme that `prefers-color-scheme` should pick for a base, if any. */
function autoTheme(themes, base) {
	return themes.find((t) => t.def.id === base && t.def.contrast === "normal") ?? themes.find((t) => t.def.base === base && t.def.contrast === "normal");
}
function contrastTheme(themes, base) {
	return themes.find((t) => t.def.base === base && t.def.contrast === "more");
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/css.ts
/**
* The CSS emitter. Produces the design system's stylesheet from a resolved
* project. Preview and export use this same function; the preview only asks
* for two extras (state-simulation classes and a scaffold for its demo pages),
* it never gets different component rules.
*
* Structure (lowest priority first):
*
*   @layer ds-tokens, ds-base, ds-imported, ds-components;
*   …custom CSS last and unlayered, so it beats every generated rule.
*/
var kebab$1 = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
var r4 = (n) => Math.round(n * 1e4) / 1e4;
var rem = (px) => px === 0 ? "0" : `${r4(px / 16)}rem`;
var px = (n) => n === 0 ? "0" : `${r4(n)}px`;
/**
* Makes a user-supplied value safe to place inside a declaration: it cannot
* close the block, start a new rule or break out of a `<style>` element.
*/
function safeValue(v) {
	return v.replace(/[;{}<>\\\n\r]/g, " ").replace(/\s+/g, " ").trim();
}
/**
* Neutralises the legacy script vectors CSS once had (IE `expression()`,
* `behavior`, `-moz-binding`, `javascript:` URLs) and makes the text safe to
* inline into a `<style>` element. Applied to every CSS the user brings.
*/
function sanitizeCss(css) {
	return css.replace(/expression\s*\(/gi, "invalid(").replace(/-moz-binding\s*:/gi, "-invalid-binding:").replace(/\bbehavior\s*:/gi, "-invalid-behavior:").replace(/javascript\s*:/gi, "invalid:").replace(/</g, "\\3c ");
}
function fluid(size, base, on) {
	if (!on || size <= base * 1.15) return rem(size);
	const max = size;
	const min = Math.max(base, size * .72);
	const slope = (max - min) / 920;
	const intercept = min - slope * 360;
	return `clamp(${rem(min)}, ${r4(intercept / 16)}rem + ${r4(slope * 100)}vw, ${rem(max)})`;
}
function tokenDecls(v) {
	const { prefix: p, tokens: t } = v;
	const out = [
		`--${p}-font-body: ${safeValue(t.font.body)};`,
		`--${p}-font-heading: ${safeValue(t.font.heading)};`,
		`--${p}-font-mono: ${safeValue(t.font.mono)};`,
		`--${p}-line-height: ${t.font.lineHeight};`
	];
	for (const [name, size] of Object.entries(v.text)) out.push(`--${p}-text-${name}: ${fluid(size, t.font.size, t.layout.fluid)};`);
	v.space.forEach((s, i) => out.push(`--${p}-space-${i + 1}: ${rem(s)};`));
	out.push(`--${p}-radius-sm: ${px(t.radius.sm)};`, `--${p}-radius-md: ${px(t.radius.md)};`, `--${p}-radius-lg: ${px(t.radius.lg)};`, `--${p}-radius-button: ${t.radius.button >= 999 ? "999px" : px(t.radius.button)};`, `--${p}-border-width: ${px(t.border.width)};`, `--${p}-shadow-sm: ${safeValue(t.shadow.sm)};`, `--${p}-shadow-md: ${safeValue(t.shadow.md)};`, `--${p}-shadow-lg: ${safeValue(t.shadow.lg)};`, `--${p}-duration: ${Math.round(t.motion.duration)}ms;`, `--${p}-easing: ${safeValue(t.motion.easing)};`, `--${p}-container: ${rem(t.layout.container)};`, `--${p}-gutter: ${rem(t.layout.gutter)};`);
	return out;
}
function colorDecls(p, theme) {
	return [...COLOR_ROLES.map((role) => `--${p}-color-${kebab$1(role)}: ${theme.colors[role]};`), `color-scheme: ${theme.def.base};`];
}
var block = (selector, decls, indent = "") => decls.length === 0 ? "" : `${indent}${selector} {\n${decls.map((d) => `${indent}  ${d}`).join("\n")}\n${indent}}\n`;
/** Swaps a literal for the token variable it equals, so exports reuse tokens. */
function sizeVar(v, n, group) {
	const p = v.prefix;
	if (group === "text") {
		for (const [name, size] of Object.entries(v.text)) if (Math.abs(size - n) < .01) return `var(--${p}-text-${name})`;
		return rem(n);
	}
	if (group === "space") {
		const i = v.space.findIndex((s) => Math.abs(s - n) < .01);
		return i >= 0 ? `var(--${p}-space-${i + 1})` : rem(n);
	}
	const r = v.tokens.radius;
	if (n >= 999) return "999px";
	if (n === r.button && n !== 0) return `var(--${p}-radius-button)`;
	if (n === r.md && n !== 0) return `var(--${p}-radius-md)`;
	if (n === r.lg && n !== 0) return `var(--${p}-radius-lg)`;
	if (n === r.sm && n !== 0) return `var(--${p}-radius-sm)`;
	return px(n);
}
function shadowVar(v, s) {
	const t = v.tokens.shadow;
	if (s === t.md && s !== "none") return `var(--${v.prefix}-shadow-md)`;
	if (s === t.sm && s !== "none") return `var(--${v.prefix}-shadow-sm)`;
	if (s === t.lg && s !== "none") return `var(--${v.prefix}-shadow-lg)`;
	return safeValue(s);
}
function fontVar(v, f) {
	if (f === v.tokens.font.body) return `var(--${v.prefix}-font-body)`;
	if (f === v.tokens.font.heading) return `var(--${v.prefix}-font-heading)`;
	if (f === v.tokens.font.mono) return `var(--${v.prefix}-font-mono)`;
	return safeValue(f);
}
var eqSides = (s) => s.top === s.right && s.top === s.bottom && s.top === s.left;
/** Kinds that need explicit resets (native controls carry UA borders/backgrounds). */
var CONTROL_KINDS = /* @__PURE__ */ new Set([
	"button",
	"buttonSecondary",
	"formButton",
	"input",
	"card",
	"nav",
	"footer"
]);
/**
* `fixed` lists value groups the user set by hand (seed or override). Those are
* written as literals: binding a hand-designed 14px corner to `--radius-lg`
* because it happens to match would let a later token edit move it.
*/
function styleDecls(style, kind, v, fixed = /* @__PURE__ */ new Set()) {
	const d = [];
	const size = (n, group, path) => fixed.has(path) ? group === "radius" ? n >= 999 ? "999px" : px(n) : rem(n) : sizeVar(v, n, group);
	const control = CONTROL_KINDS.has(kind);
	const bg = safeValue(style.background);
	if (style.gradientTo) d.push(`background: linear-gradient(${Math.round(style.gradientAngle)}deg, ${bg}, ${safeValue(style.gradientTo)});`);
	else if (bg && (bg !== "transparent" || control)) d.push(`background: ${bg};`);
	if (style.color && style.color !== "inherit") d.push(`color: ${safeValue(style.color)};`);
	d.push(`font-family: ${fixed.has("fontFamily") ? safeValue(style.fontFamily) : fontVar(v, style.fontFamily)};`);
	if (kind !== "link") d.push(`font-size: ${size(style.fontSize, "text", "fontSize")};`);
	d.push(`font-weight: ${Math.round(style.fontWeight)};`);
	if (kind !== "link") d.push(`line-height: ${style.lineHeight};`);
	if (style.letterSpacing) d.push(`letter-spacing: ${r4(style.letterSpacing)}em;`);
	if (style.textTransform !== "none") d.push(`text-transform: ${style.textTransform};`);
	if ([
		"button",
		"buttonSecondary",
		"formButton"
	].includes(kind) || style.textAlign !== "left") d.push(`text-align: ${style.textAlign};`);
	const bw = style.borderWidth;
	const bc = style.borderColor;
	const bs = style.borderStyle;
	if (eqSides(bw) && eqSides(bc)) {
		if (bw.top > 0 && bs !== "none") d.push(`border: ${px(bw.top)} ${bs} ${safeValue(bc.top)};`);
		else if (control) d.push("border: 0;");
	} else {
		if (control) d.push("border: 0;");
		for (const side of [
			"top",
			"right",
			"bottom",
			"left"
		]) if (bw[side] > 0 && bs !== "none") d.push(`border-${side}: ${px(bw[side])} ${bs} ${safeValue(bc[side])};`);
	}
	const rc = style.radius;
	if (rc.tl === rc.tr && rc.tl === rc.br && rc.tl === rc.bl) {
		if (rc.tl > 0 || control) d.push(`border-radius: ${size(rc.tl, "radius", "radius")};`);
	} else d.push(`border-radius: ${[
		rc.tl,
		rc.tr,
		rc.br,
		rc.bl
	].map((n) => size(n, "radius", "radius")).join(" ")};`);
	const pd = style.padding;
	if (pd.top || pd.right || pd.bottom || pd.left || control) {
		const vals = [
			pd.top,
			pd.right,
			pd.bottom,
			pd.left
		].map((n) => size(n, "space", "padding"));
		d.push(`padding: ${vals[0] === vals[2] && vals[1] === vals[3] ? vals[0] === vals[1] ? vals[0] : `${vals[0]} ${vals[1]}` : vals.join(" ")};`);
	}
	if (style.minHeight > 0) d.push(`min-height: ${px(style.minHeight)};`);
	if (style.shadow && style.shadow !== "none") d.push(`box-shadow: ${fixed.has("shadow") ? safeValue(style.shadow) : shadowVar(v, style.shadow)};`);
	else if (control) d.push("box-shadow: none;");
	if (style.textShadow) d.push(`text-shadow: ${safeValue(style.textShadow)};`);
	if (style.filter) d.push(`filter: ${safeValue(style.filter)};`);
	if (style.opacity < 1) d.push(`opacity: ${r4(style.opacity)};`);
	if (style.transitionDuration > 0) {
		const dur = Math.round(style.transitionDuration) === Math.round(v.tokens.motion.duration) ? `var(--${v.prefix}-duration)` : `${Math.round(style.transitionDuration)}ms`;
		const ease = style.transitionEasing === v.tokens.motion.easing ? `var(--${v.prefix}-easing)` : safeValue(style.transitionEasing);
		d.push(`transition: ${[
			"background-color",
			"color",
			"border-color",
			"box-shadow",
			"transform",
			"opacity",
			"text-decoration-color"
		].map((prop) => `${prop} ${dur} ${ease}`).join(", ")};`);
	}
	if (style.animation !== "none") {
		const iter = style.animation === "pulse" ? "infinite" : "1";
		d.push(`animation: ${v.prefix}-${style.animation} ${style.animation === "pulse" ? 1600 : 400}ms ${safeValue(style.transitionEasing)} ${iter} both;`);
	}
	return d;
}
function stateDecls(s, v, dashed = false) {
	const d = [];
	if (s.background) d.push(`background: ${safeValue(s.background)};`);
	if (s.color) d.push(`color: ${safeValue(s.color)};`);
	if (s.borderColor) d.push(`border-color: ${safeValue(s.borderColor)};`);
	if (s.shadow) d.push(`box-shadow: ${shadowVar(v, s.shadow)};`);
	const parts = [];
	if (s.translateY) parts.push(`translateY(${px(s.translateY)})`);
	if (s.scale !== void 0 && s.scale !== 1) parts.push(`scale(${r4(s.scale)})`);
	if (parts.length) d.push(`transform: ${parts.join(" ")};`);
	if (s.opacity !== void 0 && s.opacity !== 1) d.push(`opacity: ${r4(s.opacity)};`);
	if (s.outlineWidth !== void 0 && s.outlineWidth > 0) {
		d.push(`outline: ${px(s.outlineWidth)} ${dashed ? "dashed" : "solid"} ${safeValue(s.outlineColor ?? "currentColor")};`);
		d.push(`outline-offset: ${px(s.outlineOffset ?? 2)};`);
	}
	return d;
}
/** Extra structural declarations per component class (not user-tunable). */
function structural(kind, v) {
	switch (kind) {
		case "button":
		case "formButton":
		case "buttonSecondary": return [
			"display: inline-flex;",
			"align-items: center;",
			"justify-content: center;",
			"gap: 0.5em;",
			"cursor: pointer;",
			"text-decoration: none;",
			"-webkit-appearance: none;",
			"appearance: none;",
			"max-width: 100%;"
		];
		case "link": return [
			"text-decoration: underline;",
			"text-decoration-thickness: 1px;",
			"text-underline-offset: 0.18em;",
			"cursor: pointer;"
		];
		case "heading": return ["margin: 0;", "text-wrap: balance;"];
		case "text": return ["margin: 0;", "max-width: 68ch;"];
		case "card": return ["display: block;", "min-width: 0;"];
		case "input": return [
			"display: block;",
			"width: 100%;",
			"max-width: 100%;",
			"font: inherit;",
			`font-size: ${sizeVar(v, v.text.base, "text")};`
		];
		case "label": return ["display: block;"];
		case "nav": return [
			"display: flex;",
			"flex-wrap: wrap;",
			"align-items: center;",
			"justify-content: space-between;",
			`gap: var(--${v.prefix}-space-3);`
		];
		case "footer": return ["display: block;"];
	}
}
function componentSelector(prefix, kind) {
	const cls = `.${componentClass(prefix, kind)}`;
	return kind === "buttonSecondary" ? `.${prefix}-btn${cls}` : cls;
}
function withStates(sel, pseudo, sim) {
	return sim ? `${sel}${pseudo}, ${sel}${sim}` : `${sel}${pseudo}`;
}
function componentCss(r, kind, v, sim) {
	const p = r.project.prefix;
	const comp = r.components[kind];
	const s = comp.style;
	const sel = componentSelector(p, kind);
	const dashed = r.tokens.style.focus === "dashed";
	const stateSel = kind === "nav" ? `.${p}-nav__link` : kind === "footer" ? `.${p}-footer a` : sel;
	const fixed = new Set(Object.keys(comp.source).map((k) => k.split(".")[0]));
	let out = block(sel, [...structural(kind, v), ...styleDecls(s, kind, v, fixed)]);
	if (kind === "input") out += block(`${sel}::placeholder`, [`color: var(--${p}-color-muted);`, "opacity: 1;"]);
	if (kind === "link") out += block(withStates(sel, ":hover", sim ? ".is-hover" : null), ["text-decoration-thickness: 2px;"]);
	const hover = stateDecls(s.states.hover, v);
	if (hover.length) out += block(withStates(stateSel, ":hover", sim ? ".is-hover" : null), hover);
	const focus = stateDecls(s.states.focus, v, dashed);
	if (focus.length) {
		out += block(`${stateSel}:focus`, ["outline: none;"]);
		out += block(withStates(stateSel, ":focus-visible", sim ? ".is-focus" : null), focus);
	}
	const active = stateDecls(s.states.active, v);
	if (active.length) out += block(withStates(stateSel, ":active", sim ? ".is-active" : null), active);
	const disabled = stateDecls(s.states.disabled, v);
	if (disabled.length && ![
		"heading",
		"text",
		"label",
		"nav",
		"footer",
		"card"
	].includes(kind)) {
		const dsel = `${sel}:disabled, ${sel}[aria-disabled="true"]${sim ? `, ${sel}.is-disabled` : ""}`;
		out += block(dsel, [
			...disabled,
			"cursor: not-allowed;",
			"transform: none;"
		]);
	}
	return out;
}
function partsCss(r, v) {
	const p = r.project.prefix;
	const t = r.tokens;
	const heading = r.components.heading.style;
	const bp = rem(t.layout.navBreakpoint);
	let out = "";
	for (const [h, step] of [
		["h1", "3xl"],
		["h2", "2xl"],
		["h3", "xl"],
		["h4", "lg"]
	]) out += block(`.${p}-${h}`, [`font-size: var(--${p}-text-${step});`]);
	out += block(`.${p}-text--muted`, [`color: var(--${p}-color-muted);`]);
	out += block(`.${p}-lead`, [`font-size: var(--${p}-text-lg);`]);
	out += block(`.${p}-card__title`, [
		"margin: 0 0 0.5em;",
		`font-family: ${fontVar(v, heading.fontFamily)};`,
		`font-weight: ${Math.round(heading.fontWeight)};`,
		`font-size: var(--${p}-text-lg);`,
		`line-height: ${heading.lineHeight};`
	]);
	out += block(`.${p}-nav__brand`, [
		`font-family: var(--${p}-font-heading);`,
		"font-weight: 700;",
		`font-size: var(--${p}-text-lg);`,
		"color: inherit;",
		"text-decoration: none;"
	]);
	out += block(`.${p}-nav__links`, [
		"display: flex;",
		"flex-wrap: wrap;",
		`gap: var(--${p}-space-1);`,
		"margin: 0;",
		"padding: 0;",
		"list-style: none;"
	]);
	out += block(`.${p}-nav__link`, [
		"display: inline-flex;",
		"align-items: center;",
		"min-height: 44px;",
		`padding: 0 var(--${p}-space-3);`,
		`border-radius: var(--${p}-radius-sm);`,
		"color: inherit;",
		"text-decoration: none;",
		`transition: color var(--${p}-duration) var(--${p}-easing), background-color var(--${p}-duration) var(--${p}-easing);`
	]);
	out += block(`.${p}-nav__link[aria-current="page"]`, [
		`color: var(--${p}-color-link);`,
		"font-weight: 600;",
		"text-decoration: underline;",
		"text-underline-offset: 0.3em;"
	]);
	out += block(`.${p}-nav__toggle`, [
		"display: none;",
		"width: 44px;",
		"height: 44px;",
		`border-radius: var(--${p}-radius-sm);`,
		`background: linear-gradient(currentColor, currentColor) center calc(50% - 7px) / 22px 2px no-repeat, linear-gradient(currentColor, currentColor) center / 22px 2px no-repeat, linear-gradient(currentColor, currentColor) center calc(50% + 7px) / 22px 2px no-repeat;`,
		"border: 0;",
		"color: inherit;"
	]);
	out += block(`.${p}-footer__links`, [
		"display: flex;",
		"flex-wrap: wrap;",
		`gap: var(--${p}-space-2) var(--${p}-space-4);`,
		"margin: 0;",
		"padding: 0;",
		"list-style: none;"
	]);
	out += block(`.${p}-footer a`, ["color: inherit;", "text-underline-offset: 0.18em;"]);
	out += `@media (max-width: ${bp}) {\n` + block(`.${p}-nav__toggle`, ["display: inline-block;"], "  ") + block(`.${p}-nav__links`, [
		"order: 3;",
		"width: 100%;",
		"flex-wrap: nowrap;",
		"overflow-x: auto;",
		"scrollbar-width: thin;"
	], "  ") + "}\n";
	out += `@media (max-width: 30em) {\n` + block(`.${p}-submit, .${p}-form .${p}-btn`, ["width: 100%;"], "  ") + "}\n";
	return out;
}
function baseCss(r) {
	const p = r.project.prefix;
	let out = "";
	out += block(`.${p}-body`, [
		"margin: 0;",
		`background: var(--${p}-color-background);`,
		`color: var(--${p}-color-text);`,
		`font-family: var(--${p}-font-body);`,
		`font-size: var(--${p}-text-base);`,
		`font-weight: ${r.tokens.font.bodyWeight};`,
		`line-height: var(--${p}-line-height);`,
		"-webkit-text-size-adjust: 100%;",
		"text-rendering: optimizeLegibility;"
	]);
	out += block(`.${p}-body *, .${p}-body *::before, .${p}-body *::after`, ["box-sizing: border-box;"]);
	out += block(`.${p}-body ::selection`, [`background: color-mix(in srgb, var(--${p}-color-primary) 25%, transparent);`]);
	out += block(`.${p}-container`, [`width: min(100% - 2 * var(--${p}-gutter), var(--${p}-container));`, "margin-inline: auto;"]);
	out += block(`.${p}-section`, [`padding-block: clamp(var(--${p}-space-6), 8vw, var(--${p}-space-8));`]);
	out += block(`.${p}-stack > * + *`, [`margin-block-start: var(--${p}-space-3);`]);
	out += block(`.${p}-grid`, [
		"display: grid;",
		`gap: var(--${p}-space-4);`,
		"grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));"
	]);
	out += block(`.${p}-form`, ["display: grid;", `gap: var(--${p}-space-4);`]);
	out += block(`.${p}-field`, ["display: grid;", `gap: var(--${p}-space-1);`]);
	out += block(`.${p}-row`, [
		"display: flex;",
		"flex-wrap: wrap;",
		"align-items: center;",
		`gap: var(--${p}-space-3);`
	]);
	out += "@media (prefers-reduced-motion: reduce) {\n" + block(`.${p}-body *, .${p}-body *::before, .${p}-body *::after`, [
		"animation-duration: 0.01ms !important;",
		"animation-iteration-count: 1 !important;",
		"transition-duration: 0.01ms !important;",
		"scroll-behavior: auto !important;"
	], "  ") + "}\n";
	return out;
}
function keyframes(r) {
	const p = r.project.prefix;
	const used = new Set(COMPONENT_KINDS.map((k) => r.components[k].style.animation).filter((a) => a !== "none"));
	let out = "";
	if (used.has("fade-in")) out += `@keyframes ${p}-fade-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n`;
	if (used.has("slide-up")) out += `@keyframes ${p}-slide-up {\n  from { opacity: 0; transform: translateY(8px); }\n  to { opacity: 1; transform: none; }\n}\n`;
	if (used.has("pulse")) out += `@keyframes ${p}-pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.04); }\n}\n`;
	return out;
}
var indent = (css) => css.split("\n").map((l) => l ? `  ${l}` : l).join("\n");
function vars(r) {
	return {
		prefix: r.project.prefix,
		tokens: r.tokens,
		text: typeScale(r.tokens),
		space: spaceScale(r.tokens)
	};
}
/** Token custom properties for every theme (used alone by the "variables" export). */
function tokensCss(r) {
	const p = r.project.prefix;
	const v = vars(r);
	const light = autoTheme(r.themes, "light") ?? r.themes[0];
	const dark = autoTheme(r.themes, "dark");
	let out = "";
	out += block(":root", [...tokenDecls(v), ...light ? colorDecls(p, light) : []]);
	if (dark) out += `@media (prefers-color-scheme: dark) {\n${block(":root:not([data-theme])", colorDecls(p, dark), "  ")}}\n`;
	const lightMore = contrastTheme(r.themes, "light");
	const darkMore = contrastTheme(r.themes, "dark");
	if (lightMore) out += `@media (prefers-contrast: more) {\n${block(":root:not([data-theme])", colorDecls(p, lightMore), "  ")}}\n`;
	if (darkMore) out += `@media (prefers-contrast: more) and (prefers-color-scheme: dark) {\n${block(":root:not([data-theme])", colorDecls(p, darkMore), "  ")}}\n`;
	for (const theme of r.themes) out += block(`[data-theme="${theme.def.id}"]`, colorDecls(p, theme));
	return out;
}
/** CSS of one component (with its states), for the "copy this component" view. */
function singleComponentCss(r, kind) {
	return componentCss(r, kind, vars(r), false);
}
/** Every component rule, their parts, the responsive rules and keyframes. */
function componentsCss(r, simulateStates = false) {
	const v = vars(r);
	let out = "";
	for (const kind of COMPONENT_KINDS) out += componentCss(r, kind, v, simulateStates);
	out += partsCss(r, v);
	out += keyframes(r);
	return out;
}
function emitCss(r, opts = {}) {
	const p = r.project.prefix;
	const sim = opts.simulateStates === true;
	const head = opts.header === false ? "" : `/*\n * ${safeValue(r.project.name).replace(/\*\//g, "")} — Designsystem\n * Erzeugt mit dem Designsystem-Studio (tools.tracht-digital.de).\n * Reines CSS, keine Abhängigkeiten. Themes: ${r.themes.map((t) => t.def.id).join(", ")}.\n * Theme wählen: <html data-theme="…">, ohne Attribut folgt es dem System.\n */\n`;
	const components = componentsCss(r, sim);
	let css = head;
	css += `@layer ${p}-tokens, ${p}-base, ${p}-imported, ${p}-components;\n\n`;
	css += `@layer ${p}-tokens {\n${indent(tokensCss(r))}}\n\n`;
	css += `@layer ${p}-base {\n${indent(baseCss(r))}}\n\n`;
	const preserved = opts.includeImported === false ? "" : (r.project.imported?.preservedCss ?? "").trim();
	if (preserved) css += `@layer ${p}-imported {\n${indent(sanitizeCss(preserved))}\n}\n\n`;
	css += `@layer ${p}-components {\n${indent(components)}}\n`;
	const custom = opts.includeCustom === false ? "" : r.project.customCss.trim();
	if (custom) css += `\n/* Eigene Regeln (höchste Priorität) */\n${sanitizeCss(custom)}\n`;
	return css;
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/previews.ts
/**
* The three preview views (components, panel, landing page) plus the
* single-component view of the wizard.
*
* Preview markup is purely visual: buttons are `type="button"`, links point at
* `#`, forms carry no action, nothing has a handler — and the frame that shows
* it has no `allow-scripts` and no `allow-forms`. Layout scaffolding that only
* the demo pages need (sidebar grid, table, hero) uses `pv-` classes built from
* the system's own tokens; it is not part of the exported component library.
*/
var PREVIEW_VIEWS = [
	"components",
	"panel",
	"landing"
];
var DEVICES = {
	desktop: 1280,
	tablet: 820,
	phone: 390
};
var T = {
	de: {
		brand: "Musterfirma",
		nav: [
			"Start",
			"Leistungen",
			"Über uns",
			"Kontakt"
		],
		h1: "Überschrift erster Ordnung",
		h2: "Überschrift zweiter Ordnung",
		h3: "Überschrift dritter Ordnung",
		h4: "Überschrift vierter Ordnung",
		lead: "Ein einleitender Absatz fasst zusammen, worum es auf dieser Seite geht.",
		body: "Fließtext für längere Abschnitte. Er sollte bequem lesbar sein, mit ausreichender Zeilenhöhe und einem ruhigen Kontrast.",
		muted: "Ergänzender, gedämpfter Hinweistext.",
		link: "Ein Textlink",
		primary: "Jetzt anfragen",
		secondary: "Mehr erfahren",
		states: {
			normal: "Normal",
			hover: "Hover",
			focus: "Fokus",
			active: "Aktiv",
			disabled: "Deaktiviert"
		},
		cardTitle: "Kartentitel",
		cardText: "Karten bündeln zusammengehörige Inhalte und Aktionen.",
		label: "E-Mail-Adresse",
		placeholder: "name@beispiel.de",
		message: "Nachricht",
		choose: "Bitte wählen",
		send: "Absenden",
		footer: "© 2026 Musterfirma · Alle Rechte vorbehalten",
		footerLinks: [
			"Impressum",
			"Datenschutz",
			"Kontakt"
		],
		typography: "Typografie",
		buttons: "Buttons und Links",
		cards: "Karten",
		forms: "Formulare",
		navFooter: "Navigation und Footer",
		colors: "Farbrollen",
		dashboard: "Übersicht",
		side: [
			"Übersicht",
			"Projekte",
			"Kunden",
			"Rechnungen",
			"Einstellungen"
		],
		stats: [
			["Offene Anfragen", "24"],
			["Umsatz (Monat)", "12.480 €"],
			["Zufriedenheit", "96 %"]
		],
		table: [
			"Kunde",
			"Status",
			"Betrag"
		],
		rows: [
			[
				"Bäckerei Krause",
				"Bezahlt",
				"480 €"
			],
			[
				"Elektro Nord",
				"Offen",
				"1.250 €"
			],
			[
				"Studio Weiß",
				"Entwurf",
				"320 €"
			]
		],
		quick: "Schnell erfassen",
		heroEyebrow: "Digitale Maßarbeit",
		heroTitle: "Websites, die zu Ihrem Betrieb passen",
		heroText: "Klar gestaltet, schnell geladen und einfach zu pflegen — für kleine und mittlere Unternehmen.",
		services: "Unsere Leistungen",
		serviceItems: [
			["Webdesign", "Individuelle Gestaltung, die Ihre Marke trägt."],
			["Pflege", "Updates, Sicherheit und Inhalte aus einer Hand."],
			["Beratung", "Ehrliche Einschätzung, was Ihr Projekt braucht."]
		],
		contact: "Kontakt aufnehmen",
		contactText: "Schreiben Sie uns — wir melden uns innerhalb eines Werktags.",
		name: "Name"
	},
	en: {
		brand: "Example Ltd",
		nav: [
			"Home",
			"Services",
			"About",
			"Contact"
		],
		h1: "First-level heading",
		h2: "Second-level heading",
		h3: "Third-level heading",
		h4: "Fourth-level heading",
		lead: "An introductory paragraph sums up what this page is about.",
		body: "Body copy for longer sections. It should read comfortably, with enough line height and calm contrast.",
		muted: "Supplementary, muted hint text.",
		link: "A text link",
		primary: "Get in touch",
		secondary: "Learn more",
		states: {
			normal: "Normal",
			hover: "Hover",
			focus: "Focus",
			active: "Active",
			disabled: "Disabled"
		},
		cardTitle: "Card title",
		cardText: "Cards group related content and actions.",
		label: "Email address",
		placeholder: "name@example.com",
		message: "Message",
		choose: "Please choose",
		send: "Send",
		footer: "© 2026 Example Ltd · All rights reserved",
		footerLinks: [
			"Imprint",
			"Privacy",
			"Contact"
		],
		typography: "Typography",
		buttons: "Buttons and links",
		cards: "Cards",
		forms: "Forms",
		navFooter: "Navigation and footer",
		colors: "Colour roles",
		dashboard: "Overview",
		side: [
			"Overview",
			"Projects",
			"Customers",
			"Invoices",
			"Settings"
		],
		stats: [
			["Open requests", "24"],
			["Revenue (month)", "€12,480"],
			["Satisfaction", "96 %"]
		],
		table: [
			"Customer",
			"Status",
			"Amount"
		],
		rows: [
			[
				"Krause Bakery",
				"Paid",
				"€480"
			],
			[
				"Nord Electrics",
				"Open",
				"€1,250"
			],
			[
				"Studio White",
				"Draft",
				"€320"
			]
		],
		quick: "Quick entry",
		heroEyebrow: "Made to measure",
		heroTitle: "Websites that fit your business",
		heroText: "Clearly designed, fast to load and easy to maintain — for small and medium-sized businesses.",
		services: "Our services",
		serviceItems: [
			["Web design", "Individual design that carries your brand."],
			["Maintenance", "Updates, security and content from one source."],
			["Consulting", "An honest view of what your project needs."]
		],
		contact: "Get in touch",
		contactText: "Write to us — we reply within one working day.",
		name: "Name"
	}
};
var esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function k(p, kind) {
	return componentClass(p, kind);
}
var STATES = [
	"normal",
	"hover",
	"focus",
	"active",
	"disabled"
];
var stateClass = (s) => s === "normal" ? "" : ` is-${s}`;
function nav(p, t) {
	return `<nav class="${k(p, "nav")}" aria-label="Hauptnavigation">
  <a class="${p}-nav__brand" href="#">${esc(t.brand)}</a>
  <button type="button" class="${p}-nav__toggle" aria-label="Menü"></button>
  <ul class="${p}-nav__links">${t.nav.map((n, i) => `<li><a class="${p}-nav__link" href="#"${i === 0 ? " aria-current=\"page\"" : ""}>${esc(n)}</a></li>`).join("")}</ul>
</nav>`;
}
function footer(p, t) {
	return `<footer class="${k(p, "footer")}"><div class="${p}-container ${p}-row" style="justify-content: space-between">
  <span>${esc(t.footer)}</span>
  <ul class="${p}-footer__links">${t.footerLinks.map((l) => `<li><a href="#">${esc(l)}</a></li>`).join("")}</ul>
</div></footer>`;
}
function field(p, t, id, extra = "") {
	return `<div class="${p}-field"><label class="${k(p, "label")}" for="${id}">${esc(t.label)}</label><input class="${k(p, "input")}${extra}" id="${id}" type="email" placeholder="${esc(t.placeholder)}"${extra.includes("is-disabled") ? " disabled" : ""}></div>`;
}
/** The single seed component, shown in all five states (wizard view). */
function seedBody(prefix, kind, lang) {
	const t = T[lang];
	const p = prefix;
	const cell = (s, inner) => `<figure class="pv-state"><div class="pv-state__stage">${inner}</div><figcaption>${esc(t.states[s])}</figcaption></figure>`;
	return `<main class="pv-seed">${STATES.map((s) => {
		switch (kind) {
			case "button": return cell(s, `<button type="button" class="${k(p, "button")}${stateClass(s)}"${s === "disabled" ? " disabled" : ""}>${esc(t.primary)}</button>`);
			case "link": return cell(s, `<a class="${k(p, "link")}${stateClass(s)}" href="#">${esc(t.link)}</a>`);
			case "input": return cell(s, `<input class="${k(p, "input")}${stateClass(s)}" type="text" placeholder="${esc(t.placeholder)}"${s === "disabled" ? " disabled" : ""}>`);
			case "card": return s === "disabled" || s === "active" ? "" : cell(s, `<article class="${k(p, "card")}${stateClass(s)}" tabindex="-1"><h3 class="${p}-card__title">${esc(t.cardTitle)}</h3><p class="${k(p, "text")}">${esc(t.cardText)}</p></article>`);
		}
	}).join("")}</main>`;
}
function componentsBody(p, t, simulate = true) {
	const shown = simulate ? STATES : ["normal", "disabled"];
	const states = (render) => `<div class="pv-states">${shown.map((s) => `<figure class="pv-state"><div class="pv-state__stage">${render(s)}</div><figcaption>${esc(t.states[s])}</figcaption></figure>`).join("")}</div>`;
	return `${nav(p, t)}
<main class="${p}-container ${p}-section pv-gallery">
  <section class="${p}-stack"><p class="pv-eyebrow">${esc(t.typography)}</p>
    <h1 class="${k(p, "heading")} ${p}-h1">${esc(t.h1)}</h1>
    <h2 class="${k(p, "heading")} ${p}-h2">${esc(t.h2)}</h2>
    <h3 class="${k(p, "heading")} ${p}-h3">${esc(t.h3)}</h3>
    <h4 class="${k(p, "heading")} ${p}-h4">${esc(t.h4)}</h4>
    <p class="${k(p, "text")} ${p}-lead">${esc(t.lead)}</p>
    <p class="${k(p, "text")}">${esc(t.body)} <a class="${k(p, "link")}" href="#">${esc(t.link)}</a>.</p>
    <p class="${k(p, "text")} ${p}-text--muted">${esc(t.muted)}</p>
  </section>
  <section class="${p}-stack"><p class="pv-eyebrow">${esc(t.buttons)}</p>
    ${states((s) => `<button type="button" class="${k(p, "button")}${stateClass(s)}"${s === "disabled" ? " disabled" : ""}>${esc(t.primary)}</button>`)}
    ${states((s) => `<button type="button" class="${p}-btn ${k(p, "buttonSecondary")}${stateClass(s)}"${s === "disabled" ? " disabled" : ""}>${esc(t.secondary)}</button>`)}
    ${states((s) => `<a class="${k(p, "link")}${stateClass(s)}" href="#">${esc(t.link)}</a>`)}
  </section>
  <section class="${p}-stack"><p class="pv-eyebrow">${esc(t.cards)}</p>
    <div class="${p}-grid">${[
		0,
		1,
		2
	].map((i) => `<article class="${k(p, "card")}${i === 1 && simulate ? " is-hover" : ""}"><h3 class="${p}-card__title">${esc(t.cardTitle)}</h3><p class="${k(p, "text")}">${esc(t.cardText)}</p><p class="pv-card-actions"><a class="${k(p, "link")}" href="#">${esc(t.secondary)}</a></p></article>`).join("")}</div>
  </section>
  <section class="${p}-stack"><p class="pv-eyebrow">${esc(t.forms)}</p>
    <form class="${p}-form pv-form">
      ${states((s) => `<input class="${k(p, "input")}${stateClass(s)}" type="text" aria-label="${esc(t.label)}" placeholder="${esc(t.placeholder)}"${s === "disabled" ? " disabled" : ""}>`)}
      ${field(p, t, "pv-mail")}
      <div class="${p}-field"><label class="${k(p, "label")}" for="pv-msg">${esc(t.message)}</label><textarea class="${k(p, "input")}" id="pv-msg" rows="3"></textarea></div>
      <div class="${p}-field"><label class="${k(p, "label")}" for="pv-sel">${esc(t.choose)}</label><select class="${k(p, "input")}" id="pv-sel"><option>${esc(t.choose)}</option></select></div>
      <div><button type="button" class="${p}-btn ${k(p, "formButton")}">${esc(t.send)}</button></div>
    </form>
  </section>
  <section class="${p}-stack"><p class="pv-eyebrow">${esc(t.colors)}</p>
    <div class="pv-swatches">${COLOR_ROLES.map((r) => `<div class="pv-swatch"><span style="background: var(--${p}-color-${r.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)})"></span><code>${r}</code></div>`).join("")}</div>
  </section>
</main>
${footer(p, t)}`;
}
function panelBody(p, t) {
	return `<div class="pv-app">
  <aside class="pv-side"><a class="${p}-nav__brand" href="#">${esc(t.brand)}</a>
    <ul class="pv-side__links">${t.side.map((s, i) => `<li><a class="${p}-nav__link" href="#"${i === 0 ? " aria-current=\"page\"" : ""}>${esc(s)}</a></li>`).join("")}</ul>
  </aside>
  <div class="pv-main">
    <header class="${k(p, "nav")}"><span class="${p}-nav__brand">${esc(t.dashboard)}</span><div class="${p}-row"><button type="button" class="${p}-btn ${k(p, "buttonSecondary")}">${esc(t.secondary)}</button><button type="button" class="${k(p, "button")}">${esc(t.primary)}</button></div></header>
    <main class="pv-content ${p}-stack">
      <div class="${p}-grid">${t.stats.map(([label, value]) => `<article class="${k(p, "card")}"><p class="${k(p, "text")} ${p}-text--muted">${esc(label)}</p><p class="pv-stat">${esc(value)}</p></article>`).join("")}</div>
      <div class="pv-split">
        <article class="${k(p, "card")}"><h2 class="${p}-card__title">${esc(t.table[0])}</h2>
          <div class="pv-table-wrap"><table class="pv-table"><thead><tr>${t.table.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
          <tbody>${t.rows.map((r) => `<tr>${r.map((c, i) => `<td>${i === 0 ? `<a class="${k(p, "link")}" href="#">${esc(c)}</a>` : esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
        </article>
        <article class="${k(p, "card")}"><h2 class="${p}-card__title">${esc(t.quick)}</h2>
          <form class="${p}-form">${field(p, t, "pv-panel-mail")}<div><button type="button" class="${p}-btn ${k(p, "formButton")}">${esc(t.send)}</button></div></form>
        </article>
      </div>
    </main>
  </div>
</div>`;
}
function landingBody(p, t) {
	return `${nav(p, t)}
<main>
  <section class="${p}-section pv-hero"><div class="${p}-container ${p}-stack">
    <p class="pv-eyebrow">${esc(t.heroEyebrow)}</p>
    <h1 class="${k(p, "heading")} ${p}-h1">${esc(t.heroTitle)}</h1>
    <p class="${k(p, "text")} ${p}-lead">${esc(t.heroText)}</p>
    <div class="${p}-row"><a class="${k(p, "button")}" href="#">${esc(t.primary)}</a><a class="${p}-btn ${k(p, "buttonSecondary")}" href="#">${esc(t.secondary)}</a></div>
  </div></section>
  <section class="${p}-section pv-band"><div class="${p}-container ${p}-stack">
    <h2 class="${k(p, "heading")} ${p}-h2">${esc(t.services)}</h2>
    <div class="${p}-grid">${t.serviceItems.map(([title, text]) => `<article class="${k(p, "card")}"><h3 class="${p}-card__title">${esc(title)}</h3><p class="${k(p, "text")}">${esc(text)}</p><p class="pv-card-actions"><a class="${k(p, "link")}" href="#">${esc(t.secondary)}</a></p></article>`).join("")}</div>
  </div></section>
  <section class="${p}-section"><div class="${p}-container pv-contact">
    <div class="${p}-stack"><h2 class="${k(p, "heading")} ${p}-h2">${esc(t.contact)}</h2><p class="${k(p, "text")}">${esc(t.contactText)}</p></div>
    <form class="${k(p, "card")} ${p}-form">
      <div class="${p}-field"><label class="${k(p, "label")}" for="pv-name">${esc(t.name)}</label><input class="${k(p, "input")}" id="pv-name" type="text"></div>
      ${field(p, t, "pv-land-mail")}
      <div class="${p}-field"><label class="${k(p, "label")}" for="pv-land-msg">${esc(t.message)}</label><textarea class="${k(p, "input")}" id="pv-land-msg" rows="3"></textarea></div>
      <div><button type="button" class="${p}-btn ${k(p, "formButton")}">${esc(t.send)}</button></div>
    </form>
  </div></section>
</main>
${footer(p, t)}`;
}
/**
* `simulate` adds the `.is-hover`/`.is-focus`/… state rows the preview shows.
* The exported example pages pass false: they demonstrate real states only.
*/
function previewBody(prefix, view, lang, simulate = true) {
	const t = T[lang];
	if (view === "panel") return panelBody(prefix, t);
	if (view === "landing") return landingBody(prefix, t);
	return componentsBody(prefix, t, simulate);
}
/** Layout for the demo pages only — built from the system's tokens. */
function scaffoldCss(p) {
	return `
.pv-eyebrow { margin: 0; font: 600 0.75rem/1.2 var(--${p}-font-mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--${p}-color-muted); }
.pv-gallery { display: grid; gap: var(--${p}-space-7); }
.pv-states { display: flex; flex-wrap: wrap; gap: var(--${p}-space-3); align-items: flex-end; }
.pv-state { margin: 0; display: grid; gap: var(--${p}-space-2); justify-items: start; }
.pv-state figcaption { font: 500 0.75rem/1 var(--${p}-font-mono); color: var(--${p}-color-muted); }
.pv-seed { min-height: 100vh; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; gap: var(--${p}-space-5); padding: var(--${p}-space-5); }
.pv-seed .pv-state__stage { min-width: 12rem; }
.pv-seed .${p}-card { max-width: 18rem; }
.pv-card-actions { margin: var(--${p}-space-3) 0 0; }
.pv-form { max-width: 34rem; }
.pv-swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr)); gap: var(--${p}-space-2); }
.pv-swatch { display: flex; align-items: center; gap: var(--${p}-space-2); font-size: 0.75rem; }
.pv-swatch span { width: 1.75rem; height: 1.75rem; border-radius: var(--${p}-radius-sm); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--${p}-color-text) 18%, transparent); flex: none; }
.pv-swatch code { font-family: var(--${p}-font-mono); overflow-wrap: anywhere; }
.pv-app { display: grid; grid-template-columns: 15rem minmax(0, 1fr); min-height: 100vh; }
.pv-side { background: var(--${p}-color-surface-alt); padding: var(--${p}-space-4); display: grid; align-content: start; gap: var(--${p}-space-4); }
.pv-side__links { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--${p}-space-1); }
.pv-side .${p}-nav__link { width: 100%; }
.pv-main { min-width: 0; }
.pv-content { padding: var(--${p}-space-5); }
.pv-stat { margin: 0; font: 700 var(--${p}-text-2xl)/1.1 var(--${p}-font-heading); }
.pv-split { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: var(--${p}-space-4); }
.pv-table-wrap { overflow-x: auto; }
.pv-table { width: 100%; border-collapse: collapse; font-size: var(--${p}-text-sm); }
.pv-table th, .pv-table td { text-align: left; padding: var(--${p}-space-2) var(--${p}-space-3); border-bottom: 1px solid var(--${p}-color-border); }
.pv-table th { color: var(--${p}-color-muted); font-weight: 600; }
.pv-hero { background: linear-gradient(180deg, var(--${p}-color-surface-alt), var(--${p}-color-background)); }
.pv-band { background: var(--${p}-color-surface-alt); }
.pv-contact { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: var(--${p}-space-6); align-items: start; }
@media (max-width: 52em) {
  .pv-app { grid-template-columns: 1fr; }
  .pv-side { display: none; }
  .pv-split, .pv-contact { grid-template-columns: 1fr; }
}
`;
}
/**
* The complete preview document. The CSP forbids every network load (a
* pasted `url()` or `@import` cannot phone home) and every script.
*/
function previewDocument(opts) {
	const theme = opts.theme ? ` data-theme="${esc(opts.theme)}"` : "";
	return `<!doctype html><html lang="${opts.lang}"${theme}><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src data:">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style id="ds-css">${opts.css}</style><style id="pv-css">${scaffoldCss(opts.prefix)}</style></head>
<body class="${esc(opts.prefix)}-body">${opts.body}</body></html>`;
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/resolve.ts
/**
* One call that turns a project into everything a surface needs. The preview,
* the code view, the accessibility check and every export adapter all go
* through here, so they cannot disagree about what the design is.
*/
function resolveProject(project) {
	const { tokens, source } = resolveTokens(project);
	return {
		project,
		tokens,
		tokenSource: source,
		themes: resolveThemes(project, tokens),
		components: resolveComponents(project, tokens)
	};
}
// node_modules/@tracht-digital-solutions/tds-shared/dist/zip/index.js
var CRC_TABLE = (() => {
	const table = /* @__PURE__ */ new Uint32Array(256);
	for (let n = 0; n < 256; n++) {
		let c = n;
		for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
		table[n] = c >>> 0;
	}
	return table;
})();
function crc32(data) {
	let crc = 4294967295;
	for (let i = 0; i < data.length; i++) crc = CRC_TABLE[(crc ^ data[i]) & 255] ^ crc >>> 8;
	return (crc ^ 4294967295) >>> 0;
}
function safeZipPath(path) {
	const p = path.replace(/\\/g, "/");
	if (p.startsWith("/") || p.split("/").some((seg) => seg === ".." || seg === "." || seg === "")) return null;
	if (!/^[A-Za-z0-9._/-]{1,200}$/.test(p)) return null;
	return p;
}
function safeZipName(path) {
	const p = path.replace(/\\/g, "/");
	if (p.startsWith("/") || p.split("/").some((seg) => seg === ".." || seg === "." || seg === "")) return null;
	if (p.length > 255 || /[\u0000-\u001f:*?"<>|]/.test(p)) return null;
	return p;
}
function dosStamp(date) {
	if (!date) return {
		time: 0,
		day: 23585
	};
	return {
		time: (date.getHours() << 11 | date.getMinutes() << 5 | date.getSeconds() >> 1) & 65535,
		day: (date.getFullYear() - 1980 << 9 | date.getMonth() + 1 << 5 | date.getDate()) & 65535
	};
}
function createZip(entries, opts = {}) {
	const guard = opts.names === "unicode" ? safeZipName : safeZipPath;
	const { time, day } = dosStamp(opts.date);
	const enc = new TextEncoder();
	const locals = [];
	const centrals = [];
	let offset = 0;
	for (const entry of entries) {
		const path = guard(entry.path);
		if (!path) throw new Error(`Unsafe zip path: ${entry.path}`);
		const name = enc.encode(path);
		const crc = crc32(entry.data);
		const size = entry.data.length;
		const local = new Uint8Array(30 + name.length);
		const lv = new DataView(local.buffer);
		lv.setUint32(0, 67324752, true);
		lv.setUint16(4, 20, true);
		lv.setUint16(6, 2048, true);
		lv.setUint16(8, 0, true);
		lv.setUint16(10, time, true);
		lv.setUint16(12, day, true);
		lv.setUint32(14, crc, true);
		lv.setUint32(18, size, true);
		lv.setUint32(22, size, true);
		lv.setUint16(26, name.length, true);
		lv.setUint16(28, 0, true);
		local.set(name, 30);
		const central = new Uint8Array(46 + name.length);
		const cv = new DataView(central.buffer);
		cv.setUint32(0, 33639248, true);
		cv.setUint16(4, 20, true);
		cv.setUint16(6, 20, true);
		cv.setUint16(8, 2048, true);
		cv.setUint16(10, 0, true);
		cv.setUint16(12, time, true);
		cv.setUint16(14, day, true);
		cv.setUint32(16, crc, true);
		cv.setUint32(20, size, true);
		cv.setUint32(24, size, true);
		cv.setUint16(28, name.length, true);
		cv.setUint32(42, offset, true);
		central.set(name, 46);
		locals.push(local, entry.data);
		centrals.push(central);
		offset += local.length + size;
	}
	const centralSize = centrals.reduce((n, c) => n + c.length, 0);
	const end = /* @__PURE__ */ new Uint8Array(22);
	const ev = new DataView(end.buffer);
	ev.setUint32(0, 101010256, true);
	ev.setUint16(8, entries.length, true);
	ev.setUint16(10, entries.length, true);
	ev.setUint32(12, centralSize, true);
	ev.setUint32(16, offset, true);
	const out = new Uint8Array(offset + centralSize + 22);
	let pos = 0;
	for (const part of [
		...locals,
		...centrals,
		end
	]) {
		out.set(part, pos);
		pos += part.length;
	}
	return out;
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/export/adapters.ts
/**
* Export adapters. Every format is built from the SAME resolved project; an
* adapter only decides how to write it down. Adding a format = one adapter in
* `ADAPTERS` plus its id in `policy.ts` — the generator is not touched.
*
* Exports contain HTML and CSS (or CSS-adjacent config) only. No adapter emits
* JavaScript; `exports.test.ts` scans every output for script.
*/
var kebab = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
var CSS = "text/css; charset=utf-8";
/** A safe file-name stem from the project name. */
function fileStem(name) {
	return name.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40).replace(/-+$/, "") || "designsystem";
}
function exampleHtml(r, view, cssHref) {
	const p = r.project.prefix;
	const css = cssHref ? `<link rel="stylesheet" href="${cssHref}">` : `<style>\n${emitCss(r)}</style>`;
	return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${r.project.name.replace(/[<>&"]/g, "")} — ${view === "components" ? "Komponenten" : view === "panel" ? "Panel" : "Landingpage"}</title>
${css}
<style>
/* Nur für diese Beispielseite: Layout der Demo, nicht Teil der Komponentenbibliothek. */
${scaffoldCss(p)}
</style>
</head>
<body class="${p}-body">
${previewBody(p, view, "de", false)}
</body>
</html>
`;
}
function readme(r, included, omitted) {
	const p = r.project.prefix;
	const lines = [
		`# ${r.project.name}`,
		"",
		"Erzeugt mit dem Designsystem-Studio auf tools.tracht-digital.de. Reines HTML und CSS — keine JavaScript-Abhängigkeiten.",
		"",
		"## Einbinden",
		"",
		"```html",
		`<link rel="stylesheet" href="css/designsystem.css">`,
		`<body class="${p}-body"> … </body>`,
		"```",
		"",
		"## Themes",
		"",
		"Ohne Attribut folgt die Seite der Systemeinstellung (`prefers-color-scheme`). Ein Theme fest wählen:",
		"",
		"```html",
		`<html data-theme="${r.themes[0]?.def.id ?? "light"}">`,
		"```",
		"",
		`Verfügbare Themes: ${r.themes.map((t) => `\`${t.def.id}\` (${t.def.name})`).join(", ")}.`,
		"",
		"## Komponenten",
		"",
		`- Buttons: \`.${p}-btn\`, \`.${p}-btn.${p}-btn--secondary\`, Formular-Button \`.${p}-btn.${p}-submit\``,
		`- Links: \`.${p}-link\``,
		`- Überschriften: \`.${p}-heading .${p}-h1\` … \`.${p}-h4\`; Text: \`.${p}-text\`, \`.${p}-lead\`, \`.${p}-text--muted\``,
		`- Karten: \`.${p}-card\` mit \`.${p}-card__title\``,
		`- Formulare: \`.${p}-form\`, \`.${p}-field\`, \`.${p}-label\`, \`.${p}-input\` (input, textarea, select)`,
		`- Navigation: \`.${p}-nav\`, \`.${p}-nav__brand\`, \`.${p}-nav__links\`, \`.${p}-nav__link\` (aktiv: \`aria-current="page"\`), \`.${p}-nav__toggle\` (nur Optik)`,
		`- Footer: \`.${p}-footer\`, \`.${p}-footer__links\``,
		`- Layout: \`.${p}-container\`, \`.${p}-section\`, \`.${p}-grid\`, \`.${p}-stack\`, \`.${p}-row\``,
		"",
		"Beispiele: `examples/`. Die Navigation-Toggle-Schaltfläche ist rein gestalterisch; das Öffnen des Menüs ist selbst umzusetzen.",
		"",
		"## Ebenen",
		"",
		`Das CSS nutzt Kaskadenebenen (\`@layer ${p}-tokens, ${p}-base, ${p}-imported, ${p}-components\`). Eigenes CSS ohne Ebene gewinnt immer gegen die erzeugten Regeln.`,
		"",
		"## Dateien",
		"",
		...included.map((f) => `- ${FORMAT_NOTES[f]}`)
	];
	if (omitted.length) lines.push("", `Nicht enthalten (für dieses Konto nicht freigeschaltet): ${omitted.join(", ")}.`);
	lines.push("", "## Barrierefreiheit", "", "Das Studio prüft Kontraste, Fokuszustände, Zielgrößen und Bewegung des Designsystems. Eine vollständige WCAG-Konformität der späteren Website kann es nicht garantieren — sie hängt von Inhalt, HTML-Struktur und Umsetzung ab.", "");
	return lines.join("\n");
}
var FORMAT_NOTES = {
	css: "`css/designsystem.css` — das vollständige Designsystem",
	variables: "`css/tokens.css` — nur die CSS Custom Properties (alle Themes)",
	html: "`examples/*.html` — Beispielseiten (Komponenten, Panel, Landingpage)",
	scss: "`scss/_designsystem.scss` — Sass-Variablen, Theme-Map und Komponenten (Dart Sass, `@use`)",
	json: "`tokens/design-tokens.json` — Design Tokens im DTCG-Format, inklusive Studio-Projekt zum erneuten Öffnen",
	tailwind: "`tailwind/tailwind.theme.css` (Tailwind CSS v4, `@theme`) und `tailwind/tailwind-v3.theme.json` (`theme.extend` für v3)",
	bootstrap: "`bootstrap/_bootstrap-overrides.scss` (vor Bootstrap 5.3 importieren) und `bootstrap/bootstrap-theme.css` (Laufzeit-Variablen)",
	zip: "dieses Paket"
};
function scss(r) {
	const p = r.project.prefix;
	const t = r.tokens;
	const ts = typeScale(t);
	const sp = spaceScale(t);
	const sass = (v) => v.replace(/#\{/g, "# {");
	const lines = [
		`// ${r.project.name.replace(/[\r\n]/g, " ")} — Designsystem (SCSS)`,
		"// Erzeugt mit dem Designsystem-Studio (tools.tracht-digital.de). Dart Sass ≥ 1.33.",
		"@use \"sass:map\";",
		"",
		`$${p}-font-body: ${sass(t.font.body)} !default;`,
		`$${p}-font-heading: ${sass(t.font.heading)} !default;`,
		`$${p}-font-mono: ${sass(t.font.mono)} !default;`,
		`$${p}-line-height: ${t.font.lineHeight} !default;`,
		...Object.entries(ts).map(([k, v]) => `$${p}-text-${k}: ${Math.round(v / 16 * 1e4) / 1e4}rem !default;`),
		...sp.map((v, i) => `$${p}-space-${i + 1}: ${Math.round(v / 16 * 1e4) / 1e4}rem !default;`),
		`$${p}-radius-sm: ${t.radius.sm}px !default;`,
		`$${p}-radius-md: ${t.radius.md}px !default;`,
		`$${p}-radius-lg: ${t.radius.lg}px !default;`,
		`$${p}-radius-button: ${t.radius.button >= 999 ? 999 : t.radius.button}px !default;`,
		`$${p}-border-width: ${t.border.width}px !default;`,
		`$${p}-shadow-sm: ${sass(t.shadow.sm)} !default;`,
		`$${p}-shadow-md: ${sass(t.shadow.md)} !default;`,
		`$${p}-shadow-lg: ${sass(t.shadow.lg)} !default;`,
		`$${p}-duration: ${Math.round(t.motion.duration)}ms !default;`,
		`$${p}-easing: ${sass(t.motion.easing)} !default;`,
		"",
		`$${p}-themes: (`,
		...r.themes.map((th) => `  "${th.def.id}": (\n${COLOR_ROLES.map((role) => `    "${kebab(role)}": ${th.colors[role]},`).join("\n")}\n  ),`),
		") !default;",
		"",
		`@mixin ${p}-theme($name) {`,
		`  @each $role, $value in map.get($${p}-themes, $name) {`,
		`    --${p}-color-#{$role}: #{$value};`,
		"  }",
		"}",
		""
	];
	const light = autoTheme(r.themes, "light") ?? r.themes[0];
	const dark = autoTheme(r.themes, "dark");
	const tokenLayer = [
		":root {",
		`  --${p}-font-body: #{$${p}-font-body};`,
		`  --${p}-font-heading: #{$${p}-font-heading};`,
		`  --${p}-font-mono: #{$${p}-font-mono};`,
		`  --${p}-line-height: #{$${p}-line-height};`,
		...Object.keys(ts).map((k) => `  --${p}-text-${k}: #{$${p}-text-${k}};`),
		...sp.map((_v, i) => `  --${p}-space-${i + 1}: #{$${p}-space-${i + 1}};`),
		...[
			"sm",
			"md",
			"lg",
			"button"
		].map((k) => `  --${p}-radius-${k}: #{$${p}-radius-${k}};`),
		`  --${p}-border-width: #{$${p}-border-width};`,
		...[
			"sm",
			"md",
			"lg"
		].map((k) => `  --${p}-shadow-${k}: #{$${p}-shadow-${k}};`),
		`  --${p}-duration: #{$${p}-duration};`,
		`  --${p}-easing: #{$${p}-easing};`,
		`  --${p}-container: ${Math.round(t.layout.container / 16 * 1e4) / 1e4}rem;`,
		`  --${p}-gutter: ${Math.round(t.layout.gutter / 16 * 1e4) / 1e4}rem;`,
		`  @include ${p}-theme("${light.def.id}");`,
		`  color-scheme: ${light.def.base};`,
		"}",
		...dark ? [
			"@media (prefers-color-scheme: dark) {",
			`  :root:not([data-theme]) { @include ${p}-theme("${dark.def.id}"); color-scheme: dark; }`,
			"}"
		] : [],
		`@each $name, $roles in $${p}-themes {`,
		`  [data-theme="#{$name}"] { @include ${p}-theme($name); }`,
		"}"
	].join("\n");
	let out = lines.join("\n");
	out += `@layer ${p}-tokens, ${p}-base, ${p}-imported, ${p}-components;\n\n`;
	out += `@layer ${p}-tokens {\n${indent(tokenLayer)}\n}\n\n`;
	out += `@layer ${p}-base {\n${indent(baseCss(r))}}\n\n`;
	const preserved = (r.project.imported?.preservedCss ?? "").trim();
	if (preserved) out += `@layer ${p}-imported {\n${indent(sanitizeCss(preserved))}\n}\n\n`;
	out += `@layer ${p}-components {\n${indent(componentsCss(r))}}\n`;
	if (r.project.customCss.trim()) out += `\n// Eigene Regeln (höchste Priorität)\n${sanitizeCss(r.project.customCss.trim())}\n`;
	return out;
}
var EASING = {
	ease: [
		.25,
		.1,
		.25,
		1
	],
	linear: [
		0,
		0,
		1,
		1
	],
	"ease-in": [
		.42,
		0,
		1,
		1
	],
	"ease-out": [
		0,
		0,
		.58,
		1
	],
	"ease-in-out": [
		.42,
		0,
		.58,
		1
	]
};
function cubic(easing) {
	if (EASING[easing]) return EASING[easing];
	const m = /cubic-bezier\(([^)]+)\)/.exec(easing);
	if (!m) return null;
	const n = m[1].split(",").map((x) => Number(x.trim()));
	return n.length === 4 && n.every(Number.isFinite) ? n : null;
}
var dim = (px) => ({
	$type: "dimension",
	$value: {
		value: Math.round(px * 100) / 100,
		unit: "px"
	}
});
function shadowToken(v) {
	const s = parseShadow(v);
	if (!s) return {
		$type: "shadow",
		$value: [],
		$description: "kein Schatten"
	};
	const c = parseColor(s.color);
	return {
		$type: "shadow",
		$value: {
			color: c ? toHex(c) : "#00000033",
			offsetX: {
				value: s.x,
				unit: "px"
			},
			offsetY: {
				value: s.y,
				unit: "px"
			},
			blur: {
				value: s.blur,
				unit: "px"
			},
			spread: {
				value: s.spread,
				unit: "px"
			},
			inset: s.inset
		}
	};
}
var families = (stack) => stack.split(",").map((f) => f.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
function tokensJson(r) {
	const t = r.tokens;
	const ts = typeScale(t);
	const sp = spaceScale(t);
	const themeGroup = (th) => Object.fromEntries(COLOR_ROLES.map((role) => [kebab(role), {
		$type: "color",
		$value: th.colors[role]
	}]));
	const doc = {
		$description: `${r.project.name} — Design Tokens (DTCG). Erzeugt mit dem Designsystem-Studio.`,
		color: { brand: {
			primary: {
				$type: "color",
				$value: t.color.primary
			},
			secondary: {
				$type: "color",
				$value: t.color.secondary
			},
			accent: {
				$type: "color",
				$value: t.color.accent
			}
		} },
		theme: Object.fromEntries(r.themes.map((th) => [th.def.id, {
			$description: th.def.name,
			...themeGroup(th)
		}])),
		font: {
			family: {
				body: {
					$type: "fontFamily",
					$value: families(t.font.body)
				},
				heading: {
					$type: "fontFamily",
					$value: families(t.font.heading)
				},
				mono: {
					$type: "fontFamily",
					$value: families(t.font.mono)
				}
			},
			size: Object.fromEntries(Object.entries(ts).map(([k, v]) => [k, dim(v)])),
			weight: {
				body: {
					$type: "fontWeight",
					$value: t.font.bodyWeight
				},
				heading: {
					$type: "fontWeight",
					$value: t.font.headingWeight
				}
			},
			"line-height": {
				$type: "number",
				$value: t.font.lineHeight
			}
		},
		space: Object.fromEntries(sp.map((v, i) => [String(i + 1), dim(v)])),
		radius: {
			sm: dim(t.radius.sm),
			md: dim(t.radius.md),
			lg: dim(t.radius.lg),
			button: dim(t.radius.button >= 999 ? 999 : t.radius.button)
		},
		border: { width: dim(t.border.width) },
		shadow: {
			sm: shadowToken(t.shadow.sm),
			md: shadowToken(t.shadow.md),
			lg: shadowToken(t.shadow.lg)
		},
		motion: {
			duration: {
				$type: "duration",
				$value: {
					value: Math.round(t.motion.duration),
					unit: "ms"
				}
			},
			...cubic(t.motion.easing) ? { easing: {
				$type: "cubicBezier",
				$value: cubic(t.motion.easing)
			} } : {}
		},
		$extensions: { "de.tracht-digital.designsystem-studio": { project: r.project } }
	};
	return `${JSON.stringify(doc, null, 2)}\n`;
}
function tailwindV4(r) {
	const p = r.project.prefix;
	const colors = COLOR_ROLES.map((role) => `  --color-${kebab(role)}: var(--${p}-color-${kebab(role)});`);
	return `/*
 * ${r.project.name.replace(/\*\//g, "")} — Tailwind CSS v4
 * Nach Tailwind importieren:  @import "tailwindcss";  @import "./tailwind.theme.css";
 * Utilities wie bg-primary, text-on-primary, rounded-md, shadow-md, font-heading
 * lesen die Werte des Designsystems; das Theme schaltet über data-theme.
 */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme inline {
${colors.join("\n")}
  --font-sans: var(--${p}-font-body);
  --font-heading: var(--${p}-font-heading);
  --font-mono: var(--${p}-font-mono);
  --radius-sm: var(--${p}-radius-sm);
  --radius-md: var(--${p}-radius-md);
  --radius-lg: var(--${p}-radius-lg);
  --radius-button: var(--${p}-radius-button);
  --shadow-sm: var(--${p}-shadow-sm);
  --shadow-md: var(--${p}-shadow-md);
  --shadow-lg: var(--${p}-shadow-lg);
  --ease-ds: var(--${p}-easing);
}

${tokensCss(r)}
@layer base {
${indent(baseCss(r))}}

@layer components {
${indent(componentsCss(r))}}
${r.project.customCss.trim() ? `\n${sanitizeCss(r.project.customCss.trim())}\n` : ""}`;
}
function tailwindV3(r) {
	const p = r.project.prefix;
	const doc = {
		$comment: "Tailwind CSS v3: in tailwind.config.js  theme: { extend: require('./tailwind-v3.theme.json').theme.extend }  und css/designsystem.css einbinden.",
		darkMode: ["selector", "[data-theme=\"dark\"]"],
		theme: { extend: {
			colors: Object.fromEntries(COLOR_ROLES.map((role) => [kebab(role), `var(--${p}-color-${kebab(role)})`])),
			fontFamily: {
				sans: [`var(--${p}-font-body)`],
				heading: [`var(--${p}-font-heading)`],
				mono: [`var(--${p}-font-mono)`]
			},
			borderRadius: {
				sm: `var(--${p}-radius-sm)`,
				md: `var(--${p}-radius-md)`,
				lg: `var(--${p}-radius-lg)`,
				button: `var(--${p}-radius-button)`
			},
			boxShadow: {
				sm: `var(--${p}-shadow-sm)`,
				md: `var(--${p}-shadow-md)`,
				lg: `var(--${p}-shadow-lg)`
			},
			transitionTimingFunction: { ds: `var(--${p}-easing)` },
			maxWidth: { container: `var(--${p}-container)` }
		} }
	};
	return `${JSON.stringify(doc, null, 2)}\n`;
}
var rgbTriplet = (c) => {
	const v = parseColor(c);
	return v ? `${Math.round(v.r)}, ${Math.round(v.g)}, ${Math.round(v.b)}` : "0, 0, 0";
};
function bootstrapScss(r) {
	const t = r.tokens;
	const light = (autoTheme(r.themes, "light") ?? r.themes[0]).colors;
	const dark = autoTheme(r.themes, "dark")?.colors;
	const btn = r.components.button.style;
	const shadowsOn = t.style.shadow !== "none";
	const rem = (px) => `${Math.round(px / 16 * 1e4) / 1e4}rem`;
	const sass = (v) => v.replace(/#\{/g, "# {");
	return `// ${r.project.name.replace(/[\r\n]/g, " ")} — Bootstrap 5.3 Theme-Anpassung
// VOR Bootstrap importieren:
//   @import "bootstrap-overrides";
//   @import "bootstrap/scss/bootstrap";

$primary: ${light.primary};
$secondary: ${light.secondary};
$success: ${light.success};
$warning: ${light.warning};
$danger: ${light.danger};
$info: ${light.accent};

$body-bg: ${light.background};
$body-color: ${light.text};
$body-secondary-color: ${light.muted};
$border-color: ${light.border};
$link-color: ${light.link};
$link-hover-color: ${light.linkHover};
$focus-ring-color: rgba(${rgbTriplet(light.focus)}, 0.5);

$font-family-sans-serif: ${sass(t.font.body)};
$headings-font-family: ${sass(t.font.heading)};
$headings-font-weight: ${t.font.headingWeight};
$font-size-base: ${rem(t.font.size)};
$line-height-base: ${t.font.lineHeight};

$border-width: ${t.border.width}px;
$border-radius: ${t.radius.md}px;
$border-radius-sm: ${t.radius.sm}px;
$border-radius-lg: ${t.radius.lg}px;
$border-radius-pill: 50rem;

$enable-shadows: ${shadowsOn};
$box-shadow-sm: ${shadowsOn ? sass(t.shadow.sm) : "none"};
$box-shadow: ${shadowsOn ? sass(t.shadow.md) : "none"};
$box-shadow-lg: ${shadowsOn ? sass(t.shadow.lg) : "none"};

$btn-padding-y: ${rem(btn.padding.top)};
$btn-padding-x: ${rem(btn.padding.left)};
$btn-font-weight: ${btn.fontWeight};
$btn-border-radius: ${t.radius.button >= 999 ? "50rem" : `${t.radius.button}px`};
$btn-transition: color ${t.motion.duration}ms ${sass(t.motion.easing)}, background-color ${t.motion.duration}ms ${sass(t.motion.easing)}, border-color ${t.motion.duration}ms ${sass(t.motion.easing)}, box-shadow ${t.motion.duration}ms ${sass(t.motion.easing)};

$input-bg: ${light.field};
$input-border-color: ${light.borderStrong};
$input-focus-border-color: ${light.focus};
$card-bg: ${light.surface};
$card-border-radius: ${t.radius.lg}px;
$navbar-light-color: ${light.text};
${dark ? `
// Dunkles Farbschema (data-bs-theme="dark")
$body-bg-dark: ${dark.background};
$body-color-dark: ${dark.text};
$body-secondary-color-dark: ${dark.muted};
$border-color-dark: ${dark.border};
$link-color-dark: ${dark.link};
$link-hover-color-dark: ${dark.linkHover};
` : ""}`;
}
function bootstrapCss(r) {
	const block = (sel, c) => `${sel} {
  --bs-primary: ${c.primary};
  --bs-primary-rgb: ${rgbTriplet(c.primary)};
  --bs-secondary: ${c.secondary};
  --bs-secondary-rgb: ${rgbTriplet(c.secondary)};
  --bs-success: ${c.success};
  --bs-danger: ${c.danger};
  --bs-warning: ${c.warning};
  --bs-body-bg: ${c.background};
  --bs-body-bg-rgb: ${rgbTriplet(c.background)};
  --bs-body-color: ${c.text};
  --bs-body-color-rgb: ${rgbTriplet(c.text)};
  --bs-secondary-color: ${c.muted};
  --bs-border-color: ${c.border};
  --bs-link-color: ${c.link};
  --bs-link-color-rgb: ${rgbTriplet(c.link)};
  --bs-link-hover-color: ${c.linkHover};
  --bs-link-hover-color-rgb: ${rgbTriplet(c.linkHover)};
  --bs-focus-ring-color: rgba(${rgbTriplet(c.focus)}, 0.5);
}
`;
	const t = r.tokens;
	const light = (autoTheme(r.themes, "light") ?? r.themes[0]).colors;
	const dark = autoTheme(r.themes, "dark")?.colors;
	return `/* ${r.project.name.replace(/\*\//g, "")} — Bootstrap 5.3 Laufzeit-Theme (nach bootstrap.css einbinden) */
${block(":root, [data-bs-theme=\"light\"]", light)}${dark ? block("[data-bs-theme=\"dark\"]", dark) : ""}:root {
  --bs-body-font-family: ${t.font.body};
  --bs-body-line-height: ${t.font.lineHeight};
  --bs-border-width: ${t.border.width}px;
  --bs-border-radius: ${t.radius.md}px;
  --bs-border-radius-sm: ${t.radius.sm}px;
  --bs-border-radius-lg: ${t.radius.lg}px;
}
.btn-primary {
  --bs-btn-bg: ${light.primary};
  --bs-btn-border-color: ${light.primary};
  --bs-btn-color: ${light.onPrimary};
  --bs-btn-hover-bg: ${light.primaryHover};
  --bs-btn-hover-border-color: ${light.primaryHover};
  --bs-btn-hover-color: ${light.onPrimary};
  --bs-btn-active-bg: ${light.primaryActive};
  --bs-btn-active-border-color: ${light.primaryActive};
  --bs-btn-active-color: ${light.onPrimary};
  --bs-btn-border-radius: ${t.radius.button >= 999 ? "50rem" : `${t.radius.button}px`};
}
${dark ? `[data-bs-theme="dark"] .btn-primary {\n  --bs-btn-bg: ${dark.primary};\n  --bs-btn-border-color: ${dark.primary};\n  --bs-btn-color: ${dark.onPrimary};\n  --bs-btn-hover-bg: ${dark.primaryHover};\n  --bs-btn-hover-border-color: ${dark.primaryHover};\n  --bs-btn-hover-color: ${dark.onPrimary};\n}\n` : ""}`;
}
var ADAPTERS = {
	css: {
		id: "css",
		label: {
			de: "CSS",
			en: "CSS"
		},
		description: {
			de: "Vollständiges Stylesheet mit Tokens, Themes und Komponenten",
			en: "Complete stylesheet with tokens, themes and components"
		},
		files: (r) => [{
			path: "css/designsystem.css",
			mime: CSS,
			content: emitCss(r)
		}]
	},
	variables: {
		id: "variables",
		label: {
			de: "CSS Custom Properties",
			en: "CSS custom properties"
		},
		description: {
			de: "Nur die Variablen aller Themes",
			en: "The variables of every theme only"
		},
		files: (r) => [{
			path: "css/tokens.css",
			mime: CSS,
			content: `/* ${r.project.name.replace(/\*\//g, "")} — CSS Custom Properties */\n${tokensCss(r)}`
		}]
	},
	html: {
		id: "html",
		label: {
			de: "HTML-Beispiele",
			en: "HTML examples"
		},
		description: {
			de: "Komponenten, Panel und Landingpage als HTML",
			en: "Components, panel and landing page as HTML"
		},
		files: (r) => [
			{
				path: "examples/components.html",
				mime: "text/html; charset=utf-8",
				content: exampleHtml(r, "components", "../css/designsystem.css")
			},
			{
				path: "examples/panel.html",
				mime: "text/html; charset=utf-8",
				content: exampleHtml(r, "panel", "../css/designsystem.css")
			},
			{
				path: "examples/landingpage.html",
				mime: "text/html; charset=utf-8",
				content: exampleHtml(r, "landing", "../css/designsystem.css")
			}
		]
	},
	scss: {
		id: "scss",
		label: {
			de: "SCSS",
			en: "SCSS"
		},
		description: {
			de: "Sass-Variablen, Theme-Map und Komponenten",
			en: "Sass variables, theme map and components"
		},
		files: (r) => [{
			path: "scss/_designsystem.scss",
			mime: "text/x-scss; charset=utf-8",
			content: scss(r)
		}]
	},
	json: {
		id: "json",
		label: {
			de: "JSON Design Tokens",
			en: "JSON design tokens"
		},
		description: {
			de: "DTCG-Format, lässt sich hier wieder öffnen",
			en: "DTCG format, can be reopened here"
		},
		files: (r) => [{
			path: "tokens/design-tokens.json",
			mime: "application/json; charset=utf-8",
			content: tokensJson(r)
		}]
	},
	tailwind: {
		id: "tailwind",
		label: {
			de: "Tailwind CSS",
			en: "Tailwind CSS"
		},
		description: {
			de: "v4-Theme (@theme) und v3-Erweiterung",
			en: "v4 theme (@theme) and v3 extension"
		},
		files: (r) => [{
			path: "tailwind/tailwind.theme.css",
			mime: CSS,
			content: tailwindV4(r)
		}, {
			path: "tailwind/tailwind-v3.theme.json",
			mime: "application/json; charset=utf-8",
			content: tailwindV3(r)
		}]
	},
	bootstrap: {
		id: "bootstrap",
		label: {
			de: "Bootstrap 5.3",
			en: "Bootstrap 5.3"
		},
		description: {
			de: "Sass-Überschreibungen und Laufzeit-Variablen",
			en: "Sass overrides and runtime variables"
		},
		files: (r) => [{
			path: "bootstrap/_bootstrap-overrides.scss",
			mime: "text/x-scss; charset=utf-8",
			content: bootstrapScss(r)
		}, {
			path: "bootstrap/bootstrap-theme.css",
			mime: CSS,
			content: bootstrapCss(r)
		}]
	}
};
var FORMAT_LABELS = {
	...Object.fromEntries(Object.values(ADAPTERS).map((a) => [a.id, a.label])),
	zip: {
		de: "Komplettpaket (ZIP)",
		en: "Complete package (ZIP)"
	}
};
var FORMAT_DESCRIPTIONS = {
	...Object.fromEntries(Object.values(ADAPTERS).map((a) => [a.id, a.description])),
	zip: {
		de: "Alle freigeschalteten Formate plus README",
		en: "Every unlocked format plus a README"
	}
};
/**
* The one file a download of `format` produces. `allowed` decides which
* formats a ZIP may contain — a ZIP must not smuggle out a format the visitor
* may not export on its own.
*/
function buildExport(project, format, allowed = EXPORT_FORMATS) {
	const r = resolveProject(project);
	const stem = fileStem(project.name);
	if (format === "zip") {
		const enc = new TextEncoder();
		const included = EXPORT_FORMATS.filter((f) => f !== "zip" && allowed.includes(f));
		const files = [{
			path: "README.md",
			mime: "text/markdown",
			content: readme(r, included, EXPORT_FORMATS.filter((f) => f !== "zip" && !allowed.includes(f)))
		}];
		for (const f of included) files.push(...ADAPTERS[f].files(r));
		if (included.includes("html") && !included.includes("css")) files.push(...ADAPTERS.css.files(r));
		const body = createZip(files.map((f) => ({
			path: `${stem}/${f.path}`,
			data: typeof f.content === "string" ? enc.encode(f.content) : f.content
		})));
		return {
			filename: `${stem}.zip`,
			mime: "application/zip",
			body
		};
	}
	const files = ADAPTERS[format].files(r);
	if (format === "html") return {
		filename: `${stem}-komponenten.html`,
		mime: "text/html; charset=utf-8",
		body: exampleHtml(r, "components", null)
	};
	const main = files[0];
	const ext = main.path.slice(main.path.lastIndexOf("."));
	return {
		filename: `${stem}-${main.path.slice(main.path.lastIndexOf("/") + 1, main.path.lastIndexOf(".")).replace(/^_/, "")}${ext}`,
		mime: main.mime,
		body: main.content
	};
}
export { contrast as A, STUDIO_TOOL_ID as B, defaultStyle as C, parseProject as D, newProject as E, parseColor as F, mayExport as H, round2 as I, shiftLightness as L, ensureContrast as M, formatColor as N, setPath as O, normalizeColor as P, toHex as R, VARIANTS as S, isValidPrefix as T, offlineAccess as U, isExportFormat as V, parseAccess as W, ANIMATIONS as _, resolveProject as a, FONT_STACKS as b, previewBody as c, componentSelector as d, emitCss as f, parseShadow as g, COLOR_ROLES as h, createZip as i, describe as j, HARMONIES as k, previewDocument as l, singleComponentCss as m, FORMAT_LABELS as n, DEVICES as o, sanitizeCss as p, buildExport as r, PREVIEW_VIEWS as s, FORMAT_DESCRIPTIONS as t, seedBody as u, BORDER_STYLES as v, getPath as w, SEED_KINDS as x, COMPONENT_KINDS as y, EXPORT_FORMATS as z };
