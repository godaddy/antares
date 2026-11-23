import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,r as n}from"./chunk-Y2CYZVJY-BLgfQGNL.js";import{i as r,r as i}from"./d3-selection-DaGbIZS0.js";import{A as a,C as o,J as s,U as c,W as l,_ as u,a as d,b as f,c as p,f as m,v as h}from"./chunk-BG4553SI-BZc5sK7i.js";import{i as g,n as _}from"./d3-scale-CawyjbCm.js";import{S as v,g as y,n as b}from"./dist-DH_ACoYT.js";import{n as x,t as S}from"./chunk-OHR5NZHT-Dp-NkWch.js";import{n as C,t as w}from"./chunk-JWPE2WC7-CUwS0ygC.js";import{n as T,r as E}from"./mermaid-parser.core-CuRWAmWU.js";import{f as D,h as O,i as k}from"./chunk-6MUBBAK2-DheRuqWj.js";var A,j,M,N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{w(),S(),D(),a(),i(),n(),T(),y(),_(),A=m.pie,j={sections:new Map,showData:!1,config:A},M=j.sections,N=j.showData,P=structuredClone(A),F={getConfig:t(()=>structuredClone(P),`getConfig`),clear:t(()=>{M=new Map,N=j.showData,d()},`clear`),setDiagramTitle:s,getDiagramTitle:o,setAccTitle:l,getAccTitle:h,setAccDescription:c,getAccDescription:u,addSection:t(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);M.has(e)||(M.set(e,t),r.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:t(()=>M,`getSections`),setShowData:t(e=>{N=e},`setShowData`),getShowData:t(()=>N,`getShowData`)},I=t((e,t)=>{C(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),L={parse:t(async e=>{let t=await E(`pie`,e);r.debug(t),I(t,F)},`parse`)},R=t(e=>`
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
`,`getStyles`),z=t(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return v().value(e=>e.value).sort(null)(n)},`createPieArcs`),B={parser:L,db:F,renderer:{draw:t((e,t,n,i)=>{r.debug(`rendering pie chart
`+e);let a=i.db,o=f(),s=k(a.getConfig(),o.pie),c=x(t),l=c.append(`g`);l.attr(`transform`,`translate(225,225)`);let{themeVariables:u}=o,[d]=O(u.pieOuterStrokeWidth);d??=2;let m=s.legendPosition,h=s.textPosition,_=s.donutHole>0&&s.donutHole<=.9?s.donutHole:0,v=b().innerRadius(_*185).outerRadius(185),y=b().innerRadius(185*h).outerRadius(185*h),S=l.append(`g`);S.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+d/2).attr(`class`,`pieOuterCircle`);let C=a.getSections(),w=z(C),T=[u.pie1,u.pie2,u.pie3,u.pie4,u.pie5,u.pie6,u.pie7,u.pie8,u.pie9,u.pie10,u.pie11,u.pie12],E=0;C.forEach(e=>{E+=e});let D=w.filter(e=>(e.data.value/E*100).toFixed(0)!==`0`),A=g(T).domain([...C.keys()]);S.selectAll(`mySlices`).data(D).enter().append(`path`).attr(`d`,v).attr(`fill`,e=>A(e.data.label)).attr(`class`,e=>{let t=`pieCircle`;return s.highlightSlice===`hover`?t+=` highlightedOnHover`:s.highlightSlice===e.data.label&&(t+=` highlighted`),t}),S.selectAll(`mySlices`).data(D).enter().append(`text`).text(e=>(e.data.value/E*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+y.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let j=l.append(`text`).text(a.getDiagramTitle()).attr(`x`,0).attr(`y`,-200).attr(`class`,`pieTitleText`),M=[...C.entries()].map(([e,t])=>({label:e,value:t})),N=l.selectAll(`.legend`).data(M).enter().append(`g`).attr(`class`,`legend`);N.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>A(e.label)).style(`stroke`,e=>A(e.label)),N.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>a.getShowData()?`${e.label} [${e.value}]`:e.label);let P=Math.max(...N.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),F=450,I=490,L=M.length*22;switch(m){case`center`:N.attr(`transform`,(e,t)=>{let n=22*M.length/2,r=-P/2-22,i=t*22-n;return`translate(`+r+`,`+i+`)`});break;case`top`:F+=L,N.attr(`transform`,(e,t)=>`translate(${-P/2-22}, ${t*22-185})`),S.attr(`transform`,()=>`translate(0, ${L+22})`);break;case`bottom`:F+=L,N.attr(`transform`,(e,t)=>{let n=-P/2-22,r=t*22- -207;return`translate(`+n+`,`+r+`)`});break;case`left`:I+=22+P,N.attr(`transform`,(e,t)=>{let n=22*M.length/2;return`translate(-207,`+(t*22-n)+`)`}),S.attr(`transform`,()=>`translate(${P+18+4}, 0)`);break;default:I+=22+P,N.attr(`transform`,(e,t)=>{let n=22*M.length/2;return`translate(216,`+(t*22-n)+`)`})}let R=j.node()?.getBoundingClientRect().width??0,B=225-R/2,V=225+R/2,H=Math.min(0,B),U=Math.max(I,V)-H;c.attr(`viewBox`,`${H} 0 ${U} ${F}`),p(c,F,U,s.useMaxWidth)},`draw`)},styles:R}})))()}V();export{B as diagram};