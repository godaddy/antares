import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { BentoError } from '../src/index.ts';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';
import fs from 'node:fs/promises';
import assume from 'assume';

describe('@bento/error', function errors() {
  it('is an instance of Error', function instance() {
    const error = new BentoError({
      name: 'package-name',
      method: 'method-name',
      message: 'The given name is already registered, please provide a different unique name'
    });

    assume(error).is.instanceOf(Error);
    assume(error.message).startWith('@bento/package-name(method-name):');
    assume(error.name).equals('BentoError');
  });

  it('allows the assignment of custom data', function data() {
    const error = new BentoError({
      name: 'package-name',
      method: 'method-name',
      message: 'The given name is already registered, please provide a different unique name',
      custom: 'data',
      another: 1337
    });

    assume(error.custom).equals('data');
    assume(error.another).equals(1337);
  });

  describe('slack channel', function slack() {
    it('defaults to the bento support channel', function defaults() {
      const error = new BentoError({
        name: 'package-name',
        method: 'method-name',
        message: 'The given name is already registered, please provide a different unique name'
      });

      assume(error.message).includes('Join our support channel #bento-support');
    });

    it('allows a custom slack channel to be set', function custom() {
      const err = new BentoError({
        name: 'package-name',
        method: 'method-name',
        message: 'The given name is already registered, please provide a different unique name',
        channel: 'example-channel'
      });

      assume(err.message).includes('Join our support channel #example-channel');
    });
  });

  describe('documentation URL', function docs() {
    it('generates the same documentation URL for each error', function url() {
      const err = new BentoError({
        name: 'package-name',
        method: 'method-name',
        message: 'The given name is already registered, please provide a different unique name'
      });

      const err2 = new BentoError({
        name: 'package-name',
        method: 'method-name',
        message: 'The given name is already registered, please provide a different unique name'
      });

      assume(err.message).equal(err2.message);
    });

    it('changes the documentation URL based on the message', function url() {
      const err = new BentoError({
        name: 'package-name',
        method: 'method-name',
        message: 'The given name is already registered, please provide a different unique name'
      });

      assume(err.message).includes('https://example.com/docs/errors/#AFBF4A');

      const err2 = new BentoError({
        name: 'package-name',
        method: 'method-name',
        message: 'This should generate a different URL hash'
      });

      assume(err2.message).includes('https://example.com/docs/errors/#38B501');
    });

    it('allows the documentation URL to be set', function url() {
      const err = new BentoError({
        name: 'package-name',
        method: 'method-name',
        message: 'The given name is already registered, please provide a different unique name',
        docs: 'example-url.com/docs'
      });

      assume(err.message).includes('https://example-url.com/docs');
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
