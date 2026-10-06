import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import { Gallery, type ImageItem } from '../index.tsx';
import { GalleryImage } from '../components/image/index.tsx';

const pixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aZ1EAAAAASUVORK5CYII=';
const samples: ImageItem[] = [
  { id: 'one', name: 'one.png', src: `data:image/png;base64,${pixel}` },
  { id: 'two', name: 'two.png', src: `data:image/png;base64,${pixel}` }
];

function png(name = 'local.png') {
  const bytes = Uint8Array.from(atob(pixel), function byte(value) {
    return value.charCodeAt(0);
  });
  return new File([bytes], name, { type: 'image/png', lastModified: 1 });
}

function input(container: HTMLElement) {
  const element = container.querySelector<HTMLInputElement>('input[type="file"]');
  if (!element) throw new Error('Expected the gallery file picker');
  return element;
}

// Preserve lastModified and synthetic size exactly; Playwright upload serialization may change them.
function selectFiles(container: HTMLElement, files: File[]) {
  const element = input(container);
  Object.defineProperty(element, 'files', { configurable: true, value: files });
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

function transfer(files: File[]) {
  const data = new DataTransfer();
  Object.defineProperty(data, 'effectAllowed', { value: 'copy' });
  for (const file of files) data.items.add(file);
  return data;
}

function drag(element: Element, type: string, dataTransfer: DataTransfer) {
  element.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer }));
}

beforeAll(preloadTestIcons);
beforeEach(function syntheticFileEntries() {
  vi.spyOn(DataTransferItem.prototype, 'webkitGetAsEntry').mockImplementation(function fileEntry() {
    return { isFile: true, isDirectory: false } as FileSystemEntry;
  });
});
afterEach(function restore() {
  vi.restoreAllMocks();
});

