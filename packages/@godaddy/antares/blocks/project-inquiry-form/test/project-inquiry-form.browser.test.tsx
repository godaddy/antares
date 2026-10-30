import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { ProjectInquiryForm } from '../index.tsx';

function fileInput(container: HTMLElement) {
  const input = container.querySelector<HTMLInputElement>('input[type="file"]');
  if (!input) throw new Error('Expected the attachment file input');
  return input;
}

function dragFiles(files: File[]) {
  vi.spyOn(DataTransferItem.prototype, 'webkitGetAsEntry').mockImplementation(function syntheticEntry() {
    return { isFile: true, isDirectory: false } as FileSystemEntry;
  });
  const transfer = new DataTransfer();
  Object.defineProperty(transfer, 'effectAllowed', { value: 'copy' });

  for (const file of files) {
    const item = transfer.items.add(file);
    if (!item) throw new Error('Expected a synthetic file drag item');
  }

  return transfer;
}

function sendDrag(target: Element, type: string, dataTransfer: DataTransfer) {
  target.dispatchEvent(
    new DragEvent(type, {
      bubbles: true,
      cancelable: true,
      dataTransfer
    })
  );
}

function selectFiles(input: HTMLInputElement, files: File[]) {
  const transfer = new DataTransfer();

  for (const file of files) transfer.items.add(file);

  Object.defineProperty(input, 'files', { configurable: true, value: transfer.files });
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

describe('@godaddy/antares', function packageTests() {
  describe('#ProjectInquiryForm', function projectInquiryFormTests() {
    afterEach(function restoreMocks() {
      vi.restoreAllMocks();
    });

    it('opens the file picker from the shaded hint and keyboard', async function opensPicker() {
      const screen = await render(<ProjectInquiryForm />);
      const openPicker = vi
        .spyOn(fileInput(screen.container), 'click')
        .mockImplementation(function preventNativePicker() {
          // Assert activation without opening the operating system's file picker.
        });

      await userEvent.click(screen.getByText(/Each file must be less than 256 MiB/));
      expect(openPicker).toHaveBeenCalledTimes(1);

      screen.getByRole('button', { name: 'Add files', exact: true }).element().focus();
      await userEvent.keyboard('{Enter}');
      expect(openPicker).toHaveBeenCalledTimes(2);
      await userEvent.keyboard(' ');
      expect(openPicker).toHaveBeenCalledTimes(3);

      await userEvent.click(screen.getByRole('textbox', { name: /Email/ }));
      await userEvent.click(screen.getByRole('heading', { level: 2 }));
      expect(openPicker).toHaveBeenCalledTimes(3);
    });

    it('keeps clicks inside the form from moving focus to the drop zone', async function keepsFormFocusLocal() {
      const screen = await render(<ProjectInquiryForm />);
      const dropZone = screen.getByRole('region', { name: 'Upload project files' });

      await expect.element(screen.getByRole('button', { name: 'Add files' })).toBeVisible();

      await userEvent.click(screen.getByRole('heading', { level: 2 }));
      expect(document.activeElement).not.toBe(dropZone.element());

      await userEvent.click(dropZone);
      expect(document.activeElement).not.toBe(dropZone.element());
    });

    it('keeps the drag hint between fields and clears it on exit', async function showsDragHint() {
      const screen = await render(<ProjectInquiryForm />);
      const name = screen.getByRole('textbox', { name: /Full name/ });
      const email = screen.getByRole('textbox', { name: /Email/ });
      const hint = screen.getByText('Drop files to upload.', { exact: true });
      const transfer = dragFiles([new File(['brief'], 'brief.pdf', { type: 'application/pdf' })]);

      await userEvent.fill(name, 'Joan');
      await expect.element(hint).not.toBeInTheDocument();
      sendDrag(name.element(), 'dragenter', transfer);
      await expect.element(hint).toBeVisible();

      sendDrag(email.element(), 'dragenter', transfer);
      sendDrag(name.element(), 'dragleave', transfer);
      await expect.element(hint).toBeVisible();
      await expect.element(name).toHaveValue('Joan');

      sendDrag(email.element(), 'dragleave', transfer);
      await expect.element(hint).not.toBeInTheDocument();
      await expect.element(name).toHaveValue('Joan');
      await expect.element(screen.getByRole('button', { name: 'Remove brief.pdf' })).not.toBeInTheDocument();
    });

    it('accepts drops across the form into the same attachment list', async function dropsOnForm() {
      const screen = await render(<ProjectInquiryForm />);
      const targets = [
        screen.getByRole('heading', { level: 2 }),
        screen.getByRole('textbox', { name: /Email/ }),
        screen.getByRole('button', { name: 'Add files', exact: true }),
        screen.getByRole('checkbox')
      ];

      await userEvent.upload(
        fileInput(screen.container),
        new File(['picker'], 'picker.pdf', { type: 'application/pdf' })
      );

      for (const [index, target] of targets.entries()) {
        const filename = `region-${index}.pdf`;
        const transfer = dragFiles([new File(['drop'], filename, { type: 'application/pdf' })]);

        sendDrag(target.element(), 'dragenter', transfer);
        await expect.element(screen.getByText('Drop files to upload.')).toBeVisible();
        sendDrag(target.element(), 'dragover', transfer);
        sendDrag(target.element(), 'drop', transfer);

        await expect.element(screen.getByRole('button', { name: `Remove ${filename}` })).toBeVisible();
        await expect.element(screen.getByText('Drop files to upload.')).not.toBeInTheDocument();
      }

      await expect.element(screen.getByRole('button', { name: 'Remove picker.pdf' })).toBeVisible();
      expect(screen.getByRole('button', { name: /^Remove / }).all()).toHaveLength(5);
    });

    it('merges a picker selection made while a drop is pending', async function mergesPendingDrop() {
      const screen = await render(<ProjectInquiryForm />);
      const target = screen.getByRole('textbox', { name: /Email/ }).element();
      const input = fileInput(screen.container);

      sendDrag(target, 'drop', dragFiles([new File(['drop'], 'dropped.pdf', { type: 'application/pdf' })]));

      selectFiles(input, [new File(['picker'], 'picked.pdf', { type: 'application/pdf' })]);

      await expect.element(screen.getByRole('button', { name: 'Remove dropped.pdf' })).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Remove picked.pdf' })).toBeVisible();
    });

    it('shows a read error and keeps existing attachments when a drop cannot be read', async function handlesDropReadError() {
      const screen = await render(<ProjectInquiryForm />);
      const target = screen.getByRole('textbox', { name: /Email/ }).element();
      const unreadable = new File(['drop'], 'unreadable.pdf', { type: 'application/pdf' });

      await userEvent.upload(
        fileInput(screen.container),
        new File(['existing'], 'existing.pdf', { type: 'application/pdf' })
      );

      const resolve = Promise.resolve.bind(Promise);
      vi.spyOn(Promise, 'resolve').mockImplementation(function rejectUnreadableFile(value) {
        if (value === unreadable) return Promise.reject(new Error('Unable to read file'));
        return resolve(value);
      });

      sendDrag(target, 'drop', dragFiles([unreadable]));

      await expect
        .element(screen.getByRole('alert'))
        .toHaveTextContent('We couldn’t read these files. Please try again.');
      await expect.element(screen.getByRole('button', { name: 'Remove existing.pdf' })).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Remove unreadable.pdf' })).not.toBeInTheDocument();
    });

    it('validates unsupported files after a drop', async function rejectsDragType() {
      const screen = await render(<ProjectInquiryForm />);
      const target = screen.getByRole('textbox', { name: /Email/ }).element();
      const transfer = dragFiles([new File(['notes'], 'notes.txt', { type: 'text/plain' })]);

      sendDrag(target, 'dragenter', transfer);
      await expect.element(screen.getByText('Drop files to upload.')).toBeVisible();
      sendDrag(target, 'dragover', transfer);
      sendDrag(target, 'drop', transfer);
      await expect
        .element(screen.getByRole('alert'))
        .toHaveTextContent('Use PDF, JPG, GIF, or PNG files smaller than 256 MiB.');
      sendDrag(target, 'dragleave', transfer);
      await expect.element(screen.getByRole('button', { name: 'Remove notes.txt' })).not.toBeInTheDocument();
    });

    it('keeps accepted files when a picker selection mixes supported and unsupported files', async function mixedSelection() {
      const screen = await render(<ProjectInquiryForm />);
      const input = fileInput(screen.container);

      selectFiles(input, [
        new File(['brief'], 'brief.pdf', { type: 'application/pdf' }),
        new File(['notes'], 'notes.txt', { type: 'text/plain' })
      ]);

      await expect
        .element(screen.getByRole('alert'))
        .toHaveTextContent('Use PDF, JPG, GIF, or PNG files smaller than 256 MiB.');
      await expect.element(screen.getByRole('button', { name: 'Remove brief.pdf' })).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Remove notes.txt' })).not.toBeInTheDocument();
    });

    it('supports project selection and optional consent', async function changesOptions() {
      const screen = await render(<ProjectInquiryForm />);

      await expect.element(screen.getByRole('button', { name: 'Schedule a Call' })).toBeDisabled();

      const project = screen.getByRole('button', { name: /Project type/ });
      await expect.element(project).toHaveTextContent('Airo App Builder');

      await userEvent.click(project);
      await userEvent.click(screen.getByRole('option', { name: 'GoDaddy Antares' }));
      await expect.element(project).toHaveTextContent('GoDaddy Antares');

      await userEvent.click(project);
      await userEvent.click(screen.getByRole('option', { name: 'None', exact: true }));
      await expect.element(project).toHaveTextContent('None');

      const checkbox = screen.getByRole('checkbox');
      await expect.element(checkbox).not.toBeChecked();
      checkbox.element().focus();
      await userEvent.keyboard(' ');
      await expect.element(checkbox).toBeChecked();
    });

    it('selects and clears the optional due date', async function changesDueDate() {
      const screen = await render(<ProjectInquiryForm />);
      const trigger = screen.getByRole('button', { name: /Calendar/ });

      await userEvent.click(trigger);
      // On narrow viewports the calendar opens in a drawer, which ignores presses until it has slid in.
      await expect.poll(() => document.querySelector('[data-entering]')).toBeNull();
      const month = screen.getByRole('grid').all()[0];
      await userEvent.click(month.getByRole('button', { name: /15, \d{4}$/ }));
      await expect.element(screen.getByRole('button', { name: 'Clear date' })).toBeVisible();
      await expect.element(trigger).not.toHaveTextContent('Select a date');

      await userEvent.click(screen.getByRole('button', { name: 'Clear date' }));
      await expect.element(trigger).toHaveTextContent('Select a date');
      await expect.element(trigger).toHaveFocus();
      await expect.element(screen.getByRole('button', { name: 'Clear date' })).not.toBeInTheDocument();
    });

    it('validates email and confirms locally without a date or consent', async function submits() {
      const screen = await render(<ProjectInquiryForm />);
      const email = screen.getByRole('textbox', { name: /Email/ });
      const submit = screen.getByRole('button', { name: 'Schedule a Call' });

      await userEvent.fill(screen.getByRole('textbox', { name: /Full name/ }), 'Joan');
      await userEvent.fill(email, 'invalid-email');
      await userEvent.fill(screen.getByRole('textbox', { name: /Phone Number/ }), '+1 222 000 3333');
      await userEvent.upload(
        fileInput(screen.container),
        new File(['brief'], 'brief.pdf', { type: 'application/pdf' })
      );

      await userEvent.click(submit);
      expect((email.element() as HTMLInputElement).validity.typeMismatch).toBe(true);
      await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();

      await userEvent.fill(email, 'joan@example.com');
      await userEvent.click(submit);
      await expect
        .element(screen.getByRole('alert'))
        .toHaveTextContent('Demo complete. No information was sent and no call was scheduled.');

      await userEvent.fill(email, 'updated@example.com');
      await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();
    });

    it('adds files, avoids duplicates, and removes attachments', async function managesFiles() {
      const screen = await render(<ProjectInquiryForm />);
      const input = fileInput(screen.container);
      const file = new File(['brief'], 'brief.pdf', {
        type: 'application/pdf',
        lastModified: 1
      });

      for (let selection = 0; selection < 2; selection++) {
        selectFiles(input, [file]);
        await expect.element(screen.getByText('brief.pdf', { exact: true })).toBeVisible();
      }
      await expect.element(screen.getByText('5 B', { exact: true })).toBeVisible();
      expect(screen.getByRole('button', { name: 'Remove brief.pdf' }).all()).toHaveLength(1);

      selectFiles(input, [new File(['second'], 'notes.pdf', { type: 'application/pdf' })]);
      await expect.element(screen.getByText('brief.pdf', { exact: true })).toBeVisible();
      await expect.element(screen.getByText('notes.pdf', { exact: true })).toBeVisible();

      await userEvent.click(screen.getByRole('button', { name: 'Remove brief.pdf' }));
      await expect.element(screen.getByRole('button', { name: 'Remove brief.pdf' })).not.toBeInTheDocument();
      await expect.element(screen.getByText('notes.pdf', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Add files' })).toHaveFocus();
    });

    it('shows the fallback when an image attachment preview fails', async function failedPreview() {
      const screen = await render(<ProjectInquiryForm />);
      vi.spyOn(URL, 'createObjectURL').mockReturnValue('data:image/png;base64,invalid');
      const bytes = Uint8Array.from(
        atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aZ1EAAAAASUVORK5CYII='),
        function toByte(character) {
          return character.charCodeAt(0);
        }
      );

      await userEvent.upload(fileInput(screen.container), new File([bytes], 'photo.png', { type: 'image/png' }));
      await expect.element(screen.getByText('IMG', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('img', { name: '', exact: true })).not.toBeInTheDocument();
    });

    it('rejects files at the size limit', async function rejectsOversizedFile() {
      const screen = await render(<ProjectInquiryForm />);
      const input = fileInput(screen.container);
      const oversized = new File(['small test fixture'], 'large.pdf', {
        type: 'application/pdf'
      });

      Object.defineProperty(oversized, 'size', { value: 256 * 1024 * 1024 });
      selectFiles(input, [oversized]);

      await expect
        .element(screen.getByRole('alert'))
        .toHaveTextContent('Use PDF, JPG, GIF, or PNG files smaller than 256 MiB.');
      await expect.element(screen.getByRole('button', { name: 'Remove large.pdf' })).not.toBeInTheDocument();
    });

    it('previews supported extensions when the MIME type is empty', async function previewsEmptyMimeTypes() {
      const screen = await render(<ProjectInquiryForm />);
      const input = fileInput(screen.container);
      const previewUrl =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aZ1EAAAAASUVORK5CYII=';
      vi.spyOn(URL, 'createObjectURL').mockReturnValue(previewUrl);
      selectFiles(input, [
        new File(['brief'], 'brief.pdf', { type: '' }),
        new File(['image'], 'photo.png', { type: '' })
      ]);

      await expect.element(screen.getByRole('button', { name: 'Remove brief.pdf' })).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Remove photo.png' })).toBeVisible();
      await expect.element(screen.getByText('PDF', { exact: true })).toBeVisible();
      expect(screen.container.querySelector('img')).not.toBeNull();
    });

    it('rejects files over the combined size limit', async function rejectsCombinedSize() {
      const screen = await render(<ProjectInquiryForm />);
      const input = fileInput(screen.container);
      const files = Array.from({ length: 10 }, function createFile(_, index) {
        const file = new File(['brief'], `brief-${index}.pdf`, { type: 'application/pdf' });
        Object.defineProperty(file, 'size', { value: 27 * 1024 * 1024 });
        return file;
      });
      selectFiles(input, files);

      await expect
        .element(screen.getByRole('alert'))
        .toHaveTextContent('Use up to 10 files with a combined size of 256 MiB or less.');
      await expect.element(screen.getByRole('button', { name: 'Remove brief-0.pdf' })).not.toBeInTheDocument();
    });

    it('shows an error when more than ten attachments are selected', async function limitsAttachments() {
      const screen = await render(<ProjectInquiryForm />);
      const input = fileInput(screen.container);
      selectFiles(
        input,
        Array.from({ length: 10 }, function createFile(_, index) {
          return new File(['brief'], `brief-${index}.pdf`, { type: 'application/pdf' });
        })
      );

      await expect.element(screen.getByRole('button', { name: 'Remove brief-0.pdf' })).toBeVisible();

      selectFiles(input, [new File(['brief'], 'brief-10.pdf', { type: 'application/pdf' })]);

      await expect
        .element(screen.getByRole('alert'))
        .toHaveTextContent('Use up to 10 files with a combined size of 256 MiB or less.');

      await userEvent.click(screen.getByRole('button', { name: 'Remove brief-0.pdf' }));
      await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();
    });

    it('disables submission after removing the last attachment', async function requiresAttachment() {
      const screen = await render(<ProjectInquiryForm />);
      const submit = screen.getByRole('button', { name: 'Schedule a Call' });

      await userEvent.fill(screen.getByRole('textbox', { name: /Full name/ }), 'Joan');
      await userEvent.fill(screen.getByRole('textbox', { name: /Email/ }), 'joan@example.com');
      await userEvent.fill(screen.getByRole('textbox', { name: /Phone Number/ }), '+1 222 000 3333');
      await userEvent.upload(
        fileInput(screen.container),
        new File(['brief'], 'brief.pdf', { type: 'application/pdf' })
      );
      await expect.element(submit).toBeEnabled();

      await userEvent.click(screen.getByRole('button', { name: 'Remove brief.pdf' }));
      await expect.element(submit).toBeDisabled();
    });
  });
});
