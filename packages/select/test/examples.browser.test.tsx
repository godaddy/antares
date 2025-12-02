import { render } from 'vitest-browser-react';
import { beforeEach, afterEach, describe, it, vi } from 'vitest';
import assume from 'assume';
import { BasicSelectExample } from '../examples/basic-example';

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
    it('renders the select with default placeholder', function test() {
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

    it('renders with custom placeholder', function test() {
      const { container } = render(<BasicSelectExample placeholder="Choose one..." />);
      const result = container.innerHTML;

      assume(result).includes('Choose one...');
    });

    it('renders with grouped options when withGroups is true', function test() {
      const { container } = render(<BasicSelectExample withGroups={true} />);
      const result = container.innerHTML;

      // Verify group headers
      assume(result).includes('Popular Fruits');
      assume(result).includes('Exotic Fruits');
      assume(result).includes('Berries');
    });

    it('renders without groups by default', function test() {
      const { container } = render(<BasicSelectExample />);
      const result = container.innerHTML;

      // Should not have group headers
      assume(result).not.includes('Popular Fruits');
      assume(result).not.includes('Exotic Fruits');
    });

    it('renders with description when showDescription is true', function test() {
      const { container } = render(<BasicSelectExample showDescription={true} />);
      const result = container.innerHTML;

      assume(result).includes('Choose your favorite fruit from the list');
      assume(result).includes('slot="description"');
    });

    it('renders with error when showError is true', function test() {
      const { container } = render(<BasicSelectExample showError={true} />);
      const result = container.innerHTML;

      assume(result).includes('Please select a fruit');
      assume(result).includes('slot="error"');
    });

    it('renders with disabled state', function test() {
      const { container } = render(<BasicSelectExample isDisabled={true} />);
      const result = container.innerHTML;

      assume(result).includes('aria-disabled="true"');
      assume(result).includes('data-disabled="true"');
    });

    it('renders with required attribute', function test() {
      const { container } = render(<BasicSelectExample isRequired={true} />);
      const result = container.innerHTML;

      assume(result).includes('aria-required="true"');
      assume(result).includes('data-required="true"');
    });

    it('renders with invalid state', function test() {
      const { container } = render(<BasicSelectExample isInvalid={true} />);
      const result = container.innerHTML;

      assume(result).includes('aria-invalid="true"');
      assume(result).includes('data-invalid="true"');
    });

    it('renders with form name for form integration', function test() {
      const { container } = render(<BasicSelectExample name="fruit" />);
      const result = container.innerHTML;

      // Verify hidden select with name attribute
      assume(result).includes('name="fruit"');
      assume(result).includes('<select');
    });

    it('supports multiple selection mode', function test() {
      const { container } = render(<BasicSelectExample selectionMode="multiple" />);
      const result = container.innerHTML;

      assume(result).includes('aria-multiselectable="true"');
    });

    it('updates internal state and closes popover when an option is selected', async function test() {
      const { container } = render(<BasicSelectExample />);

      // Verify initial state
      let html = container.innerHTML;
      assume(html).includes('Select a fruit...');

      const trigger = container.querySelector('[role="combobox"]') as HTMLElement;
      assume(trigger).exists();
      assume(trigger?.getAttribute('data-open')).equals(null);
      assume(trigger?.getAttribute('aria-expanded')).equals('false');

      // Click trigger to open
      await trigger.click();
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Verify popover opened
      assume(trigger?.getAttribute('data-open')).equals('true');
      assume(trigger?.getAttribute('aria-expanded')).equals('true');

      // Find and click the "Apple" option
      const listbox = container.querySelector('[role="listbox"]') as HTMLElement;
      assume(listbox).exists();

      const appleOption = Array.from(listbox.querySelectorAll('[role="option"]')).find(
        (el) => el.textContent === 'Apple'
      ) as HTMLElement;
      assume(appleOption).exists();

      await appleOption.click();

      // Wait for state to update
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Verify selection state updated (option has aria-selected)
      html = container.innerHTML;
      assume(html).includes('data-selected="true"');
      assume(html).includes('aria-selected="true"');

      // Verify popover closed
      assume(trigger?.getAttribute('data-open')).equals(null);
      assume(trigger?.getAttribute('aria-expanded')).equals('false');

      // Verify trigger text updates to selected value
      assume(html).includes('Apple');
    });
  });
});
