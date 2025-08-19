import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { BasicUsage } from '../examples/basic';
import { MultipleIcons } from '../examples/multiple.js';

describe('@bento/use-svg-sprite', function useSvgSprite() {
  it('should render the standalone example', function standaloneExample() {
    const { container } = render(<BasicUsage />);

    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.innerHTML).toContain('bento-svg-spritesheet-check');

    const svgs = container.querySelectorAll('svg');
    expect(svgs).toHaveLength(1);

    expect(svgs[0]).toHaveAttribute('width', '24');
    expect(svgs[0]).toHaveAttribute('height', '24');
  });

  it('should render the multiple icons example', function multipleIconsExample() {
    const { container } = render(<MultipleIcons />);

    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.innerHTML).toContain('bento-svg-spritesheet-check');
    expect(container.innerHTML).toContain('bento-svg-spritesheet-alert');

    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });
});
