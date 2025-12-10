import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import assume from 'assume';
import React from 'react';

import { BasicMenuExample } from '../examples/basic-menu';
import { SelectionMenuExample } from '../examples/selection-menu';
import { SectionsExample } from '../examples/sections';
import { MenuTriggerExample } from '../examples/menu-trigger';
import { DynamicMenuExample } from '../examples/dynamic-menu';

describe('@bento/menu examples', function examples() {
  it('renders BasicMenuExample', function test() {
    const { container } = render(<BasicMenuExample aria-label="Basic" />);
    assume(container.innerHTML).includes('New file');
  });

  it('renders SelectionMenuExample', function test() {
    const { container } = render(<SelectionMenuExample aria-label="Selection" />);
    assume(container.innerHTML).includes('Autosave');
  });

  it('renders SectionsExample', function test() {
    const { container } = render(<SectionsExample aria-label="Sections" />);
    assume(container.innerHTML).includes('File');
  });

  it('renders MenuTriggerExample', function test() {
    const { container } = render(<MenuTriggerExample aria-label="Trigger" />);
    assume(container.innerHTML).includes('Actions');
  });

  it('renders DynamicMenuExample', function test() {
    const { container } = render(<DynamicMenuExample aria-label="Dynamic" />);
    assume(container.innerHTML).includes('Apple');
  });
});
