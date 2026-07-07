import{i as e}from"./preload-helper-C8Zz4tJD.js";import{y as t}from"./iframe-BL6-qkEO.js";import{S as n,c as r,i,l as a,n as o,s,u as c}from"./blocks-C7gLgkpK.js";import{t as l}from"./mdx-react-shim-7RMMlnRu.js";import{Demo as u,Loading as d,Ondemand as f,Props as p,n as m,t as h}from"./icon.stories-C87b5EvD.js";var g,_=e((()=>{g=`import { Icon, set } from '@bento/icon';
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
`})),v,y=e((()=>{v=`/* v8 ignore next */
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
`})),b,x=e((()=>{b=`import { Icon, ondemand } from '@bento/icon';
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
`}));function S(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(s,{of:h,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`icon`,children:`Icon`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`@bento/icon`}),` package provides a way to render SVG-based icons in your
application. This package does not ship any icons but instead allows you to
introduce your own icons.`]}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/icon
`})}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`@bento/icon`}),` package exports the `,(0,w.jsx)(t.code,{children:`Icon`}),` component:`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-jsx`,children:`import { Icon } from '@bento/icon';

<Icon icon="icon-name" />
`})}),`
`,(0,w.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,w.jsx)(t.code,{children:`Icon`}),`
component:`]}),`
`,(0,w.jsx)(o,{of:p}),`
`,(0,w.jsxs)(t.p,{children:[`For all other properties specified on the `,(0,w.jsx)(t.code,{children:`Icon`}),` component, the
component will pass them down to the root SVG element of the component. Which
would be the equivalent of you adding them directly to the child component.`]}),`
`,(0,w.jsx)(t.h3,{id:`example`,children:`Example`}),`
`,(0,w.jsx)(r,{language:`tsx`,code:g}),`
`,(0,w.jsx)(a,{of:u,inline:!0}),`
`,(0,w.jsx)(i,{of:u}),`
`,(0,w.jsx)(t.h2,{id:`introducing-content`,children:`Introducing content`}),`
`,(0,w.jsx)(t.p,{children:`By default, the icon component ships with no icon sets or libraries. You need to
introduce the icons to the included store. The icon library exposes the
following API methods:`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.a,{href:`#set`,children:`set`})}),` - Introduce content synchronously.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.a,{href:`#ondemand`,children:`ondemand`})}),` - Introduce content asynchronously.`]}),`
`]}),`
`,(0,w.jsxs)(t.p,{children:[`Both methods expect the Icon content to be a valid React SVG element.
If you have SVG content that is not a React SVG element, you can use the
included `,(0,w.jsx)(t.a,{href:`#parser`,children:(0,w.jsx)(t.code,{children:`@bento/svg-parser`})}),` method to transform a string into
the required React SVG element.`]}),`
`,(0,w.jsxs)(t.blockquote,{children:[`
`,(0,w.jsxs)(t.p,{children:[`NOTE: If you want to learn more about the store, please refer to the
`,(0,w.jsx)(t.code,{children:`@bento/create-external-store`}),` package.`]}),`
`]}),`
`,(0,w.jsx)(t.h3,{id:`set`,children:`set`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`set`}),` method allows you to `,(0,w.jsx)(t.strong,{children:`synchronously`}),` introduce content to the store.
The method expects an object where the key is the icon’s name, as you would
specify in the `,(0,w.jsx)(t.code,{children:`icon`}),` prop name, and the value is the React SVG element that
should be used to render the icon.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`import { set } from '@bento/icon';

set({
  'icon-name': <svg />,
  'another-icon': <svg />,
  'yet-another-icon': <svg />
});
`})}),`
`,(0,w.jsxs)(t.p,{children:[`If you have SVG content that is not a React SVG element, you can use the
included `,(0,w.jsx)(t.a,{href:`#parser`,children:(0,w.jsx)(t.code,{children:`@bento/svg-parser`})}),` method to transform a string into
the required React SVG element:`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`import { parser } from '@bento/svg-parser';
import { set } from '@bento/icon';

import icon from './icon.svg?raw';

set({ 'icon-name': parser(icon) });
`})}),`
`,(0,w.jsx)(r,{language:`tsx`,code:g}),`
`,(0,w.jsx)(a,{of:u,inline:!0}),`
`,(0,w.jsx)(i,{of:u}),`
`,(0,w.jsx)(t.h3,{id:`ondemand`,children:`ondemand`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`ondemand`}),` method allows you to `,(0,w.jsx)(t.strong,{children:`asynchronously`}),` introduce content to the
store. The method expects a function that should return a promise that resolves
to the React SVG element that should be used to render the icon. It receives the
icon’s name, which should be loaded as the first argument.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`import { parser } from '@bento/svg-parser';
import { ondemand } from '@bento/icon';

