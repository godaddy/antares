import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { writeFile, mkdir, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assume from 'assume';
import { processContent } from '../compile-readme.ts';
import { API, Snapshot } from 'typescript/unstable/sync';
import * as resolverEngine from '../../packages/dev/storybook-addon-helpers/src/engine/resolve.ts';
import * as componentEngine from '../../packages/dev/storybook-addon-helpers/src/engine/component-type.ts';
import * as typeEngine from '../../packages/dev/storybook-addon-helpers/src/engine/extract.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tempDir = join(__dirname, 'temp');

// Inline fixtures
const COMPONENT = `import React from 'react';

/**
 * A test component with documented props.
 */
export interface TestComponentProps {
  /** The title of the component. */
  title: string;

  /** An optional description. */
  description?: string;

  /** A required boolean flag. */
  enabled: boolean;

  /** A callback function. */
  onClick?: () => void;
}

export function TestComponent(props: TestComponentProps) {
  return <div>{props.title}</div>;
}`;

const STORIES = `import { getMeta, getComponentDocs } from '@bento/storybook-addon-helpers';
import { TestComponent } from './src/index.tsx';

export default getMeta({
  title: 'test/component'
});

export const Props = getComponentDocs(TestComponent);`;

const EXAMPLE = `import { TestComponent } from './test-component.tsx';
/* v8 ignore next */
import React from 'react';

export function TestExample() {
  return (
    <TestComponent
      title="Example"
      enabled={true}
      onClick={() => console.log('clicked')}
    />
  );
}`;

const README = `import { Meta, Story, ArgTypes, Controls, Source } from '@storybook/addon-docs/blocks';
import TestExample from './test-example.tsx?raw';
import * as Stories from './test-component.stories.tsx';

<Meta of={Stories} name="Overview" />

# Test Component

The test component for testing the compile-readme script.

## Installation

\`\`\`bash
npm install --save test-component
\`\`\`

## Props

<ArgTypes of={Stories.Props} />

## Examples

<Source language="tsx" code={TestExample} />

Here's some additional markdown content to ensure it's preserved.`;

// Helpers
let testCounter = 0;

async function makeTemp(name: string): Promise<string> {
  const dir = join(tempDir, `${name}-${testCounter++}`);
  await mkdir(join(dir, 'src'), { recursive: true });
  return dir;
}

async function writeFiles(base: string, files: { [key: string]: string }): Promise<void> {
  await Promise.all(Object.entries(files).map(([path, content]) => writeFile(join(base, path), content)));
}

async function runProcess(mdx: string, fsMap: { [key: string]: string }): Promise<string> {
  const dir = await makeTemp('test');
  await writeFiles(dir, fsMap);
  return processContent(mdx, dir);
}

describe('compile-readme', function compileReadmeTests() {
  beforeEach(async function setup() {
    await mkdir(tempDir, { recursive: true });
  });

  afterEach(async function cleanup() {
    vi.restoreAllMocks();
    await rm(tempDir, { recursive: true, force: true });
  });

  it.each([
    { context: 'component extraction', failure: undefined, fallback: false },
    { context: 'fallback extraction', failure: undefined, fallback: true },
    { context: 'a source loading failure', failure: 'source', fallback: false },
    { context: 'a component extraction failure', failure: 'component', fallback: false },
    { context: 'a fallback extraction failure', failure: 'fallback', fallback: true }
  ])('closes native resources after $context', async function closesNativeResources({ failure, fallback }) {
    const created: resolverEngine.Resolver[] = [];
    const createResolver = resolverEngine.createResolver;
    const open = vi.spyOn(API.prototype, 'updateSnapshot');
    const close = vi.spyOn(API.prototype, 'close');
    const dispose = vi.spyOn(Snapshot.prototype, 'dispose');
    vi.spyOn(resolverEngine, 'createResolver').mockImplementation(function trackResolver(...args) {
      const resolver = createResolver(...args);
      created.push(resolver);
      vi.spyOn(resolver, 'close');
      if (failure === 'source') {
        const getSourceFile = resolver.getSourceFile;
        vi.spyOn(resolver, 'getSourceFile').mockImplementation(function failSource(...sourceArgs) {
          getSourceFile(...sourceArgs);
          throw new Error('Source loading failed');
        });
      }
      return resolver;
    });
    if (failure === 'component') {
      vi.spyOn(componentEngine, 'extractComponentDocs').mockImplementation(function failComponent() {
        throw new Error('Component extraction failed');
      });
    }
    if (failure === 'fallback') {
      vi.spyOn(typeEngine, 'extractTypeDocs').mockImplementation(function failType() {
        throw new Error('Fallback extraction failed');
      });
    }
    const stories = fallback
      ? `import type { TestComponentProps } from './src/index.tsx';
        export const Props = getComponentDocs(TestComponent);`
      : STORIES;
    try {
      const output = await runProcess(README, {
        'src/index.tsx': COMPONENT,
        'test-component.stories.tsx': stories,
        'test-example.tsx': EXAMPLE
      });

      expect(created).toHaveLength(1);
      expect(created[0].close).toHaveBeenCalledOnce();
      expect(open).toHaveBeenCalled();
      expect(close).toHaveBeenCalledTimes(open.mock.calls.length);
      expect(dispose).toHaveBeenCalledTimes(open.mock.calls.length);
      if (failure) {
        expect(output).not.toContain('| Prop |');
      } else {
        expect(output).toContain('| `title` | `string` | Yes |');
      }
    } finally {
      for (const resolver of created) resolver.close();
    }
  });

  it('should convert MDX with Source and ArgTypes to Markdown', async function testFullConversion() {
    const output = await runProcess(README, {
      'src/index.tsx': COMPONENT,
      'test-component.stories.tsx': STORIES,
      'test-example.tsx': EXAMPLE
    });

    // Verify Storybook imports are removed
    assume(output).to.not.include('@storybook/addon-docs/blocks');
    assume(output).to.not.match(/^import\s+.*from\s+['"]@storybook/gm);

    // Verify Source component is replaced with code block
    assume(output).to.include('```tsx');
    assume(output).to.include('import { TestComponent }');
    assume(output).to.include('export function TestExample()');

    // Verify ArgTypes component is replaced with prop table
    assume(output).to.include('| Prop | Type | Required | Description |');
    assume(output).to.include('| `title` |');
    assume(output).to.include('| `description` |');
    assume(output).to.include('| `enabled` |');
    assume(output).to.include('| `onClick` |');

    // Verify required flags
    assume(output).to.include('title` | `string` | Yes |');
    assume(output).to.include('description` | `string` | No |');
    assume(output).to.include('enabled` | `boolean` | Yes |');

    // Verify Meta and Story components are removed
    assume(output).to.not.match(/<Meta[^>]*>/);
    assume(output).to.not.match(/<Story[^>]*>/);
    assume(output).to.not.match(/<Controls[^>]*>/);

    // Verify markdown content is preserved
    assume(output).to.include('# Test Component');
    assume(output).to.include('## Installation');
    assume(output).to.include('## Props');
    assume(output).to.include('## Examples');
    assume(output).to.include("Here's some additional markdown content");
  });

  it('should handle missing source files gracefully', async function testMissingSource() {
    const output = await runProcess(
      `import MissingFile from './missing.tsx?raw';
<Source code={MissingFile} />`,
      {}
    );

    // Source component should be removed, not crash
    assume(output).to.not.include('<Source');
    assume(output).to.not.include('MissingFile');
  });

  it('should handle missing story files gracefully', async function testMissingStory() {
    const output = await runProcess(
      `import * as Stories from './missing.stories.tsx';
<ArgTypes of={Stories.Props} />`,
      {}
    );

    // ArgTypes component should be removed, not crash
    assume(output).to.not.include('<ArgTypes');
  });

  it('should normalize excessive whitespace', async function testWhitespace() {
    const output = await runProcess(
      `import { Meta } from '@storybook/addon-docs/blocks';
<Meta name="test" />

# Title



## Section



Some content`,
      {}
    );

    // Should not have more than two consecutive newlines
    assume(output).to.not.match(/\n{4,}/);
    // Meta component should be removed
    assume(output).to.not.include('<Meta');
    assume(output).to.not.include('@storybook');
  });
});
