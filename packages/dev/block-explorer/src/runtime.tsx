'use client';

import { useMemo, useState } from 'react';
import { Box, Flex, Icon, LinkButton, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';
import { BlockFileTree } from './block-file-tree.tsx';
import { BlockSourcePanel } from './block-source-panel.tsx';
import { BlockToolbar } from './block-toolbar.tsx';
import { createFileTree } from './tree.ts';
import type { BlockExplorerProps, BlockFile, BlockLinkMarkerProps, BlockMarkerProps, BlockView } from './types.ts';
import styles from './runtime.module.css';

/**
 * Build-time MDX marker. The host compiler replaces it with an explorer.
 *
 * @param props - Marker attributes consumed by the documentation compiler.
 */
export function Block(props: BlockMarkerProps): null {
  void props;
  return null;
}

/**
 * Build-time marker for a compact link to a block overview page.
 *
 * @param props - Marker attributes consumed by the documentation compiler.
 */
export function BlockLink(props: BlockLinkMarkerProps): null {
  void props;
  return null;
}

/** Describes a block link rendered by {@link BlockLinks}. */
export interface BlockLinkItem {
  /** Stable block identifier. */
  readonly id: string;

  /** Host-specific overview URL. */
  readonly href: string;

  /** Optional browsing context used by embedded documentation hosts. */
  readonly target?: string;
}

/** Props for the {@link BlockLinks} component. */
export interface BlockLinksProps {
  /** Blocks related to the current component. */
  readonly blocks: readonly BlockLinkItem[];
}

/**
 * Renders related blocks as a compact Antares list of links.
 *
 * @param props - Related block links to display.
 */
export function BlockLinks({ blocks }: BlockLinksProps) {
  return (
    <Flex as="nav" aria-label="Related blocks" direction="column" gap="xs">
      {blocks.map(function renderBlockLink(block: BlockLinkItem) {
        return (
          <LinkButton
            key={block.id}
            href={block.href}
            target={block.target}
            // React Aria filters `target`; assign it on the anchor to preserve the host-provided browsing context.
            ref={function setBlockTarget(element: HTMLAnchorElement | null) {
              if (element) element.target = block.target ?? '';
            }}
            variant="minimal"
          >
            {block.id}
            <Icon icon="chevron-right" />
          </LinkButton>
        );
      })}
    </Flex>
  );
}

/**
 * Displays a block preview and its discovered source files in a shared Preview/Code surface.
 * The host supplies the preview and syntax highlighter, while Antares owns the layout primitives.
 *
 * @param props - Block manifest, preview content, and optional syntax highlighter.
 */
export function BlockExplorer({ block, children, codeRenderer }: BlockExplorerProps) {
  const [view, setView] = useState<BlockView>('preview');
  const [activePath, setActivePath] = useState(getInitialPath(block));
  const tree = useMemo(
    function createTree() {
      return createFileTree(block.files);
    },
    [block.files]
  );
  const activeFile =
    block.files.find(function findActiveFile(file: BlockFile) {
      return file.path === activePath;
    }) ?? block.files[0];

  return (
    <Box className={styles.root}>
      <BlockToolbar blockId={block.id} description={block.description} installCommand={block.installCommand}>
        <SegmentedController
          aria-label={`${block.id} view`}
          value={view}
          onSelectionChange={function handleViewChange(value: string) {
            setView(value as BlockView);
          }}
        >
          <SegmentedControllerItem value="preview">Preview</SegmentedControllerItem>
          <SegmentedControllerItem value="code">Code</SegmentedControllerItem>
        </SegmentedController>
      </BlockToolbar>
      {view === 'preview' ? (
        <Box className={styles.previewSurface} padding="2xl" rounding="md" elevation="card">
          {children}
        </Box>
      ) : (
        <Box className={styles.codeSurface} rounding="md" elevation="card">
          <Flex className={styles.codeLayout} alignItems="stretch">
            <BlockFileTree
              tree={tree}
              activePath={activeFile?.path}
              onFileSelect={function handleFileSelect(path: string) {
                setActivePath(path);
              }}
            />
            {activeFile ? <BlockSourcePanel file={activeFile} codeRenderer={codeRenderer} /> : null}
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export type {
  BlockCodeRendererProps,
  BlockExplorerProps,
  BlockFile,
  BlockLanguage,
  BlockManifest,
  BlockLinkMarkerProps
} from './types.ts';

export { BlockInstallButton, type BlockInstallButtonProps } from './block-install-button.tsx';

function getInitialPath(block: BlockExplorerProps['block']) {
  return block.files[0]?.path ?? '';
}
