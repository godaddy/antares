import { readdir, readFile, stat } from 'node:fs/promises';
import { basename, dirname, join, relative, resolve } from 'node:path';
import type { BlockFile, BlockLanguage, BlockManifest } from './types.ts';

export interface BlockManifestOverrides {
  /** Stable identifier used to resolve a block from documentation markers. */
  readonly id?: string;

  /** Description supplied by the active `<Block>` marker. */
  readonly description?: string;
}

const BLOCK_MARKER_REGEX = /<(Block|BlockLink)\b[\s\S]*?\/>/;
const ROOT_README_REGEX = /^README(?:\.[^/]*)?$/i;
const ROOT_STORY_REGEX = /\.stories\.tsx$/i;

/**
 * Reads a block manifest from its directory and discovers its source files.
 *
 * The root README and Storybook stories are documentation inputs rather than
 * implementation files, so they are omitted from the returned file list.
 *
 * @param blockDirectory - Directory containing the block README and sources.
 * @param overrides - Identity and description supplied by the active marker.
 */
export async function loadBlockManifest(
  blockDirectory: string,
  overrides: BlockManifestOverrides = {}
): Promise<BlockManifest> {
  const directory = resolve(blockDirectory);
  const id = overrides.id ?? basename(directory);
  const description = overrides.description ?? (await readBlockDescription(directory));
  const files = await discoverBlockFiles(directory);

  return {
    id,
    description,
    installCommand: `npx shadcn@latest add godaddy/antares/blocks/${id}`,
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
  const siblingCandidate = join(readmeDirectory, id);
  if (await isBlockDirectory(siblingCandidate)) return siblingCandidate;

  // Component documentation can reference a block from the package-level blocks directory.
  // Walk upward so the same marker works from both a block README and a component README.
  for (let directory = readmeDirectory; directory !== dirname(directory); directory = dirname(directory)) {
    const packageBlockCandidate = join(directory, 'blocks', id);
    if (await isBlockDirectory(packageBlockCandidate)) return packageBlockCandidate;
  }

  // A block README may use a directory name that differs from its id. In that
  // case, only accept the local directory when this README contains the marker.
  if (await localReadmeDefinesBlock(readmePath, id)) return readmeDirectory;

  throw new Error(`${readmePath}: unable to resolve block "${id}".`);
}

/**
 * Infers the syntax-highlighter language from a source file path.
 *
 * @param filePath - Relative source file path from a discovered block file.
 */
export function languageForPath(filePath: string): BlockLanguage {
  const extension = filePath.split('.').at(-1)?.toLowerCase();
  if (extension === 'tsx') return 'tsx';
  if (extension === 'ts') return 'ts';
  if (extension === 'css') return 'css';
  if (extension === 'json') return 'json';
  return 'md';
}

async function discoverBlockFiles(directory: string) {
  const files: BlockFile[] = [];
  await collectBlockFiles(directory, directory, files);
  return files.sort(function compareFiles(a, b) {
    return a.path.localeCompare(b.path);
  });
}

async function collectBlockFiles(directory: string, rootDirectory: string, files: BlockFile[]) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectBlockFiles(absolutePath, rootDirectory, files);
      continue;
    }

    if (!entry.isFile()) continue;

    const filePath = relative(rootDirectory, absolutePath).replaceAll('\\', '/');
    if (dirname(filePath) === '.' && isExcludedRootFile(entry.name)) continue;

    files.push({
      path: filePath,
      language: languageForPath(filePath),
      source: (await readFile(absolutePath, 'utf8')).replace(/\r\n?/g, '\n')
    });
  }
}

function isExcludedRootFile(fileName: string) {
  return ROOT_README_REGEX.test(fileName) || ROOT_STORY_REGEX.test(fileName);
}

async function isBlockDirectory(directory: string) {
  try {
    const directoryStat = await stat(directory);
    return directoryStat.isDirectory() && (await fileExists(join(directory, 'README.mdx')));
  } catch {
    return false;
  }
}

async function localReadmeDefinesBlock(readmePath: string, id: string) {
  try {
    const source = await readFile(readmePath, 'utf8');
    const marker = source.match(BLOCK_MARKER_REGEX)?.[0];
    return getStringAttribute(marker, 'id') === id;
  } catch {
    return false;
  }
}

async function readBlockDescription(directory: string) {
  try {
    const source = await readFile(join(directory, 'README.mdx'), 'utf8');
    const marker = source.match(BLOCK_MARKER_REGEX)?.[0];
    return getStringAttribute(marker, 'description');
  } catch {
    return undefined;
  }
}

function getStringAttribute(source: string | undefined, name: string) {
  if (!source) return undefined;
  const match = source.match(new RegExp(`\\b${name}=(['"])(.*?)\\1`));
  return match?.[2];
}

async function fileExists(filePath: string) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}
