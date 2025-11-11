import { Portal } from '@bento/portal';
import { describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import React from 'react';
import assume from 'assume';

describe('@bento/portal (node)', function bentoNode() {
  describe('Portal SSR', function portalSSRTests() {
    it('does not render on server when mounted is false', function doesNotRenderOnServer() {
      const html = renderToString(
        <Portal mounted={false}>
          <div>Server content</div>
        </Portal>
      );

      assume(html).equals('');
    });

    it('does not render on server when mounted is true (SSR safety)', function ssrSafety() {
      // Even if mounted=true, Portal should not render on server because document is undefined
      const html = renderToString(
        <Portal mounted={true}>
          <div>Server content</div>
        </Portal>
      );

      assume(html).equals('');
    });
  });
});
