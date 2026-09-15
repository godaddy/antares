'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  ListBox,
  ListBoxItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  type TabsProps
} from '@godaddy/antares';
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

  /** Human-readable block title. */
  readonly title: string;

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
    <ListBox aria-label="Related blocks" selectionMode="none">
      {blocks.map(function renderBlockLink(block: BlockLinkItem) {
        return (
          <ListBoxItem
            key={block.id}
            id={block.id}
            href={block.href}
            target={block.target}
            textValue={block.title}
            alignItems="center"
            justifyContent="space-between"
          >
            {block.title}
            <Icon icon="chevron-right" />
          </ListBoxItem>
        );
      })}
    </ListBox>
  );
}

/**
 * Displays a block preview and its curated source files in a shared Preview/Code surface.
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
      <Tabs
        selectedKey={view}
        onSelectionChange={function handleViewChange(key: Parameters<NonNullable<TabsProps['onSelectionChange']>>[0]) {
          setView(key as BlockView);
        }}
      >
        <BlockToolbar description={block.description}>
          <TabList aria-label={`${block.title} view`}>
            <Tab id="preview">Preview</Tab>
            <Tab id="code">Code</Tab>
          </TabList>
        </BlockToolbar>
        <TabPanels>
          <TabPanel id="preview">
            <Box className={styles.previewSurface} padding="2xl" rounding="md" elevation="card">
              {children}
            </Box>
          </TabPanel>
          <TabPanel id="code">
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
          </TabPanel>
        </TabPanels>
      </Tabs>
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

function getInitialPath(block: BlockExplorerProps['block']) {
  return block.files[0]?.path ?? '';
}
