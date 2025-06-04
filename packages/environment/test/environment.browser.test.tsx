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
            {({ env }) => {
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
            {({ env }) => {
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
            {({ env }) => {
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
  });
});
