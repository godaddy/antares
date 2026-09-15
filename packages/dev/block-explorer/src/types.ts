import type { ComponentType, ReactNode } from 'react';

/** View shown by the block explorer. */
export type BlockView = 'preview' | 'code';

/** Syntax-highlighter language supported by the host adapters. */
export type BlockLanguage = 'tsx' | 'ts' | 'css' | 'json' | 'md';

/** Source file displayed in the block explorer. */
export interface BlockFile {
  /** Relative path displayed in the source tree. */
  readonly path: string;

  /** Language used by the host syntax highlighter. */
  readonly language: BlockLanguage;

  /** Source read at documentation build time. */
  readonly source: string;
}

/** Build-time metadata and source files for a block. */
export interface BlockManifest {
  /** Stable identifier used by site and Storybook routes. */
  readonly id: string;

  /** Human-readable block title. */
  readonly title: string;

  /** Optional description shown by host documentation pages. */
  readonly description?: string;

  /** Curated implementation files available in the explorer. */
  readonly files: readonly BlockFile[];
}

/** Props passed to a host-specific source renderer. */
export interface BlockCodeRendererProps {
  /** Source content to render. */
  readonly code: string;

  /** Source language inferred from the file extension. */
  readonly language: BlockLanguage;

  /** Relative path of the active source file. */
  readonly filePath: string;
}

/** Props for the shared {@link BlockExplorer} component. */
export interface BlockExplorerProps {
  /** Build-time manifest for the active block. */
  readonly block: BlockManifest;

  /** Default block preview rendered by the host documentation system. */
  readonly children: ReactNode;

  /** Host syntax-highlighting implementation. */
  readonly codeRenderer?: ComponentType<BlockCodeRendererProps>;
}

/** Props for the build-time `<Block>` marker. */
export interface BlockMarkerProps {
  /** Block directory identifier. */
  readonly id: string;

  /** Story export used as the preview. */
  readonly of?: unknown;
}

/** Props for the build-time `<BlockLink>` marker. */
export interface BlockLinkMarkerProps {
  /** Block directory identifier. */
  readonly id: string;
}

/** A folder node in the explorer's source tree. */
export interface FileTreeFolderNode {
  readonly type: 'folder';
  readonly name: string;
  readonly path: string;
  readonly children: readonly FileTreeNode[];
}

/** A file node in the explorer's source tree. */
export interface FileTreeFileNode {
  readonly type: 'file';
  readonly name: string;
  readonly path: string;
}

/** A folder or file node in the explorer's source tree. */
export type FileTreeNode = FileTreeFolderNode | FileTreeFileNode;
