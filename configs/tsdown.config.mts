import { defineConfig } from 'tsdown';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import type { Plugin } from 'rolldown';

/**
 * Plugin that copies CSS files to output and preserves import statements
 *
 * Emulates esbuild's `copy` loader behavior for CSS files. Copies CSS files
 * to the output directory with content-based hashes and rewrites imports
 * to reference the output paths. Consuming applications handle CSS processing.
 *
 * @returns Rolldown plugin configuration
 */
export function cssCopyPlugin(): Plugin {
  const cssFiles = new Map<string, { fileName: string; content: string }>();

  return {
    name: 'css-copy',
    async resolveId(source, importer) {
      if (!source.endsWith('.css') || !importer) return null;

      const resolved = join(dirname(importer), source);
      const content = await readFile(resolved, 'utf-8');
      const hash = createHash('sha256').update(content).digest('hex').slice(0, 8).toUpperCase();
      const isModuleCss = source.endsWith('.module.css');
      const baseName = isModuleCss ? basename(source, '.module.css') : basename(source, '.css');
      const extension = isModuleCss ? '.module.css' : '.css';
      const fileName = `./${baseName}-${hash}${extension}`;

      cssFiles.set(resolved, { fileName, content });

      return { id: fileName, external: true };
    },
    async writeBundle(options) {
      const outDir = options.dir || 'dist';
      await mkdir(outDir, { recursive: true });

      for (const { fileName, content } of cssFiles.values()) {
        const relativeFileName = fileName.startsWith('./') ? fileName.slice(2) : fileName;
        await writeFile(join(outDir, relativeFileName), content);
      }
    }
  };
}

export const config = defineConfig({
  plugins: [cssCopyPlugin()],
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  treeshake: true,
  dts: true
})
