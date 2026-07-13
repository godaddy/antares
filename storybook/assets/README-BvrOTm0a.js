import{i as e}from"./preload-helper-B4cZKGJ2.js";import{y as t}from"./iframe-C62W6Nuc.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-CLVAnieZ.js";import{t as s}from"./mdx-react-shim-DwcJn3XY.js";import{Props as c,n as l,t as u}from"./container.stories-C-R-rlc6.js";var d,f=e((()=>{d=`import { Container, type ContainerProps } from '@bento/container';
/* v8 ignore next */
import React from 'react';

export function BasicExample(args: ContainerProps) {
  return <Container {...args}>Hello from Container</Container>;
}
`})),p,m=e((()=>{p=`import { Container, type ContainerProps } from '@bento/container';
/* v8 ignore next */
import React from 'react';

export function AsExample(args: ContainerProps) {
  return (
    <Container {...args} as="article">
      This is an article element
    </Container>
  );
}
`})),h,g=e((()=>{h=`import { Container, type ContainerProps } from '@bento/container';
/* v8 ignore next */
import React, { type CSSProperties } from 'react';

// Example of building a custom Box component on top of Container
export interface BoxProps extends ContainerProps {
  padding?: string | number;
  elevation?: 'low' | 'medium' | 'high';
}

function Box({ padding = '16px', elevation = 'low', children, style, className = '', ...props }: BoxProps) {
  const boxStyle: CSSProperties = {
    padding,
    boxShadow:
      elevation === 'low'
        ? '0 1px 3px rgba(0,0,0,0.12)'
        : elevation === 'medium'
          ? '0 4px 6px rgba(0,0,0,0.16)'
          : '0 10px 20px rgba(0,0,0,0.19)',
    ...style
  };

  return (
    <Container {...props} className={\`box \${className}\`} style={boxStyle}>
      {children}
    </Container>
  );
}

export function BuildingBlockExample(args: BoxProps) {
  const elevation = args.elevation || 'medium';

  return (
    <Box {...args} padding="24px" elevation={elevation}>
      This is a custom Box component built on Container
    </Box>
  );
}
`})),_,v=e((()=>{_=`import { Container, type ContainerProps } from '@bento/container';
/* v8 ignore next */
import React from 'react';

export function NestedExample(args: ContainerProps) {
  return (
    <Container {...args} as="main">
      <Container as="header">Header</Container>
      <Container as="section">Main content</Container>
      <Container as="footer">Footer</Container>
    </Container>
  );
}
`})),y,b=e((()=>{y=`import { Container, type ContainerProps } from '@bento/container';
/* v8 ignore next */
import React from 'react';

export function EmptyExample(args: ContainerProps) {
  return (
    <Container {...args}>
      {/* Backdrop overlay - no children needed */}
      <Container
        {...args}
        data-testid="backdrop"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      />

      {/* Spacer element */}
      <Container data-testid="spacer" style={{ height: '20px' }} />

      {/* Decorative divider */}
      <Container
        data-testid="divider"
        as="hr"
        style={{
          border: 'none',
          borderTop: '1px solid #ccc',
          margin: '1rem 0'
        }}
      />
    </Container>
  );
}
`}));function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(a,{of:u,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`container`,children:`Container`}),`
`,(0,C.jsx)(t.p,{children:`Container is the atomic building block for polymorphic rendering + slot composition + prop spreading. It provides the infrastructure that makes Bento components infinitely customizable while maintaining consistency.`}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @bento/container
`})}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsxs)(t.p,{children:[`The `,(0,C.jsx)(t.code,{children:`@bento/container`}),` package exports the `,(0,C.jsx)(t.code,{children:`Container`}),` component:`]}),`
`,(0,C.jsx)(r,{language:`tsx`,code:d}),`
`,(0,C.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,C.jsx)(t.code,{children:`Container`}),` component:`]}),`
`,(0,C.jsx)(i,{of:c}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`as`,children:`As`}),`
`,(0,C.jsxs)(t.p,{children:[`Setting the `,(0,C.jsx)(t.code,{children:`as`}),` prop allows you to change the HTML tag of the `,(0,C.jsx)(t.code,{children:`Container`}),` component. By default, Container renders as a `,(0,C.jsx)(t.code,{children:`div`}),` element.`]}),`
`,(0,C.jsx)(r,{language:`tsx`,code:p}),`
`,(0,C.jsx)(t.h3,{id:`building-block`,children:`Building Block`}),`
`,(0,C.jsx)(t.p,{children:`Container is designed to be the foundation for building other components. This example shows a custom Box component built on top of Container with padding and elevation props.`}),`
`,(0,C.jsx)(r,{language:`tsx`,code:h}),`
`,(0,C.jsx)(t.h3,{id:`nested`,children:`Nested`}),`
`,(0,C.jsx)(t.p,{children:`Container components can be nested to create semantic HTML structures with proper document outline.`}),`
`,(0,C.jsx)(r,{language:`tsx`,code:_}),`
`,(0,C.jsx)(t.h3,{id:`empty-containers`,children:`Empty Containers`}),`
`,(0,C.jsx)(t.p,{children:`Container renders even without children, making it ideal for presentational elements like backdrops, spacers, or decorative elements that rely solely on styling.`}),`
`,(0,C.jsx)(r,{language:`tsx`,code:y})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),s(),o(),l(),f(),m(),g(),v(),b()}))();export{S as default};