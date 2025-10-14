# why did you render

This addon integrates the `why-did-you-render` package into Storybook to
provide your stories with additional context on what kind of performance
optimizations should be made.

## Integration

The `why-did-you-render` package needs to be the first import so it can start
intercepting/patching the required React internals in order to track your
components. At the top of your `.storybook/preview.ts`, above any other `import`
statement add the following:

```js
import './why-did-you-render.ts';
```

Then you need to configure the addon in `.storybook/main.ts`, include the
following path in the `addons` array:

```js
  addons: [
    join(__dirname, './addons/why-did-you-render/index.ts'),

    // the rest of the addon imports here
  ],
```

That was the easy part. For the final step of the integration it needs to be
talking to pandora's blackbox, your bundler of choice:

### Integrating with Vite

The `vite.config.ts` file needs to be updated with the `jsxImportSource` key
in the `react` plugin. This ensures that all the `jsx` calls are correctly
wrapped by the `why-did-you-render` package. The plugin will not function
without this integration.

```js
export default defineConfig({
  plugins: [

    //
    // The custom jsxImportSource option is required for the why-did-you-render
    // plugin to work. This ensure all JSX calls are correctly introspected.
    //
    react({ jsxImportSource: '@welldone-software/why-did-you-render' })
  ]
});
```