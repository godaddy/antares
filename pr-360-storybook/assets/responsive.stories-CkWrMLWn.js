import{a as e,i as t,s as n}from"./preload-helper-BbaScr5H.js";import{F as r,st as i}from"./iframe-CQmmwSs3.js";import{r as a}from"./src-Bl-9YPFk.js";import{Cn as o,Dn as s,a as c,bt as l,o as u,r as d,t as f,wt as p}from"./antares-SBlw-jMT.js";import{n as m}from"./src-B0hvqaS6.js";function h({query:e=u.lg,ssrMatch:t=!1}){return(0,g.jsx)(m,{role:`status`,children:d(e,{ssrMatch:t})?`Matches`:`Does not match`})}var g,_=t((()=>{f(),g=r()}));function v(){return(0,b.jsx)(`dl`,{children:Object.entries(c).map(function([e,t]){return(0,b.jsxs)(y.Fragment,{children:[(0,b.jsx)(`dt`,{children:e}),(0,b.jsxs)(`dd`,{children:[t,`: `,(0,b.jsx)(`code`,{children:u[e]})]})]},e)})})}var y,b,x=t((()=>{y=n(i(),1),f(),b=r()}));function S(){return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`style`,{children:`
        .responsive-viewport-example {
          grid-template-columns: minmax(0, 1fr);
        }

        @media (min-width: 64rem) {
          .responsive-viewport-example {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}),(0,C.jsxs)(o,{as:`section`,"aria-label":`Viewport layout`,gap:`md`,className:`responsive-viewport-example`,children:[(0,C.jsx)(a,{padding:`md`,elevation:`card`,children:(0,C.jsx)(m,{children:`Account settings`})}),(0,C.jsx)(a,{padding:`md`,elevation:`card`,children:(0,C.jsx)(m,{children:`Billing settings`})})]})]})}var C,w=t((()=>{f(),C=r()}));function T({width:e=640}){return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`style`,{children:`
        .responsive-container-example {
          container: responsive-example / inline-size;
          inline-size: 100%;
        }

        .responsive-container-example-grid {
          grid-template-columns: minmax(0, 1fr);
        }

        @container responsive-example (min-width: 30rem) {
          .responsive-container-example-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}),(0,E.jsx)(a,{className:`responsive-container-example`,style:{maxInlineSize:e},children:(0,E.jsxs)(o,{as:`section`,"aria-label":`Container layout`,gap:`md`,className:`responsive-container-example-grid`,children:[(0,E.jsx)(a,{padding:`md`,elevation:`card`,children:(0,E.jsx)(m,{children:`Account settings`})}),(0,E.jsx)(a,{padding:`md`,elevation:`card`,children:(0,E.jsx)(m,{children:`Billing settings`})})]})})]})}var E,D=t((()=>{f(),E=r()}));function O({description:e=`Use the name customers recognize on invoices and receipts.`,dir:t}){return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(`style`,{children:`
        .responsive-form-example {
          grid-template-columns: minmax(0, 1fr);
        }

        .responsive-form-example-field {
          min-inline-size: 0;
          overflow-wrap: anywhere;
        }

        @media (min-width: 64rem) {
          .responsive-form-example {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}),(0,k.jsxs)(o,{as:`form`,"aria-label":`Account details`,dir:t,gap:`md`,className:`responsive-form-example`,children:[(0,k.jsxs)(l,{name:`displayName`,className:`responsive-form-example-field`,children:[(0,k.jsx)(s,{children:`Account display name`}),(0,k.jsx)(p,{}),(0,k.jsx)(m,{slot:`description`,children:e})]}),(0,k.jsxs)(l,{name:`email`,type:`email`,className:`responsive-form-example-field`,children:[(0,k.jsx)(s,{children:`Email`}),(0,k.jsx)(p,{})]})]})]})}var k,A=t((()=>{f(),k=r()})),j=e({Breakpoints:()=>F,ContainerLayout:()=>L,Default:()=>P,Form:()=>R,Playground:()=>z,ViewportLayout:()=>I,__namedExportsOrder:()=>B,default:()=>N}),M,N,P,F,I,L,R,z,B,V=t((()=>{_(),x(),w(),D(),A(),M=r(),f(),N={title:`components/Responsive`},P=h,F=v,I=S,L=T,R=O,z={args:{query:u.lg,ssrMatch:!1},argTypes:{query:{control:`text`,description:`A viewport or device media query`},ssrMatch:{control:`boolean`,description:`Match used for SSR and initial hydration, not a browser override`}},render:e=>(0,M.jsx)(h,{...e})},B=[`Default`,`Breakpoints`,`ViewportLayout`,`ContainerLayout`,`Form`,`Playground`]}));V();export{F as Breakpoints,L as ContainerLayout,P as Default,R as Form,z as Playground,I as ViewportLayout,B as __namedExportsOrder,N as default,j as n,V as t};