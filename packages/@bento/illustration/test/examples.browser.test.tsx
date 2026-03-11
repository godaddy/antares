import { RotateSVG } from '../examples/rotate-illustration.tsx';
import { RenderingSvg } from '../examples/rendering-svg.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/illustration examples', function bento() {
  describe('RenderingSvg', function renderingSvg() {
    it('renders the illustration', function test() {
      const { container } = render(<RenderingSvg />);
      const svg = container.querySelector('svg');

      assume(svg).exists();
      assume(svg?.getAttribute('xmlns')).equals('http://www.w3.org/2000/svg');
      assume(svg?.getAttribute('width')).equals('100');
      assume(svg?.getAttribute('height')).equals('100');
      assume(svg?.getAttribute('viewBox')).equals('0 0 24 24');
    });
  });

  describe('RotateSVG', function rotateSvg() {
    it('renders the illustration', function test() {
      const { container } = render(<RotateSVG rotate={90} />);
      const svg = container.querySelector('svg');

      assume(svg).exists();
      assume(svg?.getAttribute('xmlns')).equals('http://www.w3.org/2000/svg');
      assume(svg?.getAttribute('viewBox')).equals('0 100 1024 1000');

      assume(svg?.getAttribute('data-rotate')).equals('90');

      const group = container.querySelector('g');
      assume(group).exists();
      assume(group?.getAttribute('transform')).equals('rotate(90 512 512)');
    });
  });
});
