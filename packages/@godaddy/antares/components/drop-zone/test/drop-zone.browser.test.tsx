import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { CustomContentExample } from '../examples/custom-content.tsx';

describe('@godaddy/antares', function antares() {
  describe('#DropZone', function dropZoneTests() {
    it('renders the drop zone container', async function rendersContainer() {
      const { container } = await render(<DefaultExample />);
      const dropZone = container.firstElementChild as HTMLElement;

      expect(dropZone).not.toBeNull();
    });

    it('renders default instructional text', async function rendersDefaultText() {
      const { getByText } = await render(<DefaultExample />);

      await expect.element(getByText('Drop files to upload.')).toBeVisible();
    });

    it('renders custom children when provided', async function rendersCustomChildren() {
      const { getByText } = await render(<CustomContentExample />);

      await expect.element(getByText('Drag your images here')).toBeVisible();
      await expect.element(getByText('PNG, JPG, or GIF up to 10MB')).toBeVisible();
    });

    it('does not render default text when custom children are provided', async function noDefaultWithCustom() {
      const { container } = await render(<CustomContentExample />);

      expect(container.textContent).not.toContain('Drop files to upload.');
    });

    it('applies data-disabled when isDisabled is true', async function disabledAttribute() {
      const { container } = await render(<DisabledExample />);
      const dropZone = container.querySelector('[data-disabled]');

      expect(dropZone).not.toBeNull();
    });
  });
});
