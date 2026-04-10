import { render } from 'vitest-browser-react';
import { beforeEach, afterEach, describe, it, vi, expect } from 'vitest';
import assume from 'assume';
import { PressableDivExample } from '../examples/pressable-div.tsx';
import { PressableLinkExample } from '../examples/pressable-link-example.tsx';
import { PressableCustomExample } from '../examples/pressable-custom.tsx';

describe('@bento/pressable examples', function bento() {
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

  describe('PressableDiv', function pressableDivExample() {
    it('renders the pressable div', async function test() {
      const { container } = await render(<PressableDivExample />);
      const result = container.innerHTML;

      assume(result).includes('data-react-aria-pressable="true"');
      assume(result).includes('tabindex="0"');
      assume(result).match(/^<div[^>]*>Pressable Div<\/div>$/);

      const divButton = container.querySelector('div');

      divButton?.click();
      expect(consoleLogSpy).toHaveBeenCalledWith('div pressed!');
    });
  });

  describe('PressableLink', function pressableLinkExample() {
    it('renders the pressable link', async function test() {
      const { container } = await render(<PressableLinkExample />);
      const result = container.innerHTML;

      assume(result).includes('data-react-aria-pressable="true"');
      assume(result).includes('tabindex="0"');
      assume(result).match(/^<a[^>]*>Pressable Link<\/a>$/);

      const link = container.querySelector('a');

      link?.addEventListener('click', (e) => e.preventDefault());
      link?.click();
      expect(consoleLogSpy).toHaveBeenCalledWith('link pressed!');
    });
  });

  describe('PressableCustom', function pressableCustomExample() {
    it('renders the pressable custom', async function test() {
      const { container } = await render(<PressableCustomExample />);
      const result = container.innerHTML;

      assume(result).includes('data-react-aria-pressable="true"');
      assume(result).includes('tabindex="0"');
      assume(result).match(/^<div[^>]*>Custom Component<\/div>$/);

      const div = container.querySelector('div');

      div?.click();
      expect(consoleLogSpy).toHaveBeenCalledWith('custom component pressed!');
    });
  });
});
