import{j as e}from"./iframe-fSexQ0W-.js";import{u as t,M as r}from"./blocks-CB_wgupa.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BW33JMus.js";import"./index-cq0IvEJJ.js";import"./index-FfQZoQ4p.js";function s(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...t(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Welcome"}),`
`,e.jsx(n.h1,{id:"antares",children:"Antares"}),`
`,e.jsx(n.p,{children:"A collection of accessible, composable React components built on React Aria."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"https://godaddy.github.io/antares",rel:"nofollow",children:"Documentation"})," | ",e.jsx(n.a,{href:"https://godaddy.github.io/antares/storybook",rel:"nofollow",children:"Storybook"})]}),`
`,e.jsx(n.h2,{id:"quick-start",children:"Quick Start"}),`
`,e.jsx(n.p,{children:"Install the package:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.p,{children:"Import and use a component:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Button } from '@godaddy/antares';

export default function App() {
  return <Button variant="primary">Get Started</Button>;
}
`})}),`
`,e.jsx(n.h3,{id:"per-component-imports",children:"Per-Component Imports"}),`
`,e.jsx(n.p,{children:"Each component is available as a standalone entry point. This lets your bundler load only the JavaScript and CSS for the components you use:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Button } from '@godaddy/antares/Button';
import { Flex } from '@godaddy/antares/Layout';
import { BarChart } from '@godaddy/antares/Chart';
`})}),`
`,e.jsx(n.p,{children:"This also works with autocomplete in IDEs and LLMs, so you can import from the root package and let your editor/agent suggest the available components."}),`
`,e.jsx(n.h2,{id:"framework-setup",children:"Framework Setup"}),`
`,e.jsxs(n.p,{children:["Antares ships CSS alongside its JavaScript modules. Each component chunk imports a corresponding ",e.jsx(n.code,{children:".css"})," file (e.g., ",e.jsx(n.code,{children:"import './src-BZhWcxqJ.css'"}),"). Most bundlers handle this automatically, but some frameworks need extra configuration to process CSS imports from ",e.jsx(n.code,{children:"node_modules"}),"."]}),`
`,e.jsx(n.h3,{id:"nextjs",children:"Next.js"}),`
`,e.jsxs(n.p,{children:["Add ",e.jsx(n.code,{children:"@godaddy/antares"})," to ",e.jsx(n.a,{href:"https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages",rel:"nofollow",children:e.jsx(n.code,{children:"transpilePackages"})})," so Next.js processes the package through its own CSS pipeline instead of treating it as a pre-built external:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@godaddy/antares'],
};

module.exports = nextConfig;
`})}),`
`,e.jsx(n.p,{children:"Without this, Next.js will throw:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-text",children:`Global CSS cannot be imported from within node_modules.
`})}),`
`,e.jsx(n.h3,{id:"remix",children:"Remix"}),`
`,e.jsxs(n.p,{children:["Remix with Vite handles CSS imports from ",e.jsx(n.code,{children:"node_modules"})," in the client bundle automatically. However, during SSR, Vite treats ",e.jsx(n.code,{children:"node_modules"})," as externals by default, which bypasses CSS processing. Add ",e.jsx(n.code,{children:"@godaddy/antares"})," to ",e.jsx(n.a,{href:"https://vite.dev/config/ssr-options#ssr-noexternal",rel:"nofollow",children:e.jsx(n.code,{children:"ssr.noExternal"})})," to fix this:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  ssr: {
    noExternal: ['@godaddy/antares'],
  },
});
`})}),`
`,e.jsx(n.h3,{id:"vite",children:"Vite"}),`
`,e.jsxs(n.p,{children:["Vite processes CSS imports from ",e.jsx(n.code,{children:"node_modules"})," out of the box. No additional configuration is needed for client-side SPAs."]}),`
`,e.jsxs(n.p,{children:["If you are using Vite with SSR (e.g., custom SSR setup, not Remix), add ",e.jsx(n.code,{children:"@godaddy/antares"})," to ",e.jsx(n.code,{children:"ssr.noExternal"})," as shown in the ",e.jsx(n.a,{href:"#remix",children:"Remix section"}),"."]}),`
`,e.jsx(n.h3,{id:"other-bundlers",children:"Other Bundlers"}),`
`,e.jsxs(n.p,{children:["Any bundler that supports CSS imports will work with Antares. If your bundler does not process CSS imports from ",e.jsx(n.code,{children:"node_modules"})," by default, ensure it is configured to do so. For example, with raw webpack you may need ",e.jsx(n.a,{href:"https://webpack.js.org/loaders/css-loader/",rel:"nofollow",children:e.jsx(n.code,{children:"css-loader"})})," configured to handle ",e.jsx(n.code,{children:".css"})," files from ",e.jsx(n.code,{children:"node_modules"}),"."]})]})}function p(o={}){const{wrapper:n}={...t(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(s,{...o})}):s(o)}export{p as default};
