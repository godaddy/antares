import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv/dist/2020.js';
import { schemas } from '@upft/schemas';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');

const ajv = new Ajv({ strict: false });
ajv.addSchema(schemas.tokens.valueTypes);
ajv.addSchema(schemas.tokens.base);
const validateDtcg = ajv.compile(schemas.tokens.base);

describe('build output', function buildOutputSuite() {
  beforeAll(async function runBuild() {
    const { execSync } = await import('child_process');
    execSync('npm run build', { cwd: root, stdio: 'pipe' });
  }, 30_000);

  it('emits all expected dist files', function emitsDistFiles() {
    const files = ['dtcg.json', 'scss.scss', 'css-in-js.js', 'classnames.module.css', 'design-tokens.css-data.json'];
    for (const file of files) {
      expect(existsSync(join(dist, file)), `missing ${file}`).toBe(true);
    }
  });

  it('dtcg.json is valid DTCG (only $type, $value, $description, $extensions)', function dtcgValidKeys() {
    const json = JSON.parse(readFileSync(join(dist, 'dtcg.json'), 'utf8'));
    const allowed = new Set(['$type', '$value', '$description', '$extensions']);
    for (const [tokenName, token] of Object.entries(json)) {
      expect(typeof tokenName).toBe('string');
      for (const key of Object.keys(token as Record<string, unknown>)) {
        expect(allowed.has(key), `dtcg.json token "${tokenName}" has disallowed key "${key}"`).toBe(true);
      }
    }
  });

  it('dtcg.json validates against DTCG base schema (@upft/schemas)', function dtcgSchemaValidation() {
    const json = JSON.parse(readFileSync(join(dist, 'dtcg.json'), 'utf8'));
    const valid = validateDtcg(json);
    expect(valid, validateDtcg.errors ? JSON.stringify(validateDtcg.errors, null, 2) : 'expected valid').toBe(true);
  });

  it('design-tokens.css-data.json is VS Code CSS Custom Data v1.1', function cssDataVersion() {
    const data = JSON.parse(readFileSync(join(dist, 'design-tokens.css-data.json'), 'utf8'));
    expect(data.version).toBe(1.1);
    expect(Array.isArray(data.properties)).toBe(true);
    for (const prop of data.properties) {
      expect(prop).toHaveProperty('name');
      expect(String(prop.name).startsWith('--')).toBe(true);
    }
  });

  it('scss and css-in-js reference var(--name, fallback)', function scssAndJsReferenceVar() {
    const scss = readFileSync(join(dist, 'scss.scss'), 'utf8');
    const js = readFileSync(join(dist, 'css-in-js.js'), 'utf8');
    expect(scss).toMatch(/\$[a-zA-Z0-9-]+\s*:\s*var\(--[a-zA-Z0-9-]+/);
    expect(js).toMatch(/var\(--[a-zA-Z0-9-]+/);
    expect(js).not.toMatch(/"\$[a-z]/);
  });
});
