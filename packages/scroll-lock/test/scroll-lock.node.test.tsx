import { ScrollLock, useScrollLock } from '@bento/scroll-lock';
import { describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import React from 'react';
import assume from 'assume';

describe('@bento/scroll-lock (node)', function bentoNode() {
  describe('ScrollLock SSR', function scrollLockSSRTests() {
    it('renders null on server (SSR safety)', function ssrSafety() {
      const html = renderToString(<ScrollLock />);
      assume(html).equals('');
    });

    it('renders children but does not apply scroll lock on server', function rendersChildren() {
      const html = renderToString(
        <ScrollLock>
          <div>Child content</div>
        </ScrollLock>
      );

      // Should render children
      assume(html).includes('Child content');
    });

    it('does not throw when isDisabled is false on server', function noThrowWhenEnabled() {
      const html = renderToString(<ScrollLock isDisabled={false} />);
      assume(html).equals('');
    });

    it('does not throw when isDisabled is true on server', function noThrowWhenDisabled() {
      const html = renderToString(<ScrollLock isDisabled={true} />);
      assume(html).equals('');
    });
  });

  describe('Public API', function publicAPI() {
    it('exports ScrollLock component', function exportsComponent() {
      assume(ScrollLock).is.an('object');
      assume(ScrollLock.displayName).includes('ScrollLock');
    });

    it('exports useScrollLock hook', function exportsHook() {
      assume(useScrollLock).is.a('function');
    });
  });
});

