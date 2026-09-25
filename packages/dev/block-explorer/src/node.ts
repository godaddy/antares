import { readdir, readFile, stat } from 'node:fs/promises';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { collectBlockMarkers, parseBlockMdx, type BlockMarker } from './mdx-block-markers.ts';
import type { BlockFile, BlockLanguage, BlockManifest } from './types.ts';

/** Metadata overrides accepted by {@link loadBlockManifest}. */
export interface BlockManifestOverrides {
  /** Stable identifier used to resolve a block from documentation markers. */
  readonly id?: string;

  /** Description supplied by the active `<Block>` marker. */
  readonly description?: string;
}

const BLOCK_ID_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ROOT_README_REGEX = /^README(?:\.[^/]*)?$/i;
const ROOT_STORY_REGEX = /\.stories\.tsx$/i;
const ROOT_TEST_DIRECTORY = 'test';

/**
 * Discovers implementation files, excluding root READMEs, stories, and `test/`.
 * Overrides take precedence over the directory name and matching Block description.
 *
 * @param blockDirectory - Directory containing the block implementation.
 * @param overrides - {@link BlockManifestOverrides}
 * @returns Block metadata, its installation command, and source files in path order.
 * @throws If source files cannot be read or an existing README contains invalid MDX.
 */
export async function loadBlockManifest(
  blockDirectory: string,
  overrides: BlockManifestOverrides = {}
): Promise<BlockManifest> {
  const directory = resolve(blockDirectory);
  const id = overrides.id ?? basename(directory);
  const description = overrides.description ?? (await readBlockDescription(directory, id));
  const files = await discoverBlockFiles(directory);

  return {
    id,
    description,
    installCommand: `npx shadcn@latest add godaddy/antares/blocks/${id}`,
    files
  };
}

/**
 * Resolves sibling or package blocks, then a local README that defines the requested id.
 *
 * @param readmePath - Path of the README containing the block marker.
 * @param id - Lowercase kebab-case block identifier from the marker.
 * @returns The first matching block directory.
 * @throws If the id is invalid, the block cannot be resolved, or lookup fails.
 */
export async function resolveBlockDirectory(readmePath: string, id: string): Promise<string> {
  if (!BLOCK_ID_REGEX.test(id)) {
    throw new Error(
      `${readmePath}: invalid block id ${JSON.stringify(id)}. Expected lowercase kebab-case, such as "sign-in-form".`
    );
  }

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
 * Infers the syntax-highlighter language from a file extension.
 *
 * @param filePath - Source file path.
 * @returns The supported language, or `md` for an unrecognized extension.
 */
export function languageForPath(filePath: string): BlockLanguage {
  const extension = filePath.split('.').at(-1)?.toLowerCase();
  if (extension === 'tsx') return 'tsx';
  if (extension === 'ts') return 'ts';
  if (extension === 'css') return 'css';
  if (extension === 'json') return 'json';
  return 'md';
}

/**
 * Discovers the implementation files included in a block manifest.
 *
 * @param directory - Block root directory.
 * @returns Source files sorted by their relative paths.
 */
async function discoverBlockFiles(directory: string) {
  const files: BlockFile[] = [];
  await collectBlockFiles(directory, directory, files);
  return files.sort(function compareFiles(a, b) {
    return a.path.localeCompare(b.path);
  });
}

/**
 * Recursively reads regular files and normalizes source line endings to LF.
 *
 * @param directory - Directory currently being visited.
 * @param rootDirectory - Block root used for exclusions and relative paths.
 * @param files - Accumulator receiving the discovered source files.
 */
async function collectBlockFiles(directory: string, rootDirectory: string, files: BlockFile[]) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (directory === rootDirectory && entry.name === ROOT_TEST_DIRECTORY) continue;
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

/**
 * Identifies documentation inputs excluded only at the block root.
 *
 * @param fileName - Root file name to check.
 * @returns Whether the file is a README or a TSX story.
 */
function isExcludedRootFile(fileName: string) {
  return ROOT_README_REGEX.test(fileName) || ROOT_STORY_REGEX.test(fileName);
}

/**
 * Accepts directories with a regular README, propagating unexpected filesystem failures.
 *
 * @param directory - Candidate block directory.
 * @returns Whether the directory and its README exist as the expected file types.
 */
async function isBlockDirectory(directory: string) {
  try {
    const directoryStat = await stat(directory);
    return directoryStat.isDirectory() && (await fileExists(join(directory, 'README.mdx')));
  } catch (error) {
    if (isMissingPathError(error)) return false;
    throw error;
  }
}

/**
 * Checks whether this README defines the block rather than merely linking to it.
 *
 * @param readmePath - README to inspect for authored markers.
 * @param id - Block identifier to match.
 * @returns Whether a live `<Block>` marker defines the requested id.
 */
async function localReadmeDefinesBlock(readmePath: string, id: string) {
  return (await readBlockMarkers(readmePath)).some((marker) => marker.name === 'Block' && marker.id === id);
}

/**
 * Reads the description from the first matching live `<Block>` marker.
 *
 * @param directory - Block directory containing the optional README.
 * @param id - Block identifier to match.
 * @returns The authored description, or `undefined` when metadata is absent.
 */
async function readBlockDescription(directory: string, id: string) {
  const markers = await readBlockMarkers(join(directory, 'README.mdx'));
  return markers.find((marker) => marker.name === 'Block' && marker.id === id)?.description;
}

/**
 * Reads authored markers, allowing an absent README but rejecting invalid content.
 *
 * @param readmePath - README to read and parse.
 * @returns Live block markers, or an empty array when the README is missing.
 */
async function readBlockMarkers(readmePath: string): Promise<BlockMarker[]> {
  let source: string;
  try {
    source = await readFile(readmePath, 'utf8');
  } catch (error) {
    if (isMissingPathError(error)) return [];
    throw error;
  }
  return collectBlockMarkers(parseBlockMdx(source, readmePath));
}

/**
 * Checks for a regular file without hiding filesystem failures.
 *
 * @param filePath - Candidate file path.
 * @returns Whether the path exists and points to a regular file.
 */
async function fileExists(filePath: string) {
  try {
    return (await stat(filePath)).isFile();
  } catch (error) {
    if (isMissingPathError(error)) return false;
    throw error;
  }
}

/**
 * Distinguishes missing candidates from permission, I/O, and symlink failures.
 *
 * @param error - Filesystem failure to inspect.
 * @returns Whether the error is `ENOENT` or `ENOTDIR`.
 */
function isMissingPathError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error.code === 'ENOENT' || error.code === 'ENOTDIR');
}
