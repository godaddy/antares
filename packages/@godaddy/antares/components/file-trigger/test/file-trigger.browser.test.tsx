import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import assume from 'assume';
import { DefaultExample } from '../examples/default.tsx';
import { AcceptedTypesExample } from '../examples/accepted-types.tsx';

describe('@godaddy/antares', function antares() {
  describe('#FileTrigger', function fileTriggerTests() {
    it('renders a "Select a file" button and a hidden file input', async function rendersDefault() {
      const { getByText, container } = await render(<DefaultExample />);
      await expect.element(getByText('Select a file')).toBeVisible();
      assume(container.querySelector('input[type="file"]')).is.not.equal(null);
    });

    it('calls onSelect with the chosen file', async function firesOnSelect() {
      const spy = vi.spyOn(console, 'log').mockImplementation(function noop() {
        /* noop */
      });
      const { container } = await render(<DefaultExample />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      await userEvent.upload(input, new File(['hello'], 'hello.txt', { type: 'text/plain' }));
      assume(spy.mock.calls.length).equals(1);
      assume((spy.mock.calls[0][1] as File[])[0].name).equals('hello.txt');
      spy.mockRestore();
    });

    it('maps acceptedFileTypes and allowsMultiple onto the hidden input', async function mapsProps() {
      const { container } = await render(<AcceptedTypesExample />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      assume(input).is.not.equal(null);
      assume(input.accept).equals('image/jpeg,image/png,image/gif');
      assume(input.multiple).is.true();
    });
  });
});
