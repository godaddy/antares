import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it, expect, beforeAll } from 'vitest';
import { build } from '../scripts/build.js';

const fixtures = resolve(import.meta.dirname, 'fixtures/build-input');
let outDir: string;

describe('build', function buildSuite() {
  beforeAll(async function runBuild() {
    outDir = mkdtempSync(join(tmpdir(), 'themes-build-'));
    await build(fixtures, outDir);
  });

  it('generates a CSS file for each non-prefixed JSON entry', function generatesFiles() {
    expect(existsSync(resolve(outDir, 'brand/theme/color.css'))).toBe(true);
    expect(existsSync(resolve(outDir, 'brand/theme/effects.css'))).toBe(true);
  });

  it('does not generate CSS for _ prefixed files', function noPartialCss() {
    expect(existsSync(resolve(outDir, '_palette.css'))).toBe(false);
  });

  it('wraps output in @scope { :scope {} }', function wrapsInScope() {
    const css = readFileSync(resolve(outDir, 'brand/theme/color.css'), 'utf8');
    expect(css).toContain('@scope {');
    expect(css).toContain(':scope {');
  });

  it('writes token values as CSS custom properties', function writesCustomProps() {
    const css = readFileSync(resolve(outDir, 'brand/theme/color.css'), 'utf8');
    expect(css).toContain('--color-action:');
    expect(css).toContain('--color-canvas:');
  });

  it('excludes _ prefixed palette tokens from output', function excludesPalette() {
    const css = readFileSync(resolve(outDir, 'brand/theme/color.css'), 'utf8');
    expect(css).not.toContain('--brand-primary');
  });

  it('resolves alias references to final values', function resolvesAliases() {
    const css = readFileSync(resolve(outDir, 'brand/theme/color.css'), 'utf8');
    expect(css).not.toContain('{brand-primary}');
    expect(css).toMatch(/--color-action:\s*#4169e1/);
  });

  it('transforms DTCG shadow objects to CSS shorthand', function transformsShadows() {
    const css = readFileSync(resolve(outDir, 'brand/theme/effects.css'), 'utf8');
    expect(css).toMatch(/--shadow-card:\s*0px 2px 4px 0px/);
  });
});
