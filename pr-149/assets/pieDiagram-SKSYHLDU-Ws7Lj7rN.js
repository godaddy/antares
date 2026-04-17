import{O as z,g as j,s as q,a as H,b as Z,t as J,q as K,_ as u,l as F,c as Q,G as X,L as Y,a3 as ee,e as te,A as ae,H as re}from"./mermaid.core-B4CtjLpU.js";import{p as ne}from"./chunk-4BX2VUAB-B9hqljVP.js";import{p as ie}from"./treemap-KZPCXAKY-BMikkDme.js";import{d as R}from"./arc-DBs_8Yjf.js";import{o as se}from"./ordinal-Cboi1Yqb.js";import{c as S,a as oe}from"./line-BwNS3LRv.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-5u2dU1qG.js";import"./string-BVYZ4x68.js";import"./index-DrFu-skq.js";import"./_baseUniq-DeJ09rrQ.js";import"./_basePickBy-3Nbpzvo6.js";import"./clone-CTDw-XiN.js";import"./init-Gi6I4Gst.js";function le(e,a){return a<e?-1:a>e?1:a>=e?0:NaN}function ce(e){return e}function pe(){var e=ce,a=le,f=null,x=S(0),s=S(z),l=S(0);function o(t){var n,c=(t=oe(t)).length,d,y,h=0,p=new Array(c),i=new Array(c),v=+x.apply(this,arguments),A=Math.min(z,Math.max(-z,s.apply(this,arguments)-v)),m,C=Math.min(Math.abs(A)/c,l.apply(this,arguments)),$=C*(A<0?-1:1),g;for(n=0;n<c;++n)(g=i[p[n]=n]=+e(t[n],n,t))>0&&(h+=g);for(a!=null?p.sort(function(w,D){return a(i[w],i[D])}):f!=null&&p.sort(function(w,D){return f(t[w],t[D])}),n=0,y=h?(A-c*$)/h:0;n<c;++n,v=m)d=p[n],g=i[d],m=v+(g>0?g*y:0)+$,i[d]={data:t[d],index:n,value:g,startAngle:v,endAngle:m,padAngle:C};return i}return o.value=function(t){return arguments.length?(e=typeof t=="function"?t:S(+t),o):e},o.sortValues=function(t){return arguments.length?(a=t,f=null,o):a},o.sort=function(t){return arguments.length?(f=t,a=null,o):f},o.startAngle=function(t){return arguments.length?(x=typeof t=="function"?t:S(+t),o):x},o.endAngle=function(t){return arguments.length?(s=typeof t=="function"?t:S(+t),o):s},o.padAngle=function(t){return arguments.length?(l=typeof t=="function"?t:S(+t),o):l},o}var ue=re.pie,G={sections:new Map,showData:!1},T=G.sections,N=G.showData,de=structuredClone(ue),ge=u(()=>structuredClone(de),"getConfig"),fe=u(()=>{T=new Map,N=G.showData,ae()},"clear"),me=u(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(e)||(T.set(e,a),F.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),he=u(()=>T,"getSections"),ve=u(e=>{N=e},"setShowData"),Se=u(()=>N,"getShowData"),I={getConfig:ge,clear:fe,setDiagramTitle:K,getDiagramTitle:J,setAccTitle:Z,getAccTitle:H,setAccDescription:q,getAccDescription:j,addSection:me,getSections:he,setShowData:ve,getShowData:Se},xe=u((e,a)=>{ne(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),ye={parse:u(async e=>{const a=await ie("pie",e);F.debug(a),xe(a,I)},"parse")},Ae=u(e=>`
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
`,"getStyles"),we=Ae,De=u(e=>{const a=[...e.values()].reduce((s,l)=>s+l,0),f=[...e.entries()].map(([s,l])=>({label:s,value:l})).filter(s=>s.value/a*100>=1).sort((s,l)=>l.value-s.value);return pe().value(s=>s.value)(f)},"createPieArcs"),Ce=u((e,a,f,x)=>{F.debug(`rendering pie chart
`+e);const s=x.db,l=Q(),o=X(s.getConfig(),l.pie),t=40,n=18,c=4,d=450,y=d,h=Y(a),p=h.append("g");p.attr("transform","translate("+y/2+","+d/2+")");const{themeVariables:i}=l;let[v]=ee(i.pieOuterStrokeWidth);v??=2;const A=o.textPosition,m=Math.min(y,d)/2-t,C=R().innerRadius(0).outerRadius(m),$=R().innerRadius(m*A).outerRadius(m*A);p.append("circle").attr("cx",0).attr("cy",0).attr("r",m+v/2).attr("class","pieOuterCircle");const g=s.getSections(),w=De(g),D=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let b=0;g.forEach(r=>{b+=r});const O=w.filter(r=>(r.data.value/b*100).toFixed(0)!=="0"),E=se(D);p.selectAll("mySlices").data(O).enter().append("path").attr("d",C).attr("fill",r=>E(r.data.label)).attr("class","pieCircle"),p.selectAll("mySlices").data(O).enter().append("text").text(r=>(r.data.value/b*100).toFixed(0)+"%").attr("transform",r=>"translate("+$.centroid(r)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const W=[...g.entries()].map(([r,M])=>({label:r,value:M})),k=p.selectAll(".legend").data(W).enter().append("g").attr("class","legend").attr("transform",(r,M)=>{const P=n+c,B=P*W.length/2,V=12*n,U=M*P-B;return"translate("+V+","+U+")"});k.append("rect").attr("width",n).attr("height",n).style("fill",r=>E(r.label)).style("stroke",r=>E(r.label)),k.append("text").attr("x",n+c).attr("y",n-c).text(r=>s.getShowData()?`${r.label} [${r.value}]`:r.label);const _=Math.max(...k.selectAll("text").nodes().map(r=>r?.getBoundingClientRect().width??0)),L=y+t+n+c+_;h.attr("viewBox",`0 0 ${L} ${d}`),te(h,d,L,o.useMaxWidth)},"draw"),$e={draw:Ce},Ie={parser:ye,db:I,renderer:$e,styles:we};export{Ie as diagram};
