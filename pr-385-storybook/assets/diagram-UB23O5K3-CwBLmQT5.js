import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,r as n}from"./chunk-Y2CYZVJY-C0ErJKbO.js";import{a as r,i}from"./src-BiKVazO9.js";import{D as a,U as o,W as s,a as c,b as l,c as u,f as d,j as f,q as p,v as m,w as h,y as g}from"./chunk-I66GZJ75-CfYfJyW7.js";import{d as _,i as v}from"./chunk-NSK5VX7P-2i-wtdib.js";import{n as y,t as b}from"./chunk-3NCLNEKW-rGtAmO6g.js";import{n as x,t as S}from"./chunk-JWPE2WC7-fSzem9U5.js";import{n as C,r as w}from"./mermaid-parser.core-CVm-BpWr.js";function T(e,t,n,r,i,a,o){let s=t.length,c=Math.min(o.width,o.height)/2;n.forEach((t,n)=>{if(t.entries.length!==s)return;let l=t.entries.map((e,t)=>{let n=2*Math.PI*t/s-Math.PI/2,a=E(e,r,i,c);return{x:a*Math.cos(n),y:a*Math.sin(n)}});a===`circle`?e.append(`path`).attr(`d`,D(l,o.curveTension)).attr(`class`,`radarCurve-${n}`):a===`polygon`&&e.append(`polygon`).attr(`points`,l.map(e=>`${e.x},${e.y}`).join(` `)).attr(`class`,`radarCurve-${n}`)})}function E(e,t,n,r){return r*(Math.min(Math.max(e,t),n)-t)/(n-t)}function D(e,t){let n=e.length,r=`M${e[0].x},${e[0].y}`;for(let i=0;i<n;i++){let a=e[(i-1+n)%n],o=e[i],s=e[(i+1)%n],c=e[(i+2)%n],l={x:o.x+(s.x-a.x)*t,y:o.y+(s.y-a.y)*t},u={x:s.x-(c.x-o.x)*t,y:s.y-(c.y-o.y)*t};r+=` C${l.x},${l.y} ${u.x},${u.y} ${s.x},${s.y}`}return`${r} Z`}function O(e,t,n,r){if(!n)return;let i=(r.width/2+r.marginRight)*3/4,a=-(r.height/2+r.marginTop)*3/4;t.forEach((t,n)=>{let r=e.append(`g`).attr(`transform`,`translate(${i}, ${a+n*20})`);r.append(`rect`).attr(`width`,12).attr(`height`,12).attr(`class`,`radarLegendBox-${n}`),r.append(`text`).attr(`x`,16).attr(`y`,0).attr(`class`,`radarLegendText`).text(t.label)})}var k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{S(),b(),_(),f(),i(),n(),C(),k={showLegend:!0,ticks:5,max:null,min:0,graticule:`circle`},A=32,j={axes:[],curves:[],options:k},M=structuredClone(j),N=d.radar,P=t(()=>v({...N,...l().radar}),`getConfig`),F=t(()=>M.axes,`getAxes`),I=t(()=>M.curves,`getCurves`),L=t(()=>M.options,`getOptions`),R=t(e=>{M.axes=e.map(e=>({name:e.name,label:e.label??e.name}))},`setAxes`),z=t(e=>{M.curves=e.map(e=>({name:e.name,label:e.label??e.name,entries:B(e.entries)}))},`setCurves`),B=t(e=>{if(e[0].axis==null)return e.map(e=>e.value);let t=F();if(t.length===0)throw Error(`Axes must be populated before curves for reference entries`);return t.map(t=>{let n=e.find(e=>e.axis?.$refText===t.name);if(n===void 0)throw Error(`Missing entry for axis `+t.label);return n.value})},`computeCurveEntries`),V={getAxes:F,getCurves:I,getOptions:L,setAxes:R,setCurves:z,setOptions:t(e=>{let t=e.reduce((e,t)=>(e[t.name]=t,e),{});M.options={showLegend:t.showLegend?.value??k.showLegend,ticks:t.ticks?.value??k.ticks,max:t.max?.value??k.max,min:t.min?.value??k.min,graticule:t.graticule?.value??k.graticule},M.options.ticks>A&&(r.warn(`Radar diagram ticks (${M.options.ticks}) exceeds maximum allowed (${A}). Using ${A} instead.`),M.options.ticks=A)},`setOptions`),getConfig:P,clear:t(()=>{c(),M=structuredClone(j)},`clear`),setAccTitle:s,getAccTitle:g,setDiagramTitle:p,getDiagramTitle:h,getAccDescription:m,setAccDescription:o},H=t(e=>{x(e,V);let{axes:t,curves:n,options:r}=e;V.setAxes(t),V.setCurves(n),V.setOptions(r)},`populate`),U={parse:t(async e=>{let t=await w(`radar`,e);r.debug(t),H(t)},`parse`)},W=t((e,t,n,r)=>{let i=r.db,a=i.getAxes(),o=i.getCurves(),s=i.getOptions(),c=i.getConfig(),l=i.getDiagramTitle(),u=G(y(t),c),d=s.max??Math.max(...o.map(e=>Math.max(...e.entries))),f=s.min,p=Math.min(c.width,c.height)/2;K(u,a,p,s.ticks,s.graticule),q(u,a,p,c),T(u,a,o,f,d,s.graticule,c),O(u,o,s.showLegend,c),u.append(`text`).attr(`class`,`radarTitle`).text(l).attr(`x`,0).attr(`y`,-c.height/2-c.marginTop)},`draw`),G=t((e,t)=>{let n=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,i={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return u(e,r,n,t.useMaxWidth??!0),e.attr(`viewBox`,`0 0 ${n} ${r}`).attr(`overflow`,`visible`),e.append(`g`).attr(`transform`,`translate(${i.x}, ${i.y})`)},`drawFrame`),K=t((e,t,n,r,i)=>{if(i===`circle`)for(let t=0;t<r;t++){let i=n*(t+1)/r;e.append(`circle`).attr(`r`,i).attr(`class`,`radarGraticule`)}else if(i===`polygon`){let i=t.length;for(let a=0;a<r;a++){let o=n*(a+1)/r,s=t.map((e,t)=>{let n=2*t*Math.PI/i-Math.PI/2;return`${o*Math.cos(n)},${o*Math.sin(n)}`}).join(` `);e.append(`polygon`).attr(`points`,s).attr(`class`,`radarGraticule`)}}},`drawGraticule`),q=t((e,t,n,r)=>{let i=t.length;for(let a=0;a<i;a++){let o=t[a].label,s=2*a*Math.PI/i-Math.PI/2,c=Math.cos(s),l=Math.sin(s);e.append(`line`).attr(`x1`,0).attr(`y1`,0).attr(`x2`,n*r.axisScaleFactor*c).attr(`y2`,n*r.axisScaleFactor*l).attr(`class`,`radarAxisLine`);let u=c>.01?`start`:c<-.01?`end`:`middle`,d=l>.01?`hanging`:l<-.01?`auto`:`central`;e.append(`text`).text(o).attr(`x`,n*r.axisLabelFactor*c+4*c).attr(`y`,n*r.axisLabelFactor*l+4*l).attr(`text-anchor`,u).attr(`dominant-baseline`,d).attr(`class`,`radarAxisLabel`)}},`drawAxes`),t(T,`drawCurves`),t(E,`relativeRadius`),t(D,`closedRoundCurve`),t(O,`drawLegend`),J={draw:W},Y=t((e,t)=>{let n=``;for(let r=0;r<e.THEME_COLOR_LIMIT;r++){let i=e[`cScale${r}`];n+=`
		.radarCurve-${r} {
			color: ${i};
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
		}
		`}return n},`genIndexStyles`),X=t(e=>{let t=a(),n=l(),r=v(t,n.themeVariables);return{themeVariables:r,radarOptions:v(r.radar,e)}},`buildRadarStyleOptions`),Z={parser:U,db:V,renderer:J,styles:t(({radar:e}={})=>{let{themeVariables:t,radarOptions:n}=X(e);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${n.axisColor};
		stroke-width: ${n.axisStrokeWidth};
	}
	.radarAxisLabel {
		font-size: ${n.axisLabelFontSize}px;
		color: ${n.axisColor};
	}
	.radarGraticule {
		fill: ${n.graticuleColor};
		fill-opacity: ${n.graticuleOpacity};
		stroke: ${n.graticuleColor};
		stroke-width: ${n.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${n.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${Y(t,n)}
	`},`styles`)}})))()}Q();export{Z as diagram};