ondemand(async function hosted(name:string) {
  const icon:string = await fetch(\`{name}.svg\`).then((res) => res.text());

  return parser(icon);
});
`})}),`
`,(0,w.jsxs)(t.p,{children:[`You can have multiple `,(0,w.jsx)(t.code,{children:`ondemand`}),` loaders specified in your application, and
they will be called in the order that they are specified. The first loader that
returns a valid React SVG element will be used to render the icon.`]}),`
`,(0,w.jsxs)(t.p,{children:[`If your loader throws an error, the next loader will be called. If all loaders
throw an error or no content is returned, the icon will return a `,(0,w.jsx)(t.code,{children:`null`}),`
response and renders the `,(0,w.jsx)(t.a,{href:`#placeholders`,children:`placeholder`}),` content if it's specified.`]}),`
`,(0,w.jsx)(r,{language:`tsx`,code:v}),`
`,(0,w.jsx)(a,{of:f,inline:!0}),`
`,(0,w.jsx)(i,{of:f}),`
`,(0,w.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,w.jsxs)(t.p,{children:[`The icons are rendered with `,(0,w.jsx)(t.code,{children:`role="presentation"`}),` and should be considered
decorative and should not be used to convey information to the user. They
should only be used for visual or branding purposes.`]}),`
`,(0,w.jsx)(t.h3,{id:`semantic-icons`,children:`Semantic Icons`}),`
`,(0,w.jsx)(t.p,{children:`Semantic icons convey information to the user rather than just pure
decoration. This includes icons without text next to them that are used for
interactive elements. To ensure they are accessible to all users,
you should always describe the icon.`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`title`}),` prop is used to describe the icon. This
sets the `,(0,w.jsx)(t.code,{children:`role="img"`}),` attribute on the SVG element and adds a `,(0,w.jsx)(t.code,{children:`title`}),` element
to the SVG element with the contents of the `,(0,w.jsx)(t.code,{children:`title`}),` prop.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`import { Icon } from '@bento/icon';

<Icon icon="wand" title="A magic wand" />
`})}),`
`,(0,w.jsx)(t.h2,{id:`performance`,children:`Performance`}),`
`,(0,w.jsxs)(t.p,{children:[`When introducing content to the store, you should consider the performance
impact of the content you are introducing. The icons should always be
optimized using the appropriate tools and techniques to reduce the size of the
icons. Tools such as `,(0,w.jsx)(t.code,{children:`svgo`}),` can be used to optimize the SVG content.`]}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Icon`}),` component will render the icon as a full SVG element by default.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`import { Icon } from '@bento/icon';

