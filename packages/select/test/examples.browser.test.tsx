import React from 'react';
import { render } from 'vitest-browser-react';
import { beforeEach, afterEach, describe, it, vi } from 'vitest';
import assume from 'assume';
import { BasicSelectExample } from '../examples/basic-select';
import { SelectWithGroupsExample } from '../examples/select-with-groups';
import { SelectWithFormExample } from '../examples/select-with-form';
import { CustomComponentsExample } from '../examples/custom-components';
import { UsingListBoxItemExample } from '../examples/using-listbox-item';

describe('@bento/select examples', function bento() {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(function beforeEach() {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(function mockLog() {
      return void 0;
    });
  });

  afterEach(function afterEach() {
    consoleLogSpy.mockRestore();
    vi.clearAllMocks();
  });

  describe('BasicSelectExample', function basicSelectExample() {
    it('renders the basic select with placeholder', function test() {
      const { container } = render(<BasicSelectExample />);
      const result = container.innerHTML;

      // Verify placeholder
      assume(result).includes('Select a fruit...');
      // Verify combobox role
      assume(result).includes('role="combobox"');
      // Verify options are rendered
      assume(result).includes('Apple');
      assume(result).includes('Banana');
      assume(result).includes('Orange');
    });

    it('renders with selected value', function test() {
      const { container } = render(<BasicSelectExample value="apple" />);
      const result = container.innerHTML;

      // Should show selected value
      assume(result).includes('Apple');
    });

    it('renders with description and errorMessage slots', function test() {
      const { container } = render(<BasicSelectExample />);
      const result = container.innerHTML;

      // Component includes description and errorMessage slots
      assume(result).includes('slot="description"');
      assume(result).includes('slot="errorMessage"');
    });
  });

  describe('SelectWithGroupsExample', function selectWithGroupsExample() {
    it('renders select with grouped options', function test() {
      const { container } = render(<SelectWithGroupsExample />);
      const result = container.innerHTML;

      // Verify placeholder
      assume(result).includes('Choose a meal...');
      // Verify group headers
      assume(result).includes('Main Dishes');
      assume(result).includes('Side Dishes');
      // Verify options
      assume(result).includes('Chicken Teriyaki');
      assume(result).includes('Edamame');
    });

    it('renders with selected value from groups', function test() {
      const { container } = render(<SelectWithGroupsExample value="salmon-bento" />);
      const result = container.innerHTML;

      assume(result).includes('Salmon Bento');
    });
  });

  describe('SelectWithFormExample', function selectWithFormExample() {
    it('renders select within a form', function test() {
      const { container } = render(<SelectWithFormExample />);
      const result = container.innerHTML;

      // Verify form elements
      assume(result).includes('<form');
      assume(result).includes('Favorite Fruit');
      assume(result).includes('type="submit"');
      // Verify hidden select with name attribute
      assume(result).includes('name="fruit"');
      assume(result).includes('<select');
    });

    it('renders with required attribute', function test() {
      const { container } = render(<SelectWithFormExample required />);
      const result = container.innerHTML;

      assume(result).includes('aria-required="true"');
    });

    it('renders with description slot content', function test() {
      const { container } = render(<SelectWithFormExample />);
      const result = container.innerHTML;

      assume(result).includes('Choose your favorite fruit from the list');
    });
  });

  describe('CustomComponentsExample', function customComponentsExample() {
    it('renders with custom trigger and value components', function test() {
      const { container } = render(<CustomComponentsExample />);
      const result = container.innerHTML;

      // Verify custom placeholder
      assume(result).includes('Pick something...');
      // Verify custom styling attributes
      assume(result).includes('data-open');
      // Verify options
      assume(result).includes('Option 1');
      assume(result).includes('Option 2');
      assume(result).includes('Option 3');
    });
  });

  describe('UsingListBoxItemExample', function usingListBoxItemExample() {
    it('renders select using ListBoxItem instead of SelectOption', function test() {
      const { container } = render(<UsingListBoxItemExample />);
      const result = container.innerHTML;

      // Verify placeholder
      assume(result).includes('Select an option...');
      // Verify ListBoxItem options are rendered
      assume(result).includes('Item 1');
      assume(result).includes('Item 2');
      assume(result).includes('Item 3');
    });

    it('renders with selected ListBoxItem', function test() {
      const { container } = render(<UsingListBoxItemExample value="item2" />);
      const result = container.innerHTML;

      assume(result).includes('Item 2');
    });
  });
});
