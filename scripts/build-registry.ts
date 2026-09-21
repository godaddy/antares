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

export interface AntaresRegistry {
  $schema: string;
  name: string;
  items: RegistryItem[];
}

export type RegistryWriter = (registryPath: string, source: string) => Promise<void>;

export interface BuildRegistryOptions {
  blocksRoot: string;
  registryPath: string;
  writeRegistry?: RegistryWriter;
}

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const blocksDirectory = join(rootDirectory, 'packages/@godaddy/antares/blocks');
const registryPath = join(blocksDirectory, 'registry.json');

/**
 * Reads and validates the title used for a block registry item.
 *
 * @param blockDirectory - Directory containing the block README.
 * @returns The trimmed `title` value from the README frontmatter.
 * @throws If the README is missing, has invalid frontmatter, or has no usable title.
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

  const frontmatterMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatterMatch) throw new Error(`${readmePath}: missing YAML frontmatter.`);

  let frontmatter: { title?: unknown } | null;
  try {
    frontmatter = parse(frontmatterMatch[1]) as { title?: unknown } | null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${readmePath}: invalid YAML frontmatter: ${message}`);
  }

  const title = typeof frontmatter?.title === 'string' ? frontmatter.title.trim() : '';
  if (!title) throw new Error(`${readmePath}: missing frontmatter title.`);

  return title;
}

/**
 * Maps a discovered source path to the registry file category understood by shadcn.
 *
 * @param filePath - Relative path returned by the block manifest.
 * @returns The registry category for the file extension.
 *
 * @example
 * getFileType('styles/theme.css'); // 'registry:style'
 */
function getFileType(filePath: string): RegistryFileType {
  const extension = filePath.toLowerCase().slice(filePath.lastIndexOf('.'));

  if (extension === '.css') return 'registry:style';
  if (extension === '.ts' || extension === '.tsx') return 'registry:component';
  return 'registry:file';
}

/**
 * Serializes a registry using the repository's stable, review-friendly formatting.
 *
 * @param registry - Registry data to serialize.
 * @returns Pretty-printed JSON ending with a newline.
 */
function serializeRegistry(registry: AntaresRegistry): string {
  const formatted = JSON.stringify(registry, null, 2).replace(/("dependencies": )\[\n\s+("[^"]+")\n\s+\]/g, '$1[$2]');

  return `${formatted}\n`;
}

/**
 * Distinguishes an absent registry file from filesystem failures that must
 * stop generation to avoid silently publishing an incomplete registry.
 *
 * @param error - Error raised while inspecting a potential registry file.
 * @returns Whether the requested file does not exist.
 */
function isMissingFileError(error: unknown): error is Error & { code: 'ENOENT' } {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT';
}

/**
 * Writes serialized registry content to disk using UTF-8 encoding.
 *
 * @param registryPath - Destination path for the registry file.
 * @param source - Serialized registry content.
 * @returns A promise that resolves after the file is written.
 */
const defaultRegistryWriter: RegistryWriter = async function writeRegistryFile(registryPath, source) {
  await mkdir(dirname(registryPath), { recursive: true });
  await writeFile(registryPath, source, 'utf8');
};

/**
 * Builds the Antares blocks registry without writing to disk.
 *
 * @param blocksRoot - Directory containing one subdirectory per block.
 * @returns The generated registry data.
 * @throws If block discovery, README validation, or manifest loading fails.
 *
 * @example
 * const registry = await createRegistry('packages/@godaddy/antares/blocks');
 * // {
 * //   "$schema": "https://ui.shadcn.com/schema/registry.json",
 * //   "name": "antares-blocks",
 * //   "items": [{
 * //     "name": "blocks/sign-in-form",
 * //     "type": "registry:block",
 * //     "title": "Sign-in form",
 * //     "dependencies": ["@godaddy/antares"],
 * //     "files": []
 * //   }]
 * // }
 */
export async function createRegistry(blocksRoot: string): Promise<AntaresRegistry> {
  const entries = await readdir(blocksRoot, { withFileTypes: true });
  const blockDirectories = (
    await Promise.all(
      entries
        .filter((entry) => entry.isDirectory())
        .map(
          /**
           * Keeps directories that contain a regular block README.
           *
           * @param entry - Directory entry discovered under the blocks root.
           * @returns The entry when it represents a block, otherwise `null`.
           */
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
      /**
       * Converts one block manifest into a registry item.
       *
       * @param entry - Directory entry for the block being converted.
       * @returns The registry item generated for the block.
       */
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
            /**
             * Converts one manifest file into a shadcn registry file entry.
             *
             * @param file - File discovered by the block manifest.
             * @returns The registry path, category, and installation target.
             */
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
 * Builds and writes a registry using an injectable writer.
 *
 * The default writer updates the repository registry file. Callers can provide
 * another writer to capture the serialized output or route it elsewhere.
 *
 * @param options - Paths, package version, and optional output writer.
 * @param options.blocksRoot - Directory containing one subdirectory per block.
 * @param options.registryPath - Destination path supplied to the writer.
 * @param options.writeRegistry - Optional writer replacing the filesystem writer.
 * @returns The generated registry data after it has been written.
 * @throws If registry creation or writing fails.
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

/**
 * Runs the command-line registry build using the repository's canonical paths.
 *
 * @returns A promise that resolves after the registry is written and summarized.
 */
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
 * Reports a command-line build failure and marks the process as unsuccessful.
 *
 * @param error - Failure thrown while building or writing the registry.
 */
function reportRegistryBuildError(error: unknown): void {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  void main().catch(reportRegistryBuildError);
}
