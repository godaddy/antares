import{j as e}from"./iframe-Ctx4srKR.js";import{useMDXComponents as h}from"./index-D2CtuBLb.js";import{M as p,A as m,S as t,a as s,f as r}from"./blocks-72KARnvP.js";import{S as u,P as x,D as i,O as c,L as d}from"./icon.stories-DXXMlmPU.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C3lit-vx.js";import"./index-DHf6R9s4.js";import"./index-CChMEhDG.js";import"./index-BNyuEjcZ.js";import"./index-gBUEpdAm.js";import"./slots-fo57EPNj.js";import"./index-Cm2vTddm.js";import"./index-CLj43KZG.js";import"./index-Dy-msg3n.js";import"./mergeProps-DBpubWKp.js";import"./SSRProvider-L5CIFOBu.js";import"./clsx-B-dksMZM.js";import"./index-B30rVSRl.js";import"./create-external-store-TtP3UJpK.js";import"./index-CgYNBsUv.js";import"./client-CSdw2r1G.js";import"./index-Dw7_kDFH.js";const a=`import { Icon, set } from '@bento/icon';
/* v8 ignore next */
import React from 'react';

//
// Uses the exposed \`set\` method to introduce the icons and their content to
// the icon store.
//
set({
  play: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 22v-20l18 10-18 10z" />
    </svg>
  )
});

/**
 * Example component demonstrating basic icon usage.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered icon with description.
 * @public
 */
export function Example(args: any) {
  return (
    <>
      <Icon icon="play" title="A play button" {...args} />
      <p>
        A simple play icon, with an embed <code>title</code> element for a11y.
      </p>
    </>
  );
}
`,g=`/* v8 ignore next */
import React, { type JSX } from 'react';
import { Icon, ondemand } from '@bento/icon';
import { parser } from '@bento/svg-parser';

//
// The Font Awesome SVG files are hosted on a CDN and we can fetch them on demand
//
const FONT_AWESOME_URL = 'https://site-assets.fontawesome.com/releases/v6.7.2/svgs/solid';

/**
 * Fetches and parses Font Awesome icons on demand.
 * @param {string} icon - The name of the icon to fetch.
 * @returns {Promise<JSX.Element>} A promise that resolves to the parsed SVG element.
 */
ondemand(async function fetchIcons(icon: string) {
  const response = await fetch(\`\${FONT_AWESOME_URL}/\${icon}.svg\`);
  const text = await response.text();
  const parsed = parser(text);

  return parsed;
});

/**
 * Awesome component demonstrating on-demand icon loading from Font Awesome.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered icon component with documentation.
 * @public
 */
export function Awesome(args: any): JSX.Element {
  const url = 'https://fontawesome.com/search?o=r&ic=free&s=solid&ip=classic';

  return (
    <>
      <Icon {...args} />
      <p>
        This example fetches icons dynamically using the <code>ondemand</code>
        functionality from the <code>@bento/icon</code> package. It's wired to fetch icons from the Font Awesome CDN and
        render them as React elements. Try any of their <a href={url}>Free, Solid, Icon</a> names such as{' '}
        <code>house</code>, <code>hippo</code>, or <code>image</code>.
      </p>
    </>
  );
}
`,j=`import { Icon, ondemand } from '@bento/icon';
/* v8 ignore next */
import React, { type JSX } from 'react';

/**
 * Creates a promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to wait before the promise resolves.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 * @public
 */
export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

ondemand(async function fetchIcons(icon: string) {
  if (icon !== 'name-to-be-intercepted-by-ondemand') return;

  //
  // Delay the loading of the dragon icon for 10 seconds to simulate a slow
  // network connection.
  //
  await timeout(10000);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
      <path d="m352 124.5-51.9-13c-6.5-1.6-11.3-7.1-12-13.8s2.8-13.1 8.7-16.1l40.8-20.4-43.2-32.4c-5.5-4.1-7.8-11.3-5.6-17.9S297.1 0 304 0h160c30.2 0 58.7 14.2 76.8 38.4l57.6 76.8c6.2 8.3 9.6 18.4 9.6 28.8 0 26.5-21.5 48-48 48h-21.5c-17 0-33.3-6.7-45.3-18.7L480 160h-32v21.5c0 24.8 12.8 47.9 33.8 61.1l106.6 66.6c32.1 20.1 51.6 55.2 51.6 93.1 0 60.6-49.1 109.7-109.8 109.7H32.3c-3.3 0-6.6-.4-9.6-1.4-9.2-2.8-16.7-9.6-20.3-18.5C1 488.7.2 485.2 0 481.4c-.2-3.7.3-7.3 1.3-10.7 2.8-9.2 9.6-16.7 18.6-20.4 3-1.2 6.2-2 9.5-2.2L433.3 412c8.3-.7 14.7-7.7 14.7-16.1 0-4.3-1.7-8.4-4.7-11.4l-44.4-44.4c-30-30-46.9-70.7-46.9-113.1V124.5zm160-52.2v-.6.6zm-1.3 7.4-46.4-11.6c-.2 1.3-.3 2.6-.3 3.9 0 13.3 10.7 24 24 24 10.6 0 19.5-6.8 22.7-16.3zm-379.8 36.8c16.3-14.5 40.4-16.2 58.5-4.1l130.6 87v27.5c0 32.8 8.4 64.8 24 93H112c-6.7 0-12.7-4.2-15-10.4s-.5-13.3 4.6-17.7l69.4-59.5-152.6 23.5c-7 1.1-13.9-2.6-16.9-9S0 232.7 5.3 228l125.6-111.5z" />
    </svg>
  );
});

/**
 * Example component demonstrating loading state with delayed icon.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered loader component.
 * @public
 */
export function Loader(args: any): JSX.Element {
  //
  // spinner and dragon icon used by the loader delayed loader above are from:
  // Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.
  //
  return (
    <>
      <Icon icon="name-to-be-intercepted-by-ondemand" {...args}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
        </svg>
      </Icon>
      <p>Displays the children of the icon as placeholder while our dragon icon is delayed for 10 seconds.</p>
    </>
  );
}
`;function l(o){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...h(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{of:u,name:"Overview"}),`
`,e.jsx(n.h1,{id:"icon",children:"Icon"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/icon"}),` package provides a way to render SVG-based icons in your
application. This package does not ship any icons but instead allows you to
introduce your own icons.`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm install --save @bento/icon
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/icon"})," package exports the ",e.jsx(n.code,{children:"Icon"})," component:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Icon } from '@bento/icon';

<Icon icon="icon-name" />
`})}),`
`,e.jsxs(n.p,{children:["The following properties are available to be used on the ",e.jsx(n.code,{children:"Icon"}),`
component:`]}),`
`,e.jsx(m,{of:x}),`
`,e.jsxs(n.p,{children:["For all other properties specified on the ",e.jsx(n.code,{children:"Icon"}),` component, the
component will pass them down to the root SVG element of the component. Which
would be the equivalent of you adding them directly to the child component.`]}),`
`,e.jsx(n.h3,{id:"example",children:"Example"}),`
`,e.jsx(t,{language:"tsx",code:a}),`
`,e.jsx(s,{of:i,inline:!0}),`
`,e.jsx(r,{of:i}),`
`,e.jsx(n.h2,{id:"introducing-content",children:"Introducing content"}),`
`,e.jsx(n.p,{children:`By default, the icon component ships with no icon sets or libraries. You need to
introduce the icons to the included store. The icon library exposes the
following API methods:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.a,{href:"#set",children:"set"})})," - Introduce content synchronously."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.a,{href:"#ondemand",children:"ondemand"})})," - Introduce content asynchronously."]}),`
`]}),`
`,e.jsxs(n.p,{children:[`Both methods expect the Icon content to be a valid React SVG element.
If you have SVG content that is not a React SVG element, you can use the
included `,e.jsx(n.a,{href:"#parser",children:e.jsx(n.code,{children:"@bento/svg-parser"})}),` method to transform a string into
the required React SVG element.`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[`NOTE: If you want to learn more about the store, please refer to the
`,e.jsx(n.code,{children:"@bento/create-external-store"})," package."]}),`
`]}),`
`,e.jsx(n.h3,{id:"set",children:"set"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"set"})," method allows you to ",e.jsx(n.strong,{children:"synchronously"}),` introduce content to the store.
The method expects an object where the key is the icon’s name, as you would
specify in the `,e.jsx(n.code,{children:"icon"}),` prop name, and the value is the React SVG element that
should be used to render the icon.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { set } from '@bento/icon';

set({
  'icon-name': <svg />,
  'another-icon': <svg />,
  'yet-another-icon': <svg />
});
`})}),`
`,e.jsxs(n.p,{children:[`If you have SVG content that is not a React SVG element, you can use the
included `,e.jsx(n.a,{href:"#parser",children:e.jsx(n.code,{children:"@bento/svg-parser"})}),` method to transform a string into
the required React SVG element:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { parser } from '@bento/svg-parser';
import { set } from '@bento/icon';

import icon from './icon.svg?raw';

set({ 'icon-name': parser(icon) });
`})}),`
`,e.jsx(t,{language:"tsx",code:a}),`
`,e.jsx(s,{of:i,inline:!0}),`
`,e.jsx(r,{of:i}),`
`,e.jsx(n.h3,{id:"ondemand",children:"ondemand"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"ondemand"})," method allows you to ",e.jsx(n.strong,{children:"asynchronously"}),` introduce content to the
store. The method expects a function that should return a promise that resolves
to the React SVG element that should be used to render the icon. It receives the
icon’s name, which should be loaded as the first argument.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { parser } from '@bento/svg-parser';
import { ondemand } from '@bento/icon';

ondemand(async function hosted(name:string) {
  const icon:string = await fetch(\`{name}.svg\`).then((res) => res.text());

  return parser(icon);
});
`})}),`
`,e.jsxs(n.p,{children:["You can have multiple ",e.jsx(n.code,{children:"ondemand"}),` loaders specified in your application, and
they will be called in the order that they are specified. The first loader that
returns a valid React SVG element will be used to render the icon.`]}),`
`,e.jsxs(n.p,{children:[`If your loader throws an error, the next loader will be called. If all loaders
throw an error or no content is returned, the icon will return a `,e.jsx(n.code,{children:"null"}),`
response and renders the `,e.jsx(n.a,{href:"#placeholders",children:"placeholder"})," content if it's specified."]}),`
`,e.jsx(t,{language:"tsx",code:g}),`
`,e.jsx(s,{of:c,inline:!0}),`
`,e.jsx(r,{of:c}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.p,{children:["The icons are rendered with ",e.jsx(n.code,{children:'role="presentation"'}),` and should be considered
decorative and should not be used to convey information to the user. They
should only be used for visual or branding purposes.`]}),`
`,e.jsx(n.h3,{id:"semantic-icons",children:"Semantic Icons"}),`
`,e.jsx(n.p,{children:`Semantic icons convey information to the user rather than just pure
decoration. This includes icons without text next to them that are used for
interactive elements. To ensure they are accessible to all users,
you should always describe the icon.`}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"title"}),` prop is used to describe the icon. This
sets the `,e.jsx(n.code,{children:'role="img"'})," attribute on the SVG element and adds a ",e.jsx(n.code,{children:"title"}),` element
to the SVG element with the contents of the `,e.jsx(n.code,{children:"title"})," prop."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Icon } from '@bento/icon';

