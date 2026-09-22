import type { ComponentProps } from 'react';
import { Source } from '@storybook/addon-docs/blocks';
import { BlockExplorer } from './runtime.tsx';
import type { BlockCodeRendererProps, BlockExplorerProps } from './types.ts';

/**
 * Uses Storybook syntax highlighting while leaving copy controls to the explorer.
 *
 * @param props - {@link BlockCodeRendererProps}
 */
function StorybookCodeRenderer({ code, language }: BlockCodeRendererProps) {
  const sourceLanguage = language === 'ts' ? 'typescript' : language;
  return <Source code={code} language={sourceLanguage as ComponentProps<typeof Source>['language']} copyable={false} />;
}

/**
 * Explorer adapter used by Storybook MDX pages.
 *
 * @param props - {@link BlockExplorerProps}
 */
export function StorybookBlockExplorer(props: BlockExplorerProps) {
  return <BlockExplorer {...props} codeRenderer={StorybookCodeRenderer} />;
}
