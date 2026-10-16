import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as apiBase } from "./connection_CphIusNK.mjs";
import { B as isExportFormat, E as parseProject, H as offlineAccess, R as EXPORT_FORMATS, U as parseAccess, V as mayExport, r as buildExport } from "./adapters_DXjV2PTC.mjs";
//#region node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/exportRoute.ts
/**
* Server half of the export: a framework-free request handler that the tools
* site mounts at `POST /tds/studio/export`. It lives here, beside the
* adapters, so the policy check and the file it guards are one module.
*
* Premium formats are generated ONLY after the API confirmed the entitlement
* for the visitor's own session cookie. When the API cannot be asked, the
* default policy applies and premium stays closed (fail closed).
*/
var MAX_BODY = 1e6;
var json = (status, body) => new Response(JSON.stringify(body), {
	status,
	headers: {
		"Content-Type": "application/json; charset=utf-8",
		"Cache-Control": "no-store"
	}
});
async function accessFor(request, deps) {
	const f = deps.fetch ?? fetch;
	try {
		const res = await f(`${deps.apiBase().replace(/\/+$/, "")}/tools/studio/access`, {
			headers: {
				Accept: "application/json",
				Cookie: request.headers.get("cookie") ?? "",
				...request.headers.get("x-forwarded-for") ? { "X-Forwarded-For": request.headers.get("x-forwarded-for") } : {}
			},
			redirect: "error",
			signal: typeof AbortSignal.timeout === "function" ? AbortSignal.timeout(6e3) : void 0
		});
		if (!res.ok) return offlineAccess();
		return parseAccess(await res.json());
	} catch {
		return offlineAccess();
	}
}
async function handleExport(request, deps) {
	if (request.method !== "POST") return json(405, { error: "Method not allowed" });
	if (!(request.headers.get("content-type") ?? "").includes("application/json")) return json(415, { error: "JSON erwartet." });
	const text = await request.text();
	if (text.length > MAX_BODY) return json(413, { error: "Projekt zu groß." });
	let body;
	try {
		body = JSON.parse(text);
	} catch {
		return json(400, { error: "Ungültiges JSON." });
	}
	const format = body.format;
	if (!isExportFormat(format)) return json(422, {
		error: "Unbekanntes Format.",
		code: "format"
	});
	const project = parseProject(body.project);
	if (!project) return json(422, {
		error: "Ungültiges Projekt.",
		code: "project"
	});
	const access = await accessFor(request, deps);
	if (!access.enabled) return json(403, {
		error: "Das Designsystem-Studio ist derzeit deaktiviert.",
		code: "disabled"
	});
	if (!mayExport(access, format)) return json(403, {
		error: "Dieses Format ist Premium-Nutzern vorbehalten.",
		code: "premium_required"
	});
	const allowed = EXPORT_FORMATS.filter((f) => mayExport(access, f));
	const file = buildExport(project, format, allowed);
	const body2 = typeof file.body === "string" ? file.body : new Blob([file.body]);
	return new Response(body2, {
		status: 200,
		headers: {
			"Content-Type": file.mime,
			"Content-Disposition": `attachment; filename="${file.filename}"`,
			"Cache-Control": "no-store",
			"X-Content-Type-Options": "nosniff"
		}
	});
}
//#endregion
//#region src/pages/tds/studio/export.ts
var export_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = ({ request }) => handleExport(request, { apiBase });
//#endregion
//#region \0virtual:astro:page:src/pages/tds/studio/export@_@ts
var page = () => export_exports;
//#endregion
export { page };
