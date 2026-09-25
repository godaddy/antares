# Block Explorer

Block Explorer helps developers understand and reuse complete UI patterns. It
combines a working preview with browsable source files, code copying, and an
installation command.

## Block contract

Use `Block` to display a composition with its preview and source files:

```tsx
import { Block } from '@bento/block-explorer/runtime';
import * as Stories from './sign-in-form.stories.tsx';

<Block id="sign-in-form" description="A simple Antares sign-in experience." of={Stories.Preview} />
```

`Block` requires a literal string `id` and an `of={Stories.Preview}` expression.
The optional string `description` explains the block beside the view controls.
When omitted, it uses the first matching `Block` description in the block's README.

Use `BlockLink` in related component documentation:

```mdx
import { BlockLink } from '@bento/block-explorer/runtime';

<BlockLink id="sign-in-form" />
```

`BlockLink` requires a literal string `id` and provides navigation to a related block.

Both markers require lowercase kebab-case identifiers, such as `sign-in-form`.

## Source browsing

The source view lets readers navigate and copy implementation files. Discovery
excludes root READMEs, `*.stories.tsx`, and the root `test/` directory. Other nested
files are included; symbolic links are skipped. Source is read during documentation builds.

## Build-time processing

MDX syntax trees distinguish live markers from code examples, comments, and YAML
text. Invalid MDX and filesystem failures report build errors, while changes to
block documentation and source trigger documentation rebuilds.

## Host integration

Storybook and Fumadocs adapters provide the same Preview/Code experience with
syntax highlighting and related-block navigation. Custom hosts can supply a
`codeRenderer` to `BlockExplorer`; the default renderer displays plain code.

## Installation

The Install action copies a command for adding the block's source files to an
application. Run the copied command in your application to install the published
version, then adapt the composition to your needs.
