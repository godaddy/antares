import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rolldown } from 'rolldown';
import { describe, expect, it } from 'vitest';

describe('@godaddy/antares runtime imports', function runtimeImports() {
  it('references CSS with require in CommonJS chunks', function importsCssAsCommonJs() {
    const dist = fileURLToPath(new URL('../dist/', import.meta.url));
    const cjsChunks = readdirSync(dist)
      .filter((file) => file.endsWith('.cjs'))
      .map((file) => readFileSync(join(dist, file), 'utf8'));
    const esmChunks = readdirSync(dist)
      .filter((file) => file.endsWith('.mjs'))
      .map((file) => readFileSync(join(dist, file), 'utf8'));
    const cjsCssFiles = cjsChunks.flatMap((code) =>
      [...code.matchAll(/require\(['"]([^'"]+\.css)['"]\)/g)].map(([, cssPath]) => cssPath!)
    );

    expect(cjsCssFiles.length).toBeGreaterThan(0);
    expect(cjsCssFiles.every((cssPath) => existsSync(join(dist, cssPath)))).toBe(true);
    expect(cjsChunks.some((code) => /\bimport\s+['"][^'"]+\.css['"]/.test(code))).toBe(false);
    expect(esmChunks.some((code) => /\bimport\s+['"][^'"]+\.css['"]/.test(code))).toBe(true);
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
