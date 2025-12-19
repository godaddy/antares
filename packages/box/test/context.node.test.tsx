import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'path';
import { Box, defaults, Slot } from '@bento/box';
import { renderToString } from 'react-dom/server';
import { fileURLToPath } from 'url';
import { describe, it } from 'vitest';
import fs from 'fs/promises';
import assume from 'assume';
import React from 'react';

describe('@bento/box', function bento() {
  function assertDefaults(slots: any, env: any) {
    assume(slots).is.a('object');
    assume(slots.override).equals(false);
    assume(slots.assigned).deep.equals({});
    assume(slots.namespace).deep.equals([]);

    assume(env).is.a('object');
    assume(env.components).deep.equals({});
    assume(env.sprite).equals('');
    assume(env.document).is.a('function');
    assume(env.window).is.a('function');

    //
    // These methods interact with the global scope
    //
    const doc = typeof document !== 'undefined' ? document : null;
    const win = typeof window !== 'undefined' ? window : null;

    global.window = {} as unknown as Window & typeof globalThis;
    global.document = { nodeType: 9, defaultView: global.window } as unknown as Document;

    assume(env.document()).deep.equals(global.document);
    assume(env.window()).deep.equals(global.window);

    if (doc) global.document = doc;
    if (win) global.window = win;
  }

  it('is a React context', function context() {
    assume(Box).is.a('object');
    assume(Box.Provider).is.a('object');
    assume(Box.Consumer).is.a('object');
  });

  it('provides default values', function defaults() {
    const { env, slots } = (Box as any)._currentValue;

    assertDefaults(slots, env);
  });

  describe('#defaults', function defaultsmethod() {
    it('provides default values', function fn() {
      const { env, slots } = defaults(document);

      assertDefaults(slots, env);
    });
  });

  describe('Slot component', function slotComponent() {
    it('exports the Slot component', function exports() {
      assume(Slot).is.a('function');
    });

    it('renders children without modification when no slots provided', function noSlots() {
      const result = renderToString(
        <Slot slots={{}}>
          <div data-testid="child">Content</div>
        </Slot>
      );

      assume(result).includes('data-testid="child"');
      assume(result).includes('Content');
    });

    it('merges slots into Box context', function mergeSlots() {
      const testSlots = {
        trigger: { onClick: 'handler' },
        content: { role: 'dialog' }
      };

      const result = renderToString(
        <Slot slots={testSlots}>
          <Box.Consumer>
            {function render(ctx) {
              assume(ctx.slots.assigned).is.a('object');
              assume(ctx.slots.assigned.trigger).deep.equals({ onClick: 'handler' });
              assume(ctx.slots.assigned.content).deep.equals({ role: 'dialog' });
              return <div>Test</div>;
            }}
          </Box.Consumer>
        </Slot>
      );

      assume(result).includes('Test');
    });

    it('preserves existing Box context env', function preserveEnv() {
      const customEnv = {
        components: { test: 'component' as any },
        sprite: 'test-sprite',
        document: () => document,
        window: () => window
      };

      const result = renderToString(
        <Box.Provider value={{ env: { ...customEnv, locked: false, lockGeneration: 0 }, slots: { override: false, namespace: [], assigned: {}, slotGenerations: {} } }}>
          <Slot slots={{ trigger: { test: 'value' } }}>
            <Box.Consumer>
              {function render(ctx) {
                assume(ctx.env.sprite).equals('test-sprite');
                assume(ctx.env.components.test).equals('component');
                return <div>Test</div>;
              }}
            </Box.Consumer>
          </Slot>
        </Box.Provider>
      );

      assume(result).includes('Test');
    });

    it('merges new slots with existing parent slots', function mergeWithParent() {
      const parentSlots = {
        existing: { value: 'parent' }
      };

      const childSlots = {
        trigger: { value: 'child' }
      };

      const result = renderToString(
        <Slot slots={parentSlots}>
          <Slot slots={childSlots}>
            <Box.Consumer>
              {function render(ctx) {
                assume(ctx.slots.assigned.existing).deep.equals({ value: 'parent' });
                assume(ctx.slots.assigned.trigger).deep.equals({ value: 'child' });
                return <div>Test</div>;
              }}
            </Box.Consumer>
          </Slot>
        </Slot>
      );

      assume(result).includes('Test');
    });

    it('allows child slots to override parent slots', function overrideParent() {
      const parentSlots = {
        trigger: { value: 'parent' }
      };

      const childSlots = {
        trigger: { value: 'child' }
      };

      const result = renderToString(
        <Slot slots={parentSlots}>
          <Slot slots={childSlots}>
            <Box.Consumer>
              {function render(ctx) {
                assume(ctx.slots.assigned.trigger).deep.equals({ value: 'child' });
                return <div>Test</div>;
              }}
            </Box.Consumer>
          </Slot>
        </Slot>
      );

      assume(result).includes('Test');
    });

    it('preserves Box context namespace and override flags', function preserveFlags() {
      const result = renderToString(
        <Box.Provider
          value={{
            env: { components: {}, sprite: '', document: () => document, window: () => window, locked: false, lockGeneration: 0 },
            slots: { override: true, namespace: ['parent', 'child'], assigned: {}, slotGenerations: {} }
          }}
        >
          <Slot slots={{ trigger: { test: 'value' } }}>
            <Box.Consumer>
              {function render(ctx) {
                assume(ctx.slots.override).equals(true);
                assume(ctx.slots.namespace).deep.equals(['parent', 'child']);
                return <div>Test</div>;
              }}
            </Box.Consumer>
          </Slot>
        </Box.Provider>
      );

      assume(result).includes('Test');
    });
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
