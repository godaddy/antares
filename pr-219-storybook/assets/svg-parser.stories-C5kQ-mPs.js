import{a as e,i as t}from"./preload-helper-CLVkNUVT.js";import{y as n}from"./iframe-CkigS-hY.js";import{n as r,t as i}from"./src-CHKKkcqa.js";function a(){return r(o)}var o,s=t((()=>{i(),o=`
<svg width="100" height="100">
  <rect x="10" y="10" width="80" height="80" fill="blue" />
</svg>
`}));function c(){return r(l,{nodes:{"custom-shape":e=>[`rect`,{x:e.getAttribute(`x`),y:e.getAttribute(`y`),width:e.getAttribute(`size`),height:e.getAttribute(`size`),fill:`purple`,rx:`8`,strokeWidth:e.getAttribute(`stroke-width`),className:e.getAttribute(`class`)}],"special-element":e=>[`circle`,{cx:`100`,cy:`100`,r:e.getAttribute(`radius`),fill:`orange`,strokeWidth:e.getAttribute(`stroke-width`),className:e.getAttribute(`class`)}]},props:{"stroke-width":e=>[`strokeWidth`,e.getAttribute(`stroke-width`)],class:e=>[`className`,e.getAttribute(`class`)]}})}var l,u=t((()=>{i(),l=`
<svg width="200" height="200">
  <custom-shape x="50" y="50" size="100" stroke-width="2" class="purple-box" />
  <special-element type="circle" radius="40" stroke-width="3" class="orange-circle" />
  <rect x="10" y="10" width="50" height="50" stroke-width="1" class="blue-box" />
</svg>
`}));function d(){return r(f,{nodes:{"custom-shape":e=>[`rect`,{x:e.getAttribute(`x`),y:e.getAttribute(`y`),width:e.getAttribute(`size`),height:e.getAttribute(`size`),fill:`purple`,rx:`8`}],"special-element":e=>[`circle`,{cx:`100`,cy:`100`,r:e.getAttribute(`radius`),fill:`orange`}]}})}var f,p=t((()=>{i(),f=`
<svg width="200" height="200">
  <custom-shape x="50" y="50" size="100" />
  <special-element type="circle" radius="40" />
</svg>
`}));function m(){return r(h,{props:{class:e=>[`className`,e.getAttribute(`class`)],"stroke-width":e=>[`strokeWidth`,e.getAttribute(`stroke-width`)]}})}var h,g=t((()=>{i(),h=`
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke-width="2" class="custom-circle" />
</svg>
`})),_=e({Basic:()=>b,Complex:()=>x,CustomNodes:()=>S,CustomProps:()=>C,__namedExportsOrder:()=>T,default:()=>y,svgParserAPI:()=>w}),v,y,b,x,S,C,w,T,E=t((()=>{s(),u(),p(),g(),v=n(),y={title:`Bento/utility/svg-parser`},b={render:e=>(0,v.jsx)(a,{...e})},x={render:e=>(0,v.jsx)(c,{...e})},S={render:e=>(0,v.jsx)(d,{...e})},C={render:e=>(0,v.jsx)(m,{...e})},w={tags:[`!dev`,`stable`],name:`parser`,parameters:{controls:{expanded:!0}},argTypes:{source:{control:`text`,description:`The SVG string to be transformed`},nodes:{control:`object`,description:`Custom node transformation functions. Each key is an SVG element name to transform, and the value is a function that returns [componentName, props]`},props:{control:`object`,description:`Custom property transformation functions. Each key is an SVG attribute name to transform, and the value is a function that returns [propName, propValue]`}}},T=[`Basic`,`Complex`,`CustomNodes`,`CustomProps`,`svgParserAPI`]}));E();export{b as Basic,x as Complex,S as CustomNodes,C as CustomProps,T as __namedExportsOrder,y as default,_ as n,w as svgParserAPI,E as t};