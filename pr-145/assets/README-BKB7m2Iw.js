import{j as e}from"./iframe-Bb1NQHs5.js";import{useMDXComponents as s}from"./index-D4oHENfc.js";import{M as r,S as c,a,A as i}from"./blocks-DWBbPI5V.js";import{S as d,a as h,b as l}from"./create-external-store.stories-4ifEYeUW.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DFII15ob.js";import"./index-DinWVzWV.js";import"./index-C2u_IMHF.js";import"./index-DrFu-skq.js";import"./create-external-store-TtP3UJpK.js";import"./slots-DAzkOPzB.js";import"./index-KH84-3i8.js";import"./index-CLj43KZG.js";import"./index-BRlsuRZ3.js";import"./mergeProps-B-RIf00_.js";import"./SSRProvider-Bk6RcCZ6.js";import"./clsx-B-dksMZM.js";import"./index-DoPK94KX.js";const u=`/* v8 ignore next */
import React, { useEffect, useSyncExternalStore } from 'react';
import { createStore } from '@bento/create-external-store';
import { withSlots } from '@bento/slots';

interface Example {
  [key: string]: any;
}

const store = createStore({ initial: 'data' });

/**
 * CreateStore component demonstrating external store creation and usage.
 *
 * @param {Example} props - The component props.
 * @returns {JSX.Element} The rendered component with store data.
 * @public
 */
export const CreateStore: React.FC<Example> = withSlots('CreatedStore', function Stored(props) {
  const data = useSyncExternalStore(store.subscribe, store.getSnapshot);

  useEffect(
    function addProps() {
      store.set(props);
    },
    [props]
  );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
});
`;function o(t){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"external-store",children:"External Store"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/create-external-store"}),` package provides a simple way to create a
external store that can be used to share global state between components. It's
designed to be as low-level as possible and doesn't provide additional
features like reducers or actions.`]}),`
`,e.jsxs(n.p,{children:["This package is meant to be used in combination with the ",e.jsx(n.code,{children:"useSyncExternalStore"}),`
hook from React.`]}),`
`,e.jsx(n.p,{children:`If you are looking for a more feature-rich store, you might want to consider
using a library like Redux.`}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm install --save @bento/create-external-store
`})}),`
`,e.jsx(n.h2,{id:"createstore",children:"createStore"}),`
`,e.jsxs(n.p,{children:["The returned ",e.jsx(n.code,{children:"store"}),` object is designed to be used in combination with the
`,e.jsx(n.code,{children:"useSyncExternalStore"})," hook from React. It contains the ",e.jsx(n.code,{children:"subscribe"}),` and
`,e.jsx(n.code,{children:"getSnapshot"})," methods should be provided to the hook."]}),`
`,e.jsx(n.p,{children:`When creating a new store, you can provide an initial state as the first
argument. The initial state can be any iterable object.`}),`
`,e.jsx(c,{language:"tsx",code:u}),`
`,e.jsx(a,{of:h}),`
`,e.jsx(n.p,{children:"The created store returns an object with the following methods:"}),`
`,e.jsx(i,{of:l}),`
`,e.jsx(n.h3,{id:"subscribe",children:"subscribe"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"subscribe"}),` function is used to listen for changes to the store. It accepts
a callback function that is called whenever the store is updated. It returns an
`,e.jsx(n.code,{children:"unsubscribe"}),` function that can be used to stop listening for changes. This
follows the API that is required by the `,e.jsx(n.code,{children:"useSyncExternalStore"})," hook."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"subscribe"})," function should be passed into the ",e.jsx(n.code,{children:"useSyncExternalStore"}),` hook
as the first argument:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { createStore } from '@bento/create-external-store';
import { useSyncExternalStore } from 'react';

const store = createStore({ count: 0 });
useSyncExternalStore(store.subscribe, store.getSnapshot);
`})}),`
`,e.jsxs(n.p,{children:["You can also use the ",e.jsx(n.code,{children:"subscribe"}),` method directly if you want to listen to
changes to the store. The `,e.jsx(n.code,{children:"subscribe"}),` method is called with the changes that
triggered the update.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`const unsubscribe = store.subscribe(function (changes) {
  console.log('This was added to the store:', changes);
});
`})}),`
`,e.jsx(n.h3,{id:"getsnapshot",children:"getSnapshot"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"getSnapshot"}),` function is used to get the store’s current state. It
returns a `,e.jsx(n.strong,{children:"cached"})," snapshot of the current state of the store."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"getSnapshot"})," function should be passed into the ",e.jsx(n.code,{children:"useSyncExternalStore"}),` hook
as the second argument:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { createStore } from '@bento/create-external-store';
import { useSyncExternalStore } from 'react';

const store = createStore({ count: 110001 });
useSyncExternalStore(store.subscribe, store.getSnapshot);
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`const snapshot = store.getSnapshot();
console.log('The current state of the store:', snapshot);

store.getSnapshot() === store.getSnapshot() // true

//
// If we see you do this, will come to your house and slap you.
// - Copilot <5 March 2025>
//
// Real talk: As we cache the value of the snapshot inside the store, it's not
// recommended to mutate the snapshot directly. This is a performance optimization
// as we do not want to create a fresh clone of the data every time the snapshot
// function is called.
//
snapshot.count = 0;
`})}),`
`,e.jsx(n.h3,{id:"set",children:"set"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"set"}),` function is used to update the store. It accepts an object with the
state that should be updated. The `,e.jsx(n.code,{children:"set"})," function triggers the ",e.jsx(n.code,{children:"subscribe"}),` method
with the changes made to the store.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { createStore } from '@bento/create-external-store';

const store = createStore({ count: 0 });
store.set({ count: 1 });
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"set"}),` function does not replace the store’s state but instead merges
the new state with the existing state. This means you can update only
specific keys in the store without affecting the rest of the state.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`store.set({ foo: 'bar' });
console.log(store.getSnapshot()) // { count: 1, foo: 'bar' }
`})}),`
`,e.jsxs(n.p,{children:["To remove data from the store, set the value to ",e.jsx(n.code,{children:"undefined"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`store.set({ count: undefined });
console.log(store.getSnapshot()) // { foo: 'bar' }
`})}),`
`,e.jsx(n.h3,{id:"ondemand",children:"ondemand"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"ondemand"}),` function updates the store once the data is requested.
The `,e.jsx(n.code,{children:"ondemand"})," expects an ",e.jsx(n.strong,{children:"async"}),` function that returns the data for the
requested key. The key is supplied as the first argument of the function.`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," The ",e.jsx(n.code,{children:"ondemand"}),` function should be used in combination with the
`,e.jsx(n.code,{children:"pick"})," function. This method will trigger the ",e.jsx(n.code,{children:"ondemand"}),` function when
the supplied key does not exist in the store.`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { createStore } from '@bento/create-external-store';

const store = createStore();

store.ondemand(async function lazyload(key) {
  console.log('key:', key); // 'count'

  //
  // This is an example code; you should always sanitize the key before using it
  // as it should be considered user input. We're ignoring these security
  // concerns for the sake of simplicity.
  //
  const external = await fetch(\`/api/\${key}\`);
  return external.json();
});

const unsub = store.only('count')(function subscriber() {
  console.log('The data has been loaded');
});

const data = store.pick('count')(); // undefined
`})}),`
`,e.jsxs(n.p,{children:[`The supplied function is only called once for each key. The result of the
function is cached and returned for subsequent requests. If you want to
force a re-fetch, use the `,e.jsx(n.code,{children:"set"})," command to set the value to ",e.jsx(n.code,{children:"undefined"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`store.set({ count: undefined });
`})}),`
`,e.jsx(n.h3,{id:"pick",children:"pick"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"pick"}),` function selects specific keys from the store. When the
key does not exist in the store; the `,e.jsx(n.code,{children:"ondemand"}),` function is triggered to request
the data for the supplied key.`]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"pick"})," function accepts a ",e.jsx(n.code,{children:"string"}),` as the first argument, which is the key
you want to select from the store. The return value is a function that should
be supplied to the `,e.jsx(n.code,{children:"useSyncExternalStore"})," hook as the second argument."]}),`
`,e.jsxs(n.p,{children:[`To prevent unwanted re-rendering, you should wrap the result of the
`,e.jsx(n.code,{children:"pick"})," function in a ",e.jsx(n.code,{children:"useCallback"})," hook."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { createStore } from '@bento/create-external-store';
import { useSyncExternalStore, useCallback } from 'react';

const store = createStore({ counter: 420 });

function MyCounter() {
  const counter = useCallback(store.only('counter'), []);
  const picker = useCallback(store.pick('counter'), []);

  const count = useSyncExternalStore(counter, picker);
  const bump = useCallback(function update() {
    store.set({ counter: count + 1 });
  }, [count]);

  return <button onClick={bump}>Count: {data}</button>;
}
`})}),`
`,e.jsxs(n.p,{children:["If you are looking to select a key without triggering the ",e.jsx(n.code,{children:"ondemand"}),` function,
you should use object destructuring instead:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`const { counter } = useSyncExternalStore(store.subscribe, store.getSnapshot);
`})}),`
`,e.jsx(n.h3,{id:"only",children:"only"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"only"}),` function allows you to only subscribe to changes to specific keys in
the store. This is useful when you only want to trigger an update when a specific
key changes. It's effectively a wrapper around our `,e.jsx(n.code,{children:"subscribe"})," method."]}),`
`,e.jsxs(n.p,{children:["The method accepts a ",e.jsx(n.code,{children:"string"})," or an ",e.jsx(n.code,{children:"array"}),` of strings of the keys that you want
to subscribe to. The return value is a dedicated `,e.jsx(n.code,{children:"subscribe"}),` function that
should be passed to the `,e.jsx(n.code,{children:"useSyncExternalStore"}),` hook to trigger an update only
when the specified keys change.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { createStore } from '@bento/create-external-store';

const store = createStore({ count: 0 });
const counter = store.only('count');

const unsub = counter(function subscriber() {
  console.log('The count has changed:', counter());
});

store.set({ foo: 'bar' });    // No update
store.set({ count: 1 });      // Update \\o/
`})}),`
`,e.jsxs(n.p,{children:[`To prevent unwanted re-rendering, you should wrap the result of the
`,e.jsx(n.code,{children:"only"})," function in a ",e.jsx(n.code,{children:"useCallback"})," hook."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { createStore } from '@bento/create-external-store';
import { useSyncExternalStore, useCallback } from 'react';

const store = createStore({ counter: 420 });

function MyCounter() {
  const counter = useCallback(store.only('counter'), []);
  const data = useSyncExternalStore(counter, store.getSnapshot);
  const bump = useCallback(function update() {
    store.set({ counter: data.counter + 1 });
  }, [data.counter]);

  return <button onClick={bump}>Count: {data.counter}</button>;
}
`})}),`
`,e.jsx(n.h3,{id:"dispatch",children:"dispatch"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"dispatch"}),` function triggers the functions you supplied to
the `,e.jsx(n.code,{children:"subscribe"}),` method. This is done automatically when introducing a new state
using either the `,e.jsx(n.code,{children:"set"})," or ",e.jsx(n.code,{children:"ondemand"}),` methods. We still wanted to expose these
internals for consumption to give you complete control over the store.`]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"dispatch"}),` function is called with the newly introduced data. These changes
are used by the `,e.jsx(n.code,{children:"only"}),` method to ensure that it only triggers an update when
the specified keys are changed.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { createStore } from '@bento/create-external-store';

const store = createStore({ count: 1337 });

store.subscribe(function subscriber(changes) {
  console.log('This was added to the store:', changes);
});

//
// NOTE: This does not update the store's state. It will only
// call the \`subscribe\` function. If you want to update the state of the store
// use the \`set\` or \`ondemand\` methods.
//
store.dispatch({ count: 1 });
`})})]})}function M(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{M as default};
