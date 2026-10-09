import{s as e,t}from"./react.ClNNcLFM.js";var n=e(t(),1),r=e=>(e??``).trim(),i=(e,t=`, `)=>e.map(r).filter(Boolean).join(t);function a(e,t){let n=[r(e)];for(let e of t){let t=e.paragraphs.map(r).filter(Boolean);n.push([r(e.heading),...t].join(`

`))}return n.filter(Boolean).join(`

`)+`
`}function o(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function s(e,t){let n=[`<section>`,`  <h1>${o(r(e))}</h1>`];for(let e of t){n.push(`  <h2>${o(r(e.heading))}</h2>`);for(let t of e.paragraphs.map(r).filter(Boolean))n.push(`  <p>${o(t).split(`
`).join(`<br />
  `)}</p>`)}return n.push(`</section>`),n.join(`
`)+`
`}function c(e,t){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}function l(e,t){c(new Blob([e],{type:`text/plain;charset=utf-8`}),t)}function u(e,t){c(new Blob([e],{type:`text/html;charset=utf-8`}),t)}function d(e=1500){let[t,r]=(0,n.useState)(!1),i=(0,n.useRef)(null);return(0,n.useEffect)(()=>()=>{i.current!==null&&clearTimeout(i.current)},[]),{copied:t,copy:async t=>{if(t)try{await navigator.clipboard.writeText(t),r(!0),i.current!==null&&clearTimeout(i.current),i.current=setTimeout(()=>r(!1),e)}catch{r(!1)}},reset:()=>r(!1)}}var f={company:``,represented:``,street:``,postalCode:``,city:``,country:``,phone:``,email:``,website:``};function p(e){return[r(e.company),r(e.street),i([e.postalCode,e.city],` `),r(e.country)].filter(Boolean).join(`
`)}function m(e,t){let n=t===`de`?{phone:`Telefon`,email:`E-Mail`,web:`Web`}:{phone:`Phone`,email:`Email`,web:`Web`};return[r(e.phone)&&`${n.phone}: ${r(e.phone)}`,r(e.email)&&`${n.email}: ${r(e.email)}`,r(e.website)&&`${n.web}: ${r(e.website)}`].filter(Boolean).join(`
`)}function h(e,t){return`${e.toLowerCase().replace(/[äàáâ]/g,`a`).replace(/[öòóô]/g,`o`).replace(/[üùúû]/g,`u`).replace(/ß/g,`ss`).replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``)||`dokument`}.${t}`}export{l as a,s as c,d,u as i,a as l,r as n,f as o,m as r,i as s,p as t,h as u};