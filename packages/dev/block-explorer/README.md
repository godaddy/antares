# Block Explorer

`@bento/block-explorer` is the reusable documentation runtime for design-system blocks. It gives a block a focused Preview/Code switch, a navigable source tree, file-level source viewing, and copy support.

Blocks themselves stay owned by the design-system package. Antares stores them under `packages/@godaddy/antares/blocks`; this package only provides the explorer and the build-time adapters for Storybook and Fumadocs.

## Block contract

Each block provides a manifest and a preview story:

```tsx
// blocks/sign-in-form/README.mdx
import { Block } from '@bento/block-explorer/runtime';
import * as Stories from './sign-in-form.stories.tsx';

<Block id="sign-in-form" description="A simple Antares sign-in experience." of={Stories.Preview} />
```

The `description` attribute is optional. Omit it when the block does not need explanatory text beside the Preview/Code controls.

The explorer discovers every regular file in the block directory recursively. The root README and root `*.stories.tsx` files are documentation inputs and are omitted from the Code view; nested files are included. Files are loaded at documentation build time and are never read from the browser filesystem.

## Host integration

Storybook adds `@bento/block-explorer/storybook` as an addon. The preset transforms the MDX marker and injects the browser adapter from `@bento/block-explorer/storybook-runtime`.

The site uses `remarkBlocks` from `@bento/block-explorer/node` and maps the generated `SiteBlockExplorer` component to the site's syntax highlighter.

The site exposes each block at `/docs/blocks/<id>` and Storybook exposes its docs page at `?path=/docs/blocks-<id>--overview`. The explorer itself stays focused on Preview and Code; navigation to those pages belongs to the host gallery or its surrounding documentation.
