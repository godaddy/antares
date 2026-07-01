import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, defaultExclude, type TestProjectConfiguration } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import type { Plugin } from 'vite';

/**
 * Resolve `@bento/<pkg>` package imports to the package's source entry
 * (`packages/@bento/<pkg>/src/index.{tsx,ts}`) instead of the published
 * `dist/` build output.
 *
 * Why: build tools that pre-bundle CSS Modules (e.g. tsdown) emit pre-hashed
 * class names into `dist/` and may not re-import the `.module.css` file at
 * runtime. That breaks tests that rely on Vitest's CSS Modules pipeline
 * (`css.modules.classNameStrategy: 'non-scoped'`) for stable class names and
 * runtime style injection. Routing imports to source restores that pipeline.
 */
function bentoSourceResolver(): Plugin {
  const packagesRoot = resolve(__dirname, '..', 'packages', '@bento');
  return {
    name: 'bento-source-resolver',
    enforce: 'pre',
    resolveId(id) {
      const match = /^@bento\/([^/]+)$/.exec(id);
      if (!match) return null;

      for (const ext of ['tsx', 'ts'] as const) {
        const candidate = resolve(packagesRoot, match[1], 'src', `index.${ext}`);
        if (existsSync(candidate)) return candidate;
      }
      return null;
    }
  };
}

/**
 * Mirror the build-time `define` substitutions that
 * `packages/@bento/internal-props/tsdown.config.ts` performs on `major`,
 * `minor`, and `patch` identifiers in its `src/index.ts`. Vitest runs against
 * the source file directly (via `bentoSourceResolver`), so we must apply the
 * same substitution here or the source references undefined globals at
 * runtime.
 */
function bentoInternalPropsVersionDefine(): Record<string, string> {
  const internalPropsPkg = JSON.parse(
    readFileSync(resolve(__dirname, '..', 'packages', '@bento', 'internal-props', 'package.json'), 'utf8')
  ) as { version: string };
  const versionMatch = internalPropsPkg.version.match(/^(\d+)\.(\d+)\.(\d+)/);
  const [major, minor, patch] = versionMatch ? versionMatch.slice(1) : ['0', '0', '0'];
  return {
    major: JSON.stringify(major),
    minor: JSON.stringify(minor),
    patch: JSON.stringify(patch)
  };
}

export const ssr: TestProjectConfiguration = {
  extends: true,
  test: {
    globals: true,
    name: 'SSR',
    include: ['./**/**/*.node.test.{ts,tsx}'],
    environment: 'node',
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    },
    server: {
      deps: {
        inline: [/@bento\/.*/]
      }
    }
  }
};

export const browser: TestProjectConfiguration = {
  extends: true,
  test: {
    globals: true,
    name: 'Browser',
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    },
    server: {
      deps: {
        inline: [/@bento\/.*/]
      }
    },
    include: ['./**/**/*.browser.test.{ts,tsx}'],
    setupFiles: resolve(__dirname, './vitest.setup.mts'),
    browser: {
      instances: [{ browser: 'chromium' }],
      provider: playwright(),
      headless: true,
      enabled: true,
      screenshotFailures: false
    }
  }
};

export const visual: TestProjectConfiguration = {
  extends: true,
  test: {
    ...browser.test,
    name: 'Visual',
    include: ['./**/**/*.visual.test.{ts,tsx}'],
    browser: {
      ...browser.test?.browser,
      instances: [{ browser: 'chromium', name: 'Visual (Chromium)' }]
    }
  }
};

export default defineConfig({
  plugins: [bentoSourceResolver(), react()],
  resolve: {
    tsconfigPaths: true
  },
  define: bentoInternalPropsVersionDefine(),
  test: {
    exclude: [...defaultExclude],
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['dist/**/*', 'src/**/*'],
      exclude: [
        'dist/**/**.d.{ts,cts,mts}',
        'dist/**/**.map',
        'dist/**/**.css',
        'examples/**/!(*.ts|*.tsx)',
        '**/**/*.module.css'
      ],
      reporter: ['text', 'json', 'html'],
      thresholds: {
        autoUpdate: false,
        perFile: true,
        'src/**.{ts,tsx}': {
          statements: 90,
          functions: 90,
          branches: 90,
          lines: 90
        }
      }
    }
  }
});
