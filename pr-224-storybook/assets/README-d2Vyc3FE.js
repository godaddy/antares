import{i as e}from"./preload-helper-DH8OVsN_.js";import{y as t}from"./iframe-BNKHDpVx.js";import{S as n,c as r,i,l as a,n as o,s,u as c}from"./blocks-dBz0ehHY.js";import{t as l}from"./mdx-react-shim-D9z-tKjU.js";import{Demo as u,Optional as d,Required as f,n as p,t as m}from"./error.stories-CUP38x-b.js";var h,g=e((()=>{h=`import { BentoError, type BentoErrorArgs } from '@bento/error';
/* v8 ignore next */
import { useCallback, type JSX } from 'react';

/**
 * Throws component renders a button that logs a BentoError to the console when clicked.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} A button element that triggers the createError function on click.
 *
 * @example
 * <Throws message={value} method="example" name="error" />
 *
 * @component
 */
export function Throws(props: BentoErrorArgs): JSX.Element {
  //
  // We're using useCallback here to prevent the function from being recreated
  // on every render as it's passed as a prop to the button component.
  //
  const createError = useCallback(
    function createError() {
      console.error(new BentoError(props));
    },
    [props]
  );

  return (
    <button name="error" onClick={createError}>
      Log bento error in console
    </button>
  );
}
`}));function _(e){let t={blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(s,{of:m,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`error`,children:`Error`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`@bento/error`}),` package creates custom `,(0,y.jsx)(t.code,{children:`Error`}),` objects that can be thrown
as part of the framework. These custom error objects are designed to create a
better DX for developers in a production environment.`]}),`
`,(0,y.jsx)(t.p,{children:`Every created error will automatically include the following as part of
the message:`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsx)(t.li,{children:`Unobfuscated name of the component that threw the error.`}),`
`,(0,y.jsx)(t.li,{children:`Unobfuscated name of the function that threw the error.`}),`
`,(0,y.jsx)(t.li,{children:`Link to the documentation that is dedicated to the error.`}),`
`,(0,y.jsx)(t.li,{children:`Reference to our support channel.`}),`
`]}),`
`,(0,y.jsx)(t.p,{children:`Throwing or logging the error created above would result in the following output:`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{children:`BentoError: @bento/package-name(method-name): The given name is already registered, please provide a different unique name

For more information visit: https://example.com/docs/errors/#AFBF4A

Need more help? Join our support channel #bento-support.
    at TestContext.<anonymous> (<path>/<file>:420:69)
    at Test.runInAsyncScope (node:async_hooks:211:14)
    at Test.run (node:internal/test_runner/test:931:25)
    at Test.start (node:internal/test_runner/test:829:17)
    at node:internal/test_runner/test:1308:71
    at node:internal/per_context/primordials:483:82
    at new Promise (<anonymous>)
    at new SafePromise (node:internal/per_context/primordials:451:29)
    at node:internal/per_context/primordials:483:9
    at Array.map (<anonymous>)
`})}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/error
`})}),`
`,(0,y.jsx)(t.h2,{id:`bentoerror`,children:`BentoError`}),`
`,(0,y.jsxs)(t.p,{children:[`The package exposes the `,(0,y.jsx)(t.code,{children:`BentoError`}),` Error class that can be used to create
custom errors.`]}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-javascript`,children:`import { BentoError } from '@bento/error';

throw new BentoError({
  name: 'package-name',
  method: 'method-name',
  message: 'The given name is already registered, please provide a different unique name'
});
`})}),`
`,(0,y.jsx)(t.p,{children:`The following keys are required:`}),`
`,(0,y.jsx)(o,{of:f}),`
`,(0,y.jsxs)(t.blockquote,{children:[`
`,(0,y.jsxs)(t.p,{children:[`Changing the `,(0,y.jsx)(t.code,{children:`name`}),`, `,(0,y.jsx)(t.code,{children:`method`}),`, or `,(0,y.jsx)(t.code,{children:`message`}),` properties will result in a
different hash. This hash is the reference to the error on the documentation
page. If you change any of these properties, you must also update the
documentation page.`]}),`
`]}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-html`,children:`<h2 id="place-the-generated-hash-here"></h2>

<!--
 As mentioned above, it's possible that a different hash was previously generated.
 You still want to keep the hash on the documentation page to ensure that older
  versions of the framework can still be accessed in the right section.
-->
<a name="place-the-previous-hash-here"></a>
`})}),`
`,(0,y.jsx)(t.p,{children:`The following keys are optional:`}),`
`,(0,y.jsx)(o,{of:d}),`
`,(0,y.jsx)(t.p,{children:`Any other key added to the object will be introduced as a property on
the error object. This can be useful for debugging purposes when you want to
provide additional information to the developer.`}),`
`,(0,y.jsx)(t.h3,{id:`example`,children:`Example`}),`
`,(0,y.jsx)(r,{language:`tsx`,code:h}),`
`,(0,y.jsx)(i,{of:u}),`
`,(0,y.jsx)(a,{of:u,inline:!0})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;e((()=>{y=t(),l(),c(),p(),g()}))();export{v as default};