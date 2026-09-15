import { readFile, stat } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import type { BlockLanguage, BlockManifest } from './types.ts';

export interface BlockMetadata {
  /** Stable identifier used to resolve a block from documentation markers. */
  id: string;

  /** Human-readable title used in block navigation. */
  title: string;

  /** Short explanation shown beside the Preview/Code tabs. */
  description?: string;

  /** Relative source files exposed in the explorer. */
  files: string[];
}

/**
 * Reads and validates a block's metadata and curated source files.
 *
 * @param blockDirectory - Directory containing `block.json` and the listed source files.
 */
export async function loadBlockManifest(blockDirectory: string): Promise<BlockManifest> {
  const directory = resolve(blockDirectory);
  const metadataPath = join(directory, 'block.json');
  const metadata = JSON.parse(await readFile(metadataPath, 'utf8')) as Partial<BlockMetadata>;

  if (!metadata.id || !metadata.title || !Array.isArray(metadata.files)) {
    throw new Error(`${metadataPath}: expected id, title, and files in block metadata.`);
  }

  const filePaths = metadata.files.map(function normalizeMetadataFilePath(filePath: string) {
    return normalizeRelativePath(filePath, metadataPath);
  });
  const duplicates = filePaths.filter(function isDuplicateFilePath(filePath: string, index: number) {
    return filePaths.indexOf(filePath) !== index;
  });

  if (duplicates.length > 0) {
    throw new Error(`${metadataPath}: duplicate block file path "${duplicates[0]}".`);
  }

  const files = await Promise.all(
    filePaths.map(async function readBlockFile(filePath: string) {
      const absolutePath = resolve(directory, filePath);
      const fileStat = await stat(absolutePath);
      if (!fileStat.isFile()) throw new Error(`${metadataPath}: block file is not a file: ${filePath}`);

      return {
        path: filePath,
        language: languageForPath(filePath),
        source: (await readFile(absolutePath, 'utf8')).replace(/\r\n?/g, '\n')
      };
    })
  );

  return {
    id: metadata.id,
    title: metadata.title,
    description: metadata.description,
    files
  };
}

/**
 * Finds the block directory associated with a README marker.
 *
 * @param readmePath - Absolute path to the README containing the marker.
 * @param id - Block identifier referenced by the marker.
 */
export async function resolveBlockDirectory(readmePath: string, id: string): Promise<string> {
  const readmeDirectory = dirname(readmePath);
  const localMetadataPath = join(readmeDirectory, 'block.json');

  try {
    const localMetadata = JSON.parse(await readFile(localMetadataPath, 'utf8')) as Partial<BlockMetadata>;
    if (localMetadata.id === id) return readmeDirectory;
  } catch {
    // Fall through to the id directory for future collection layouts.
  }

  const siblingCandidate = join(readmeDirectory, id);
  if (await fileExists(join(siblingCandidate, 'block.json'))) return siblingCandidate;

  // Component documentation can reference a block from the package-level blocks directory.
  // Walk upward so the same marker works from both a block README and a component README.
  for (let directory = readmeDirectory; directory !== dirname(directory); directory = dirname(directory)) {
    const packageBlockCandidate = join(directory, 'blocks', id);
    if (await fileExists(join(packageBlockCandidate, 'block.json'))) return packageBlockCandidate;
  }

  throw new Error(`${readmePath}: unable to resolve block "${id}".`);
}

async function fileExists(filePath: string) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Infers the syntax-highlighter language from a source file path.
 *
 * @param filePath - Relative source file path from a block manifest.
 */
export function languageForPath(filePath: string): BlockLanguage {
  const extension = filePath.split('.').at(-1)?.toLowerCase();
  if (extension === 'tsx') return 'tsx';
  if (extension === 'ts') return 'ts';
  if (extension === 'css') return 'css';
  if (extension === 'json') return 'json';
  return 'md';
}

function normalizeRelativePath(filePath: string, metadataPath: string): string {
  const normalized = filePath.replaceAll('\\', '/').replace(/^\.\//, '');
  if (!normalized || isAbsolute(normalized) || normalized === '..' || normalized.startsWith('../')) {
    throw new Error(`${metadataPath}: block paths must stay inside the block directory: ${filePath}`);
  }

  const safePath = resolve(dirname(metadataPath), normalized);
  if (relative(dirname(metadataPath), safePath).startsWith('..')) {
    throw new Error(`${metadataPath}: block paths must stay inside the block directory: ${filePath}`);
  }

  return normalized;
}
