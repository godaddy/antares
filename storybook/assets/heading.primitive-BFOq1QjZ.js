import{i as e}from"./preload-helper-Cf5dhQLl.js";import{y as t}from"./iframe-DztRp4DG.js";import{S as n,s as r,u as i}from"./blocks-CRmdQ6xa.js";import{t as a}from"./mdx-react-shim-f0W3XfDa.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/Heading`}),`
`,(0,c.jsx)(t.h1,{id:`heading-primitive-pdr`,children:`Heading Primitive PDR`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsx)(t.p,{children:`The Heading Primitive will extend the Text Primitive to provide a more semantic and accessible heading component.`}),`
`,(0,c.jsx)(t.h2,{id:`api`,children:`API`}),`
`,(0,c.jsx)(t.p,{children:`The API interface for the resource should include the following props, excluding the props from the Text Primitive:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface HeadingProps extends TextProps {
    /** @default null */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}
`})}),`
`,(0,c.jsx)(t.h3,{id:`level`,children:(0,c.jsx)(t.code,{children:`level`})}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`level`}),` prop is used to specify the level of the heading. If not provided, the heading will automatically determine the level based on the number of nested `,(0,c.jsx)(t.code,{children:`Heading.Provider`}),` components or render a span element if no `,(0,c.jsx)(t.code,{children:`Heading.Provider`}),` is found.`]}),`
`,(0,c.jsx)(t.h2,{id:`code-examples`,children:`Code examples`}),`
`,(0,c.jsx)(t.h3,{id:`basic-usage`,children:`Basic usage`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`level`}),` prop is used to specify the level of the heading.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`/* Renders a h1 element with the text "Hello, world!" */
<Heading level={1}>Hello, world!</Heading>
`})}),`
`,(0,c.jsx)(t.h3,{id:`auto-level`,children:`Auto level`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`Heading.Provider`}),` component is used to automatically determine the level of the heading based on the number of nested `,(0,c.jsx)(t.code,{children:`Heading.Provider`}),` components. If `,(0,c.jsx)(t.code,{children:`level`}),` is provided, it will override the automatic level determination.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`/* Automatically determines the level of the heading based on the number of nested Heading.Scope components */
<Heading.Provider>
  <Heading>This is an h1 heading</Heading>
  <Heading.Provider>
    <Heading>This is an h2 heading</Heading>
    <Heading.Provider>
      <Heading level={2}>This is an h2 heading</Heading>
    </Heading.Provider>
  </Heading.Provider>
</Heading.Provider>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`If no `,(0,c.jsx)(t.code,{children:`level`}),` is provided and the `,(0,c.jsx)(t.code,{children:`Heading.Provider`}),` is not nested, the heading will warn the user that the level is not specified and render a span element. This is to ensure that the heading is always rendered with a valid level. We can consider adding a data attribute to indicate the problem.`]}),`
`,(0,c.jsxs)(t.p,{children:[`We may also consider adding a `,(0,c.jsx)(t.code,{children:`level`}),` to the `,(0,c.jsx)(t.code,{children:`Heading.Provider`}),` component override the current level determined by the scope.`]}),`
`,(0,c.jsx)(t.h2,{id:`appendix`,children:`Appendix`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://medium.com/@Heydon/managing-heading-levels-in-design-systems-18be9a746fa3`,rel:`nofollow`,children:`Managing Heading Levels In Design Systems`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://ariakit.org/components/heading`,rel:`nofollow`,children:`Ariakit Heading`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://github.com/uber/baseweb/tree/main/src/heading`,rel:`nofollow`,children:`Base Web Heading`})}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};