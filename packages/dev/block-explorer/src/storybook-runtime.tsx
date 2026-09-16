import type { ComponentProps } from 'react';
import { Source } from '@storybook/addon-docs/blocks';
import { BlockExplorer } from './runtime.tsx';
import type { BlockCodeRendererProps, BlockExplorerProps } from './types.ts';

/** Storybook-specific source renderer using addon-docs syntax highlighting. */
function StorybookCodeRenderer({ code, language }: BlockCodeRendererProps) {
  const sourceLanguage = language === 'ts' ? 'typescript' : language;
  return <Source code={code} language={sourceLanguage as ComponentProps<typeof Source>['language']} copyable={false} />;
}

/**
 * Explorer adapter used by Storybook MDX pages.
 *
 * @param props - Block explorer properties supplied by the expanded MDX marker.
 */
export function StorybookBlockExplorer(props: BlockExplorerProps) {
  return <BlockExplorer {...props} codeRenderer={StorybookCodeRenderer} />;
}
