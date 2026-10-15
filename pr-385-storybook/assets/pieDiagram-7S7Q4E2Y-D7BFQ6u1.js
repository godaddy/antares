import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,r as n}from"./chunk-Y2CYZVJY-C0ErJKbO.js";import{a as r,i,t as a}from"./src-BiKVazO9.js";import{U as o,W as s,a as c,c as l,f as u,j as d,q as f,v as p,w as m,x as h,y as g}from"./chunk-I66GZJ75-CfYfJyW7.js";import{n as _}from"./ordinal-qriLbjob.js";import{t as v}from"./arc-Or95cSfK.js";import{n as y}from"./pie-Bf1NeaBs.js";import{d as b,i as x,m as S}from"./chunk-NSK5VX7P-2i-wtdib.js";import{n as C,t as w}from"./chunk-3NCLNEKW-rGtAmO6g.js";import{n as T,t as E}from"./chunk-JWPE2WC7-fSzem9U5.js";import{n as D,r as O}from"./mermaid-parser.core-CVm-BpWr.js";var k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{E(),w(),b(),d(),i(),n(),D(),a(),k=u.pie,A={sections:new Map,showData:!1,config:k},j=A.sections,M=A.showData,N=structuredClone(k),P={getConfig:t(()=>structuredClone(N),`getConfig`),clear:t(()=>{j=new Map,M=A.showData,c()},`clear`),setDiagramTitle:f,getDiagramTitle:m,setAccTitle:s,getAccTitle:g,setAccDescription:o,getAccDescription:p,addSection:t(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);j.has(e)||(j.set(e,t),r.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:t(()=>j,`getSections`),setShowData:t(e=>{M=e},`setShowData`),getShowData:t(()=>M,`getShowData`)},F=t((e,t)=>{T(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),I={parse:t(async e=>{let t=await O(`pie`,e);r.debug(t),F(t,P)},`parse`)},L=t(e=>`
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
`,`getStyles`),R=t(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return y().value(e=>e.value).sort(null)(n)},`createPieArcs`),z={parser:I,db:P,renderer:{draw:t((e,t,n,i)=>{r.debug(`rendering pie chart
`+e);let a=i.db,o=h(),s=x(a.getConfig(),o.pie),c=C(t),u=c.append(`g`);u.attr(`transform`,`translate(225,225)`);let{themeVariables:d}=o,[f]=S(d.pieOuterStrokeWidth);f??=2;let p=s.legendPosition,m=s.textPosition,g=s.donutHole>0&&s.donutHole<=.9?s.donutHole:0,y=v().innerRadius(g*185).outerRadius(185),b=v().innerRadius(185*m).outerRadius(185*m),w=u.append(`g`);w.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+f/2).attr(`class`,`pieOuterCircle`);let T=a.getSections(),E=R(T),D=[d.pie1,d.pie2,d.pie3,d.pie4,d.pie5,d.pie6,d.pie7,d.pie8,d.pie9,d.pie10,d.pie11,d.pie12],O=0;T.forEach(e=>{O+=e});let k=E.filter(e=>(e.data.value/O*100).toFixed(0)!==`0`),A=_(D).domain([...T.keys()]);w.selectAll(`mySlices`).data(k).enter().append(`path`).attr(`d`,y).attr(`fill`,e=>A(e.data.label)).attr(`class`,e=>{let t=`pieCircle`;return s.highlightSlice===`hover`?t+=` highlightedOnHover`:s.highlightSlice===e.data.label&&(t+=` highlighted`),t}),w.selectAll(`mySlices`).data(k).enter().append(`text`).text(e=>(e.data.value/O*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+b.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let j=u.append(`text`).text(a.getDiagramTitle()).attr(`x`,0).attr(`y`,-200).attr(`class`,`pieTitleText`),M=[...T.entries()].map(([e,t])=>({label:e,value:t})),N=u.selectAll(`.legend`).data(M).enter().append(`g`).attr(`class`,`legend`);N.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>A(e.label)).style(`stroke`,e=>A(e.label)),N.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>a.getShowData()?`${e.label} [${e.value}]`:e.label);let P=Math.max(...N.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),F=450,I=490,L=M.length*22;switch(p){case`center`:N.attr(`transform`,(e,t)=>{let n=22*M.length/2,r=-P/2-22,i=t*22-n;return`translate(`+r+`,`+i+`)`});break;case`top`:F+=L,N.attr(`transform`,(e,t)=>`translate(${-P/2-22}, ${t*22-185})`),w.attr(`transform`,()=>`translate(0, ${L+22})`);break;case`bottom`:F+=L,N.attr(`transform`,(e,t)=>{let n=-P/2-22,r=t*22- -207;return`translate(`+n+`,`+r+`)`});break;case`left`:I+=22+P,N.attr(`transform`,(e,t)=>{let n=22*M.length/2;return`translate(-207,`+(t*22-n)+`)`}),w.attr(`transform`,()=>`translate(${P+18+4}, 0)`);break;default:I+=22+P,N.attr(`transform`,(e,t)=>{let n=22*M.length/2;return`translate(216,`+(t*22-n)+`)`})}let z=j.node()?.getBoundingClientRect().width??0,B=225-z/2,V=225+z/2,H=Math.min(0,B),U=Math.max(I,V)-H;c.attr(`viewBox`,`${H} 0 ${U} ${F}`),l(c,F,U,s.useMaxWidth)},`draw`)},styles:L}})))()}B();export{z as diagram};