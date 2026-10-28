import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,r as n}from"./mermaid-parser.core-Bnd-ygDg.js";import{n as r,r as i}from"./chunk-Y2CYZVJY-BLgfQGNL.js";import{J as a,q as o,t as s}from"./src-DhQ1l3HN.js";import{A as c,C as l,J as u,U as d,W as f,_ as p,a as m,b as h,c as g,f as _,v}from"./chunk-DSNLSHJZ-C1shsECG.js";import{et as y}from"./year-hYphg8MD.js";import{n as b,s as x}from"./pie-Bt8SxWTL.js";import{n as S,t as C}from"./chunk-JWPE2WC7-CUwS0ygC.js";import{f as w,h as T,i as E}from"./chunk-7S6XSTFO-Do20_xqw.js";import{l as D,u as O}from"./mermaid.core-Drpa83iO.js";var k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{C(),D(),w(),c(),o(),i(),t(),s(),k=_.pie,A={sections:new Map,showData:!1,config:k},j=A.sections,M=A.showData,N=structuredClone(k),P={getConfig:r(()=>structuredClone(N),`getConfig`),clear:r(()=>{j=new Map,M=A.showData,m()},`clear`),setDiagramTitle:u,getDiagramTitle:l,setAccTitle:f,getAccTitle:v,setAccDescription:d,getAccDescription:p,addSection:r(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);j.has(e)||(j.set(e,t),a.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:r(()=>j,`getSections`),setShowData:r(e=>{M=e},`setShowData`),getShowData:r(()=>M,`getShowData`)},F=r((e,t)=>{S(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),I={parse:r(async e=>{let t=await n(`pie`,e);a.debug(t),F(t,P)},`parse`)},L=r(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,`getStyles`),R=r(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return b().value(e=>e.value).sort(null)(n)},`createPieArcs`),z={parser:I,db:P,renderer:{draw:r((e,t,n,r)=>{a.debug(`rendering pie chart
`+e);let i=r.db,o=h(),s=E(i.getConfig(),o.pie),c=O(t),l=c.append(`g`);l.attr(`transform`,`translate(225,225)`);let{themeVariables:u}=o,[d]=T(u.pieOuterStrokeWidth);d??=2;let f=s.legendPosition,p=s.textPosition,m=s.donutHole>0&&s.donutHole<=.9?s.donutHole:0,_=x().innerRadius(m*185).outerRadius(185),v=x().innerRadius(185*p).outerRadius(185*p),b=l.append(`g`);b.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+d/2).attr(`class`,`pieOuterCircle`);let S=i.getSections(),C=R(S),w=[u.pie1,u.pie2,u.pie3,u.pie4,u.pie5,u.pie6,u.pie7,u.pie8,u.pie9,u.pie10,u.pie11,u.pie12],D=0;S.forEach(e=>{D+=e});let k=C.filter(e=>(e.data.value/D*100).toFixed(0)!==`0`),A=y(w).domain([...S.keys()]);b.selectAll(`mySlices`).data(k).enter().append(`path`).attr(`d`,_).attr(`fill`,e=>A(e.data.label)).attr(`class`,e=>{let t=`pieCircle`;return s.highlightSlice===`hover`?t+=` highlightedOnHover`:s.highlightSlice===e.data.label&&(t+=` highlighted`),t}),b.selectAll(`mySlices`).data(k).enter().append(`text`).text(e=>(e.data.value/D*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+v.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let j=l.append(`text`).text(i.getDiagramTitle()).attr(`x`,0).attr(`y`,-200).attr(`class`,`pieTitleText`),M=[...S.entries()].map(([e,t])=>({label:e,value:t})),N=l.selectAll(`.legend`).data(M).enter().append(`g`).attr(`class`,`legend`);N.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>A(e.label)).style(`stroke`,e=>A(e.label)),N.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>i.getShowData()?`${e.label} [${e.value}]`:e.label);let P=Math.max(...N.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),F=450,I=490,L=M.length*22;switch(f){case`center`:N.attr(`transform`,(e,t)=>{let n=22*M.length/2,r=-P/2-22,i=t*22-n;return`translate(`+r+`,`+i+`)`});break;case`top`:F+=L,N.attr(`transform`,(e,t)=>`translate(${-P/2-22}, ${t*22-185})`),b.attr(`transform`,()=>`translate(0, ${L+22})`);break;case`bottom`:F+=L,N.attr(`transform`,(e,t)=>{let n=-P/2-22,r=t*22- -207;return`translate(`+n+`,`+r+`)`});break;case`left`:I+=22+P,N.attr(`transform`,(e,t)=>{let n=22*M.length/2;return`translate(-207,`+(t*22-n)+`)`}),b.attr(`transform`,()=>`translate(${P+18+4}, 0)`);break;default:I+=22+P,N.attr(`transform`,(e,t)=>{let n=22*M.length/2;return`translate(216,`+(t*22-n)+`)`})}let z=j.node()?.getBoundingClientRect().width??0,B=225-z/2,V=225+z/2,H=Math.min(0,B),U=Math.max(I,V)-H;c.attr(`viewBox`,`${H} 0 ${U} ${F}`),g(c,F,U,s.useMaxWidth)},`draw`)},styles:L}})))()}B();export{z as diagram};