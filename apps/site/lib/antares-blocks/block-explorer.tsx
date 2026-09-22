'use client';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { BlockExplorer } from '@bento/block-explorer/runtime';
import type { BlockCodeRendererProps, BlockExplorerProps } from '@bento/block-explorer/runtime';

/**
 * Uses Fumadocs highlighting while leaving copy controls to the explorer.
 *
 * @param props - {@link BlockCodeRendererProps}
 */
function SiteCodeRenderer({ code, language }: BlockCodeRendererProps) {
  return <DynamicCodeBlock lang={language} code={code} codeblock={{ allowCopy: false }} />;
}

/**
 * Adapts the shared explorer to Site's Fumadocs syntax highlighting.
 *
 * @param props - {@link BlockExplorerProps}
 */
export function SiteBlockExplorer(props: BlockExplorerProps) {
  return <BlockExplorer {...props} codeRenderer={SiteCodeRenderer} />;
}
