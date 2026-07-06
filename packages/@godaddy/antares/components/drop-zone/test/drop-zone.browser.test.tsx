import { describe, it, expect, beforeAll } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import assume from 'assume';
import { preloadTestIcons } from '../../../utils/test-helpers.tsx';
import { DropZone, Text } from '@godaddy/antares';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { DropTargetLabelExample } from '../examples/drop-target-label.tsx';
import { FileUploadExample } from '../examples/file-upload.tsx';
import { ReplaceFileExample } from '../examples/replace-file.tsx';

describe('@godaddy/antares', function antares() {
  describe('#DropZone', function dropZoneTests() {
    beforeAll(preloadTestIcons);

    it('renders instructional label text', async function rendersLabel() {
      const { getByText } = await render(<DefaultExample />);
      await expect.element(getByText('Drop files to upload.')).toBeVisible();
    });

    it('applies data-focus-visible when focused via keyboard', async function keyboardFocus() {
      const { container } = await render(<DefaultExample />);
      await userEvent.keyboard('{Tab}');
      assume(container.querySelector('[data-focus-visible]')).is.not.equal(null);
    });

    it('applies data-disabled attribute', async function isDisabledAttribute() {
      const { container } = await render(<DisabledExample />);
      assume(container.querySelector('[data-disabled]')).is.not.equal(null);
    });

    it('shows resting label in initial state', async function restingLabel() {
      const { getByText } = await render(<DropTargetLabelExample />);
      await expect.element(getByText('Add files or drag them here.')).toBeVisible();
    });

    it('renders "Add files" button and size limit text', async function rendersFileUploadResting() {
      const { getByText } = await render(<FileUploadExample />);
      await expect.element(getByText('Add files')).toBeVisible();
      await expect.element(getByText('The file must be less than 256MB')).toBeVisible();
    });

    it('renders an image preview after selecting an image file', async function imagePreview() {
      const { container, getByRole } = await render(<FileUploadExample />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      await userEvent.upload(input, new File(['x'], 'photo.jpg', { type: 'image/jpeg' }));
      await expect.element(getByRole('img', { name: 'photo.jpg' })).toBeVisible();
    });

    it('renders the file extension after selecting a non-image file', async function extensionFallback() {
      const { container, getByText } = await render(<FileUploadExample />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      await userEvent.upload(input, new File(['x'], 'document.pdf', { type: 'application/pdf' }));
      await expect.element(getByText('pdf', { exact: true })).toBeVisible();
    });

    it('has a file picker restricted to accepted types in empty state', async function emptyStatePicker() {
      const { container } = await render(<ReplaceFileExample />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      assume(input).is.not.equal(null);
      assume(input.accept).equals('image/jpeg,image/png,image/gif,application/pdf');
    });

    it('shows an image preview after selecting an image file', async function replaceFilledImage() {
      const { container, getByRole } = await render(<ReplaceFileExample />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      await userEvent.upload(input, new File(['x'], 'photo.png', { type: 'image/png' }));
      await expect.element(getByRole('img', { name: 'photo.png' })).toBeVisible();
    });

    it('shows filename, extension, and Replace button after selecting a non-image file', async function replaceFilledNonImage() {
      const { container, getByText } = await render(<ReplaceFileExample />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      await userEvent.upload(input, new File(['x'], 'report.pdf', { type: 'application/pdf' }));
      await expect.element(getByText('report.pdf')).toBeVisible();
      await expect.element(getByText('pdf', { exact: true })).toBeVisible();
      await expect.element(getByText('Replace')).toBeVisible();
    });

    it('applies a custom string className', async function customClassName() {
      const { container } = await render(
        <DropZone
          aria-label="Test"
          onDrop={function noop() {
            /* noop */
          }}
          className="custom-class"
        >
          <Text slot="label">Drop here</Text>
        </DropZone>
      );
      assume(container.querySelector('.custom-class')).is.not.equal(null);
    });
  });
});
