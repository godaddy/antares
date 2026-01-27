import { Loader, timeout } from '../examples/loading.tsx';
import { Awesome } from '../examples/ondemand.tsx';
import { Example } from '../examples/icon.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import React, { act } from 'react';
import assume from 'assume';

describe('@bento/icon examples', function bento() {
  const spinner = 'M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48';
  const dragon =
    'm352 124.5-51.9-13c-6.5-1.6-11.3-7.1-12-13.8s2.8-13.1 8.7-16.1l40.8-20.4-43.2-32.4c-5.5-4.1-7.8-11.3-5.6-17.9S297.1 0';
  const play = '<path d="M3 22v-20l18 10-18 10z"></path>';

  describe('Icon', function iconExample() {
    it('renders the icon with the correct icon name', function name() {
      const { container } = render(<Example />);
      const result = container.innerHTML;

      assume(result).includes('data-icon="play"');
      assume(result).includes('A play button');
      assume(result).includes(play);
      assume(result).does.not.include('data-loading');
    });
  });

  describe('Loading', function loadingExample() {
    it('renders the placeholder while the dragon icon is loading', async function loading() {
      const { container } = render(<Loader />);
      const result = container.innerHTML;

      assume(result).includes('data-icon="name-to-be-intercepted-by-ondemand"');
      assume(result).includes(
        'Displays the children of the icon as placeholder while our dragon icon is delayed for 10 seconds.'
      );
      assume(result).includes('data-loading="true"');
      assume(result).includes(spinner);
      assume(result).does.not.include(dragon);

      await timeout(10000);

      const updated = container.innerHTML;

      assume(updated).includes('data-icon="name-to-be-intercepted-by-ondemand"');
      assume(updated).does.not.include('data-loading="true"');
      assume(updated).does.not.include(spinner);
      assume(updated).includes(dragon);
    });

    it('only shows the dragon for the correct icon name', async function loading() {
      const { container } = render(<Loader icon="unknown-name-to-trigger-if-statement" />);
      const result = container.innerHTML;

      assume(result).does.includes('data-loading="true"');
      assume(result).includes(spinner);
    });
  });

  describe('On Demand', function onDemandExample() {
    it('fetches the icon from the Font Awesome CDN', async function onDemand() {
      const { container } = render(<Awesome icon="hippo" />);

      await timeout(1000);
      await act(function flush() {
        /* flush before asserting */
      });
      const result = container.innerHTML;

      assume(result).includes('data-icon="hippo"');
      assume(result).includes('<code>house</code>');
      assume(result).includes('M407 47c9.4-9.4 24.6-9.4 33.9 0l17.2 17.2c1.9-');
      assume(result).does.not.include('data-loading');
    });
  });
});
