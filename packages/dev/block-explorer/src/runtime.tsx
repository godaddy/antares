'use client';

import { useCallback, useMemo, useState } from 'react';
import { Box, Flex, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';
import { BlockFileTree } from './block-file-tree.tsx';
import { BlockSourcePanel } from './block-source-panel.tsx';
import { BlockToolbar } from './block-toolbar.tsx';
import { createFileTree } from './tree.ts';
import type { BlockExplorerProps, BlockFile, BlockLinkMarkerProps, BlockMarkerProps, BlockView } from './types.ts';
import styles from './runtime.module.css';

/**
 * Build-time MDX marker. The host compiler replaces it with an explorer.
 *
 * @example
 * ```tsx
 * <Block id="sign-in-form" of={Stories.Preview} />
 * ```
 *
 * @param props - {@link BlockMarkerProps}
 */
export function Block(props: BlockMarkerProps): null {
  void props;
  return null;
}

/**
 * Build-time marker for a compact link to a block overview page.
 *
 * @example
 * ```tsx
 * <BlockLink id="sign-in-form" />
 * ```
 *
 * @param props - {@link BlockLinkMarkerProps}
 */
export function BlockLink(props: BlockLinkMarkerProps): null {
  void props;
  return null;
}

/**
 * Displays a block preview and its discovered source files in a shared Preview/Code surface.
 * The host supplies the preview and syntax highlighter, while Antares owns the layout primitives.
 *
 * @example
 * ```tsx
 * <BlockExplorer block={manifest}>
 *   <SignInForm />
 * </BlockExplorer>
 * ```
 *
 * @param props - {@link BlockExplorerProps}
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
  const findActiveFile = useCallback(
    function findActiveFile(file: BlockFile) {
      return file.path === activePath;
    },
    [activePath]
  );
  const activeFile = block.files.find(findActiveFile) ?? block.files[0];
  const handleViewChange = useCallback(function handleViewChange(value: string) {
    setView(value as BlockView);
  }, []);

  return (
    <Box className={styles.root}>
      <BlockToolbar blockId={block.id} description={block.description} installCommand={block.installCommand}>
        <SegmentedController aria-label={`${block.id} view`} value={view} onSelectionChange={handleViewChange}>
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
            <BlockFileTree tree={tree} activePath={activeFile?.path} onFileSelect={setActivePath} />
            {activeFile ? (
              <BlockSourcePanel key={`${block.id}:${activeFile.path}`} file={activeFile} codeRenderer={codeRenderer} />
            ) : null}
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

/**
 * Selects the file shown when opening the Code view.
 *
 * @param block - Manifest for the active block.
 * @returns The first file's path, or an empty string when there are no files.
 */
function getInitialPath(block: BlockExplorerProps['block']) {
  return block.files[0]?.path ?? '';
}
