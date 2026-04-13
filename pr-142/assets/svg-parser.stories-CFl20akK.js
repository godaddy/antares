import{j as s}from"./iframe-D3fDdFQ4.js";import{p as r}from"./index-nL0bCRPD.js";const i=`
<svg width="100" height="100">
  <rect x="10" y="10" width="80" height="80" fill="blue" />
</svg>
`;function o(){return r(i)}const a=`
<svg width="200" height="200">
  <custom-shape x="50" y="50" size="100" stroke-width="2" class="purple-box" />
  <special-element type="circle" radius="40" stroke-width="3" class="orange-circle" />
  <rect x="10" y="10" width="50" height="50" stroke-width="1" class="blue-box" />
</svg>
`;function c(){return r(a,{nodes:{"custom-shape":t=>["rect",{x:t.getAttribute("x"),y:t.getAttribute("y"),width:t.getAttribute("size"),height:t.getAttribute("size"),fill:"purple",rx:"8",strokeWidth:t.getAttribute("stroke-width"),className:t.getAttribute("class")}],"special-element":t=>["circle",{cx:"100",cy:"100",r:t.getAttribute("radius"),fill:"orange",strokeWidth:t.getAttribute("stroke-width"),className:t.getAttribute("class")}]},props:{"stroke-width":t=>["strokeWidth",t.getAttribute("stroke-width")],class:t=>["className",t.getAttribute("class")]}})}const n=`
<svg width="200" height="200">
  <custom-shape x="50" y="50" size="100" />
  <special-element type="circle" radius="40" />
</svg>
`;function l(){return r(n,{nodes:{"custom-shape":t=>["rect",{x:t.getAttribute("x"),y:t.getAttribute("y"),width:t.getAttribute("size"),height:t.getAttribute("size"),fill:"purple",rx:"8"}],"special-element":t=>["circle",{cx:"100",cy:"100",r:t.getAttribute("radius"),fill:"orange"}]}})}const u=`
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke-width="2" class="custom-circle" />
</svg>
`;function p(){return r(u,{props:{class:t=>["className",t.getAttribute("class")],"stroke-width":t=>["strokeWidth",t.getAttribute("stroke-width")]}})}const g={title:"utility/svg-parser"},h={render:e=>s.jsx(o,{...e})},m={render:e=>s.jsx(c,{...e})},d={render:e=>s.jsx(l,{...e})},x={render:e=>s.jsx(p,{...e})},b={tags:["!dev","stable"],name:"parser",parameters:{controls:{expanded:!0}},argTypes:{source:{control:"text",description:"The SVG string to be transformed"},nodes:{control:"object",description:"Custom node transformation functions. Each key is an SVG element name to transform, and the value is a function that returns [componentName, props]"},props:{control:"object",description:"Custom property transformation functions. Each key is an SVG attribute name to transform, and the value is a function that returns [propName, propValue]"}}},v=["Basic","Complex","CustomNodes","CustomProps","svgParserAPI"],A=Object.freeze(Object.defineProperty({__proto__:null,Basic:h,Complex:m,CustomNodes:d,CustomProps:x,__namedExportsOrder:v,default:g,svgParserAPI:b},Symbol.toStringTag,{value:"Module"}));export{h as B,x as C,A as S,d as a,m as b,b as s};
