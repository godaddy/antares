import{a as e,i as t}from"./preload-helper-BSXjzSsi.js";import{F as n}from"./iframe-CTyuNJwX.js";import{r,t as i}from"./src-CfJJTn_A.js";import{Bn as a,Gn as o,Nt as s,Pn as c,Rn as l,Wn as u,kt as d,p as f,t as p}from"./antares-BjvgTvRT.js";import{n as m}from"./src-Cx_1VlDI.js";function h(){return(0,g.jsx)(c,{as:`section`,"aria-label":`Hosting plans`,columns:`repeat(auto-fill, minmax(min(16rem, 100%), 1fr))`,gap:`md`,children:_.map(function({name:e,summary:t}){return(0,g.jsxs)(i,{direction:`column`,alignItems:`start`,gap:`sm`,padding:`md`,elevation:`card`,children:[(0,g.jsx)(a,{level:3,children:e}),(0,g.jsx)(m,{children:t}),(0,g.jsxs)(u,{variant:`secondary`,children:[`Choose `,e]})]},e)})})}var g,_,v=t((()=>{p(),g=n(),_=[{name:`Economy`,summary:`One website with 25 GB of storage.`},{name:`Deluxe`,summary:`Ten websites with 50 GB of storage.`},{name:`Ultimate`,summary:`Twenty-five websites with 75 GB of storage.`}]}));function y({domain:e,renewal:t}){return(0,x.jsx)(r,{as:`article`,"aria-label":e,padding:`md`,elevation:`card`,className:`responsive-domain-card`,children:(0,x.jsxs)(i,{gap:`sm`,className:`responsive-domain-card-body`,children:[(0,x.jsxs)(i,{direction:`column`,gap:`xs`,children:[(0,x.jsx)(a,{level:3,children:e}),(0,x.jsx)(m,{children:t})]}),(0,x.jsxs)(i,{wrap:`wrap`,gap:`sm`,children:[(0,x.jsx)(u,{variant:`secondary`,children:`Manage DNS`}),(0,x.jsx)(u,{children:`Renew`})]})]})})}function b(){return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(`style`,{children:`
        .responsive-container-example-sidebar {
          flex: 1 1 14rem;
        }

        .responsive-container-example-main {
          flex: 3 1 28rem;
        }

        .responsive-domain-card {
          container: domain-card / inline-size;
        }

        .responsive-domain-card-body {
          flex-direction: column;
        }

        @container domain-card (min-width: 28rem) {
          .responsive-domain-card-body {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
      `}),(0,x.jsxs)(i,{wrap:`wrap`,gap:`md`,children:[(0,x.jsx)(r,{as:`aside`,"aria-label":`Sidebar`,className:`responsive-container-example-sidebar`,children:(0,x.jsx)(y,{domain:`shop.example`,renewal:`Renews on March 2, 2027`})}),(0,x.jsx)(r,{as:`main`,"aria-label":`Domains`,className:`responsive-container-example-main`,children:(0,x.jsx)(y,{domain:`example.com`,renewal:`Renews on January 12, 2027`})})]})]})}var x,S=t((()=>{p(),x=n()}));function C(){return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(`style`,{children:`
        .responsive-viewport-example {
          grid-template-columns: minmax(0, 1fr);
        }

        @media (min-width: 64rem) {
          .responsive-viewport-example {
            grid-template-columns: 16rem minmax(0, 1fr);
          }
        }
      `}),(0,w.jsxs)(c,{as:`section`,"aria-label":`Account settings`,gap:`lg`,className:`responsive-viewport-example`,children:[(0,w.jsx)(r,{as:`nav`,"aria-label":`Settings`,children:(0,w.jsx)(i,{direction:`column`,alignItems:`start`,gap:`xs`,children:T.map(function({name:e,href:t}){return(0,w.jsx)(o,{variant:`minimal`,href:t,children:e},e)})})}),(0,w.jsxs)(i,{as:`section`,"aria-label":`Profile`,direction:`column`,gap:`sm`,padding:`md`,elevation:`card`,children:[(0,w.jsx)(a,{level:2,children:`Profile`}),(0,w.jsx)(m,{children:`Update the name and contact details on your account.`})]})]})]})}var w,T,E=t((()=>{p(),w=n(),T=[{name:`Profile`,href:`#profile`},{name:`Security`,href:`#security`},{name:`Payment methods`,href:`#payment-methods`},{name:`Notifications`,href:`#notifications`}]}));function D({description:e=`Use the name on your payment card.`,dir:t}){return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(`style`,{children:`
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

          .responsive-form-example-wide {
            grid-column: 1 / -1;
          }
        }
      `}),(0,O.jsxs)(c,{as:`form`,"aria-label":`Billing details`,dir:t,gap:`md`,className:`responsive-form-example`,children:[(0,O.jsxs)(d,{name:`name`,autoComplete:`name`,className:`responsive-form-example-field`,children:[(0,O.jsx)(l,{children:`Full name`}),(0,O.jsx)(s,{}),(0,O.jsx)(m,{slot:`description`,children:e})]}),(0,O.jsxs)(d,{name:`email`,type:`email`,autoComplete:`email`,className:`responsive-form-example-field`,children:[(0,O.jsx)(l,{children:`Email`}),(0,O.jsx)(s,{})]}),(0,O.jsxs)(d,{name:`address`,autoComplete:`street-address`,className:`responsive-form-example-field responsive-form-example-wide`,children:[(0,O.jsx)(l,{children:`Street address`}),(0,O.jsx)(s,{})]}),(0,O.jsxs)(d,{name:`city`,autoComplete:`address-level2`,className:`responsive-form-example-field`,children:[(0,O.jsx)(l,{children:`City`}),(0,O.jsx)(s,{})]}),(0,O.jsxs)(d,{name:`postalCode`,autoComplete:`postal-code`,className:`responsive-form-example-field`,children:[(0,O.jsx)(l,{children:`Postal code`}),(0,O.jsx)(s,{})]})]})]})}var O,k=t((()=>{p(),O=n()}));function A(){return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(`style`,{children:`
        .responsive-size-example {
          --antares-size: md;
        }

        @media (min-width: 80rem) {
          .responsive-size-example {
            --antares-size: xl;
          }
        }
      `}),(0,j.jsx)(r,{as:`header`,className:`responsive-size-example`,children:(0,j.jsxs)(f,{children:[(0,j.jsx)(m,{slot:`eyebrow`,children:`Dashboard`}),(0,j.jsx)(a,{slot:`title`,level:1,children:`Welcome back, Ada`}),(0,j.jsx)(m,{slot:`body`,children:`Two domains renew this month. Review them to keep your sites online.`})]})})]})}var j,M=t((()=>{p(),j=n()})),N=e({ContainerLayout:()=>I,Default:()=>F,Form:()=>R,ResponsiveSize:()=>z,ViewportLayout:()=>L,__namedExportsOrder:()=>B,default:()=>P}),P,F,I,L,R,z,B,V=t((()=>{v(),S(),E(),k(),M(),P={title:`components/Responsive`},F=h,I=b,L=C,R=D,z=A,B=[`Default`,`ContainerLayout`,`ViewportLayout`,`Form`,`ResponsiveSize`]}));V();export{I as ContainerLayout,F as Default,R as Form,z as ResponsiveSize,L as ViewportLayout,B as __namedExportsOrder,P as default,N as n,V as t};