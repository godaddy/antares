'use client';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { BlockExplorer } from '@bento/block-explorer/runtime';
import type { BlockCodeRendererProps, BlockExplorerProps } from '@bento/block-explorer/runtime';

function SiteCodeRenderer({ code, language }: BlockCodeRendererProps) {
  return <DynamicCodeBlock lang={language} code={code} codeblock={{ allowCopy: false }} />;
}

/** Site adapter that keeps code highlighting consistent with the existing Fumadocs docs. */
export function SiteBlockExplorer(props: BlockExplorerProps) {
  return <BlockExplorer {...props} codeRenderer={SiteCodeRenderer} />;
}
