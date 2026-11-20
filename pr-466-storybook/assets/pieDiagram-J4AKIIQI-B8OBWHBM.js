import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,r as n}from"./mermaid-parser.core-CkGjUvq9.js";import{n as r,r as i}from"./chunk-Y2CYZVJY-BLgfQGNL.js";import{i as a,r as o}from"./d3-selection-DaGbIZS0.js";import{A as s,C as c,J as l,U as u,W as d,_ as f,a as p,b as m,c as h,f as g,v as _}from"./chunk-BG4553SI-DwHheiiQ.js";import{i as v,n as y}from"./d3-scale-CawyjbCm.js";import{S as b,g as x,n as S}from"./dist-DH_ACoYT.js";import{n as C,t as w}from"./chunk-JWPE2WC7-CUwS0ygC.js";import{f as T,h as E,i as D}from"./chunk-6MUBBAK2-B_a1QxPR.js";import{l as O,u as k}from"./mermaid.core-C_sROIWW.js";var A,j,M,N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{w(),O(),T(),s(),o(),i(),t(),x(),y(),A=g.pie,j={sections:new Map,showData:!1,config:A},M=j.sections,N=j.showData,P=structuredClone(A),F={getConfig:r(()=>structuredClone(P),`getConfig`),clear:r(()=>{M=new Map,N=j.showData,p()},`clear`),setDiagramTitle:l,getDiagramTitle:c,setAccTitle:d,getAccTitle:_,setAccDescription:u,getAccDescription:f,addSection:r(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);M.has(e)||(M.set(e,t),a.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:r(()=>M,`getSections`),setShowData:r(e=>{N=e},`setShowData`),getShowData:r(()=>N,`getShowData`)},I=r((e,t)=>{C(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),L={parse:r(async e=>{let t=await n(`pie`,e);a.debug(t),I(t,F)},`parse`)},R=r(e=>`
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
`,`getStyles`),z=r(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return b().value(e=>e.value).sort(null)(n)},`createPieArcs`),B={parser:L,db:F,renderer:{draw:r((e,t,n,r)=>{a.debug(`rendering pie chart
`+e);let i=r.db,o=m(),s=D(i.getConfig(),o.pie),c=k(t),l=c.append(`g`);l.attr(`transform`,`translate(225,225)`);let{themeVariables:u}=o,[d]=E(u.pieOuterStrokeWidth);d??=2;let f=s.legendPosition,p=s.textPosition,g=s.donutHole>0&&s.donutHole<=.9?s.donutHole:0,_=S().innerRadius(g*185).outerRadius(185),y=S().innerRadius(185*p).outerRadius(185*p),b=l.append(`g`);b.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+d/2).attr(`class`,`pieOuterCircle`);let x=i.getSections(),C=z(x),w=[u.pie1,u.pie2,u.pie3,u.pie4,u.pie5,u.pie6,u.pie7,u.pie8,u.pie9,u.pie10,u.pie11,u.pie12],T=0;x.forEach(e=>{T+=e});let O=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),A=v(w).domain([...x.keys()]);b.selectAll(`mySlices`).data(O).enter().append(`path`).attr(`d`,_).attr(`fill`,e=>A(e.data.label)).attr(`class`,e=>{let t=`pieCircle`;return s.highlightSlice===`hover`?t+=` highlightedOnHover`:s.highlightSlice===e.data.label&&(t+=` highlighted`),t}),b.selectAll(`mySlices`).data(O).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+y.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let j=l.append(`text`).text(i.getDiagramTitle()).attr(`x`,0).attr(`y`,-200).attr(`class`,`pieTitleText`),M=[...x.entries()].map(([e,t])=>({label:e,value:t})),N=l.selectAll(`.legend`).data(M).enter().append(`g`).attr(`class`,`legend`);N.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>A(e.label)).style(`stroke`,e=>A(e.label)),N.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>i.getShowData()?`${e.label} [${e.value}]`:e.label);let P=Math.max(...N.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),F=450,I=490,L=M.length*22;switch(f){case`center`:N.attr(`transform`,(e,t)=>{let n=22*M.length/2,r=-P/2-22,i=t*22-n;return`translate(`+r+`,`+i+`)`});break;case`top`:F+=L,N.attr(`transform`,(e,t)=>`translate(${-P/2-22}, ${t*22-185})`),b.attr(`transform`,()=>`translate(0, ${L+22})`);break;case`bottom`:F+=L,N.attr(`transform`,(e,t)=>{let n=-P/2-22,r=t*22- -207;return`translate(`+n+`,`+r+`)`});break;case`left`:I+=22+P,N.attr(`transform`,(e,t)=>{let n=22*M.length/2;return`translate(-207,`+(t*22-n)+`)`}),b.attr(`transform`,()=>`translate(${P+18+4}, 0)`);break;default:I+=22+P,N.attr(`transform`,(e,t)=>{let n=22*M.length/2;return`translate(216,`+(t*22-n)+`)`})}let R=j.node()?.getBoundingClientRect().width??0,B=225-R/2,V=225+R/2,H=Math.min(0,B),U=Math.max(I,V)-H;c.attr(`viewBox`,`${H} 0 ${U} ${F}`),h(c,F,U,s.useMaxWidth)},`draw`)},styles:R}})))()}V();export{B as diagram};