import type { BlockFile, FileTreeNode } from './types.ts';

interface MutableFolder {
  type: 'folder';
  name: string;
  path: string;
  children: Map<string, MutableNode>;
}

interface MutableFile {
  type: 'file';
  name: string;
  path: string;
}

type MutableNode = MutableFolder | MutableFile;

/**
 * Builds a deterministic nested tree from the manifest's relative file paths.
 *
 * @param files - Discovered source files from a block manifest.
 * @returns A nested tree sorted by name, with folders before files.
 * @throws If a path is empty or collides with another file or folder.
 */
export function createFileTree(files: readonly BlockFile[]): readonly FileTreeNode[] {
  const root = new Map<string, MutableNode>();

  for (const file of files) {
    const parts = file.path.split('/').filter(Boolean);
    if (parts.length === 0) throw new Error('Block files must have a non-empty relative path.');

    let children = root;
    const segments: string[] = [];

    for (const [index, part] of parts.entries()) {
      segments.push(part);
      const path = segments.join('/');
      const isFile = index === parts.length - 1;
      const existing = children.get(part);

      if (isFile) {
        if (existing) throw new Error(`Block file path collides with an existing node: ${file.path}`);
        children.set(part, { type: 'file', name: part, path });
        continue;
      }

      if (existing && existing.type === 'file') {
        throw new Error(`Block folder path collides with an existing file: ${path}`);
      }

      if (existing) {
        children = existing.children;
        continue;
      }

      const folder: MutableFolder = { type: 'folder', name: part, path, children: new Map() };
      children.set(part, folder);
      children = folder.children;
    }
  }

  return sortNodes([...root.values()]);
}

/**
 * Recursively orders folders before files, sorting each group by name.
 *
 * @param nodes - Unsorted nodes collected from manifest paths.
 * @returns Nodes with folder maps converted to sorted child arrays.
 */
function sortNodes(nodes: readonly MutableNode[]): readonly FileTreeNode[] {
  return [...nodes]
    .sort(function compareNodes(a, b) {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      return a.name.localeCompare(b.name);
    })
    .map(function toFileTreeNode(node: MutableNode): FileTreeNode {
      if (node.type === 'file') return node;

      return {
        type: 'folder',
        name: node.name,
        path: node.path,
        children: sortNodes([...node.children.values()])
      };
    });
}
