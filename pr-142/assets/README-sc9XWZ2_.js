import{j as n}from"./iframe-D3fDdFQ4.js";import{useMDXComponents as i}from"./index-CDw2r1IX.js";import{M as a,S as t,A as s}from"./blocks-BrIIOujR.js";import{S as p,P as c}from"./container.stories-C9WegEAF.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CjMbWoRR.js";import"./index-CBLRfpgE.js";import"./index-CXl02FME.js";import"./index-DrFu-skq.js";import"./index-DQn8MnVZ.js";import"./slots-pCifWtge.js";import"./index-CtH9LRLB.js";import"./index-CLj43KZG.js";import"./index-DtJToyYB.js";import"./mergeProps-Bjkc4qZd.js";import"./clsx-GL2hOUZf.js";import"./index-DiIDxzfx.js";const l=`import { Container, type ContainerProps } from '@bento/container';
/* v8 ignore next */
import React from 'react';

export function BasicExample(args: ContainerProps) {
  return <Container {...args}>Hello from Container</Container>;
}
`,d=`import { Container, type ContainerProps } from '@bento/container';
/* v8 ignore next */
import React from 'react';

export function AsExample(args: ContainerProps) {
  return (
    <Container {...args} as="article">
      This is an article element
    </Container>
  );
}
`,m=`import { Container, type ContainerProps } from '@bento/container';
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
`,x=`import { Container, type ContainerProps } from '@bento/container';
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
`,h=`import { Container, type ContainerProps } from '@bento/container';
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
`;function r(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...i(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(a,{of:p,name:"Overview"}),`
`,n.jsx(e.h1,{id:"container",children:"Container"}),`
`,n.jsx(e.p,{children:"Container is the atomic building block for polymorphic rendering + slot composition + prop spreading. It provides the infrastructure that makes Bento components infinitely customizable while maintaining consistency."}),`
`,n.jsx(e.h2,{id:"installation",children:"Installation"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install --save @bento/container
`})}),`
`,n.jsx(e.h2,{id:"props",children:"Props"}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"@bento/container"})," package exports the ",n.jsx(e.code,{children:"Container"})," component:"]}),`
`,n.jsx(t,{language:"tsx",code:l}),`
`,n.jsxs(e.p,{children:["The following properties are available to be used on the ",n.jsx(e.code,{children:"Container"})," component:"]}),`
`,n.jsx(s,{of:c}),`
`,n.jsx(e.h2,{id:"examples",children:"Examples"}),`
`,n.jsx(e.h3,{id:"as",children:"As"}),`
`,n.jsxs(e.p,{children:["Setting the ",n.jsx(e.code,{children:"as"})," prop allows you to change the HTML tag of the ",n.jsx(e.code,{children:"Container"})," component. By default, Container renders as a ",n.jsx(e.code,{children:"div"})," element."]}),`
`,n.jsx(t,{language:"tsx",code:d}),`
`,n.jsx(e.h3,{id:"building-block",children:"Building Block"}),`
`,n.jsx(e.p,{children:"Container is designed to be the foundation for building other components. This example shows a custom Box component built on top of Container with padding and elevation props."}),`
`,n.jsx(t,{language:"tsx",code:m}),`
`,n.jsx(e.h3,{id:"nested",children:"Nested"}),`
`,n.jsx(e.p,{children:"Container components can be nested to create semantic HTML structures with proper document outline."}),`
`,n.jsx(t,{language:"tsx",code:x}),`
`,n.jsx(e.h3,{id:"empty-containers",children:"Empty Containers"}),`
`,n.jsx(e.p,{children:"Container renders even without children, making it ideal for presentational elements like backdrops, spacers, or decorative elements that rely solely on styling."}),`
`,n.jsx(t,{language:"tsx",code:h})]})}function R(o={}){const{wrapper:e}={...i(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(r,{...o})}):r(o)}export{R as default};
