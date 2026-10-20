import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{i as r,r as i,t as a}from"./button-DUBAibZN.js";import{n as o,t as s}from"./src-B-WF0f5Z.js";import{i as c,n as l}from"./src-CHhpjbQH.js";import{r as u,t as d}from"./src-CzxPq9pm.js";import{r as f,t as p}from"./src-PaCBtQ_q.js";import{r as m,t as h}from"./src-Cr9mwRBo.js";import{n as g,t as _}from"./src-iR9qjt_B.js";import{n as v,t as y}from"./src-CqkHQtSa.js";import{r as b,t as x}from"./src-DDFc6pot.js";import{n as S,t as C}from"./src-bU0RHjox.js";function w(){return(0,T.jsx)(y,{as:`section`,"aria-label":`Hosting plans`,columns:`repeat(auto-fill, minmax(min(16rem, 100%), 1fr))`,gap:`md`,children:E.map(function({name:e,summary:t}){return(0,T.jsxs)(_,{direction:`column`,alignItems:`start`,gap:`sm`,padding:`md`,elevation:`card`,children:[(0,T.jsx)(d,{level:3,children:e}),(0,T.jsx)(l,{children:t}),(0,T.jsxs)(a,{variant:`secondary`,children:[`Choose `,e]})]},e)})})}var T,E;function D(){return(D=e((()=>{r(),g(),v(),u(),c(),T=n(),E=[{name:`Economy`,summary:`One website with 25 GB of storage.`},{name:`Deluxe`,summary:`Ten websites with 50 GB of storage.`},{name:`Ultimate`,summary:`Twenty-five websites with 75 GB of storage.`}]})))()}function O({domain:e,renewal:t}){return(0,A.jsx)(h,{as:`article`,"aria-label":e,padding:`md`,elevation:`card`,className:`responsive-domain-card`,children:(0,A.jsxs)(_,{gap:`sm`,className:`responsive-domain-card-body`,children:[(0,A.jsxs)(_,{direction:`column`,gap:`xs`,children:[(0,A.jsx)(d,{level:3,children:e}),(0,A.jsx)(l,{children:t})]}),(0,A.jsxs)(_,{wrap:`wrap`,gap:`sm`,children:[(0,A.jsx)(a,{variant:`secondary`,children:`Manage DNS`}),(0,A.jsx)(a,{children:`Renew`})]})]})})}function k(){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`style`,{children:`
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
      `}),(0,A.jsxs)(_,{wrap:`wrap`,gap:`md`,children:[(0,A.jsx)(h,{as:`aside`,"aria-label":`Sidebar`,className:`responsive-container-example-sidebar`,children:(0,A.jsx)(O,{domain:`shop.example`,renewal:`Renews on March 2, 2027`})}),(0,A.jsx)(h,{as:`main`,"aria-label":`Domains`,className:`responsive-container-example-main`,children:(0,A.jsx)(O,{domain:`example.com`,renewal:`Renews on January 12, 2027`})})]})]})}var A;function j(){return(j=e((()=>{m(),r(),g(),u(),c(),A=n()})))()}function M(){return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(`style`,{children:`
        .responsive-viewport-example {
          grid-template-columns: minmax(0, 1fr);
        }

        @media (min-width: 64rem) {
          .responsive-viewport-example {
            grid-template-columns: 16rem minmax(0, 1fr);
          }
        }
      `}),(0,N.jsxs)(y,{as:`section`,"aria-label":`Account settings`,gap:`lg`,className:`responsive-viewport-example`,children:[(0,N.jsx)(h,{as:`nav`,"aria-label":`Settings`,children:(0,N.jsx)(_,{direction:`column`,alignItems:`start`,gap:`xs`,children:P.map(function({name:e,href:t}){return(0,N.jsx)(i,{variant:`minimal`,href:t,children:e},e)})})}),(0,N.jsxs)(_,{as:`section`,"aria-label":`Profile`,direction:`column`,gap:`sm`,padding:`md`,elevation:`card`,children:[(0,N.jsx)(d,{level:2,children:`Profile`}),(0,N.jsx)(l,{children:`Update the name and contact details on your account.`})]})]})]})}var N,P;function F(){return(F=e((()=>{m(),g(),v(),u(),r(),c(),N=n(),P=[{name:`Profile`,href:`#profile`},{name:`Security`,href:`#security`},{name:`Payment methods`,href:`#payment-methods`},{name:`Notifications`,href:`#notifications`}]})))()}function I({description:e=`Use the name on your payment card.`,dir:t}){return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(`style`,{children:`
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
      `}),(0,L.jsxs)(y,{as:`form`,"aria-label":`Billing details`,dir:t,gap:`md`,className:`responsive-form-example`,children:[(0,L.jsxs)(s,{name:`name`,autoComplete:`name`,className:`responsive-form-example-field`,children:[(0,L.jsx)(p,{children:`Full name`}),(0,L.jsx)(x,{}),(0,L.jsx)(l,{slot:`description`,children:e})]}),(0,L.jsxs)(s,{name:`email`,type:`email`,autoComplete:`email`,className:`responsive-form-example-field`,children:[(0,L.jsx)(p,{children:`Email`}),(0,L.jsx)(x,{})]}),(0,L.jsxs)(s,{name:`address`,autoComplete:`street-address`,className:`responsive-form-example-field responsive-form-example-wide`,children:[(0,L.jsx)(p,{children:`Street address`}),(0,L.jsx)(x,{})]}),(0,L.jsxs)(s,{name:`city`,autoComplete:`address-level2`,className:`responsive-form-example-field`,children:[(0,L.jsx)(p,{children:`City`}),(0,L.jsx)(x,{})]}),(0,L.jsxs)(s,{name:`postalCode`,autoComplete:`postal-code`,className:`responsive-form-example-field`,children:[(0,L.jsx)(p,{children:`Postal code`}),(0,L.jsx)(x,{})]})]})]})}var L;function R(){return(R=e((()=>{v(),b(),f(),c(),o(),L=n()})))()}function z(){return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(`style`,{children:`
        .responsive-size-example {
          --antares-size: md;
        }

        @media (min-width: 80rem) {
          .responsive-size-example {
            --antares-size: xl;
          }
        }
      `}),(0,B.jsx)(h,{as:`header`,className:`responsive-size-example`,children:(0,B.jsxs)(C,{children:[(0,B.jsx)(l,{slot:`eyebrow`,children:`Dashboard`}),(0,B.jsx)(d,{slot:`title`,level:1,children:`Welcome back, Ada`}),(0,B.jsx)(l,{slot:`body`,children:`Two domains renew this month. Review them to keep your sites online.`})]})})]})}var B;function V(){return(V=e((()=>{m(),u(),c(),S(),B=n()})))()}var H=t({ContainerLayout:()=>G,Default:()=>W,Form:()=>q,ResponsiveSize:()=>J,ViewportLayout:()=>K,__namedExportsOrder:()=>Y,default:()=>U}),U,W,G,K,q,J,Y;function X(){return(X=e((()=>{D(),j(),F(),R(),V(),U={title:`components/Responsive`},W=w,G=k,K=M,q=I,J=z,Y=[`Default`,`ContainerLayout`,`ViewportLayout`,`Form`,`ResponsiveSize`]})))()}export{K as a,J as i,W as n,X as o,q as r,H as s,G as t};