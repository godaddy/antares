import{i as e}from"./preload-helper-C8Zz4tJD.js";import{y as t}from"./iframe-jdtv006j.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-mL7pNE1K.js";import{t as c}from"./mdx-react-shim-BfOCEV2Z.js";import{Store as l,api as u,n as d,t as f}from"./create-external-store.stories-BMQqr3Dx.js";var p,m=e((()=>{p=`/* v8 ignore next */
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
`}));function h(e){let t={blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:f,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`external-store`,children:`External Store`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`@bento/create-external-store`}),` package provides a simple way to create a
external store that can be used to share global state between components. It's
designed to be as low-level as possible and doesn't provide additional
features like reducers or actions.`]}),`
`,(0,_.jsxs)(t.p,{children:[`This package is meant to be used in combination with the `,(0,_.jsx)(t.code,{children:`useSyncExternalStore`}),`
hook from React.`]}),`
`,(0,_.jsx)(t.p,{children:`If you are looking for a more feature-rich store, you might want to consider
using a library like Redux.`}),`
`,(0,_.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/create-external-store
`})}),`
`,(0,_.jsx)(t.h2,{id:`createstore`,children:`createStore`}),`
`,(0,_.jsxs)(t.p,{children:[`The returned `,(0,_.jsx)(t.code,{children:`store`}),` object is designed to be used in combination with the
`,(0,_.jsx)(t.code,{children:`useSyncExternalStore`}),` hook from React. It contains the `,(0,_.jsx)(t.code,{children:`subscribe`}),` and
`,(0,_.jsx)(t.code,{children:`getSnapshot`}),` methods should be provided to the hook.`]}),`
`,(0,_.jsx)(t.p,{children:`When creating a new store, you can provide an initial state as the first
argument. The initial state can be any iterable object.`}),`
`,(0,_.jsx)(r,{language:`tsx`,code:p}),`
`,(0,_.jsx)(i,{of:l}),`
`,(0,_.jsx)(t.p,{children:`The created store returns an object with the following methods:`}),`
`,(0,_.jsx)(a,{of:u}),`
`,(0,_.jsx)(t.h3,{id:`subscribe`,children:`subscribe`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`subscribe`}),` function is used to listen for changes to the store. It accepts
a callback function that is called whenever the store is updated. It returns an
`,(0,_.jsx)(t.code,{children:`unsubscribe`}),` function that can be used to stop listening for changes. This
follows the API that is required by the `,(0,_.jsx)(t.code,{children:`useSyncExternalStore`}),` hook.`]}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`subscribe`}),` function should be passed into the `,(0,_.jsx)(t.code,{children:`useSyncExternalStore`}),` hook
as the first argument:`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`import { createStore } from '@bento/create-external-store';
import { useSyncExternalStore } from 'react';

const store = createStore({ count: 0 });
useSyncExternalStore(store.subscribe, store.getSnapshot);
`})}),`
`,(0,_.jsxs)(t.p,{children:[`You can also use the `,(0,_.jsx)(t.code,{children:`subscribe`}),` method directly if you want to listen to
changes to the store. The `,(0,_.jsx)(t.code,{children:`subscribe`}),` method is called with the changes that
triggered the update.`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`const unsubscribe = store.subscribe(function (changes) {
  console.log('This was added to the store:', changes);
});
`})}),`
`,(0,_.jsx)(t.h3,{id:`getsnapshot`,children:`getSnapshot`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`getSnapshot`}),` function is used to get the store’s current state. It
returns a `,(0,_.jsx)(t.strong,{children:`cached`}),` snapshot of the current state of the store.`]}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`getSnapshot`}),` function should be passed into the `,(0,_.jsx)(t.code,{children:`useSyncExternalStore`}),` hook
as the second argument:`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`import { createStore } from '@bento/create-external-store';
import { useSyncExternalStore } from 'react';

const store = createStore({ count: 110001 });
useSyncExternalStore(store.subscribe, store.getSnapshot);
`})}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`const snapshot = store.getSnapshot();
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
`,(0,_.jsx)(t.h3,{id:`set`,children:`set`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`set`}),` function is used to update the store. It accepts an object with the
state that should be updated. The `,(0,_.jsx)(t.code,{children:`set`}),` function triggers the `,(0,_.jsx)(t.code,{children:`subscribe`}),` method
with the changes made to the store.`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`import { createStore } from '@bento/create-external-store';

const store = createStore({ count: 0 });
store.set({ count: 1 });
`})}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`set`}),` function does not replace the store’s state but instead merges
the new state with the existing state. This means you can update only
specific keys in the store without affecting the rest of the state.`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`store.set({ foo: 'bar' });
console.log(store.getSnapshot()) // { count: 1, foo: 'bar' }
`})}),`
`,(0,_.jsxs)(t.p,{children:[`To remove data from the store, set the value to `,(0,_.jsx)(t.code,{children:`undefined`}),`.`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`store.set({ count: undefined });
console.log(store.getSnapshot()) // { foo: 'bar' }
`})}),`
`,(0,_.jsx)(t.h3,{id:`ondemand`,children:`ondemand`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`ondemand`}),` function updates the store once the data is requested.
The `,(0,_.jsx)(t.code,{children:`ondemand`}),` expects an `,(0,_.jsx)(t.strong,{children:`async`}),` function that returns the data for the
requested key. The key is supplied as the first argument of the function.`]}),`
`,(0,_.jsxs)(t.blockquote,{children:[`
`,(0,_.jsxs)(t.p,{children:[(0,_.jsx)(t.strong,{children:`Note:`}),` The `,(0,_.jsx)(t.code,{children:`ondemand`}),` function should be used in combination with the
`,(0,_.jsx)(t.code,{children:`pick`}),` function. This method will trigger the `,(0,_.jsx)(t.code,{children:`ondemand`}),` function when
the supplied key does not exist in the store.`]}),`
`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`import { createStore } from '@bento/create-external-store';

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
`,(0,_.jsxs)(t.p,{children:[`The supplied function is only called once for each key. The result of the
function is cached and returned for subsequent requests. If you want to
force a re-fetch, use the `,(0,_.jsx)(t.code,{children:`set`}),` command to set the value to `,(0,_.jsx)(t.code,{children:`undefined`}),`.`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`store.set({ count: undefined });
`})}),`
`,(0,_.jsx)(t.h3,{id:`pick`,children:`pick`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`pick`}),` function selects specific keys from the store. When the
key does not exist in the store; the `,(0,_.jsx)(t.code,{children:`ondemand`}),` function is triggered to request
the data for the supplied key.`]}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`pick`}),` function accepts a `,(0,_.jsx)(t.code,{children:`string`}),` as the first argument, which is the key
you want to select from the store. The return value is a function that should
be supplied to the `,(0,_.jsx)(t.code,{children:`useSyncExternalStore`}),` hook as the second argument.`]}),`
`,(0,_.jsxs)(t.p,{children:[`To prevent unwanted re-rendering, you should wrap the result of the
`,(0,_.jsx)(t.code,{children:`pick`}),` function in a `,(0,_.jsx)(t.code,{children:`useCallback`}),` hook.`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`import { createStore } from '@bento/create-external-store';
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
`,(0,_.jsxs)(t.p,{children:[`If you are looking to select a key without triggering the `,(0,_.jsx)(t.code,{children:`ondemand`}),` function,
you should use object destructuring instead:`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`const { counter } = useSyncExternalStore(store.subscribe, store.getSnapshot);
`})}),`
`,(0,_.jsx)(t.h3,{id:`only`,children:`only`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`only`}),` function allows you to only subscribe to changes to specific keys in
the store. This is useful when you only want to trigger an update when a specific
key changes. It's effectively a wrapper around our `,(0,_.jsx)(t.code,{children:`subscribe`}),` method.`]}),`
`,(0,_.jsxs)(t.p,{children:[`The method accepts a `,(0,_.jsx)(t.code,{children:`string`}),` or an `,(0,_.jsx)(t.code,{children:`array`}),` of strings of the keys that you want
to subscribe to. The return value is a dedicated `,(0,_.jsx)(t.code,{children:`subscribe`}),` function that
should be passed to the `,(0,_.jsx)(t.code,{children:`useSyncExternalStore`}),` hook to trigger an update only
when the specified keys change.`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`import { createStore } from '@bento/create-external-store';

const store = createStore({ count: 0 });
const counter = store.only('count');

const unsub = counter(function subscriber() {
  console.log('The count has changed:', counter());
});

store.set({ foo: 'bar' });    // No update
store.set({ count: 1 });      // Update \\o/
`})}),`
`,(0,_.jsxs)(t.p,{children:[`To prevent unwanted re-rendering, you should wrap the result of the
`,(0,_.jsx)(t.code,{children:`only`}),` function in a `,(0,_.jsx)(t.code,{children:`useCallback`}),` hook.`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`import { createStore } from '@bento/create-external-store';
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
`,(0,_.jsx)(t.h3,{id:`dispatch`,children:`dispatch`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`dispatch`}),` function triggers the functions you supplied to
the `,(0,_.jsx)(t.code,{children:`subscribe`}),` method. This is done automatically when introducing a new state
using either the `,(0,_.jsx)(t.code,{children:`set`}),` or `,(0,_.jsx)(t.code,{children:`ondemand`}),` methods. We still wanted to expose these
internals for consumption to give you complete control over the store.`]}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`dispatch`}),` function is called with the newly introduced data. These changes
are used by the `,(0,_.jsx)(t.code,{children:`only`}),` method to ensure that it only triggers an update when
the specified keys are changed.`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`import { createStore } from '@bento/create-external-store';

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
`})})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=t(),c(),s(),d(),m()}))();export{g as default};