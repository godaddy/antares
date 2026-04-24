import{j as e}from"./iframe-Cf4veHW5.js";import{useMDXComponents as s}from"./index-BtVMlOOr.js";import{M as i,A as o,S as c,f as l,a as h}from"./blocks-DmuR8dZ_.js";import{S as d,R as p,O as m,D as t}from"./error.stories-BGYVX3Ap.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DNjwxWKM.js";import"./index-DToc6jV2.js";import"./index-CuIGtFSl.js";import"./index-DrFu-skq.js";import"./index-CLj43KZG.js";const u=`import { BentoError, type BentoErrorArgs } from '@bento/error';
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
`;function a(r){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"error",children:"Error"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/error"})," package creates custom ",e.jsx(n.code,{children:"Error"}),` objects that can be thrown
as part of the framework. These custom error objects are designed to create a
better DX for developers in a production environment.`]}),`
`,e.jsx(n.p,{children:`Every created error will automatically include the following as part of
the message:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Unobfuscated name of the component that threw the error."}),`
`,e.jsx(n.li,{children:"Unobfuscated name of the function that threw the error."}),`
`,e.jsx(n.li,{children:"Link to the documentation that is dedicated to the error."}),`
`,e.jsx(n.li,{children:"Reference to our support channel."}),`
`]}),`
`,e.jsx(n.p,{children:"Throwing or logging the error created above would result in the following output:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`BentoError: @bento/package-name(method-name): The given name is already registered, please provide a different unique name

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
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm install --save @bento/error
`})}),`
`,e.jsx(n.h2,{id:"bentoerror",children:"BentoError"}),`
`,e.jsxs(n.p,{children:["The package exposes the ",e.jsx(n.code,{children:"BentoError"}),` Error class that can be used to create
custom errors.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { BentoError } from '@bento/error';

throw new BentoError({
  name: 'package-name',
  method: 'method-name',
  message: 'The given name is already registered, please provide a different unique name'
});
`})}),`
`,e.jsx(n.p,{children:"The following keys are required:"}),`
`,e.jsx(o,{of:p}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Changing the ",e.jsx(n.code,{children:"name"}),", ",e.jsx(n.code,{children:"method"}),", or ",e.jsx(n.code,{children:"message"}),` properties will result in a
different hash. This hash is the reference to the error on the documentation
page. If you change any of these properties, you must also update the
documentation page.`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<h2 id="place-the-generated-hash-here"></h2>

<!--
 As mentioned above, it's possible that a different hash was previously generated.
 You still want to keep the hash on the documentation page to ensure that older
  versions of the framework can still be accessed in the right section.
-->
<a name="place-the-previous-hash-here"></a>
`})}),`
`,e.jsx(n.p,{children:"The following keys are optional:"}),`
`,e.jsx(o,{of:m}),`
`,e.jsx(n.p,{children:`Any other key added to the object will be introduced as a property on
the error object. This can be useful for debugging purposes when you want to
provide additional information to the developer.`}),`
`,e.jsx(n.h3,{id:"example",children:"Example"}),`
`,e.jsx(c,{language:"tsx",code:u}),`
`,e.jsx(l,{of:t}),`
`,e.jsx(h,{of:t,inline:!0})]})}function T(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(a,{...r})}):a(r)}export{T as default};
