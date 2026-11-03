import{r as e}from"./chunk-TIOFUDWJ.Bq-Rh9Z3.js";function t(t,n){e(t,n)}function n(t,n){e(t,n,`text/html;charset=utf-8`)}var r=e=>(e??``).trim(),i=(e,t=`, `)=>e.map(r).filter(Boolean).join(t);function a(e,t){let n=[r(e)];for(let e of t){let t=e.paragraphs.map(r).filter(Boolean);n.push([r(e.heading),...t].join(`

`))}return n.filter(Boolean).join(`

`)+`
`}function o(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function s(e,t){let n=[`<section>`,`  <h1>${o(r(e))}</h1>`];for(let e of t){n.push(`  <h2>${o(r(e.heading))}</h2>`);for(let t of e.paragraphs.map(r).filter(Boolean))n.push(`  <p>${o(t).split(`
`).join(`<br />
  `)}</p>`)}return n.push(`</section>`),n.join(`
`)+`
`}var c={company:``,represented:``,street:``,postalCode:``,city:``,country:``,phone:``,email:``,website:``};function l(e){return[r(e.company),r(e.street),i([e.postalCode,e.city],` `),r(e.country)].filter(Boolean).join(`
`)}function u(e,t){let n=t===`de`?{phone:`Telefon`,email:`E-Mail`,web:`Web`}:{phone:`Phone`,email:`Email`,web:`Web`};return[r(e.phone)&&`${n.phone}: ${r(e.phone)}`,r(e.email)&&`${n.email}: ${r(e.email)}`,r(e.website)&&`${n.web}: ${r(e.website)}`].filter(Boolean).join(`
`)}function d(e,t){return`${e.toLowerCase().replace(/[äàáâ]/g,`a`).replace(/[öòóô]/g,`o`).replace(/[üùúû]/g,`u`).replace(/ß/g,`ss`).replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``)||`dokument`}.${t}`}export{t as a,s as c,n as i,a as l,r as n,c as o,u as r,i as s,l as t,d as u};