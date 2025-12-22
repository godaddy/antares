import { renderToString } from 'react-dom/server';
import { Environment } from '@bento/environment';
import { describe, it } from 'vitest';
import { Box } from '@bento/box';
import assume from 'assume';
import React from 'react';

describe('@bento/environment', function bento() {
  describe('#components', function componentsSuite() {
    it('should merge the `components` prop into the context', async function test() {
      const Link = function Link() {
        return <a href="#">Link</a>;
      };

      const env = renderToString(
        <Environment components={{ BentoButton: Link }}>
          <Box.Consumer>
            {function renderConsumer({ env }) {
              assume(env.components.BentoButton).to.equal(Link);
              return 'Hello World';
            }}
          </Box.Consumer>
        </Environment>
      );

      assume(env).equals('Hello World');
    });

    it('should merge the `env` prop into the context', async function test() {
      const env = renderToString(
        <Environment foo="bar" another={[1, 2, 3]} baz={{ a: 'b' }}>
          <Box.Consumer>
            {function renderConsumer({ env }) {
              assume(env.foo).to.equal('bar');
              assume(env.another).to.deep.equal([1, 2, 3]);
              assume(env.baz).to.deep.equal({ a: 'b' });

              return 'Merge all the things';
            }}
          </Box.Consumer>
        </Environment>
      );

      assume(env).to.equal('Merge all the things');
    });

    it('should introduce a new root and window when passing in a root', async function test() {
      const win = document.createElement('iframe');
      document.body.appendChild(win);

      const env = renderToString(
        <Environment root={win?.contentWindow?.document}>
          <Box.Consumer>
            {function renderConsumer({ env }) {
              assume(env).is.a('object');
              assume(env.window()).exists();
              assume(env.window()).to.equal(win.contentWindow);
              assume(env.document()).exists();
              assume(env.document()).to.equal(win?.contentWindow?.document);

              return 'Hello World';
            }}
          </Box.Consumer>
        </Environment>
      );

      assume(env).equals('Hello World');
    });

    it('should handle nested environments with lock boundaries', async function test() {
      let firstGeneration: number;
      let secondGeneration: number;

      const env = renderToString(
        <Environment lock={true}>
          <Box.Consumer>
            {function firstConsumer({ env }) {
              firstGeneration = env.lockGeneration;
              assume(env.locked).to.equal(true);

              return (
                <Environment lock={true}>
                  <Box.Consumer>
                    {function secondConsumer({ env }) {
                      secondGeneration = env.lockGeneration;
                      assume(env.locked).to.equal(true);
                      return 'Nested Lock';
                    }}
                  </Box.Consumer>
                </Environment>
              );
            }}
          </Box.Consumer>
        </Environment>
      );

      assume(env).equals('Nested Lock');
      assume(secondGeneration!).to.be.above(firstGeneration!);
    });

    it('should tag pre-existing slots with generation when entering first lock', async function test() {
      const env = renderToString(
        <Box.Provider
          value={{
            env: { components: {}, sprite: '', document: () => document, window: () => window, locked: false, lockGeneration: 0 },
            slots: { override: false, namespace: [], assigned: { mySlot: { className: 'test' } }, slotGenerations: {} }
          }}
        >
          <Environment lock={true}>
            <Box.Consumer>
              {function consumer({ env, slots }) {
                // The pre-existing slot should be tagged with generation 0 (before lock)
                assume(slots.slotGenerations.mySlot).to.equal(0);
                assume(env.lockGeneration).to.equal(1);
                assume(env.locked).to.equal(true);
                return 'Tagged Slots';
              }}
            </Box.Consumer>
          </Environment>
        </Box.Provider>
      );

      assume(env).equals('Tagged Slots');
    });

    it('should tag pre-existing slots with generation when entering nested lock', async function test() {
      const env = renderToString(
        <Environment lock={true}>
          <Box.Consumer>
            {function firstConsumer({ env, slots }) {
              // Add a slot after first lock
              slots.assigned = { ...slots.assigned, nestedSlot: { id: 'nested' } };

              return (
                <Box.Provider value={{ env, slots }}>
                  <Environment lock={true}>
                    <Box.Consumer>
                      {function secondConsumer({ env, slots }) {
                        // The slot added after first lock should be tagged with generation 1
                        assume(slots.slotGenerations.nestedSlot).to.equal(1);
                        assume(env.lockGeneration).to.equal(2);
                        return 'Nested Tagged Slots';
                      }}
                    </Box.Consumer>
                  </Environment>
                </Box.Provider>
              );
            }}
          </Box.Consumer>
        </Environment>
      );

      assume(env).equals('Nested Tagged Slots');
    });
  });
});