<Icon icon="icon-name" />
<Icon icon="icon-name" />
<Icon icon="icon-name" />
`})}),`
`,(0,w.jsx)(t.p,{children:`When rendering the same icon multiple times, this can lead to a lot of
duplication in the DOM. Depending on the amount of icons you are rendering and
the size of the icons, this can lead to a lot of bytes being transferred over
the network.`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-html`,children:`<svg>
  <path d="...full..path..here" />
</svg>
<svg>
  <path d="...so..much..duplication" />
</svg>
<svg>
  <path d="...much..more..bytes..here" />
</svg>
`})}),`
`,(0,w.jsxs)(t.p,{children:[`It's worth noting that there are distinct advantages to rendering the icons as
full SVG elements when it comes to `,(0,w.jsx)(t.a,{href:`#server-side-rendering`,children:`server-side rendering`}),`.`]}),`
`,(0,w.jsx)(t.h3,{id:`sprite`,children:`Sprite`}),`
`,(0,w.jsxs)(t.p,{children:[`To reduce the amount of duplication in the DOM, you can render the icons as a
sprite. The optional `,(0,w.jsx)(t.code,{children:`mode`}),` prop is used to specify how the icon should be
rendered. Switching the `,(0,w.jsx)(t.code,{children:`mode`}),` to `,(0,w.jsx)(t.code,{children:`sprite`}),` instructs the `,(0,w.jsx)(t.code,{children:`Icon`}),` component to
render a `,(0,w.jsx)(t.code,{children:`use`}),` element that references the icon from a sprite sheet
automatically injected sprite sheet.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`import { Icon } from '@bento/icon';

<Icon icon="icon-name" mode="sprite" />
<Icon icon="icon-name" mode="sprite" />
<Icon icon="icon-name" mode="sprite" />
`})}),`
`,(0,w.jsx)(t.p,{children:`Would result in the following DOM:`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-html`,children:`<svg>
  <use xlink:href="#bento-svg-sprite-icon-name" />
</svg>
<svg>
  <use xlink:href="#bento-svg-sprite-icon-name" />
</svg>
<svg>
  <use xlink:href="#bento-svg-sprite-icon-name" />
</svg>
`})}),`
`,(0,w.jsx)(t.p,{children:`Once your application is hydrated on the client, the icons sprite sheet is
generated and injected into the DOM. The browser will trigger a paint event
and the icons are displayed. The sprite sheet is generated as follows:`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-html`,children:`<svg id="bento-svg-sprite" style="display: none;">
  <symbol id="bento-svg-sprite-icon-name" data-symbol="icon-name" viewBox="0 0 24 24">
    <path d="...massive..long..string..here" />
  </symbol>
</svg>
`})}),`
`,(0,w.jsx)(t.p,{children:`The sprite sheet container is only created if it doesn't already exist in the
DOM. The icons are added to the sprite sheet as they are requested. If an icon
is requested multiple times, it will only be added to the sprite sheet once.`}),`
`,(0,w.jsx)(t.p,{children:`This also means that you can inject the spritesheet into the DOM yourself as
part of the SSR response to ensure they are available and displayed before
the client-side hydration.`}),`
`,(0,w.jsx)(t.h2,{id:`server-side-rendering`,children:`Server side rendering`}),`
`,(0,w.jsxs)(t.p,{children:[`While the `,(0,w.jsx)(t.code,{children:`Icon`}),` component can render the icon content during the server-side
rendering, the content must be available during the rendering of the icons.
When loading the content `,(0,w.jsx)(t.a,{href:`#asynchronously`,children:`Asynchronously`}),` using the recommended
`,(0,w.jsx)(t.a,{href:`#ondemand`,children:`ondemand`}),` method, the content is not available during the
server-side rendering resulting in an empty response.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`import { Icon } from '@bento/icon';

<Icon icon="icon-name" />
// null - The icon doesn't have content, so it can't render anything.
`})}),`
`,(0,w.jsx)(t.p,{children:`Depending on your requirements this might be acceptable. If you want to return
content during the server-side rendering, you have the following options:`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsx)(t.li,{children:(0,w.jsx)(t.a,{href:`#svg-element-as-a-response`,children:`SVG element as a response`})}),`
`,(0,w.jsx)(t.li,{children:(0,w.jsx)(t.a,{href:`#asynchronously`,children:`Asynchronously`})}),`
`,(0,w.jsx)(t.li,{children:(0,w.jsx)(t.a,{href:`#placeholders`,children:`Placeholders`})}),`
`]}),`
`,(0,w.jsx)(t.h3,{id:`svg-element-as-a-response`,children:`SVG element as a response`}),`
`,(0,w.jsxs)(t.p,{children:[`As noted above, the `,(0,w.jsx)(t.code,{children:`Icon`}),` component can only render the icon if the content
is available during the server-side rendering. If you want to render
the icon as part of the SSR response, you should use the `,(0,w.jsx)(t.a,{href:`#set`,children:(0,w.jsx)(t.code,{children:`set`})}),` method
to introduce the content to the store.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`import { set } from '@bento/icon';
set({ 'icon-name': <svg /> });

<Icon icon="icon-name" />
// <svg>...</svg> - The icon has content that can render the icon.
`})}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`set`}),` method is synchronous. If you are using the `,(0,w.jsx)(t.code,{children:`ondemand`}),` method in your
application, please refer to the `,(0,w.jsx)(t.a,{href:`#asynchronously`,children:`Asynchronously`}),` section.`]}),`
`,(0,w.jsx)(t.h3,{id:`asynchronously`,children:`Asynchronously`}),`
`,(0,w.jsxs)(t.p,{children:[`When loading your content asynchronously using the `,(0,w.jsx)(t.code,{children:`ondemand`}),` method, it's
unavailable during the server-side rendering. These icons will default render an
empty (`,(0,w.jsx)(t.code,{children:`null`}),`) response. Once your application is hydrated on the client, the
icons will be available, requested in the `,(0,w.jsx)(t.code,{children:`ondemand`}),` method, and rendered
accordingly.`]}),`
`,(0,w.jsxs)(t.p,{children:[`To avoid the empty response, you can either use
`,(0,w.jsx)(t.a,{href:`#placeholders`,children:`Placeholders`}),` as mentioned below or change the `,(0,w.jsx)(t.code,{children:`mode`}),` to
`,(0,w.jsx)(t.code,{children:`sprite`}),` to render the icon as a sprite. When an icon is rendered as a sprite,
it will return an SVG element with a `,(0,w.jsx)(t.code,{children:`use`}),` element that references the icon
from the sprite.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`import { Icon } from '@bento/icon';

<Icon icon="icon-name" mode="sprite" />
// <svg><use xlink:href="#icon-name"></use></svg>
`})}),`
`,(0,w.jsxs)(t.p,{children:[`See `,(0,w.jsx)(t.a,{href:`#sprite`,children:`sprite`}),` for more information.`]}),`
`,(0,w.jsx)(t.h3,{id:`placeholders`,children:`Placeholders`}),`
`,(0,w.jsxs)(t.p,{children:[`When the icon content is loading or the requested icon doesn't exist the `,(0,w.jsx)(t.code,{children:`Icon`}),`
component will render the provided `,(0,w.jsx)(t.code,{children:`children`}),` as placeholder. This allows you to
render skeleton loaders, loading spinners, or any other content that should be
displayed while the icon is loading.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`import { Icon } from '@bento/icon';

<Icon icon="icon-name">
  <svg>...</svg>
</Icon>
`})}),`
`,(0,w.jsx)(t.p,{children:`While it might be tempting to use render props to render the conditionally
icon fallback differently on the server and client; this is not recommended for
applications that need to hydrate the server-rendered content on the client.
This will cause a mismatch between the server and client content, which will
result in the client-side hydration failing, forcing a complete re-render of the
content.`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`import { Icon } from '@bento/icon';

//
// ANTI PATTERN causes hydration errors:
//
<Icon icon="icon-name" mode="sprite">
  {() => server ? <svg>{icon}</svg> : null }
</Icon>
`})}),`
`,(0,w.jsx)(r,{language:`tsx`,code:b}),`
`,(0,w.jsx)(a,{of:d,inline:!0}),`
`,(0,w.jsx)(i,{of:d}),`
`,(0,w.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,w.jsxs)(t.p,{children:[`As the `,(0,w.jsx)(t.code,{children:`Icon`}),` component is a wrapper around the `,(0,w.jsx)(t.code,{children:`Illustration`}),` component, you
can use the `,(0,w.jsx)(t.code,{children:`Illustration`}),`'s properties to customize the icon. The `,(0,w.jsx)(t.code,{children:`Icon`}),`
component will pass all properties down to the `,(0,w.jsx)(t.code,{children:`Illustration`}),` component
allowing you to `,(0,w.jsx)(t.code,{children:`rotate`}),` or `,(0,w.jsx)(t.code,{children:`flip`}),` the icon. This is useful when you need
to support RTL languages that requires the icon to be altered.`]}),`
`,(0,w.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,w.jsxs)(t.p,{children:[`The component is created using our `,(0,w.jsx)(t.code,{children:`@bento/slots`}),` package and allows the
assignment of the custom `,(0,w.jsx)(t.code,{children:`slot`}),` property to be used for overrides.`]}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`@bento/icon`}),` is registered as `,(0,w.jsx)(t.code,{children:`BentoIcon`}),` and introduces the following
slots:`]}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`content`}),`: Assigned to the `,(0,w.jsx)(t.code,{children:`Illustration`}),` component that renders the icon
content.`]}),`
`]}),`
`,(0,w.jsxs)(t.p,{children:[`See the `,(0,w.jsx)(t.code,{children:`@bento/slots`}),` package for more information on how to use the `,(0,w.jsx)(t.code,{children:`slot`}),` and
`,(0,w.jsx)(t.code,{children:`slots`}),` properties.`]}),`
`,(0,w.jsx)(t.h3,{id:`styling`,children:`Styling`}),`
`,(0,w.jsxs)(t.p,{children:[`Once you assign the `,(0,w.jsx)(t.code,{children:`className`}),` property to the component, you take full
responsibility for the styling of the component, and it will remove any
default styling that might be applied as part of this component.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-jsx`,children:`import { Illustration } from '@bento/icon';

<Icon icon="magic-wand" className="my-component" />
`})}),`
`,(0,w.jsx)(t.p,{children:`The following data attributes are introduced as part of the component render
state:`}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:`Attribute`}),(0,w.jsx)(t.th,{children:`Description`}),(0,w.jsx)(t.th,{children:`Example Values`})]})}),(0,w.jsxs)(t.tbody,{children:[(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-loading`})}),(0,w.jsx)(t.td,{children:`Indicates the icon is loading`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-icon`})}),(0,w.jsx)(t.td,{children:`The name of the icon that is currently being rendered`}),(0,w.jsx)(t.td,{children:`"magic-wand"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-mode`})}),(0,w.jsx)(t.td,{children:`The rendering mode of the icon`}),(0,w.jsx)(t.td,{children:`"sprite" / "svg"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-flip`})}),(0,w.jsx)(t.td,{children:`The icon is flipped horizontally or vertically`}),(0,w.jsx)(t.td,{children:`"horizontal" / "vertical"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-rotate`})}),(0,w.jsx)(t.td,{children:`The icon is rotated by the specified angle`}),(0,w.jsx)(t.td,{children:`"90" / "180" / "270"`})]})]})]}),`
`,(0,w.jsxs)(t.p,{children:[`These data attributes are introduced on the root element of the component and
can be targeted using your previously provided custom `,(0,w.jsx)(t.code,{children:`className`}),`:`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-css`,children:`.my-component[data-loading] {
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
`})})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),l(),c(),m(),_(),y(),x()}))();export{C as default};