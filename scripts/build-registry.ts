#!/usr/bin/env node

/**
 * Builds the Antares blocks registry consumed by the shadcn CLI.
 *
 * The script discovers block directories, validates the title metadata in each
 * block README, consumes the block explorer manifest to identify source files,
 * and writes the resulting registry to the package blocks directory. Full
 * registry schema validation remains the responsibility of `registry:validate`.
 *
 * Run it from the repository root with:
 *
 * ```sh
 * npm run registry:build
 * ```
 */

import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { getYamlFrontmatter, parseBlockMdx } from '../packages/dev/block-explorer/src/mdx-block-markers.ts';
import { loadBlockManifest } from '../packages/dev/block-explorer/src/node.ts';

type RegistryFileType = 'registry:component' | 'registry:file' | 'registry:style';

interface RegistryFile {
  path: string;
  type: RegistryFileType;
  target: string;
}

interface RegistryItem {
  name: string;
  type: 'registry:block';
  title: string;
  dependencies: string[];
  files: RegistryFile[];
}

/** Block registry consumed by the shadcn CLI. */
export interface AntaresRegistry {
  /** URL of the shadcn registry schema. */
  $schema: string;

  /** Registry identifier. */
  name: string;

  /** Installable blocks discovered in the source directory. */
  items: RegistryItem[];
}

/**
 * Persists serialized registry data or captures it for a caller.
 *
 * @param registryPath - Requested output path.
 * @param source - Formatted registry JSON with a trailing newline.
 * @returns A promise that resolves once the output has been handled.
 */
export type RegistryWriter = (registryPath: string, source: string) => Promise<void>;

/** Inputs and optional output writer for {@link buildRegistry}. */
export interface BuildRegistryOptions {
  /** Root directory containing block folders. */
  blocksRoot: string;

  /** Destination for the generated registry JSON. */
  registryPath: string;

  /** Custom output writer; defaults to writing UTF-8 to the filesystem. */
  writeRegistry?: RegistryWriter;
}

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const blocksDirectory = join(rootDirectory, 'packages/@godaddy/antares/blocks');
const registryPath = join(blocksDirectory, 'registry.json');

/**
 * Reads the required non-empty YAML title from a block README.
 *
 * @param blockDirectory - Directory containing `README.mdx`.
 * @returns The trimmed frontmatter title.
 * @throws If the README, frontmatter, or title is missing or invalid.
 */
