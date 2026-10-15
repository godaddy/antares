import { fileURLToPath } from 'node:url';
import { rolldown } from 'rolldown';
import { describe, expect, it } from 'vitest';

describe('@godaddy/antares runtime imports', function runtimeImports() {
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
