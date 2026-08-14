import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,r as n}from"./mermaid-parser.core-D2pdtbNS.js";import{n as r,r as i}from"./chunk-Y2CYZVJY-C0ErJKbO.js";import{a,i as o,t as s}from"./src-ZTUyHSyZ.js";import{U as c,W as l,a as u,c as d,f,j as p,q as m,v as h,w as g,x as _,y as v}from"./chunk-I66GZJ75-Blc6FGnJ.js";import{n as y}from"./ordinal-qriLbjob.js";import{t as b}from"./arc-lqCpB7PJ.js";import{n as x}from"./pie-DLYrvLpu.js";import{d as S,i as C,m as w}from"./chunk-NSK5VX7P-BN8lbHLM.js";import{n as T,t as E}from"./chunk-JWPE2WC7-fSzem9U5.js";import{l as D,u as O}from"./mermaid.core-BiOBubnH.js";var k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{E(),D(),S(),p(),o(),i(),t(),s(),k=f.pie,A={sections:new Map,showData:!1,config:k},j=A.sections,M=A.showData,N=structuredClone(k),P={getConfig:r(()=>structuredClone(N),`getConfig`),clear:r(()=>{j=new Map,M=A.showData,u()},`clear`),setDiagramTitle:m,getDiagramTitle:g,setAccTitle:l,getAccTitle:v,setAccDescription:c,getAccDescription:h,addSection:r(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);j.has(e)||(j.set(e,t),a.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:r(()=>j,`getSections`),setShowData:r(e=>{M=e},`setShowData`),getShowData:r(()=>M,`getShowData`)},F=r((e,t)=>{T(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),I={parse:r(async e=>{let t=await n(`pie`,e);a.debug(t),F(t,P)},`parse`)},L=r(e=>`
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
`,`getStyles`),R=r(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return x().value(e=>e.value).sort(null)(n)},`createPieArcs`),z={parser:I,db:P,renderer:{draw:r((e,t,n,r)=>{a.debug(`rendering pie chart
`+e);let i=r.db,o=_(),s=C(i.getConfig(),o.pie),c=O(t),l=c.append(`g`);l.attr(`transform`,`translate(225,225)`);let{themeVariables:u}=o,[f]=w(u.pieOuterStrokeWidth);f??=2;let p=s.legendPosition,m=s.textPosition,h=s.donutHole>0&&s.donutHole<=.9?s.donutHole:0,g=b().innerRadius(h*185).outerRadius(185),v=b().innerRadius(185*m).outerRadius(185*m),x=l.append(`g`);x.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+f/2).attr(`class`,`pieOuterCircle`);let S=i.getSections(),T=R(S),E=[u.pie1,u.pie2,u.pie3,u.pie4,u.pie5,u.pie6,u.pie7,u.pie8,u.pie9,u.pie10,u.pie11,u.pie12],D=0;S.forEach(e=>{D+=e});let k=T.filter(e=>(e.data.value/D*100).toFixed(0)!==`0`),A=y(E).domain([...S.keys()]);x.selectAll(`mySlices`).data(k).enter().append(`path`).attr(`d`,g).attr(`fill`,e=>A(e.data.label)).attr(`class`,e=>{let t=`pieCircle`;return s.highlightSlice===`hover`?t+=` highlightedOnHover`:s.highlightSlice===e.data.label&&(t+=` highlighted`),t}),x.selectAll(`mySlices`).data(k).enter().append(`text`).text(e=>(e.data.value/D*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+v.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let j=l.append(`text`).text(i.getDiagramTitle()).attr(`x`,0).attr(`y`,-200).attr(`class`,`pieTitleText`),M=[...S.entries()].map(([e,t])=>({label:e,value:t})),N=l.selectAll(`.legend`).data(M).enter().append(`g`).attr(`class`,`legend`);N.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>A(e.label)).style(`stroke`,e=>A(e.label)),N.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>i.getShowData()?`${e.label} [${e.value}]`:e.label);let P=Math.max(...N.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),F=450,I=490,L=M.length*22;switch(p){case`center`:N.attr(`transform`,(e,t)=>{let n=22*M.length/2,r=-P/2-22,i=t*22-n;return`translate(`+r+`,`+i+`)`});break;case`top`:F+=L,N.attr(`transform`,(e,t)=>`translate(${-P/2-22}, ${t*22-185})`),x.attr(`transform`,()=>`translate(0, ${L+22})`);break;case`bottom`:F+=L,N.attr(`transform`,(e,t)=>{let n=-P/2-22,r=t*22- -207;return`translate(`+n+`,`+r+`)`});break;case`left`:I+=22+P,N.attr(`transform`,(e,t)=>{let n=22*M.length/2;return`translate(-207,`+(t*22-n)+`)`}),x.attr(`transform`,()=>`translate(${P+18+4}, 0)`);break;default:I+=22+P,N.attr(`transform`,(e,t)=>{let n=22*M.length/2;return`translate(216,`+(t*22-n)+`)`})}let z=j.node()?.getBoundingClientRect().width??0,B=225-z/2,V=225+z/2,H=Math.min(0,B),U=Math.max(I,V)-H;c.attr(`viewBox`,`${H} 0 ${U} ${F}`),d(c,F,U,s.useMaxWidth)},`draw`)},styles:L}})))()}B();export{z as diagram};