async function readBlockTitle(blockDirectory: string): Promise<string> {
  const readmePath = join(blockDirectory, 'README.mdx');
  let source: string;

  try {
    source = await readFile(readmePath, 'utf8');
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      throw new Error(`${readmePath}: README.mdx is required.`);
    }
    throw error;
  }

  const yaml = getYamlFrontmatter(parseBlockMdx(source, readmePath));
  if (!yaml) throw new Error(`${readmePath}: missing YAML frontmatter.`);

  let frontmatter: { title?: unknown } | null;
  try {
    frontmatter = parse(yaml.value) as { title?: unknown } | null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${readmePath}: invalid YAML frontmatter: ${message}`);
  }

  const title = typeof frontmatter?.title === 'string' ? frontmatter.title.trim() : '';
  if (!title) throw new Error(`${readmePath}: missing frontmatter title.`);

  return title;
}

/**
 * Classifies source files for installation by the shadcn CLI.
 *
 * @param filePath - Discovered source file path.
 * @returns Styles for CSS, components for TypeScript, or generic files for other extensions.
 */
function getFileType(filePath: string): RegistryFileType {
  const extension = filePath.toLowerCase().slice(filePath.lastIndexOf('.'));

  if (extension === '.css') return 'registry:style';
  if (extension === '.ts' || extension === '.tsx') return 'registry:component';
  return 'registry:file';
}

/**
 * Serializes registry data with compact single-item dependency arrays.
 *
 * @param registry - Registry data to serialize.
 * @returns Indented JSON with a trailing newline.
 */
function serializeRegistry(registry: AntaresRegistry): string {
  const formatted = JSON.stringify(registry, null, 2).replace(/("dependencies": )\[\n\s+("[^"]+")\n\s+\]/g, '$1[$2]');

  return `${formatted}\n`;
}

/**
 * Distinguishes absent READMEs from filesystem failures that must stop discovery.
 *
 * @param error - Filesystem failure to inspect.
 * @returns Whether the error is `ENOENT`.
 */
function isMissingFileError(error: unknown): error is Error & { code: 'ENOENT' } {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT';
}

/**
 * Creates the destination directory and writes the registry as UTF-8.
 *
 * @param registryPath - Destination file path.
 * @param source - Serialized registry JSON.
 */
const defaultRegistryWriter: RegistryWriter = async function writeRegistryFile(registryPath, source) {
  await mkdir(dirname(registryPath), { recursive: true });
  await writeFile(registryPath, source, 'utf8');
};

/**
 * Discovers blocks and validates their metadata without writing to disk.
 *
 * @param blocksRoot - Root directory containing block folders.
 * @returns Registry data with items sorted by name.
 * @throws If block metadata is invalid or a filesystem error prevents discovery.
 */
export async function createRegistry(blocksRoot: string): Promise<AntaresRegistry> {
  const entries = await readdir(blocksRoot, { withFileTypes: true });
  const blockDirectories = (
    await Promise.all(
      entries
        .filter((entry) => entry.isDirectory())
        .map(
          /** Keeps directories containing a regular block README. */
          async function findBlockDirectory(entry) {
            try {
              const readme = await stat(join(blocksRoot, entry.name, 'README.mdx'));
              return readme.isFile() ? entry : null;
            } catch (error) {
              if (isMissingFileError(error)) {
                return null;
              }
              throw error;
            }
          }
        )
    )
  )
    .filter((entry): entry is (typeof entries)[number] => entry !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

  const items = await Promise.all(
    blockDirectories.map(
      /** Combines README metadata and discovered files into an installable registry item. */
      async function createRegistryItem(entry): Promise<RegistryItem> {
        const blockDirectory = join(blocksRoot, entry.name);
        const title = await readBlockTitle(blockDirectory);
        const manifest = await loadBlockManifest(blockDirectory, { id: entry.name });

        return {
          name: `blocks/${entry.name}`,
          type: 'registry:block',
          title,
          dependencies: ['@godaddy/antares'],
          files: manifest.files.map(
            /** Maps a discovered file to its repository path, registry category, and installation target. */
            function createRegistryFile(file) {
              return {
                path: `${entry.name}/${file.path}`,
                type: getFileType(file.path),
                target: `components/blocks/${entry.name}/${file.path}`
              };
            }
          )
        };
      }
    )
  );

  return {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'antares-blocks',
    items: items.sort((a, b) => a.name.localeCompare(b.name))
  };
}

/**
 * Builds the registry before writing it; an optional writer can capture or redirect the output.
 *
 * @param options - {@link BuildRegistryOptions}
 * @returns The registry after the writer completes successfully.
 * @throws If discovery, metadata validation, or writing fails.
 */
export async function buildRegistry({
  blocksRoot,
  registryPath,
  writeRegistry = defaultRegistryWriter
}: BuildRegistryOptions): Promise<AntaresRegistry> {
  const registry = await createRegistry(blocksRoot);

  await writeRegistry(registryPath, serializeRegistry(registry));

  return registry;
}

/** Builds the canonical repository registry and prints the resulting block and file counts. */
async function main() {
  const registry = await buildRegistry({
    blocksRoot: blocksDirectory,
    registryPath
  });

  const fileCount = registry.items.reduce((total, item) => total + item.files.length, 0);
  console.log(
    `Updated ${relative(rootDirectory, registryPath)} ` +
      `(${registry.items.length} block${registry.items.length === 1 ? '' : 's'}, ${fileCount} files).`
  );
}

/**
 * Reports generation failures and marks the command as unsuccessful.
 *
 * @param error - Rejection from registry generation or writing.
 */
function reportRegistryBuildError(error: unknown): void {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  void main().catch(reportRegistryBuildError);
}
