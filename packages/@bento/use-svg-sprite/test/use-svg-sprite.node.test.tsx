import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { BasicUsage } from '../examples/basic';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import { useSVGSprite } from '../dist';

describe('@bento/use-svg-sprite', function bento() {
  it('is a function', function test() {
    assume(useSVGSprite).is.a('function');
  });

  it('renders an SVG reference during SSR without creating a sprite sheet', function ssr() {
    const html = renderToString(<BasicUsage />);
    expect(html).toContain('xlink:href="#bento-svg-spritesheet-check"');
    expect(html).not.toContain('<symbol');
  });

  describe('Public API', function packageSuite() {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    describe('#exports', function exportsSuite() {
      Object.keys(pkg.exports).forEach(function each(subpaths) {
        describe(`${subpaths}`, function subpathsSuite() {
          const exportPath = (pkg.exports as any)[subpaths];

          if (typeof exportPath === 'string') {
            return it(`exports ${subpaths} exists`, async function exportedTest() {
              const path = resolve(__dirname, '..', exportPath);
              await fs.access(path, fs.constants.F_OK);
            });
          }

          Object.keys(exportPath).forEach(function each(exported) {
            Object.keys(exportPath[exported]).forEach(function each(key) {
              it(`conditional export "${exported}.${key}" exists for ${join(pkg.name, subpaths)}`, async function exportedTest() {
                const path = resolve(__dirname, '..', exportPath[exported][key]);
                await fs.access(path, fs.constants.F_OK);
              });
            });
          });
        });
      });
    });
  });
});
