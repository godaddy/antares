import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,r as n}from"./chunk-Y2CYZVJY-BLgfQGNL.js";import{i as r,r as i}from"./d3-selection-DaGbIZS0.js";import{A as a,C as o,J as s,U as c,W as l,_ as u,a as d,c as f,f as p,v as m,y as h}from"./chunk-BG4553SI-BZc5sK7i.js";import{n as g,t as _}from"./chunk-OHR5NZHT-Dp-NkWch.js";import{n as v,t as y}from"./chunk-JWPE2WC7-CUwS0ygC.js";import{n as b,r as x}from"./mermaid-parser.core-CuRWAmWU.js";import{f as S,i as C}from"./chunk-6MUBBAK2-DheRuqWj.js";var w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{y(),_(),S(),a(),i(),n(),b(),w=p.packet,T=class{constructor(){this.packet=[],this.setAccTitle=l,this.getAccTitle=m,this.setDiagramTitle=s,this.getDiagramTitle=o,this.getAccDescription=u,this.setAccDescription=c}static{t(this,`PacketDB`)}getConfig(){let e=C({...w,...h().packet});return e.showBits&&(e.paddingY+=10),e}getPacket(){return this.packet}pushWord(e){e.length>0&&this.packet.push(e)}clear(){d(),this.packet=[]}},E=1e4,D=t((e,t)=>{v(e,t);let n=-1,i=[],a=1,{bitsPerRow:o}=t.getConfig();for(let{start:s,end:c,bits:l,label:u}of e.blocks){if(s!==void 0&&c!==void 0&&c<s)throw Error(`Packet block ${s} - ${c} is invalid. End must be greater than start.`);if(s??=n+1,s!==n+1)throw Error(`Packet block ${s} - ${c??s} is not contiguous. It should start from ${n+1}.`);if(l===0)throw Error(`Packet block ${s} is invalid. Cannot have a zero bit field.`);for(c??=s+(l??1)-1,l??=c-s+1,n=c,r.debug(`Packet block ${s} - ${n} with label ${u}`);i.length<=o+1&&t.getPacket().length<E;){let[e,n]=O({start:s,end:c,bits:l,label:u},a,o);if(i.push(e),e.end+1===a*o&&(t.pushWord(i),i=[],a++),!n)break;({start:s,end:c,bits:l,label:u}=n)}}t.pushWord(i)},`populate`),O=t((e,t,n)=>{if(e.start===void 0)throw Error(`start should have been set during first phase`);if(e.end===void 0)throw Error(`end should have been set during first phase`);if(e.start>e.end)throw Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*n)return[e,void 0];let r=t*n-1,i=t*n;return[{start:e.start,end:r,label:e.label,bits:r-e.start},{start:i,end:e.end,label:e.label,bits:e.end-i}]},`getNextFittingBlock`),k={parser:{yy:void 0},parse:t(async e=>{let t=await x(`packet`,e),n=k.parser?.yy;if(!(n instanceof T))throw Error(`parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.`);r.debug(t),D(t,n)},`parse`)},A=t((e,t,n,r)=>{let i=r.db,a=i.getConfig(),{rowHeight:o,paddingY:s,bitWidth:c,bitsPerRow:l}=a,u=i.getPacket(),d=i.getDiagramTitle(),p=o+s,m=p*(u.length+1)-(d?0:o),h=c*l+2,_=g(t);_.attr(`viewBox`,`0 0 ${h} ${m}`),f(_,m,h,a.useMaxWidth);for(let[e,t]of u.entries())j(_,t,e,a);_.append(`text`).text(d).attr(`x`,h/2).attr(`y`,m-p/2).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).attr(`class`,`packetTitle`)},`draw`),j=t((e,t,n,{rowHeight:r,paddingX:i,paddingY:a,bitWidth:o,bitsPerRow:s,showBits:c,bitOrder:l})=>{let u=e.append(`g`),d=n*(r+a)+a,f=l===`descending`;for(let e of t){let t=e.end-e.start+1,n=e.start%s,a=(f?s-n-t:n)*o+1,l=t*o-i;if(u.append(`rect`).attr(`x`,a).attr(`y`,d).attr(`width`,l).attr(`height`,r).attr(`class`,`packetBlock`),u.append(`text`).attr(`x`,a+l/2).attr(`y`,d+r/2).attr(`class`,`packetLabel`).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).text(e.label),!c)continue;let[p,m]=f?[e.end,e.start]:[e.start,e.end],h=t===1,g=d-2;u.append(`text`).attr(`x`,a+(h?l/2:0)).attr(`y`,g).attr(`class`,`packetByte start`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,h?`middle`:`start`).text(p),h||u.append(`text`).attr(`x`,a+l).attr(`y`,g).attr(`class`,`packetByte end`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,`end`).text(m)}},`drawWord`),M={draw:A},N={byteFontSize:`10px`,startByteColor:`black`,endByteColor:`black`,labelColor:`black`,labelFontSize:`12px`,titleColor:`black`,titleFontSize:`14px`,blockStrokeColor:`black`,blockStrokeWidth:`1`,blockFillColor:`#efefef`},P={parser:k,get db(){return new T},renderer:M,styles:t(({packet:e}={})=>{let t=C(N,e);return`
	.packetByte {
		font-size: ${t.byteFontSize};
	}
	.packetByte.start {
		fill: ${t.startByteColor};
	}
	.packetByte.end {
		fill: ${t.endByteColor};
	}
	.packetLabel {
		fill: ${t.labelColor};
		font-size: ${t.labelFontSize};
	}
	.packetTitle {
		fill: ${t.titleColor};
		font-size: ${t.titleFontSize};
	}
	.packetBlock {
		stroke: ${t.blockStrokeColor};
		stroke-width: ${t.blockStrokeWidth};
		fill: ${t.blockFillColor};
	}
	`},`styles`)}})))()}F();export{P as diagram};