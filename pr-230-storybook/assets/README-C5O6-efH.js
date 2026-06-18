import{i as e}from"./preload-helper-BnI5NLmJ.js";import{y as t}from"./iframe-DWBYrjkr.js";import{S as n,s as r,u as i}from"./blocks-CvK_Sq38.js";import{t as a}from"./mdx-react-shim-C_ujhYFu.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Welcome`}),`
`,(0,c.jsx)(t.h1,{id:`antares`,children:`Antares`}),`
`,(0,c.jsx)(t.p,{children:`A collection of accessible, composable React components built on React Aria.`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.a,{href:`https://godaddy.github.io/antares`,rel:`nofollow`,children:`Documentation`}),` | `,(0,c.jsx)(t.a,{href:`https://godaddy.github.io/antares/storybook`,rel:`nofollow`,children:`Storybook`})]}),`
`,(0,c.jsx)(t.h2,{id:`quick-start`,children:`Quick Start`}),`
`,(0,c.jsx)(t.p,{children:`Install the package:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,c.jsx)(t.p,{children:`Import and use a component:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { Button } from '@godaddy/antares';

export default function App() {
  return <Button variant="primary">Get Started</Button>;
}
`})}),`
`,(0,c.jsx)(t.h3,{id:`per-component-imports`,children:`Per-Component Imports`}),`
`,(0,c.jsx)(t.p,{children:`Each component is available as a standalone entry point. This lets your bundler load only the JavaScript and CSS for the components you use:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { Button } from '@godaddy/antares/Button';
import { Flex } from '@godaddy/antares/Layout';
import { BarChart } from '@godaddy/antares/Chart';
`})}),`
`,(0,c.jsx)(t.p,{children:`This also works with autocomplete in IDEs and LLMs, so you can import from the root package and let your editor/agent suggest the available components.`}),`
`,(0,c.jsx)(t.h2,{id:`framework-setup`,children:`Framework Setup`}),`
`,(0,c.jsxs)(t.p,{children:[`Antares ships CSS alongside its JavaScript modules. Each component chunk imports a corresponding `,(0,c.jsx)(t.code,{children:`.css`}),` file (e.g., `,(0,c.jsx)(t.code,{children:`import './src-BZhWcxqJ.css'`}),`). Most bundlers handle this automatically, but some frameworks need extra configuration to process CSS imports from `,(0,c.jsx)(t.code,{children:`node_modules`}),`.`]}),`
`,(0,c.jsx)(t.h3,{id:`nextjs`,children:`Next.js`}),`
`,(0,c.jsxs)(t.p,{children:[`Add `,(0,c.jsx)(t.code,{children:`@godaddy/antares`}),` to `,(0,c.jsx)(t.a,{href:`https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`transpilePackages`})}),` so Next.js processes the package through its own CSS pipeline instead of treating it as a pre-built external:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-js`,children:`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@godaddy/antares'],
};

module.exports = nextConfig;
`})}),`
`,(0,c.jsx)(t.p,{children:`Without this, Next.js will throw:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-text`,children:`Global CSS cannot be imported from within node_modules.
`})}),`
`,(0,c.jsx)(t.h3,{id:`remix`,children:`Remix`}),`
`,(0,c.jsxs)(t.p,{children:[`Remix with Vite handles CSS imports from `,(0,c.jsx)(t.code,{children:`node_modules`}),` in the client bundle automatically. However, during SSR, Vite treats `,(0,c.jsx)(t.code,{children:`node_modules`}),` as externals by default, which bypasses CSS processing. Add `,(0,c.jsx)(t.code,{children:`@godaddy/antares`}),` to `,(0,c.jsx)(t.a,{href:`https://vite.dev/config/ssr-options#ssr-noexternal`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`ssr.noExternal`})}),` to fix this:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  ssr: {
    noExternal: ['@godaddy/antares'],
  },
});
`})}),`
`,(0,c.jsx)(t.h3,{id:`vite`,children:`Vite`}),`
`,(0,c.jsxs)(t.p,{children:[`Vite processes CSS imports from `,(0,c.jsx)(t.code,{children:`node_modules`}),` out of the box. No additional configuration is needed for client-side SPAs.`]}),`
`,(0,c.jsxs)(t.p,{children:[`If you are using Vite with SSR (e.g., custom SSR setup, not Remix), add `,(0,c.jsx)(t.code,{children:`@godaddy/antares`}),` to `,(0,c.jsx)(t.code,{children:`ssr.noExternal`}),` as shown in the `,(0,c.jsx)(t.a,{href:`#remix`,children:`Remix section`}),`.`]}),`
`,(0,c.jsx)(t.h3,{id:`other-bundlers`,children:`Other Bundlers`}),`
`,(0,c.jsxs)(t.p,{children:[`Any bundler that supports CSS imports will work with Antares. If your bundler does not process CSS imports from `,(0,c.jsx)(t.code,{children:`node_modules`}),` by default, ensure it is configured to do so. For example, with raw webpack you may need `,(0,c.jsx)(t.a,{href:`https://webpack.js.org/loaders/css-loader/`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`css-loader`})}),` configured to handle `,(0,c.jsx)(t.code,{children:`.css`}),` files from `,(0,c.jsx)(t.code,{children:`node_modules`}),`.`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};