describe('@godaddy/antares', function packageTests() {
  describe('#Gallery', function galleryTests() {
    it('shows an active sample gallery and available upload and view controls', async function defaultGallery() {
      const screen = await render(<Gallery />);

      await expect.element(screen.getByText('11 images', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Add files', exact: true })).toBeEnabled();
      await expect.element(screen.getByRole('radio', { name: 'Grid', exact: true })).toBeEnabled();
      await expect.element(screen.getByRole('button', { name: 'Open Photo_2.png' })).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Retry Photo_error.png' })).toBeVisible();
    });

    it('keeps the error card height stable while showing its message', async function stableErrorCard() {
      const longName = 'a-very-long-image-name-that-needs-truncation.png';
      const screen = await render(
        <Gallery
          initialImages={[
            { id: 'ready', name: 'ready.png', src: `data:image/png;base64,${pixel}` },
            {
              id: 'failed',
              name: longName,
              src: `data:image/png;base64,${pixel}`,
              status: 'error',
              errorMessage: `Couldn’t load ${longName}.`
            }
          ]}
        />
      );

      const cards = Array.from(screen.container.querySelectorAll<HTMLElement>('li[data-variant="vertical"]'));
      expect(cards).toHaveLength(2);
      await expect.element(screen.getByRole('button', { name: `Retry ${longName}` })).toBeVisible();
      expect(cards[0].getBoundingClientRect().height).toBe(cards[1].getBoundingClientRect().height);
    });

    it('keeps the error row height stable while showing retry controls', async function stableErrorRow() {
      const screen = await render(
        <Gallery
          defaultView="list"
          initialImages={[
            { id: 'ready', name: 'ready.png', src: `data:image/png;base64,${pixel}` },
            {
              id: 'failed',
              name: 'failed.png',
              src: `data:image/png;base64,${pixel}`,
              status: 'error',
              errorMessage: 'Couldn’t load failed.png.'
            }
          ]}
        />
      );

      const rows = Array.from(screen.container.querySelectorAll<HTMLElement>('li[data-variant="horizontal"]'));
      expect(rows).toHaveLength(2);
      await expect.element(screen.getByRole('button', { name: 'Retry failed.png' })).toBeVisible();
      expect(rows[0].getBoundingClientRect().height).toBe(rows[1].getBoundingClientRect().height);
    });

    it('restores the image size after retrying an error item', async function retryPreservesMetadata() {
      const screen = await render(
        <Gallery
          initialImages={[
            {
              id: 'failed',
              name: 'failed.png',
              src: `data:image/png;base64,${pixel}`,
              size: 5 * 1024 * 1024,
              status: 'error',
              errorMessage: 'Couldn’t load failed.png.'
            }
          ]}
        />
      );

      await userEvent.click(screen.getByRole('button', { name: 'Retry failed.png' }));
      await expect.element(screen.getByRole('button', { name: 'Open failed.png' })).toBeVisible();
      await expect.element(screen.getByText('5 MiB', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('status')).toHaveTextContent('failed.png is retrying.');
      await expect.element(screen.getByRole('status')).not.toHaveTextContent('is ready to view');
    });

    it('formats image sizes with fractional MiB precision', async function fractionalSizes() {
      const screen = await render(
        <Gallery
          initialImages={[
            { id: 'small', name: 'small.png', src: `data:image/png;base64,${pixel}`, size: 100 * 1024 },
            { id: 'fractional', name: 'fractional.png', src: `data:image/png;base64,${pixel}`, size: 1.5 * 1024 * 1024 }
          ]}
        />
      );

      await expect.element(screen.getByText('0.1 MiB', { exact: true })).toBeVisible();
      await expect.element(screen.getByText('1.5 MiB', { exact: true })).toBeVisible();
    });

    it('centers the error icon in grid and list views', async function centeredErrorIcon() {
      const failed: ImageItem = {
        id: 'failed',
        name: 'failed.png',
        src: `data:image/png;base64,${pixel}`,
        status: 'error',
        errorMessage: 'Couldn’t load failed.png.'
      };
      const screen = await render(<Gallery initialImages={[failed]} />);

      function expectCenteredIcon() {
        const surface = screen.container.querySelector<HTMLElement>(
          '[role="img"][aria-label="failed.png failed to upload"]'
        );
        const icon = surface?.querySelector<SVGElement>('svg');
        if (!surface || !icon) throw new Error('Expected the error surface and icon');

        const surfaceRect = surface.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();
        expect(iconRect.x + iconRect.width / 2).toBeCloseTo(surfaceRect.x + surfaceRect.width / 2, 1);
        expect(iconRect.y + iconRect.height / 2).toBeCloseTo(surfaceRect.y + surfaceRect.height / 2, 1);
      }

      expectCenteredIcon();
      await userEvent.click(screen.getByRole('radio', { name: 'List', exact: true }));
      expectCenteredIcon();
    });

    it('shows retry feedback when an image fails to load', async function imageLoadError() {
      const screen = await render(<Gallery initialImages={samples} defaultView="list" />);
      const image = screen.container.querySelector('img');

      if (!image) throw new Error('Expected a gallery image');
      image.dispatchEvent(new Event('error'));

      await expect.element(screen.getByRole('button', { name: 'Retry one.png' })).toBeVisible();
      await expect.element(screen.getByRole('alert')).toHaveTextContent('1 file upload failed.');
    });

    it('switches views without losing the collection and supports keyboard selection', async function views() {
      const screen = await render(<Gallery initialImages={samples} />);
      await expect
        .element(screen.getByRole('radio', { name: 'Grid', exact: true }))
        .toHaveAttribute('aria-checked', 'true');
      const list = screen.getByRole('radio', { name: 'List', exact: true });
      list.element().focus();
      await userEvent.keyboard(' ');
      await expect.element(list).toHaveAttribute('aria-checked', 'true');
      await expect.element(screen.getByText('one.png', { exact: true })).toBeVisible();
      await userEvent.click(screen.getByRole('radio', { name: 'Grid', exact: true }));
      expect(screen.getByRole('button', { name: /^Open / }).all()).toHaveLength(2);
    });

    it('opens the native picker with click, Enter, and Space', async function picker() {
      const screen = await render(<Gallery initialImages={[]} />);
      const click = vi.spyOn(input(screen.container), 'click').mockImplementation(function nativePicker() {
        // Verify activation without opening the operating system dialog.
      });
      const button = screen.getByRole('button', { name: 'Add files', exact: true });
      await userEvent.click(button);
      button.element().focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      expect(click).toHaveBeenCalledTimes(3);
    });

    it('adds local images, skips exact duplicates, and releases removed previews', async function files() {
      const create = vi.spyOn(URL, 'createObjectURL');
      const revoke = vi.spyOn(URL, 'revokeObjectURL');
      const screen = await render(<Gallery initialImages={[]} />);
      const file = png();
      selectFiles(screen.container, [file, file]);
      await expect.element(screen.getByRole('button', { name: 'Open local.png' })).toBeVisible();
      await expect.element(screen.getByRole('status')).toHaveTextContent('1 image added. 1 duplicate skipped.');
      selectFiles(screen.container, [file]);
      await expect.element(screen.getByRole('status')).toHaveTextContent('1 duplicate skipped.');
      expect(screen.getByRole('button', { name: 'Remove local.png' }).all()).toHaveLength(1);
      expect(create).toHaveBeenCalledTimes(1);
      await userEvent.click(screen.getByRole('button', { name: 'Remove local.png' }));
      await expect.element(screen.getByText('Start your gallery')).toBeVisible();
      expect(revoke).toHaveBeenCalledWith(create.mock.results[0].value);
      await expect.element(screen.getByRole('button', { name: 'Add files', exact: true })).toHaveFocus();
      selectFiles(screen.container, [file]);
      await expect.element(screen.getByRole('button', { name: 'Open local.png' })).toBeVisible();
    });

    it('releases only owned URLs on unmount', async function cleanup() {
      const create = vi.spyOn(URL, 'createObjectURL');
      const revoke = vi.spyOn(URL, 'revokeObjectURL');
      const screen = await render(<Gallery initialImages={samples} />);
      selectFiles(screen.container, [png()]);
      await expect.element(screen.getByRole('button', { name: 'Open local.png' })).toBeVisible();
      await screen.unmount();
      expect(revoke).toHaveBeenCalledExactlyOnceWith(create.mock.results[0].value);
    });

    it('keeps valid files in a mixed batch and rejects unsupported types and the size boundary', async function validation() {
      const screen = await render(<Gallery initialImages={[]} />);
      const large = png('large.png');
      Object.defineProperty(large, 'size', { value: 256 * 1024 * 1024 });
      selectFiles(screen.container, [png(), large, new File(['text'], 'notes.txt', { type: 'text/plain' })]);
      await expect.element(screen.getByRole('alert')).toHaveTextContent('smaller than 256 MiB');
      await expect.element(screen.getByRole('button', { name: 'Open local.png' })).toBeVisible();
      expect(screen.getByRole('button', { name: /^Remove / }).all()).toHaveLength(1);
    });

    it('accepts drops on the heading, a card, and empty page space into the same collection', async function drops() {
      const screen = await render(<Gallery initialImages={samples} />);
      const root = screen.container.querySelector('[aria-label="Add files to gallery"]');
      if (!root) throw new Error('Expected gallery DropZone');
      const targets = [
        screen.getByRole('heading', { name: 'Gallery', exact: true }).element(),
        screen.getByRole('button', { name: 'Open one.png' }).element(),
        root
      ];
      for (const [index, target] of targets.entries()) {
        const data = transfer([png(`drop-${index}.png`)]);
        drag(target, 'dragenter', data);
        await expect.element(screen.getByText('Drop Files to upload.')).toBeVisible();
        drag(target, 'dragover', data);
        drag(target, 'drop', data);
        await expect.element(screen.getByRole('button', { name: `Open drop-${index}.png` })).toBeVisible();
        await expect.element(screen.getByText('Drop Files to upload.')).not.toBeInTheDocument();
      }
      expect(screen.getByRole('button', { name: /^Remove / }).all()).toHaveLength(5);
    });

    it('keeps the hint while moving between descendants and clears it on exit', async function hover() {
      const screen = await render(<Gallery initialImages={samples} />);
      const heading = screen.getByRole('heading', { name: 'Gallery', exact: true }).element();
      const card = screen.getByRole('button', { name: 'Open one.png' }).element();
      const data = transfer([png()]);
      drag(heading, 'dragenter', data);
      await expect.element(screen.getByText('Drop Files to upload.')).toBeVisible();
      drag(card, 'dragenter', data);
      drag(heading, 'dragleave', data);
      await expect.element(screen.getByText('Drop Files to upload.')).toBeVisible();
      drag(card, 'dragleave', data);
      await expect.element(screen.getByText('Drop Files to upload.')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Remove / }).all()).toHaveLength(2);
    });

    it('ignores unsupported drags and drops outside the block', async function ignoredDrops() {
      const screen = await render(<Gallery initialImages={[]} />);
      const heading = screen.getByRole('heading', { name: 'Gallery', exact: true }).element();
      const unsupported = transfer([new File(['text'], 'notes.txt', { type: 'text/plain' })]);
      drag(heading, 'dragenter', unsupported);
      await expect.element(screen.getByText('Drop Files to upload.')).not.toBeInTheDocument();
      drag(heading, 'dragleave', unsupported);
      const data = transfer([png()]);
      drag(document.body, 'dragenter', data);
      drag(document.body, 'drop', data);
      await expect.element(screen.getByText('Start your gallery')).toBeVisible();
    });

    it('opens an image, navigates by buttons, keys and thumbnails, then restores focus', async function viewer() {
      const screen = await render(<Gallery initialImages={samples} />);
      const opener = screen.getByRole('button', { name: 'Open one.png' });
      opener.element().focus();
      await userEvent.keyboard('{Enter}');
      const dialog = screen.getByRole('dialog', { name: 'Media gallery' });
      await expect.element(dialog).toBeVisible();
      await expect.element(dialog.getByText('1 of 2', { exact: true })).not.toBeInTheDocument();
      await expect
        .element(dialog.getByRole('button', { name: 'View one.png' }))
        .toHaveAttribute('aria-current', 'true');
      screen.getByRole('button', { name: 'Close gallery' }).element().focus();
      await userEvent.keyboard('{ArrowRight}');
      await expect
        .element(dialog.getByRole('button', { name: 'View two.png' }))
        .toHaveAttribute('aria-current', 'true');
      await userEvent.keyboard('{ArrowLeft}');
      await expect
        .element(dialog.getByRole('button', { name: 'View one.png' }))
        .toHaveAttribute('aria-current', 'true');
      await expect.element(screen.getByRole('button', { name: 'Previous image' })).toBeDisabled();
      await userEvent.click(screen.getByRole('button', { name: 'Next image' }));
      await expect
        .element(dialog.getByRole('button', { name: 'View two.png' }))
        .toHaveAttribute('aria-current', 'true');
      await expect.element(screen.getByRole('button', { name: 'Next image' })).toBeDisabled();
      await userEvent.keyboard('{ArrowLeft}');
      await expect
        .element(dialog.getByRole('button', { name: 'View one.png' }))
        .toHaveAttribute('aria-current', 'true');
      await userEvent.click(screen.getByRole('button', { name: 'View two.png' }));
      await expect
        .element(dialog.getByRole('button', { name: 'View two.png' }))
        .toHaveAttribute('aria-current', 'true');
      await userEvent.keyboard('{Tab}');
      expect(dialog.element().contains(document.activeElement)).toBe(true);
      await userEvent.keyboard('{Escape}');
      await expect.element(dialog).not.toBeInTheDocument();
      await expect.element(opener).toHaveFocus();
      await userEvent.click(opener);
      screen.getByRole('button', { name: 'Close gallery' }).element().focus();
      await userEvent.keyboard('{Escape}');
      await expect.element(dialog).not.toBeInTheDocument();
      await userEvent.click(opener);
      await userEvent.click(screen.getByRole('button', { name: 'Close gallery' }));
      await expect.element(dialog).not.toBeInTheDocument();
    });

    it('closes the viewer when its active image fails', async function closesFailedViewer() {
      const screen = await render(<Gallery initialImages={samples} />);
      await userEvent.click(screen.getByRole('button', { name: 'Open one.png' }));
      await expect.element(screen.getByRole('dialog', { name: 'Media gallery' })).toBeVisible();

      const cardImage = screen.container.querySelector<HTMLImageElement>('img[alt=""]');
      if (!cardImage) throw new Error('Expected the gallery card image');
      cardImage.dispatchEvent(new Event('error'));

      await expect.element(screen.getByRole('dialog', { name: 'Media gallery' })).not.toBeInTheDocument();
      await expect.element(screen.getByRole('button', { name: 'Add files', exact: true })).toBeEnabled();
    });

    it('removes preloaded images and reaches the empty state', async function removeSamples() {
      const screen = await render(<Gallery initialImages={samples} />);
      await userEvent.click(screen.getByRole('button', { name: 'Remove one.png' }));
      await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Remove two.png' }));
      await expect.element(screen.getByText('Start your gallery')).toBeVisible();
    });

    it('recognizes an image that finished loading before handlers attached', async function cachedImage() {
      vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
      vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(1);
      const screen = await render(<GalleryImage image={samples[0]} />);

      await expect.element(screen.getByRole('img', { name: 'one.png' })).toBeVisible();
      await expect.element(screen.getByText('Loading image…')).not.toBeInTheDocument();
      await expect.element(screen.getByRole('button', { name: 'Retry one.png' })).not.toBeInTheDocument();
    });

    it('retries an actual image error and restores the loaded image', async function retry() {
      const screen = await render(<GalleryImage image={samples[0]} />);
      const picture = screen.getByRole('img', { name: 'one.png' });
      await expect.element(picture).toBeVisible();
      picture.element().dispatchEvent(new Event('error'));
      await expect.element(screen.getByText('Couldn’t load one.png.')).toBeVisible();
      await userEvent.click(screen.getByRole('button', { name: 'Retry one.png' }));
      await expect.element(picture).toBeVisible();
      picture.element().dispatchEvent(new Event('load'));
      await expect.element(screen.getByRole('button', { name: 'Retry one.png' })).not.toBeInTheDocument();
    });

    it('provides a fallback name for an interactive image', async function interactiveImageName() {
      const screen = await render(
        <GalleryImage
          image={samples[0]}
          onOpen={function openImage() {
            // The test only verifies the fallback accessible name.
          }}
        />
      );

      await expect.element(screen.getByRole('button', { name: 'View one.png' })).toBeVisible();
    });
  });
});
