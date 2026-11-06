import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rolldown } from 'rolldown';
import { describe, expect, it } from 'vitest';

describe('@godaddy/antares runtime imports', function runtimeImports() {
  it('references CSS with require in CommonJS chunks', function importsCssAsCommonJs() {
    const dist = fileURLToPath(new URL('../dist/', import.meta.url));
    const readChunks = (directory: string): { file: string; code: string }[] =>
      readdirSync(directory, { withFileTypes: true }).flatMap(function readChunk(entry) {
        const file = join(directory, entry.name);
        return entry.isDirectory()
          ? readChunks(file)
          : /\.(?:cjs|mjs)$/.test(entry.name)
            ? [{ file, code: readFileSync(file, 'utf8') }]
            : [];
      });
    const chunks = readChunks(dist);
    const cjsChunks = chunks.filter(({ file }) => file.endsWith('.cjs'));
    const esmChunks = chunks.filter(({ file }) => file.endsWith('.mjs'));
    const cjsCssFiles = cjsChunks.flatMap(({ file, code }) =>
      [...code.matchAll(/require\(['"]([^'"]+\.css)['"]\)/g)].map(([, cssPath]) => resolve(dirname(file), cssPath!))
    );

    expect(cjsChunks.some(({ file }) => file.startsWith(`${join(dist, 'exports')}${sep}`))).toBe(true);
    expect(cjsCssFiles.length).toBeGreaterThan(0);
    expect(cjsCssFiles.every((cssFile) => existsSync(cssFile))).toBe(true);
    expect(cjsChunks.some(({ code }) => /\bimport\s+['"][^'"]+\.css['"]/.test(code))).toBe(false);
    expect(esmChunks.some(({ code }) => /\bimport\s+['"][^'"]+\.css['"]/.test(code))).toBe(true);
  });

  it('does not require react-dom/client when regular dependencies are bundled', async function imports() {
    const bundle = await rolldown({
      input: fileURLToPath(new URL('../dist/index.mjs', import.meta.url)),
      platform: 'browser',
      // Hosts share React; bundle Antares's other dependencies into the remote.
      external: /^react(?:-dom)?(?:\/|$)/,
      plugins: [
        {
          name: 'ignore-test-css',
          load(id) {
            return id.endsWith('.css') ? { code: '', moduleType: 'js' } : null;
          }
        }
      ]
    });
    try {
      const { output } = await bundle.generate({ format: 'esm' });
      const imports = new Set(output.flatMap((chunk) => (chunk.type === 'chunk' ? chunk.imports : [])));
      expect([...imports].sort()).toEqual(['react', 'react-dom', 'react/jsx-runtime']);
    } finally {
      await bundle.close();
    }
  });
});
