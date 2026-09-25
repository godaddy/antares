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

/** Build-time identity, description, and discovered source files for a block. */
export interface BlockManifest {
  /** Stable identifier used by site and Storybook routes. */
  readonly id: string;

  /** Optional description shown by host documentation pages. */
  readonly description?: string;

  /** Command copied by the Block Explorer's Install action. */
  readonly installCommand?: string;

  /** Implementation files discovered in the block directory. */
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

  /** Short explanation shown beside the Preview/Code tabs. */
  readonly description?: string;

  /** Story export used as the preview. */
  readonly of: unknown;
}

/** Props for the build-time `<BlockLink>` marker. */
export interface BlockLinkMarkerProps {
  /** Block directory identifier. */
  readonly id: string;
}

/** A folder node in the explorer's source tree. */
export interface FileTreeFolderNode {
  /** Identifies a folder with nested entries. */
  readonly type: 'folder';

  /** Folder name displayed in the source tree. */
  readonly name: string;

  /** Folder path relative to the block directory. */
  readonly path: string;

  /** Nested folders and files. */
  readonly children: readonly FileTreeNode[];
}

/** A file node in the explorer's source tree. */
export interface FileTreeFileNode {
  /** Identifies a selectable source file. */
  readonly type: 'file';

  /** File name displayed in the source tree. */
  readonly name: string;

  /** File path relative to the block directory. */
  readonly path: string;
}

/** A folder or file node in the explorer's source tree. */
export type FileTreeNode = FileTreeFolderNode | FileTreeFileNode;
