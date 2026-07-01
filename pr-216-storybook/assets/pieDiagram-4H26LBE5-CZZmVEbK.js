import{i as e}from"./preload-helper-D5h1UUhK.js";import{n as t,t as n}from"./mermaid-parser.core-BN3914Ws.js";import{g as r,h as i,m as a,t as o}from"./src-DD4oN1U-.js";import{U as s,W as c,a as l,c as u,f as d,j as f,q as p,v as m,w as h,x as g,y as _}from"./chunk-CSCIHK7Q-CoV7Q_Zt.js";import{H as v,Jt as y,L as b}from"./src-DF48VE9g.js";import{n as x,t as S}from"./chunk-WU5MYG2G-D0eXsjv9.js";import{d as C,i as w,m as T}from"./chunk-5ZQYHXKU-pcvBNXig.js";import{n as E,t as D}from"./chunk-4BX2VUAB-Bd2c4bEg.js";var O,k,A,j,M,N,P,F,I,L,R;e((()=>{S(),D(),C(),f(),i(),n(),o(),O=d.pie,k={sections:new Map,showData:!1,config:O},A=k.sections,j=k.showData,M=structuredClone(O),N={getConfig:a(()=>structuredClone(M),`getConfig`),clear:a(()=>{A=new Map,j=k.showData,l()},`clear`),setDiagramTitle:p,getDiagramTitle:h,setAccTitle:c,getAccTitle:_,setAccDescription:s,getAccDescription:m,addSection:a(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);A.has(e)||(A.set(e,t),r.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:a(()=>A,`getSections`),setShowData:a(e=>{j=e},`setShowData`),getShowData:a(()=>j,`getShowData`)},P=a((e,t)=>{E(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),F={parse:a(async e=>{let n=await t(`pie`,e);r.debug(n),P(n,N)},`parse`)},I=a(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
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
`,`getStyles`),L=a(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return b().value(e=>e.value).sort(null)(n)},`createPieArcs`),R={parser:F,db:N,renderer:{draw:a((e,t,n,i)=>{r.debug(`rendering pie chart
`+e);let a=i.db,o=g(),s=w(a.getConfig(),o.pie),c=x(t),l=c.append(`g`);l.attr(`transform`,`translate(225,225)`);let{themeVariables:d}=o,[f]=T(d.pieOuterStrokeWidth);f??=2;let p=s.textPosition,m=v().innerRadius(0).outerRadius(185),h=v().innerRadius(185*p).outerRadius(185*p);l.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+f/2).attr(`class`,`pieOuterCircle`);let _=a.getSections(),b=L(_),S=[d.pie1,d.pie2,d.pie3,d.pie4,d.pie5,d.pie6,d.pie7,d.pie8,d.pie9,d.pie10,d.pie11,d.pie12],C=0;_.forEach(e=>{C+=e});let E=b.filter(e=>(e.data.value/C*100).toFixed(0)!==`0`),D=y(S).domain([..._.keys()]);l.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,m).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),l.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/C*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+h.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let O=l.append(`text`).text(a.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`),k=[..._.entries()].map(([e,t])=>({label:e,value:t})),A=l.selectAll(`.legend`).data(k).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*k.length/2;return`translate(216,`+(t*22-n)+`)`});A.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),A.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>a.getShowData()?`${e.label} [${e.value}]`:e.label);let j=512+Math.max(...A.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),M=O.node()?.getBoundingClientRect().width??0,N=450/2-M/2,P=450/2+M/2,F=Math.min(0,N),I=Math.max(j,P)-F;c.attr(`viewBox`,`${F} 0 ${I} 450`),u(c,450,I,s.useMaxWidth)},`draw`)},styles:I}}))();export{R as diagram};