<Icon icon="wand" title="A magic wand" />
`})}),`
`,e.jsx(n.h2,{id:"performance",children:"Performance"}),`
`,e.jsxs(n.p,{children:[`When introducing content to the store, you should consider the performance
impact of the content you are introducing. The icons should always be
optimized using the appropriate tools and techniques to reduce the size of the
icons. Tools such as `,e.jsx(n.code,{children:"svgo"})," can be used to optimize the SVG content."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Icon"})," component will render the icon as a full SVG element by default."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Icon } from '@bento/icon';

<Icon icon="icon-name" />
<Icon icon="icon-name" />
<Icon icon="icon-name" />
`})}),`
`,e.jsx(n.p,{children:`When rendering the same icon multiple times, this can lead to a lot of
duplication in the DOM. Depending on the amount of icons you are rendering and
the size of the icons, this can lead to a lot of bytes being transferred over
the network.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<svg>
  <path d="...full..path..here" />
</svg>
<svg>
  <path d="...so..much..duplication" />
</svg>
<svg>
  <path d="...much..more..bytes..here" />
</svg>
`})}),`
`,e.jsxs(n.p,{children:[`It's worth noting that there are distinct advantages to rendering the icons as
full SVG elements when it comes to `,e.jsx(n.a,{href:"#server-side-rendering",children:"server-side rendering"}),"."]}),`
`,e.jsx(n.h3,{id:"sprite",children:"Sprite"}),`
`,e.jsxs(n.p,{children:[`To reduce the amount of duplication in the DOM, you can render the icons as a
sprite. The optional `,e.jsx(n.code,{children:"mode"}),` prop is used to specify how the icon should be
rendered. Switching the `,e.jsx(n.code,{children:"mode"})," to ",e.jsx(n.code,{children:"sprite"})," instructs the ",e.jsx(n.code,{children:"Icon"}),` component to
render a `,e.jsx(n.code,{children:"use"}),` element that references the icon from a sprite sheet
automatically injected sprite sheet.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Icon } from '@bento/icon';

<Icon icon="icon-name" mode="sprite" />
<Icon icon="icon-name" mode="sprite" />
<Icon icon="icon-name" mode="sprite" />
`})}),`
`,e.jsx(n.p,{children:"Would result in the following DOM:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<svg>
  <use xlink:href="#bento-svg-sprite-icon-name" />
</svg>
<svg>
  <use xlink:href="#bento-svg-sprite-icon-name" />
</svg>
<svg>
  <use xlink:href="#bento-svg-sprite-icon-name" />
</svg>
`})}),`
`,e.jsx(n.p,{children:`Once your application is hydrated on the client, the icons sprite sheet is
generated and injected into the DOM. The browser will trigger a paint event
and the icons are displayed. The sprite sheet is generated as follows:`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<svg id="bento-svg-sprite" style="display: none;">
  <symbol id="bento-svg-sprite-icon-name" data-symbol="icon-name" viewBox="0 0 24 24">
    <path d="...massive..long..string..here" />
  </symbol>
</svg>
`})}),`
`,e.jsx(n.p,{children:`The sprite sheet container is only created if it doesn't already exist in the
DOM. The icons are added to the sprite sheet as they are requested. If an icon
is requested multiple times, it will only be added to the sprite sheet once.`}),`
`,e.jsx(n.p,{children:`This also means that you can inject the spritesheet into the DOM yourself as
part of the SSR response to ensure they are available and displayed before
the client-side hydration.`}),`
`,e.jsx(n.h2,{id:"server-side-rendering",children:"Server side rendering"}),`
`,e.jsxs(n.p,{children:["While the ",e.jsx(n.code,{children:"Icon"}),` component can render the icon content during the server-side
rendering, the content must be available during the rendering of the icons.
When loading the content `,e.jsx(n.a,{href:"#asynchronously",children:"Asynchronously"}),` using the recommended
`,e.jsx(n.a,{href:"#ondemand",children:"ondemand"}),` method, the content is not available during the
server-side rendering resulting in an empty response.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Icon } from '@bento/icon';

<Icon icon="icon-name" />
// null - The icon doesn't have content, so it can't render anything.
`})}),`
`,e.jsx(n.p,{children:`Depending on your requirements this might be acceptable. If you want to return
content during the server-side rendering, you have the following options:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#svg-element-as-a-response",children:"SVG element as a response"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#asynchronously",children:"Asynchronously"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#placeholders",children:"Placeholders"})}),`
`]}),`
`,e.jsx(n.h3,{id:"svg-element-as-a-response",children:"SVG element as a response"}),`
`,e.jsxs(n.p,{children:["As noted above, the ",e.jsx(n.code,{children:"Icon"}),` component can only render the icon if the content
is available during the server-side rendering. If you want to render
the icon as part of the SSR response, you should use the `,e.jsx(n.a,{href:"#set",children:e.jsx(n.code,{children:"set"})}),` method
to introduce the content to the store.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { set } from '@bento/icon';
set({ 'icon-name': <svg /> });

<Icon icon="icon-name" />
// <svg>...</svg> - The icon has content that can render the icon.
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"set"})," method is synchronous. If you are using the ",e.jsx(n.code,{children:"ondemand"}),` method in your
application, please refer to the `,e.jsx(n.a,{href:"#asynchronously",children:"Asynchronously"})," section."]}),`
`,e.jsx(n.h3,{id:"asynchronously",children:"Asynchronously"}),`
`,e.jsxs(n.p,{children:["When loading your content asynchronously using the ",e.jsx(n.code,{children:"ondemand"}),` method, it's
unavailable during the server-side rendering. These icons will default render an
empty (`,e.jsx(n.code,{children:"null"}),`) response. Once your application is hydrated on the client, the
icons will be available, requested in the `,e.jsx(n.code,{children:"ondemand"}),` method, and rendered
accordingly.`]}),`
`,e.jsxs(n.p,{children:[`To avoid the empty response, you can either use
`,e.jsx(n.a,{href:"#placeholders",children:"Placeholders"})," as mentioned below or change the ",e.jsx(n.code,{children:"mode"}),` to
`,e.jsx(n.code,{children:"sprite"}),` to render the icon as a sprite. When an icon is rendered as a sprite,
it will return an SVG element with a `,e.jsx(n.code,{children:"use"}),` element that references the icon
from the sprite.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Icon } from '@bento/icon';

<Icon icon="icon-name" mode="sprite" />
// <svg><use xlink:href="#icon-name"></use></svg>
`})}),`
`,e.jsxs(n.p,{children:["See ",e.jsx(n.a,{href:"#sprite",children:"sprite"})," for more information."]}),`
`,e.jsx(n.h3,{id:"placeholders",children:"Placeholders"}),`
`,e.jsxs(n.p,{children:["When the icon content is loading or the requested icon doesn't exist the ",e.jsx(n.code,{children:"Icon"}),`
component will render the provided `,e.jsx(n.code,{children:"children"}),` as placeholder. This allows you to
render skeleton loaders, loading spinners, or any other content that should be
displayed while the icon is loading.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Icon } from '@bento/icon';

<Icon icon="icon-name">
  <svg>...</svg>
</Icon>
`})}),`
`,e.jsx(n.p,{children:`While it might be tempting to use render props to render the conditionally
icon fallback differently on the server and client; this is not recommended for
applications that need to hydrate the server-rendered content on the client.
This will cause a mismatch between the server and client content, which will
result in the client-side hydration failing, forcing a complete re-render of the
content.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Icon } from '@bento/icon';

//
// ANTI PATTERN causes hydration errors:
//
<Icon icon="icon-name" mode="sprite">
  {() => server ? <svg>{icon}</svg> : null }
</Icon>
`})}),`
`,e.jsx(t,{language:"tsx",code:j}),`
`,e.jsx(s,{of:d,inline:!0}),`
`,e.jsx(r,{of:d}),`
`,e.jsx(n.h2,{id:"customization",children:"Customization"}),`
`,e.jsxs(n.p,{children:["As the ",e.jsx(n.code,{children:"Icon"})," component is a wrapper around the ",e.jsx(n.code,{children:"Illustration"}),` component, you
can use the `,e.jsx(n.code,{children:"Illustration"}),"'s properties to customize the icon. The ",e.jsx(n.code,{children:"Icon"}),`
component will pass all properties down to the `,e.jsx(n.code,{children:"Illustration"}),` component
allowing you to `,e.jsx(n.code,{children:"rotate"})," or ",e.jsx(n.code,{children:"flip"}),` the icon. This is useful when you need
to support RTL languages that requires the icon to be altered.`]}),`
`,e.jsx(n.h3,{id:"slots",children:"Slots"}),`
`,e.jsxs(n.p,{children:["The component is created using our ",e.jsx(n.code,{children:"@bento/slots"}),` package and allows the
assignment of the custom `,e.jsx(n.code,{children:"slot"})," property to be used for overrides."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/icon"})," is registered as ",e.jsx(n.code,{children:"BentoIcon"}),` and introduces the following
slots:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"content"}),": Assigned to the ",e.jsx(n.code,{children:"Illustration"}),` component that renders the icon
content.`]}),`
`]}),`
`,e.jsxs(n.p,{children:["See the ",e.jsx(n.code,{children:"@bento/slots"})," package for more information on how to use the ",e.jsx(n.code,{children:"slot"}),` and
`,e.jsx(n.code,{children:"slots"})," properties."]}),`
`,e.jsx(n.h3,{id:"styling",children:"Styling"}),`
`,e.jsxs(n.p,{children:["Once you assign the ",e.jsx(n.code,{children:"className"}),` property to the component, you take full
responsibility for the styling of the component, and it will remove any
default styling that might be applied as part of this component.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Illustration } from '@bento/icon';

<Icon icon="magic-wand" className="my-component" />
`})}),`
`,e.jsx(n.p,{children:`The following data attributes are introduced as part of the component render
state:`}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-loading"})}),e.jsx(n.td,{children:"Indicates the icon is loading"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-icon"})}),e.jsx(n.td,{children:"The name of the icon that is currently being rendered"}),e.jsx(n.td,{children:'"magic-wand"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-mode"})}),e.jsx(n.td,{children:"The rendering mode of the icon"}),e.jsx(n.td,{children:'"sprite" / "svg"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-flip"})}),e.jsx(n.td,{children:"The icon is flipped horizontally or vertically"}),e.jsx(n.td,{children:'"horizontal" / "vertical"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-rotate"})}),e.jsx(n.td,{children:"The icon is rotated by the specified angle"}),e.jsx(n.td,{children:'"90" / "180" / "270"'})]})]})]}),`
`,e.jsxs(n.p,{children:[`These data attributes are introduced on the root element of the component and
can be targeted using your previously provided custom `,e.jsx(n.code,{children:"className"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-component[data-loading] {
  /* The component is loading */
}

.my-component[data-flip] {
  /* The component is flipped */
}

.my-component[data-rotate] {
  /* The component is rotated */
}

.my-component[data-icon="magic-wand"] {
  /* The component is rendering the magic wand icon */
}
`})})]})}function W(o={}){const{wrapper:n}={...h(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(l,{...o})}):l(o)}export{W as default};
