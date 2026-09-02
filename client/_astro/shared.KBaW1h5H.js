import{t as e}from"./react.Du4I-rQQ.js";var t=e(),n=e=>(e??``).trim(),r=(e,t=`, `)=>e.map(n).filter(Boolean).join(t);function i(e,t){let r=[n(e)];for(let e of t){let t=e.paragraphs.map(n).filter(Boolean);r.push([n(e.heading),...t].join(`

`))}return r.filter(Boolean).join(`

`)+`
`}function a(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function o(e,t){let r=[`<section>`,`  <h1>${a(n(e))}</h1>`];for(let e of t){r.push(`  <h2>${a(n(e.heading))}</h2>`);for(let t of e.paragraphs.map(n).filter(Boolean))r.push(`  <p>${a(t).split(`
`).join(`<br />
  `)}</p>`)}return r.push(`</section>`),r.join(`
`)+`
`}function s(e,t){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}function c(e,t){s(new Blob([e],{type:`text/plain;charset=utf-8`}),t)}function l(e,t){s(new Blob([e],{type:`text/html;charset=utf-8`}),t)}function u(e=1500){let[n,r]=(0,t.useState)(!1),i=(0,t.useRef)(null);return(0,t.useEffect)(()=>()=>{i.current!==null&&clearTimeout(i.current)},[]),{copied:n,copy:async t=>{if(t)try{await navigator.clipboard.writeText(t),r(!0),i.current!==null&&clearTimeout(i.current),i.current=setTimeout(()=>r(!1),e)}catch{r(!1)}},reset:()=>r(!1)}}var d={company:``,represented:``,street:``,postalCode:``,city:``,country:``,phone:``,email:``,website:``};function f(e){return[n(e.company),n(e.street),r([e.postalCode,e.city],` `),n(e.country)].filter(Boolean).join(`
`)}function p(e,t){let r=t===`de`?{phone:`Telefon`,email:`E-Mail`,web:`Web`}:{phone:`Phone`,email:`Email`,web:`Web`};return[n(e.phone)&&`${r.phone}: ${n(e.phone)}`,n(e.email)&&`${r.email}: ${n(e.email)}`,n(e.website)&&`${r.web}: ${n(e.website)}`].filter(Boolean).join(`
`)}function m(e,t){return`${e.toLowerCase().replace(/[äàáâ]/g,`a`).replace(/[öòóô]/g,`o`).replace(/[üùúû]/g,`u`).replace(/ß/g,`ss`).replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``)||`dokument`}.${t}`}export{c as a,o as c,u as d,l as i,i as l,n,d as o,p as r,r as s,f as t,m as u};