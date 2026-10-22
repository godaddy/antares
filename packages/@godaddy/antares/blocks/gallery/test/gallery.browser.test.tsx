import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { cdp, page, userEvent } from 'vitest/browser';
import { I18nProvider as RACI18nProvider } from 'react-aria-components';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import { Gallery, type ImageItem } from '../index.tsx';
import { FileCover, GalleryImage } from '../components/image';

const pixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aZ1EAAAAASUVORK5CYII=';
const samples: ImageItem[] = [
  { id: 'one', name: 'one.png', src: `data:image/png;base64,${pixel}` },
  { id: 'two', name: 'two.png', src: `data:image/png;base64,${pixel}` }
];
const browserSamples: ImageItem[] = [
  ...Array.from({ length: 10 }, function createSample(_, index) {
    return {
      id: `sample-${index}`,
      name: index === 0 ? 'file_name.png' : `Photo_${index + 1}.png`,
      src: `data:image/png;base64,${pixel}`,
      size: (index + 2) * 1024 * 1024
    };
  }),
  {
    id: 'sample-error',
    name: 'Photo_error.png',
    src: `data:image/png;base64,${pixel}`,
    size: 5 * 1024 * 1024,
    status: 'error',
    errorMessage: 'Couldn’t load Photo_error.png.'
  }
];

function png(name = 'local.png') {
  const bytes = Uint8Array.from(atob(pixel), function byte(value) {
    return value.charCodeAt(0);
  });
  return new File([bytes], name, { type: 'image/png', lastModified: 1 });
}

function differentPng(name = 'local.png') {
  const bytes = Uint8Array.from(atob(pixel), function byte(value) {
    return value.charCodeAt(0);
  });
  bytes[bytes.length - 1] ^= 1;
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

function ignoreNativeImageEvent(event: Event) {
  if (event.isTrusted && event.target instanceof HTMLImageElement) event.stopImmediatePropagation();
}

// Control completion explicitly in tests that simulate cached, pending, or failed images.
function controlImageEvents() {
  document.addEventListener('load', ignoreNativeImageEvent, true);
  document.addEventListener('error', ignoreNativeImageEvent, true);
}

beforeAll(preloadTestIcons);
beforeEach(function syntheticFileEntries() {
  vi.spyOn(DataTransferItem.prototype, 'webkitGetAsEntry').mockImplementation(function fileEntry() {
    return { isFile: true, isDirectory: false } as FileSystemEntry;
  });
});
afterEach(function restore() {
  document.removeEventListener('load', ignoreNativeImageEvent, true);
  document.removeEventListener('error', ignoreNativeImageEvent, true);
  vi.restoreAllMocks();
});

describe('@godaddy/antares', function packageTests() {
  describe('#Gallery', function galleryTests() {
    it('shows an active sample gallery and available upload and view controls', async function defaultGallery() {
      const screen = await render(<Gallery initialImages={browserSamples} />);

      await expect.element(screen.getByText('11 images', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Add files', exact: true })).toBeEnabled();
      await expect.element(screen.getByRole('radio', { name: 'Grid', exact: true })).toBeEnabled();
      await expect.element(screen.getByRole('row', { name: 'Open Photo_2.png' })).toBeVisible();
      await expect.element(screen.getByRole('row', { name: 'Retry Photo_error.png' })).toBeVisible();
    });

    it('starts empty when no initial images are provided', async function emptyByDefault() {
      const screen = await render(<Gallery />);

      await expect.element(screen.getByText('0 images', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('region', { name: 'Empty gallery' })).toBeVisible();
    });

    it('restores the image size after retrying an error item', async function retryPreservesMetadata() {
      controlImageEvents();
      const completed = vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
      vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(1);
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

      await userEvent.click(screen.getByRole('row', { name: 'Retry failed.png' }));
      await expect.element(screen.getByText('Loading image…')).toBeVisible();

      const image = screen.container.querySelector<HTMLImageElement>('img');
      if (!image) throw new Error('Expected the retried gallery image');
      completed.mockReturnValue(true);
      image.dispatchEvent(new Event('load'));

      await expect.element(screen.getByRole('row', { name: 'Open failed.png' })).toBeVisible();
      await expect.element(screen.getByText('5 MiB', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('status')).toHaveTextContent('Image is ready to view.');
    });

    it('keeps retry available after repeated image failures', async function repeatedRetry() {
      controlImageEvents();
      vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
      const screen = await render(
        <Gallery
          initialImages={[
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

      await userEvent.click(screen.getByRole('row', { name: 'Retry failed.png' }));
      let image = screen.container.querySelector<HTMLImageElement>('img');
      if (!image) throw new Error('Expected the first retried gallery image');
      image.dispatchEvent(new Event('error'));
      await expect.element(screen.getByRole('row', { name: 'Retry failed.png' })).toBeVisible();

      await userEvent.click(screen.getByRole('row', { name: 'Retry failed.png' }));
      image = screen.container.querySelector<HTMLImageElement>('img');
      if (!image) throw new Error('Expected the second retried gallery image');
      image.dispatchEvent(new Event('error'));
      await expect.element(screen.getByRole('row', { name: 'Retry failed.png' })).toBeVisible();
    });

    it('formats small files and fractional MiB without losing precision', async function fractionalSizes() {
      const screen = await render(
        <Gallery
          initialImages={[
            { id: 'bytes', name: 'bytes.png', src: `data:image/png;base64,${pixel}`, size: 68 },
            { id: 'small', name: 'small.png', src: `data:image/png;base64,${pixel}`, size: 100 * 1024 },
            { id: 'fractional', name: 'fractional.png', src: `data:image/png;base64,${pixel}`, size: 1.5 * 1024 * 1024 }
          ]}
        />
      );

      await expect.element(screen.getByText('68 B', { exact: true })).toBeVisible();
      await expect.element(screen.getByText('100 KiB', { exact: true })).toBeVisible();
      await expect.element(screen.getByText('1.5 MiB', { exact: true })).toBeVisible();
    });

    it('shows retry feedback when an image fails to load', async function imageLoadError() {
      const screen = await render(<Gallery initialImages={samples} defaultView="list" />);
      const image = screen.container.querySelector('img');

      if (!image) throw new Error('Expected a gallery image');
      image.dispatchEvent(new Event('error'));

      await expect.element(screen.getByRole('row', { name: 'Retry one.png' })).toBeVisible();
      await expect.element(screen.getByRole('alert')).toHaveTextContent('1 file needs attention.');
    });

    it('announces grid image failures without relying on the list banner', async function gridImageLoadError() {
      const screen = await render(<Gallery initialImages={samples} />);
      const image = screen.container.querySelector('img');

      if (!image) throw new Error('Expected a gallery image');
      image.dispatchEvent(new Event('error'));

      await expect.element(screen.getByRole('alert')).toHaveTextContent('Couldn’t load one.png.');
      await expect.element(screen.getByRole('row', { name: 'Retry one.png' })).toBeVisible();
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
      expect(screen.getByRole('row', { name: /^Open / }).all()).toHaveLength(2);
    });

    it('shows five list items before revealing the complete collection', async function listPagination() {
      controlImageEvents();
      vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
      const screen = await render(<Gallery initialImages={browserSamples} defaultView="list" />);

      await expect.element(screen.getByText('5 of 11 files', { exact: true })).toBeVisible();
      expect(screen.getByRole('row').all()).toHaveLength(5);
      await expect.element(screen.getByRole('button', { name: 'Show all', exact: true })).toBeVisible();

      screen.getByRole('button', { name: 'Show all', exact: true }).element().focus();
      await userEvent.keyboard('{Enter}');

      await expect.element(screen.getByText('11 of 11 files', { exact: true })).toBeVisible();
      expect(screen.getByRole('row').all()).toHaveLength(11);
      const revealed = screen.getByRole('row', { name: 'Photo_6.png', exact: true }).element();
      await expect.element(revealed).toHaveFocus();
      screen.getByRole('img', { name: 'Photo_6.png', exact: true }).element().dispatchEvent(new Event('load'));
      await expect.element(screen.getByRole('row', { name: 'Open Photo_6.png' })).toBeVisible();
      await expect.element(revealed).toHaveFocus();
      await expect.element(screen.getByRole('button', { name: 'Show all', exact: true })).not.toBeInTheDocument();
    });

    it.each(['grid', 'list'] as const)(
      'navigates rows, opens with Enter and Space, and tabs to Remove in %s view',
      async function collectionKeyboard(view) {
        const screen = await render(<Gallery initialImages={samples} defaultView={view} />);
        const first = screen.getByRole('row', { name: 'Open one.png', exact: true });
        const second = screen.getByRole('row', { name: 'Open two.png', exact: true });
        await expect.element(first).toBeVisible();
        await expect.element(second).toBeVisible();
        const collection = screen.getByRole('grid');
        expect(collection.getByRole('button').all()).toHaveLength(2);
        first.element().focus();
        await userEvent.keyboard(view === 'grid' ? '{ArrowRight}' : '{ArrowDown}');
        await expect.element(second).toHaveFocus();
        await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
        for (const key of ['{Enter}', ' ']) {
          await userEvent.keyboard(key);
          const dialog = screen.getByRole('dialog', { name: 'Media gallery' });
          await expect.element(dialog).toBeVisible();
          await expect.element(dialog.getByRole('status')).toHaveTextContent('two.png');
          await expect.element(dialog.getByRole('row', { name: 'View two.png' })).toHaveFocus();
          await userEvent.keyboard('{ArrowLeft}');
          await expect.element(dialog.getByRole('row', { name: 'View one.png' })).toHaveFocus();
          await expect.element(dialog.getByRole('status')).toHaveTextContent('one.png');
          await userEvent.keyboard('{Escape}');
          await expect.element(second).toHaveFocus();
        }
        await userEvent.keyboard('{Tab}');
        await expect.element(screen.getByRole('button', { name: 'Remove two.png' })).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect.element(second).not.toBeInTheDocument();
        await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
        await expect.element(first).toHaveFocus();
        await userEvent.click(screen.getByText('one.png', { exact: true }));
        await expect.element(screen.getByRole('dialog')).toBeVisible();
      }
    );

    it('preserves the expanded list across layout changes', async function expandedList() {
      const screen = await render(<Gallery initialImages={browserSamples} defaultView="list" />);
      await userEvent.click(screen.getByRole('button', { name: 'Show all', exact: true }));
      await userEvent.click(screen.getByRole('radio', { name: 'Grid', exact: true }));
      await userEvent.click(screen.getByRole('radio', { name: 'List', exact: true }));
      await expect.element(screen.getByRole('button', { name: 'Remove Photo_10.png' })).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Show all', exact: true })).not.toBeInTheDocument();
    });

    it.each([5, 11])(
      'keeps five visible list items when adding to a collection of %i images',
      async function addedFileVisibility(count) {
        const screen = await render(<Gallery initialImages={browserSamples.slice(0, count)} defaultView="list" />);
        const add = screen.getByRole('button', { name: 'Add files', exact: true });
        add.element().focus();
        selectFiles(screen.container, [png('new.png')]);
        await expect.element(screen.getByRole('row', { name: 'Open new.png' })).toBeVisible();
        expect(screen.getByRole('row').all()).toHaveLength(5);
        await expect.element(screen.getByRole('row').all()[0]).toHaveAccessibleName('Open new.png');
        await expect.element(screen.getByText(`5 of ${count + 1} files`, { exact: true })).toBeVisible();
        await expect.element(add).toHaveFocus();
        await expect.element(screen.getByRole('button', { name: 'Show all', exact: true })).toBeVisible();
      }
    );

    it.each(['grid', 'list'] as const)(
      'adds new batches first while preserving their file order in %s view',
      async function uploadOrder(view) {
        const screen = await render(<Gallery initialImages={samples} defaultView={view} />);
        selectFiles(screen.container, [png('first.png'), png('second.png')]);
        await expect.element(screen.getByRole('row', { name: 'Open second.png' })).toBeVisible();
        expect(
          screen
            .getByRole('grid')
            .getByRole('button')
            .all()
            .map((button) => button.element().getAttribute('aria-label'))
        ).toEqual(['Remove first.png', 'Remove second.png', 'Remove one.png', 'Remove two.png']);

        selectFiles(screen.container, [png('first.png'), png('third.png')]);
        await expect.element(screen.getByRole('row', { name: 'Open third.png' })).toBeVisible();
        expect(
          screen
            .getByRole('grid')
            .getByRole('button')
            .all()
            .map((button) => button.element().getAttribute('aria-label'))
        ).toEqual(['Remove third.png', 'Remove first.png', 'Remove second.png', 'Remove one.png', 'Remove two.png']);
      }
    );

    it.each(['grid', 'list'] as const)(
      'preserves picker position, focus, and page scroll while adding images in %s view',
      async function stationaryUploads(view) {
        const pending: Array<(value: ArrayBuffer) => void> = [];
        vi.spyOn(SubtleCrypto.prototype, 'digest').mockImplementation(function deferredHash() {
          return new Promise<ArrayBuffer>((resolve) => pending.push(resolve));
        });
        const screen = await render(<Gallery initialImages={browserSamples} defaultView={view} />);
        const first = screen.getByRole('row', { name: 'Open file_name.png', exact: true });
        const add = screen.getByRole('button', { name: 'Add files', exact: true });
        await expect.element(first).toBeVisible();
        add.element().focus();
        const position = () => ({
          top: add.element().getBoundingClientRect().top,
          left: add.element().getBoundingClientRect().left,
          scroll: document.scrollingElement?.scrollTop
        });
        const before = position();

        for (const [index, name] of ['first.png', 'second.png'].entries()) {
          selectFiles(screen.container, [png(name)]);
          await expect.element(screen.getByRole('progressbar', { name: 'Processing images' })).toBeInTheDocument();
          await expect.poll(() => pending.length).toBe(index + 1);
          expect(position()).toEqual(before);
          pending[index](new ArrayBuffer(32));
          await expect.element(screen.getByRole('button', { name: `Remove ${name}`, exact: true })).toBeInTheDocument();
          await expect.element(screen.getByRole('progressbar')).not.toBeInTheDocument();
          expect(position()).toEqual(before);
          await expect.element(add).toHaveFocus();
        }
      }
    );

    it.each(['grid', 'list'] as const)(
      'shows native upload alerts below the toolbar without stealing focus in %s view',
      async function uploadIssueAlert(view) {
        const screen = await render(<Gallery initialImages={samples} defaultView={view} limits={{ maxFiles: 2 }} />);
        const add = screen.getByRole('button', { name: 'Add files', exact: true });
        const first = screen.getByRole('row', { name: 'Open one.png', exact: true });
        const alert = screen.getByRole('alert');
        await expect.element(first).toBeVisible();
        await expect.element(alert).not.toBeInTheDocument();
        add.element().focus();
        await userEvent.keyboard('{Tab}');
        await expect.element(screen.getByRole('radio', { name: 'List', exact: true })).toHaveFocus();
        add.element().focus();
        selectFiles(screen.container, [
          new File(['text'], 'invalid.txt', { type: 'text/plain' }),
          png('over-limit.png')
        ]);
        await expect.element(alert).toBeVisible();
        await expect.element(alert).toHaveAttribute('data-emphasis', 'critical');
        await expect.element(alert).toHaveAccessibleName('Upload issues');
        expect(add.element().getAttribute('aria-describedby')?.split(' ')).toContain(alert.element().id);
        await expect.element(screen.getByRole('alert')).toHaveTextContent('smaller than 20 MiB');
        await expect.element(screen.getByRole('alert')).toHaveTextContent('Gallery limit reached: 2 images');
        expect(alert.element().getBoundingClientRect().top).toBeGreaterThanOrEqual(
          add.element().getBoundingClientRect().bottom
        );
        expect(alert.element().getBoundingClientRect().bottom).toBeLessThanOrEqual(
          first.element().getBoundingClientRect().top
        );
        await expect.element(add).toHaveFocus();
        await userEvent.keyboard('{Tab}');
        await expect.element(screen.getByRole('radio', { name: 'List', exact: true })).toHaveFocus();
        const close = alert.getByRole('button', { name: 'Dismiss upload issues', exact: true });
        const dismissedId = alert.element().id;
        close.element().focus();
        await userEvent.keyboard('{Enter}');
        await expect.element(alert).not.toBeInTheDocument();
        await expect.element(add).toHaveFocus();
        expect(add.element().getAttribute('aria-describedby')).not.toContain(dismissedId);
        expect(screen.getByRole('button', { name: /^Remove / }).all()).toHaveLength(2);
        selectFiles(screen.container, [new File(['text'], 'invalid-again.txt', { type: 'text/plain' })]);
        await expect.element(alert).toBeVisible();
        await expect.element(alert).toHaveTextContent('smaller than 20 MiB');
        await expect.element(alert).not.toHaveTextContent('Gallery limit reached');
        await userEvent.click(screen.getByRole('button', { name: 'Remove two.png' }));
        selectFiles(screen.container, [png('valid.png')]);
        await expect.element(screen.getByRole('row', { name: 'Open valid.png' })).toBeVisible();
        await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();
        const status = screen.getByRole('status', { name: 'Gallery updates' });
        await expect.element(status).toHaveTextContent('1 image added.');
        expect(status.element().getBoundingClientRect().bottom).toBeLessThanOrEqual(
          first.element().getBoundingClientRect().top
        );
      }
    );

    it.each(['error', 'loading'] as const)(
      'focuses the revealed row when the first revealed file is %s',
      async function revealFile(status) {
        controlImageEvents();
        vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        const screen = await render(
          <Gallery
            defaultView="list"
            initialImages={browserSamples.slice(0, 6).map(function setFirstHiddenState(image, index) {
              return index === 5 ? { ...image, status } : image;
            })}
          />
        );
        screen.getByRole('button', { name: 'Show all', exact: true }).element().focus();
        await userEvent.keyboard('{Enter}');

        await expect.element(screen.getByText('Photo_6.png', { exact: true })).toBeVisible();
        await expect
          .element(screen.getByRole('row', { name: `${status === 'error' ? 'Retry ' : ''}Photo_6.png`, exact: true }))
          .toHaveFocus();
      }
    );

    it.each([
      ['grid', '{Enter}'],
      ['grid', ' '],
      ['list', '{Enter}'],
      ['list', ' ']
    ] as const)(
      'keeps focus in the file while retrying with %s / %s and after completion',
      async function retryFocus(view, key) {
        controlImageEvents();
        const completed = vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(1);
        const screen = await render(
          <Gallery defaultView={view} initialImages={[{ ...samples[0], status: 'error' }]} />
        );
        const row = screen.getByRole('row', { name: 'Retry one.png' }).element();
        row.focus();
        await userEvent.keyboard(key);

        await expect.element(row).toHaveFocus();
        await expect.element(screen.getByText('Loading image…')).toBeVisible();
        await expect.element(screen.getByRole('row', { name: 'Open one.png' })).not.toBeInTheDocument();
        const picture = screen.getByRole('img', { name: 'one.png' });
        completed.mockReturnValue(true);
        picture.element().dispatchEvent(new Event('load'));

        await expect.element(screen.getByRole('row', { name: 'Open one.png' })).toBeVisible();
        await expect.element(row).toHaveFocus();
        await expect.element(screen.getByText('Loading image…')).not.toBeInTheDocument();
      }
    );

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

    it('adds images, skips exact duplicates, and allows a removed image to be added again', async function files() {
      const screen = await render(<Gallery initialImages={[]} />);
      const file = png();
      selectFiles(screen.container, [file, file]);
      await expect.element(screen.getByRole('row', { name: 'Open local.png' })).toBeVisible();
      await expect.element(screen.getByRole('status')).toHaveTextContent('1 image added. 1 duplicate skipped.');
      selectFiles(screen.container, [file]);
      await expect.element(screen.getByRole('status')).toHaveTextContent('1 duplicate skipped.');
      expect(screen.getByRole('button', { name: 'Remove local.png' }).all()).toHaveLength(1);
      await userEvent.click(screen.getByRole('button', { name: 'Remove local.png' }));
      await expect.element(screen.getByText('Start your gallery')).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Add files', exact: true })).toHaveFocus();
      selectFiles(screen.container, [file]);
      await expect.element(screen.getByRole('row', { name: 'Open local.png' })).toBeVisible();
    });

    it('preserves images from overlapping selections and skips their duplicates', async function overlappingSelections() {
      const screen = await render(<Gallery />);
      const first = png('first.png');
      selectFiles(screen.container, [first, png('second.png')]);
      selectFiles(screen.container, [first, png('third.png')]);

      await expect.element(screen.getByText('3 images', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('status')).toHaveTextContent('1 image added. 1 duplicate skipped.');
      for (const name of ['first.png', 'second.png', 'third.png']) {
        await expect.element(screen.getByRole('row', { name: `Open ${name}` })).toBeVisible();
      }
    });

    it('keeps distinct files with matching metadata', async function metadataCollision() {
      const screen = await render(<Gallery initialImages={[]} />);
      selectFiles(screen.container, [png(), differentPng()]);

      await expect.element(screen.getByText('2 images', { exact: true })).toBeVisible();
      expect(screen.getByRole('button', { name: 'Remove local.png' }).all()).toHaveLength(2);
    });

    it('keeps uploads usable when content hashing is unavailable', async function unavailableHashing() {
      vi.spyOn(SubtleCrypto.prototype, 'digest').mockRejectedValue(new Error('Hash unavailable'));
      const screen = await render(<Gallery />);
      selectFiles(screen.container, [png()]);

      await expect.element(screen.getByRole('row', { name: 'Open local.png' })).toBeVisible();
      await expect.element(screen.getByRole('status')).toHaveTextContent('1 image added.');
    });

    it('reports a local URL failure and accepts the next selection', async function ingestionFailure() {
      vi.spyOn(URL, 'createObjectURL').mockImplementationOnce(function unavailableUrl() {
        throw new Error('Local URL unavailable');
      });
      const screen = await render(<Gallery />);
      selectFiles(screen.container, [png()]);
      await expect.element(screen.getByRole('alert')).toHaveTextContent('We couldn’t read some images.');
      selectFiles(screen.container, [png()]);
      await expect.element(screen.getByRole('row', { name: 'Open local.png' })).toBeVisible();
      await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();
    });

    it('releases only owned object URLs on removal and unmount', async function urlOwnership() {
      const revoke = vi.spyOn(URL, 'revokeObjectURL');
      const screen = await render(<Gallery initialImages={samples} />);
      selectFiles(screen.container, [png('first.png'), png('second.png')]);
      await expect.element(screen.getByText('4 images', { exact: true })).toBeVisible();
      const localUrls = Array.from(screen.container.querySelectorAll('img'))
        .map(function source(image) {
          return image.src;
        })
        .filter(function owned(src) {
          return src.startsWith('blob:');
        });

      await userEvent.click(screen.getByRole('button', { name: 'Remove one.png' }));
      expect(revoke).not.toHaveBeenCalled();
      await userEvent.click(screen.getByRole('button', { name: 'Remove first.png' }));
      expect(revoke).toHaveBeenCalledExactlyOnceWith(localUrls[0]);
      await screen.unmount();
      expect(revoke).toHaveBeenCalledTimes(2);
      expect(revoke).toHaveBeenLastCalledWith(localUrls[1]);
    });

    it('discards pending files when unmounted during hashing', async function pendingUnmount() {
      let finishHash!: (value: ArrayBuffer) => void;
      const digest = vi.spyOn(SubtleCrypto.prototype, 'digest').mockImplementation(function pendingHash() {
        return new Promise<ArrayBuffer>(function waitForHash(resolve) {
          finishHash = resolve;
        });
      });
      const createUrl = vi.spyOn(URL, 'createObjectURL');
      const screen = await render(<Gallery />);
      selectFiles(screen.container, [png()]);
      await expect
        .poll(function hashingStarted() {
          return digest.mock.calls.length;
        })
        .toBe(1);
      await screen.unmount();
      finishHash(new ArrayBuffer(32));
      await Promise.resolve();
      expect(createUrl).not.toHaveBeenCalled();
    });

    it('treats a cancelled picker as a no-op', async function cancelledSelection() {
      const screen = await render(<Gallery />);
      selectFiles(screen.container, []);
      await expect.element(screen.getByRole('region', { name: 'Empty gallery' })).toBeVisible();
      await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();
      await expect.element(screen.getByRole('status')).toBeEmptyDOMElement();
    });

    it('keeps valid files in a mixed batch and rejects unsupported types and the size boundary', async function validation() {
      const screen = await render(<Gallery initialImages={[]} />);
      const large = png('large.png');
      Object.defineProperty(large, 'size', { value: 20 * 1024 * 1024 });
      selectFiles(screen.container, [png(), large, new File(['text'], 'notes.txt', { type: 'text/plain' })]);
      await expect.element(screen.getByRole('alert')).toHaveTextContent('smaller than 20 MiB');
      await expect.element(screen.getByRole('row', { name: 'Open local.png' })).toBeVisible();
      expect(screen.getByRole('button', { name: /^Remove / }).all()).toHaveLength(1);
    });

    it('accepts drops on cards and space within the image collection', async function drops() {
      const screen = await render(<Gallery initialImages={samples} />);
      const root = screen.getByRole('region', { name: 'Grid view' }).element();
      const targets = [
        screen.getByRole('img', { name: 'one.png', exact: true }).element(),
        screen.getByRole('row', { name: 'Open one.png' }).element(),
        root
      ];
      for (const [index, target] of targets.entries()) {
        const data = transfer([png(`drop-${index}.png`)]);
        drag(target, 'dragenter', data);
        await expect.element(screen.getByText('Drop files to upload.')).toBeVisible();
        drag(target, 'dragover', data);
        drag(target, 'drop', data);
        await expect.element(screen.getByRole('row', { name: `Open drop-${index}.png` })).toBeVisible();
        await expect.element(screen.getByText('Drop files to upload.')).not.toBeInTheDocument();
      }
      expect(screen.getByRole('button', { name: /^Remove / }).all()).toHaveLength(5);
    });

    it('keeps the hint while moving between descendants and clears it on exit', async function hover() {
      const screen = await render(<Gallery initialImages={samples} />);
      const secondCard = screen.getByRole('row', { name: 'Open two.png' }).element();
      const card = screen.getByRole('row', { name: 'Open one.png' }).element();
      const data = transfer([png()]);
      drag(secondCard, 'dragenter', data);
      await expect.element(screen.getByText('Drop files to upload.')).toBeVisible();
      drag(card, 'dragenter', data);
      drag(secondCard, 'dragleave', data);
      await expect.element(screen.getByText('Drop files to upload.')).toBeVisible();
      drag(card, 'dragleave', data);
      await expect.element(screen.getByText('Drop files to upload.')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Remove / }).all()).toHaveLength(2);
    });

    it('ignores unsupported drags and drops outside the block', async function ignoredDrops() {
      const screen = await render(<Gallery initialImages={[]} />);
      const heading = screen.getByRole('heading', { name: 'Gallery', exact: true }).element();
      const unsupported = transfer([new File(['text'], 'notes.txt', { type: 'text/plain' })]);
      drag(heading, 'dragenter', unsupported);
      await expect.element(screen.getByText('Drop files to upload.')).not.toBeInTheDocument();
      drag(heading, 'dragleave', unsupported);
      const data = transfer([png()]);
      drag(document.body, 'dragenter', data);
      drag(document.body, 'drop', data);
      await expect.element(screen.getByText('Start your gallery')).toBeVisible();
    });

    it.each(['grid', 'list'] as const)(
      'limits the drop feedback and target to the image area in %s view',
      async function collectionDropTarget(view) {
        const screen = await render(<Gallery initialImages={samples} defaultView={view} />);
        const toolbar = screen.getByRole('heading', { name: 'Gallery', exact: true }).element();
        const picker = screen.getByRole('button', { name: 'Add files', exact: true }).element();
        const collection = screen.getByRole('region', { name: view === 'list' ? 'List view' : 'Grid view' }).element();
        const data = transfer([png()]);
        for (const target of [toolbar, picker]) {
          drag(target, 'dragenter', data);
          drag(target, 'dragover', data);
          await expect.element(screen.getByText('Drop files to upload.')).not.toBeInTheDocument();
          drag(target, 'drop', data);
          drag(target, 'dragleave', data);
        }
        expect(screen.getByRole('button', { name: /^Remove / }).all()).toHaveLength(2);
        drag(collection, 'dragenter', data);
        const overlayText = screen.getByText('Drop files to upload.');
        await expect.element(overlayText).toBeVisible();
        const overlay = overlayText.element().parentElement!;
        const area = collection.getBoundingClientRect();
        const feedback = overlay.getBoundingClientRect();
        expect([feedback.x, feedback.y, feedback.width, feedback.height]).toEqual([
          area.x,
          area.y,
          area.width,
          area.height
        ]);
        expect(feedback.top).toBeGreaterThanOrEqual(picker.getBoundingClientRect().bottom);
        drag(collection, 'dragleave', data);
        await expect.element(overlayText).not.toBeInTheDocument();
      }
    );

    it('accepts drops into an empty gallery and restores the upload hint', async function emptyDrop() {
      const screen = await render(<Gallery />);
      const empty = screen.getByRole('region', { name: 'Empty gallery' });
      const data = transfer([png()]);
      drag(empty.element(), 'dragenter', data);
      await expect.element(screen.getByText('Drop files to upload.', { exact: true })).toBeVisible();
      await expect.element(screen.getByText('or drag images into the gallery below.')).not.toBeInTheDocument();
      drag(empty.element(), 'dragover', data);
      drag(empty.element(), 'drop', data);

      await expect.element(empty).not.toBeInTheDocument();
      await expect.element(screen.getByRole('row', { name: 'Open local.png' })).toBeVisible();
      await expect.element(screen.getByText('1 image', { exact: true })).toBeVisible();
      await expect.element(screen.getByText('Drop files to upload.')).not.toBeInTheDocument();
      await expect.element(screen.getByText('or drag images into the gallery below.')).toBeVisible();
    });

    it('ignores drops while the media viewer is open and accepts them after closing', async function modalDrop() {
      const screen = await render(<Gallery initialImages={samples} />);
      const region = screen.getByRole('region', { name: 'Grid view' }).element();
      await userEvent.click(screen.getByRole('row', { name: 'Open one.png' }));
      const data = transfer([png()]);
      drag(region, 'dragenter', data);
      drag(region, 'dragover', data);
      drag(region, 'drop', data);
      await expect.element(screen.getByText('Drop files to upload.')).not.toBeInTheDocument();
      await userEvent.keyboard('{Escape}');
      await expect.element(screen.getByText('2 images', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('row', { name: 'Open local.png' })).not.toBeInTheDocument();

      drag(region, 'dragenter', data);
      await expect.element(screen.getByText('Drop files to upload.')).toBeVisible();
      drag(region, 'dragover', data);
      drag(region, 'drop', data);
      await expect.element(screen.getByRole('row', { name: 'Open local.png' })).toBeVisible();
    });

    it('opens an image, navigates by buttons, keys and thumbnails, then restores focus', async function viewer() {
      const screen = await render(<Gallery initialImages={samples} />);
      const opener = screen.getByRole('row', { name: 'Open one.png' });
      opener.element().focus();
      await userEvent.keyboard('{Enter}');
      const dialog = screen.getByRole('dialog', { name: 'Media gallery' });
      await expect.element(dialog).toBeVisible();
      await expect.element(dialog.getByRole('row', { name: 'View one.png' })).toHaveAttribute('aria-selected', 'true');
      screen.getByRole('button', { name: 'Close gallery' }).element().focus();
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(dialog.getByRole('row', { name: 'View two.png' })).toHaveAttribute('aria-selected', 'true');
      await expect.element(dialog.getByRole('status')).toHaveTextContent('two.png');
      await userEvent.keyboard('{ArrowLeft}');
      await expect.element(dialog.getByRole('row', { name: 'View one.png' })).toHaveAttribute('aria-selected', 'true');
      await expect.element(screen.getByRole('button', { name: 'Previous image' })).toBeDisabled();
      await userEvent.click(screen.getByRole('button', { name: 'Next image' }));
      await expect.element(dialog.getByRole('row', { name: 'View two.png' })).toHaveAttribute('aria-selected', 'true');
      await expect.element(screen.getByRole('button', { name: 'Next image' })).toBeDisabled();
      await userEvent.click(screen.getByRole('button', { name: 'Previous image' }));
      await expect.element(dialog.getByRole('status')).toHaveTextContent('one.png');
      await userEvent.click(screen.getByRole('button', { name: 'Next image' }));
      await userEvent.keyboard('{ArrowLeft}');
      await expect.element(dialog.getByRole('row', { name: 'View one.png' })).toHaveAttribute('aria-selected', 'true');
      await userEvent.click(screen.getByRole('row', { name: 'View two.png' }));
      await expect.element(dialog.getByRole('row', { name: 'View two.png' })).toHaveAttribute('aria-selected', 'true');
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

    it.each(['grid', 'list'] as const)(
      'opens only loaded covers and restores keyboard focus in %s view',
      async function loadedCover(view) {
        controlImageEvents();
        vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        const screen = await render(<Gallery initialImages={[samples[0]]} defaultView={view} />);
        const opener = screen.getByRole('row', { name: 'Open one.png' });
        await expect.element(opener).not.toBeInTheDocument();
        screen.getByRole('row', { name: 'one.png', exact: true }).element().focus();
        await userEvent.keyboard('{Enter} ');
        await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
        screen.getByRole('img', { name: 'one.png', exact: true }).element().dispatchEvent(new Event('load'));

        await expect.element(opener).toBeVisible();
        opener.element().focus();
        await userEvent.keyboard('{Enter}');
        const dialog = screen.getByRole('dialog', { name: 'Media gallery' });
        await expect.element(dialog).toBeVisible();
        dialog.getByRole('img', { name: 'one.png', exact: true }).element().dispatchEvent(new Event('error'));
        await expect.element(dialog.getByRole('button', { name: 'Retry one.png' })).toBeVisible();
        await expect.element(dialog).toBeVisible();
        await userEvent.keyboard('{Escape}');
        await expect.element(dialog).not.toBeInTheDocument();
        await expect.element(opener).toHaveFocus();
      }
    );

    it('keeps the modal and controls stationary while slides and loading states change', async function stableViewerGeometry() {
      controlImageEvents();
      vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
      const images = browserSamples.slice(0, 10).map((image, index) => ({
        ...image,
        name: index === 1 ? 'long-filename-'.repeat(12) + '.png' : image.name,
        width: index % 2 === 0 ? 960 : 320,
        height: index % 2 === 0 ? 320 : 960
      }));
      const screen = await render(<Gallery initialImages={images} />);
      screen.getByRole('img', { name: 'file_name.png', exact: true }).element().dispatchEvent(new Event('load'));
      await userEvent.click(screen.getByRole('row', { name: 'Open file_name.png' }));
      const dialog = screen.getByRole('dialog', { name: 'Media gallery' });
      const next = dialog.getByRole('button', { name: 'Next image' });
      await expect.poll(() => dialog.element().closest('[data-entering]')).toBeNull();
      await expect.poll(() => getComputedStyle(dialog.element().parentElement!).transform).toBe('none');
      const initialDialog = dialog.element().getBoundingClientRect();
      const initialNext = next.element().getBoundingClientRect();
      const initialScroll = document.scrollingElement?.scrollTop;
      for (const name of [images[1].name, images[2].name]) {
        await userEvent.click(next);
        const picture = dialog.getByRole('img', { name, exact: true });
        for (const state of ['loading', 'ready']) {
          if (state === 'ready') picture.element().dispatchEvent(new Event('load'));
          await expect.poll(() => dialog.element().getBoundingClientRect().width).toBeCloseTo(initialDialog.width, 0);
          await expect.poll(() => dialog.element().getBoundingClientRect().top).toBeCloseTo(initialDialog.top, 0);
          await expect.poll(() => next.element().getBoundingClientRect().top).toBeCloseTo(initialNext.top, 0);
        }
      }
      await userEvent.click(dialog.getByRole('row', { name: 'View Photo_10.png' }));
      await expect.element(dialog.getByRole('status')).toHaveTextContent('10 of 10');
      expect(document.scrollingElement?.scrollTop).toBe(initialScroll);
      await expect.poll(() => dialog.element().getBoundingClientRect().top).toBeCloseTo(initialDialog.top, 0);
    });

    it('keeps focus on a stable viewer control during retry and completion', async function viewerRetryFocus() {
      controlImageEvents();
      vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
      const screen = await render(<Gallery initialImages={samples} />);
      screen.getByRole('img', { name: 'one.png', exact: true }).element().dispatchEvent(new Event('load'));
      await userEvent.click(screen.getByRole('row', { name: 'Open one.png' }));
      const dialog = screen.getByRole('dialog', { name: 'Media gallery' });
      dialog.getByRole('img', { name: 'one.png', exact: true }).element().dispatchEvent(new Event('error'));
      const retry = dialog.getByRole('button', { name: 'Retry one.png' });
      await userEvent.click(retry);
      const thumbnail = dialog.getByRole('row', { name: 'View one.png' });
      await expect.element(thumbnail).toHaveFocus();
      dialog.getByRole('img', { name: 'one.png', exact: true }).element().dispatchEvent(new Event('load'));
      await expect.element(thumbnail).toHaveFocus();
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(dialog.getByRole('row', { name: 'View two.png' })).toHaveFocus();
      await expect.element(dialog.getByRole('status')).toHaveTextContent('two.png');
      await userEvent.keyboard('{Escape}');
      await expect.element(screen.getByRole('row', { name: 'Open one.png' })).toHaveFocus();
    });

    it.each(['grid', 'list'] as const)(
      'keeps a pending cover failure out of the viewer in %s view',
      async function pendingCoverFailure(view) {
        controlImageEvents();
        vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        const screen = await render(<Gallery initialImages={[samples[0]]} defaultView={view} />);
        const remove = screen.getByRole('button', { name: 'Remove one.png' });
        remove.element().focus();
        screen.getByRole('img', { name: 'one.png', exact: true }).element().dispatchEvent(new Event('error'));

        await expect.element(screen.getByRole('row', { name: 'Retry one.png' })).toBeVisible();
        await expect.element(screen.getByRole('row', { name: 'Open one.png' })).not.toBeInTheDocument();
        await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
        await expect.element(remove).toHaveFocus();
      }
    );

    it.each(['grid', 'list'] as const)(
      'restores the loaded opener when another active cover fails in %s view',
      async function navigatedCoverFailure(view) {
        controlImageEvents();
        vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        const screen = await render(<Gallery initialImages={samples} defaultView={view} />);
        screen.getByRole('img', { name: 'one.png', exact: true }).element().dispatchEvent(new Event('load'));
        const opener = screen.getByRole('row', { name: 'Open one.png' });
        await userEvent.click(opener);
        await userEvent.click(screen.getByRole('button', { name: 'Next image' }));
        const pendingCover = screen.container.querySelector<HTMLImageElement>('[data-key="two"] img');
        if (!pendingCover) throw new Error('Expected the pending gallery cover');
        pendingCover.dispatchEvent(new Event('error'));

        await expect.element(screen.getByRole('dialog', { name: 'Media gallery' })).not.toBeInTheDocument();
        await expect.element(opener).toHaveFocus();
      }
    );

    it.each(['grid', 'list'] as const)(
      'restores the same row after its viewer cover fails in %s view',
      async function failedOpener(view) {
        controlImageEvents();
        vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        const screen = await render(<Gallery initialImages={[samples[0]]} defaultView={view} />);
        screen.getByRole('img', { name: 'one.png', exact: true }).element().dispatchEvent(new Event('load'));
        const opener = screen.getByRole('row', { name: 'Open one.png' });
        await expect.element(opener).toBeVisible();
        const openerElement = opener.element();
        opener.element().focus();
        await userEvent.keyboard('{Enter}');
        await expect.element(screen.getByRole('dialog')).toBeVisible();
        const cover = screen.container.querySelector<HTMLImageElement>('[data-key="one"] img');
        if (!cover) throw new Error('Expected the cover that opened the viewer');
        cover.dispatchEvent(new Event('error'));
        await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
        const retryCover = screen.getByRole('row', { name: 'Retry one.png' });
        expect(retryCover.element()).toBe(openerElement);
        await expect.element(retryCover).toHaveFocus();
        await expect.element(screen.getByRole('row', { name: 'Retry one.png' })).toBeVisible();
      }
    );

    it('removes preloaded images and reaches the empty state', async function removeSamples() {
      const screen = await render(<Gallery initialImages={samples} />);
      await userEvent.click(screen.getByRole('button', { name: 'Remove one.png' }));
      await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Remove two.png' }));
      await expect.element(screen.getByText('Start your gallery')).toBeVisible();
    });

    it('disables both navigation boundaries for a single viewable image', async function singleImage() {
      const screen = await render(<Gallery initialImages={[samples[0], { ...samples[1], status: 'error' }]} />);
      await userEvent.click(screen.getByRole('row', { name: 'Open one.png' }));
      const dialog = screen.getByRole('dialog');
      await expect.element(dialog.getByRole('button', { name: 'Previous image' })).toBeDisabled();
      await expect.element(dialog.getByRole('button', { name: 'Next image' })).toBeDisabled();
      expect(dialog.getByRole('row', { name: /^View / }).all()).toHaveLength(1);
      await userEvent.keyboard('{Escape}');
      await expect.element(screen.getByRole('row', { name: 'Open one.png' })).toHaveFocus();
    });

    it.each(['grid', 'list'] as const)(
      'fits a narrow host and preserves long filename actions in %s view',
      async function narrowHost(view) {
        await page.viewport(1280, 800);
        const name = 'long-filename-'.repeat(12) + '.png';
        const screen = await render(
          <div style={{ width: 320 }}>
            <Gallery defaultView={view} initialImages={[{ ...samples[0], name }]} />
          </div>
        );
        await userEvent.click(screen.getByRole('row', { name: 'Open ' + name }));
        await expect.element(screen.getByRole('dialog')).toBeVisible();
        await userEvent.keyboard('{Escape}');
        await userEvent.click(screen.getByRole('button', { name: 'Remove ' + name }));
        await expect.element(screen.getByRole('region', { name: 'Empty gallery' })).toBeVisible();
      }
    );

    it.each([
      [320, 568, '100%'],
      [320, 568, '200%'],
      [568, 320, '100%']
    ] as const)(
      'fits the viewer in a %s by %s viewport with %s text',
      async function mobileViewer(width, height, fontSize) {
        const originalFontSize = document.documentElement.style.fontSize;
        try {
          await page.viewport(width, height);
          document.documentElement.style.fontSize = fontSize;
          const screen = await render(<Gallery initialImages={browserSamples.slice(0, 4)} />);
          await expect.poll(() => document.documentElement.scrollWidth).toBeLessThanOrEqual(width);
          await userEvent.click(screen.getByRole('row', { name: 'Open file_name.png' }));
          const dialog = screen.getByRole('dialog', { name: 'Media gallery' });
          await expect.element(dialog).toBeVisible();
          const bounds = dialog.element().getBoundingClientRect();
          expect(bounds.left).toBeGreaterThanOrEqual(0);
          expect(bounds.right).toBeLessThanOrEqual(width);
          expect(bounds.top).toBeGreaterThanOrEqual(0);
          expect(bounds.bottom).toBeLessThanOrEqual(height);
          await expect.poll(() => dialog.element().scrollWidth - dialog.element().clientWidth).toBeLessThanOrEqual(1);
          await userEvent.click(dialog.getByRole('button', { name: 'Next image' }));
          await expect.element(dialog.getByRole('status')).toHaveTextContent('2 of 4');
          await userEvent.keyboard('{Escape}');
          await expect.element(screen.getByRole('row', { name: 'Open file_name.png' })).toHaveFocus();
        } finally {
          document.documentElement.style.fontSize = originalFontSize;
          await page.viewport(1280, 800);
        }
      }
    );

    it('uses regional formatting and translated labels in the collection and portaled viewer', async function translatedGallery() {
      const screen = await render(
        <Gallery
          locale="es-CO"
          initialImages={[{ ...samples[0], size: 1.5 * 1024 * 1024 }]}
          messages={{
            gallery: 'Galería',
            addFiles: 'Añadir archivos',
            mediaGallery: 'Visor de imágenes',
            openImage: (name) => `Abrir ${name}`,
            viewImage: (name) => `Ver ${name}`,
            removeImage: (name) => `Eliminar ${name}`,
            removedImage: (name) => `${name} eliminado.`,
            imagePosition: (name, current, total) => `${name} · ${current} de ${total}`
          }}
        />
      );
      await expect.element(screen.getByRole('heading', { name: 'Galería' })).toBeVisible();
      await expect.element(screen.getByText('1,5 MiB', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Añadir archivos' })).toBeVisible();
      await userEvent.click(screen.getByRole('row', { name: 'Abrir one.png' }));
      const dialog = screen.getByRole('dialog', { name: 'Visor de imágenes' });
      await expect.element(dialog).toHaveAttribute('lang', 'es-CO');
      await expect.element(dialog.getByRole('row', { name: 'Ver one.png' })).toBeVisible();
      await expect.element(dialog.getByRole('status')).toHaveTextContent('1 de 1');
      await userEvent.keyboard('{Escape}');
      await userEvent.click(screen.getByRole('button', { name: 'Eliminar one.png' }));
      await expect.element(screen.getByRole('status')).toHaveTextContent('one.png eliminado.');
    });

    it('matches the inquiry form drop background and preserves the theme text color', async function themedDropOverlay() {
      const screen = await render(<Gallery />);
      screen.container.style.setProperty('--color-surface-background-base', 'rgb(17, 17, 17)');
      screen.container.style.setProperty('--color-surface-text-base', 'rgb(255, 255, 255)');
      const target = screen.getByRole('region', { name: 'Grid view' }).element();
      drag(target, 'dragenter', transfer([png()]));
      await expect.element(screen.getByText('Drop files to upload.')).toBeVisible();
      const message = screen.getByText('Drop files to upload.').element();
      const overlay = message.parentElement;
      if (!overlay) throw new Error('Expected the drop overlay');
      await expect.poll(() => getComputedStyle(overlay).backgroundColor).toBe('rgba(216, 239, 239, 0.9)');
      expect(getComputedStyle(overlay).color).toBe('rgb(255, 255, 255)');
    });

    it.each(['horizontal', 'vertical'] as const)(
      'preserves %s cover geometry while the placeholder loads, succeeds, or fails',
      async function coverPlaceholder(variant) {
        controlImageEvents();
        vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        const screen = await render(<FileCover image={samples[0]} variant={variant} />);
        const image = screen.getByRole('img', { name: 'one.png', exact: true });
        const bounds = function coverBounds() {
          const { width, height } = screen.container.firstElementChild!.getBoundingClientRect();
          return [width, height];
        };
        const before = bounds();
        await expect.element(image).toHaveAttribute('aria-busy', 'true');
        const placeholder = image.element().parentElement!.querySelector<HTMLElement>('[aria-hidden="true"]')!;
        await expect.element(placeholder).toBeVisible();
        image.element().dispatchEvent(new Event('load'));
        await expect.element(image).not.toHaveAttribute('aria-busy');
        await expect.element(placeholder).not.toBeInTheDocument();
        expect(bounds()).toEqual(before);
        image.element().dispatchEvent(new Event('error'));
        await expect.element(screen.getByRole('img', { name: 'one.png: File needs attention.' })).toBeVisible();
        expect(bounds()).toEqual(before);
      }
    );

    it.each(['viewer', 'thumbnail'] as const)(
      'replaces the %s placeholder with the loaded image without resizing',
      async function viewerPlaceholder(variant) {
        controlImageEvents();
        vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        const screen = await render(<GalleryImage image={samples[0]} variant={variant} />);
        const image = screen.container.querySelector('img')!;
        const before = image.getBoundingClientRect();
        expect(image.getAttribute('aria-busy')).toBe('true');
        const placeholder = image.parentElement!.querySelector<HTMLElement>('[aria-hidden="true"]')!;
        await expect.element(placeholder).toBeVisible();
        image.dispatchEvent(new Event('load'));
        await expect.poll(() => image.hasAttribute('aria-busy')).toBe(false);
        const after = image.getBoundingClientRect();
        expect([after.width, after.height]).toEqual([before.width, before.height]);
        await expect.element(placeholder).not.toBeInTheDocument();
      }
    );

    it('shows an already completed image without a loading state', async function cachedImage() {
      controlImageEvents();
      vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
      vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(1);
      const screen = await render(<GalleryImage image={samples[0]} />);

      await expect.element(screen.getByRole('img', { name: 'one.png' })).toBeVisible();
      await expect.element(screen.getByText('Loading image…')).not.toBeInTheDocument();
      await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();
    });

    it('clears the loading state for cached source changes and retries', async function cachedSourceChange() {
      controlImageEvents();
      const completed = vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
      vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(1);
      const screen = await render(<GalleryImage image={samples[0]} />);
      await expect.element(screen.getByText('Loading image…')).not.toBeInTheDocument();

      completed.mockReturnValue(false);
      await screen.rerender(<GalleryImage image={{ ...samples[0], src: `${samples[0].src}#new` }} />);
      await expect.element(screen.getByText('Loading image…')).toBeVisible();
      screen.getByRole('img', { name: 'one.png' }).element().dispatchEvent(new Event('error'));
      await expect.element(screen.getByRole('button', { name: 'Retry one.png' })).toBeVisible();

      completed.mockReturnValue(true);
      await userEvent.click(screen.getByRole('button', { name: 'Retry one.png' }));
      await expect.element(screen.getByRole('img', { name: 'one.png' })).toBeVisible();
      await expect.element(screen.getByText('Loading image…')).not.toBeInTheDocument();
      await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();

      await screen.rerender(<GalleryImage image={samples[1]} />);
      await expect.element(screen.getByRole('img', { name: 'two.png' })).toBeVisible();
      await expect.element(screen.getByText('Loading image…')).not.toBeInTheDocument();
    });

    it('reports a cached image failure to the owning gallery', async function cachedImageFailure() {
      controlImageEvents();
      vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
      vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(0);
      const screen = await render(<Gallery initialImages={[samples[0]]} />);

      await expect.element(screen.getByRole('alert')).toHaveTextContent('Couldn’t load one.png.');
      await expect.element(screen.getByRole('row', { name: 'Retry one.png' })).toBeVisible();
      expect(screen.getByRole('row', { name: 'Open one.png' }).all()).toHaveLength(0);
    });

    it('keeps a failed thumbnail selectable and announces the selected image', async function failedThumbnail() {
      const screen = await render(<Gallery initialImages={samples} />);
      await userEvent.click(screen.getByRole('row', { name: 'Open one.png' }));
      const dialog = screen.getByRole('dialog', { name: 'Media gallery' });
      const thumbnail = dialog.getByRole('row', { name: 'View two.png' });
      const image = thumbnail.element().querySelector('img');
      if (!image) throw new Error('Expected the thumbnail image');
      image.dispatchEvent(new Event('error'));

      await expect.element(dialog.getByRole('img', { name: 'two.png failed to load' })).toBeVisible();
      await expect.element(dialog.getByRole('alert')).not.toBeInTheDocument();
      await userEvent.click(thumbnail);
      await expect.element(thumbnail).toHaveAttribute('aria-selected', 'true');
      await expect.element(dialog.getByRole('status')).toHaveTextContent('two.png');
    });

    it.each(['loading', 'ready'] as const)(
      'preserves keyboard focus when a %s thumbnail fails',
      async function focusedThumbnailFailure(initialState) {
        controlImageEvents();
        vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        const screen = await render(<Gallery initialImages={samples} />);
        screen.getByRole('img', { name: 'one.png', exact: true }).element().dispatchEvent(new Event('load'));
        await userEvent.click(screen.getByRole('row', { name: 'Open one.png' }));
        const dialog = screen.getByRole('dialog', { name: 'Media gallery' });
        const thumbnail = dialog.getByRole('row', { name: 'View one.png' });
        const image = thumbnail.element().querySelector('img');
        if (!image) throw new Error('Expected the thumbnail image');

        thumbnail.element().focus();
        if (initialState === 'ready') image.dispatchEvent(new Event('load'));
        await expect.element(thumbnail).toHaveFocus();
        image.dispatchEvent(new Event('error'));

        await expect.element(dialog.getByRole('img', { name: 'one.png failed to load' })).toBeVisible();
        await expect.element(thumbnail).toHaveFocus();
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(dialog.getByRole('row', { name: 'View two.png' })).toHaveFocus();
        await expect.element(dialog.getByRole('status')).toHaveTextContent('two.png');
        await userEvent.keyboard('{ArrowLeft}');
        await expect.element(thumbnail).toHaveFocus();
        await expect.element(dialog.getByRole('status')).toHaveTextContent('one.png');
        await userEvent.keyboard('{Enter}');
        await expect.element(thumbnail).toHaveAttribute('aria-selected', 'true');
      }
    );

    it.each(['list', 'grid'] as const)(
      'restores adjacent-row focus after deletion in %s view',
      async function removalFocus(view) {
        const screen = await render(<Gallery defaultView={view} initialImages={browserSamples.slice(0, 3)} />);
        await userEvent.click(screen.getByRole('button', { name: 'Remove Photo_2.png' }));
        await expect.element(screen.getByRole('row', { name: 'Open Photo_3.png', exact: true })).toHaveFocus();
        await userEvent.keyboard('{Tab}');
        await expect.element(screen.getByRole('button', { name: 'Remove Photo_3.png' })).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect.element(screen.getByRole('row', { name: 'Open file_name.png', exact: true })).toHaveFocus();
        await userEvent.keyboard('{Tab}{Enter}');
        await expect.element(screen.getByRole('button', { name: 'Add files', exact: true })).toHaveFocus();
        await expect.element(screen.getByRole('region', { name: 'Empty gallery' })).toBeVisible();
      }
    );

    it('keeps accepted files when a later local URL fails and permits retry', async function partialBatchFailure() {
      const createUrl = URL.createObjectURL.bind(URL);
      vi.spyOn(URL, 'createObjectURL')
        .mockImplementationOnce(createUrl)
        .mockImplementationOnce(function failedSecond() {
          throw new Error('URL unavailable');
        });
      const screen = await render(<Gallery />);
      selectFiles(screen.container, [png('first.png'), png('second.png'), png('third.png')]);
      await expect.element(screen.getByRole('row', { name: 'Open first.png' })).toBeVisible();
      await expect.element(screen.getByRole('row', { name: 'Open third.png' })).toBeVisible();
      await expect.element(screen.getByRole('alert')).toHaveTextContent('We couldn’t read some images.');
      selectFiles(screen.container, [png('first.png'), png('second.png')]);
      await expect.element(screen.getByText('3 images', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('status')).toHaveTextContent('1 image added. 1 duplicate skipped.');
      await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();
    });

    it.each(['count', 'bytes'] as const)(
      'reports duplicates before the collection %s budget',
      async function duplicateAtCapacity(budget) {
        const file = png();
        const screen = await render(
          <Gallery limits={budget === 'count' ? { maxFiles: 1 } : { maxTotalSize: file.size }} />
        );
        selectFiles(screen.container, [file]);
        await expect.element(screen.getByRole('row', { name: 'Open local.png' })).toBeVisible();
        selectFiles(screen.container, [png()]);
        await expect.element(screen.getByRole('status')).toHaveTextContent('1 duplicate skipped.');
        await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();
        await expect.element(screen.getByText('1 image', { exact: true })).toBeVisible();
        selectFiles(screen.container, [png('different.png')]);
        await expect.element(screen.getByRole('alert')).toHaveTextContent('Gallery limit reached');
      }
    );

    it.each(['count', 'bytes'] as const)(
      'rejects nonduplicate files over the %s budget before reading them',
      async function earlyBudgetRejection(budget) {
        const existing = png('existing.png');
        const screen = await render(
          <Gallery limits={budget === 'count' ? { maxFiles: 1 } : { maxTotalSize: existing.size }} />
        );
        selectFiles(screen.container, [existing]);
        await expect.element(screen.getByRole('row', { name: 'Open existing.png' })).toBeVisible();
        const rejected = png('rejected.png');
        const read = vi.spyOn(rejected, 'arrayBuffer');
        selectFiles(screen.container, [rejected]);
        await expect.element(screen.getByRole('alert')).toHaveTextContent('Gallery limit reached');
        expect(read).not.toHaveBeenCalled();
        // A matching name/size still needs hashing: it might be a duplicate or different content.
        selectFiles(screen.container, [existing]);
        await expect.element(screen.getByRole('status')).toHaveTextContent('1 duplicate skipped.');
        selectFiles(screen.container, [differentPng('existing.png')]);
        await expect.element(screen.getByRole('alert')).toHaveTextContent('Gallery limit reached');
        await expect.element(screen.getByText('1 image', { exact: true })).toBeVisible();
      }
    );

    it('isolates unreadable files without discarding the rest of their batch', async function unreadableFile() {
      const unreadable = png('unreadable.png');
      vi.spyOn(unreadable, 'arrayBuffer').mockRejectedValue(new Error('Read failed'));
      const screen = await render(<Gallery />);
      selectFiles(screen.container, [unreadable, png('readable.png')]);
      await expect.element(screen.getByRole('row', { name: 'Open readable.png' })).toBeVisible();
      await expect.element(screen.getByRole('alert')).toHaveTextContent('couldn’t read some images');
      expect(screen.getByRole('button', { name: 'Remove unreadable.png' }).all()).toHaveLength(0);
    });

    it('enforces collection count across batches and frees space after removal', async function countBudget() {
      const screen = await render(<Gallery initialImages={[samples[0]]} limits={{ maxFiles: 2 }} />);
      selectFiles(screen.container, [png('first.png'), png('second.png')]);
      await expect.element(screen.getByText('2 images', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('alert')).toHaveTextContent('Gallery limit reached: 2 images');
      expect(screen.getByRole('row', { name: 'Open second.png' }).all()).toHaveLength(0);
      await userEvent.click(screen.getByRole('button', { name: 'Remove first.png' }));
      selectFiles(screen.container, [png('second.png')]);
      await expect.element(screen.getByRole('row', { name: 'Open second.png' })).toBeVisible();
    });

    it('enforces aggregate bytes across overlapping batches and retains initial images', async function byteBudget() {
      const first = png('first.png');
      const second = png('second.png');
      const screen = await render(
        <Gallery initialImages={[{ ...samples[0], size: first.size }]} limits={{ maxTotalSize: first.size * 2 }} />
      );
      selectFiles(screen.container, [first]);
      selectFiles(screen.container, [second]);
      await expect.element(screen.getByRole('row', { name: 'Open first.png' })).toBeVisible();
      await expect.element(screen.getByRole('alert')).toHaveTextContent('Gallery limit reached');
      expect(screen.getByRole('row', { name: 'Open second.png' }).all()).toHaveLength(0);
      await userEvent.click(screen.getByRole('button', { name: 'Remove one.png' }));
      selectFiles(screen.container, [second]);
      await expect.element(screen.getByRole('row', { name: 'Open second.png' })).toBeVisible();
    });

    it('reports queued processing and publishes accepted files before the batch finishes', async function ingestionProgress() {
      const pending: Array<(value: ArrayBuffer) => void> = [];
      vi.spyOn(SubtleCrypto.prototype, 'digest').mockImplementation(function deferredHash() {
        return new Promise<ArrayBuffer>((resolve) => pending.push(resolve));
      });
      const screen = await render(<Gallery />);
      selectFiles(screen.container, [png('first.png'), png('second.png')]);
      await expect
        .element(screen.getByRole('progressbar', { name: 'Processing images' }))
        .toHaveAttribute('aria-valuenow', '0');
      await expect.poll(() => pending.length).toBe(1);
      pending[0](new ArrayBuffer(32));
      await expect.element(screen.getByRole('row', { name: 'Open first.png' })).toBeVisible();
      await expect.element(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
      selectFiles(screen.container, [png('third.png')]);
      await expect.element(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '3');
      await expect.poll(() => pending.length).toBe(2);
      pending[1](new ArrayBuffer(32));
      await expect.poll(() => pending.length).toBe(3);
      pending[2](new ArrayBuffer(32));
      await expect.element(screen.getByText('3 images', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('progressbar')).not.toBeInTheDocument();
    });

    it('notifies the host only after changes and reads initialImages once', async function collectionContract() {
      const changed = vi.fn();
      const screen = await render(<Gallery initialImages={samples} onImagesChange={changed} />);
      expect(changed).not.toHaveBeenCalled();
      await screen.rerender(<Gallery initialImages={[]} onImagesChange={changed} />);
      await expect.element(screen.getByText('2 images', { exact: true })).toBeVisible();
      await userEvent.click(screen.getByRole('button', { name: 'Remove one.png' }));
      await expect.poll(() => changed.mock.calls.length).toBe(1);
      expect(changed).toHaveBeenLastCalledWith([samples[1]]);
    });

    it('uses thumbnail resources and descriptive text while bounding full-image loading', async function imageResources() {
      const images = browserSamples.slice(0, 10).map((image) => ({
        ...image,
        src: image.src + '#full',
        thumbnailSrc: image.src,
        alt: `Description of ${image.name}`
      }));
      const screen = await render(<Gallery initialImages={images} />);
      await userEvent.click(screen.getByRole('row', { name: 'Open Photo_5.png' }));
      const dialog = screen.getByRole('dialog');
      await expect.element(dialog.getByRole('region', { name: 'Gallery images' })).toBeVisible();
      await expect.element(dialog.getByRole('img', { name: 'Description of Photo_5.png', exact: true })).toBeVisible();
      const fullResources = () =>
        Array.from(dialog.element().querySelectorAll('img')).filter((image) => image.src.endsWith('#full'));
      expect(fullResources()).toHaveLength(3);
      expect(dialog.getByRole('row', { name: 'View Photo_5.png' }).element().querySelector('img')?.src).toBe(
        images[4].thumbnailSrc
      );
      await userEvent.click(dialog.getByRole('row', { name: 'View Photo_10.png' }));
      expect(fullResources()).toHaveLength(2);
      await expect.element(dialog.getByRole('status')).toHaveTextContent('10 of 10');
    });

    it.each([
      ['grid', false],
      ['grid', true],
      ['list', false],
      ['list', true]
    ] as const)(
      'preserves dimensioned cover geometry in %s; thumbnail fallback: %s',
      async function coverGeometry(view, withThumbnail) {
        controlImageEvents();
        vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        const screen = await render(
          <div style={{ width: 320 }}>
            <Gallery
              defaultView={view}
              initialImages={[
                {
                  ...samples[0],
                  width: 960,
                  height: 640,
                  thumbnailSrc: withThumbnail ? 'data:image/png;base64,broken' : undefined
                }
              ]}
            />
          </div>
        );
        const picture = screen.getByRole('img', { name: 'one.png', exact: true });
        const opener = screen.getByRole('row', { name: 'Open one.png' });
        if (withThumbnail) {
          picture.element().dispatchEvent(new Event('error'));
          await expect.poll(() => picture.element().getAttribute('src')).toBe(samples[0].src);
          await expect.element(opener).not.toBeInTheDocument();
        }
        picture.element().dispatchEvent(new Event('load'));
        await expect.element(opener).toBeVisible();
        const cover = opener.element().querySelector('img');
        if (!cover) throw new Error('Expected the gallery cover');
        expect(cover.getBoundingClientRect().width).toBeGreaterThan(0);
        await expect
          .poll(function coverSizeDifference() {
            const { width, height } = cover.getBoundingClientRect();
            return Math.abs(height - (view === 'grid' ? width : 56));
          })
          .toBeLessThan(1);
        if (view === 'list') expect(cover.getBoundingClientRect().width).toBe(56);
      }
    );

    it.each(['grid', 'list'] as const)(
      'reports failures and allows retries when the thumbnail equals the source in %s view',
      async function identicalThumbnail(view) {
        controlImageEvents();
        const completed = vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(1);
        const screen = await render(
          <Gallery defaultView={view} initialImages={[{ ...samples[0], thumbnailSrc: samples[0].src }]} />
        );
        screen.getByRole('img', { name: 'one.png', exact: true }).element().dispatchEvent(new Event('error'));
        const retry = screen.getByRole('row', { name: 'Retry one.png' });
        await expect.element(retry).toBeVisible();
        await expect.element(screen.getByRole('row', { name: 'Open one.png' })).not.toBeInTheDocument();
        await userEvent.click(retry);
        completed.mockReturnValue(true);
        screen.getByRole('img', { name: 'one.png', exact: true }).element().dispatchEvent(new Event('load'));
        await expect.element(screen.getByRole('row', { name: 'Open one.png' })).toBeVisible();
        await expect.element(retry).not.toBeInTheDocument();
      }
    );

    it('falls back to the full image when a cover thumbnail cannot load', async function thumbnailFallback() {
      const screen = await render(
        <Gallery initialImages={[{ ...samples[0], thumbnailSrc: 'data:image/png;base64,broken' }]} />
      );
      await expect.element(screen.getByRole('row', { name: 'Open one.png' })).toBeVisible();
      const cover = screen.getByRole('row', { name: 'Open one.png' }).element().querySelector('img');
      await expect.poll(() => cover?.getAttribute('src')).toBe(samples[0].src);
      await userEvent.click(screen.getByRole('row', { name: 'Open one.png' }));
      await expect.element(screen.getByRole('dialog')).toBeVisible();
    });

    it.each(['ltr', 'rtl'] as const)(
      'navigates the thumbnail rail with a single Tab stop in %s',
      async function thumbnailKeyboard(dir) {
        // The host owns RAC's locale; Gallery only supplies its layout direction and formatted copy.
        const screen = await render(
          <RACI18nProvider locale={dir === 'rtl' ? 'ar' : 'en-US'}>
            <Gallery dir={dir} initialImages={browserSamples.slice(0, 4)} />
          </RACI18nProvider>
        );
        await userEvent.click(screen.getByRole('row', { name: 'Open file_name.png' }));
        const dialog = screen.getByRole('dialog');
        const first = dialog.getByRole('row', { name: 'View file_name.png' });
        first.element().focus();
        await userEvent.keyboard(dir === 'rtl' ? '{ArrowLeft}' : '{ArrowRight}');
        await expect.element(dialog.getByRole('row', { name: 'View Photo_2.png' })).toHaveFocus();
        await expect.element(dialog.getByRole('status')).toHaveTextContent('2 of 4');
        await userEvent.keyboard('{End}');
        await expect.element(dialog.getByRole('row', { name: 'View Photo_4.png' })).toHaveFocus();
        await userEvent.keyboard('{Home}');
        await expect.element(first).toHaveFocus();
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await expect.element(dialog.getByRole('button', { name: 'Next image' })).toHaveFocus();
        await userEvent.keyboard('{Tab}');
        await expect.element(first).toHaveFocus();
        await userEvent.keyboard('{Tab}');
        await expect.element(dialog.getByRole('button', { name: 'Close gallery' })).toHaveFocus();
      }
    );

    it('preserves selection and keyboard navigation when motion preference changes', async function reducedMotionNavigation() {
      const session = cdp() as unknown as { send: (method: string, params: unknown) => Promise<void> };
      try {
        const screen = await render(<Gallery initialImages={browserSamples.slice(0, 4)} />);
        await userEvent.click(screen.getByRole('row', { name: 'Open Photo_2.png' }));
        const dialog = screen.getByRole('dialog');
        await session.send('Emulation.setEmulatedMedia', {
          features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
        });
        await expect.element(dialog.getByRole('status')).toHaveTextContent('2 of 4');
        dialog.getByRole('button', { name: 'Close gallery' }).element().focus();
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(dialog.getByRole('status')).toHaveTextContent('3 of 4');
        await session.send('Emulation.setEmulatedMedia', { features: [] });
        await expect.element(dialog.getByRole('status')).toHaveTextContent('3 of 4');
        await userEvent.keyboard('{Escape}');
        await expect.element(screen.getByRole('row', { name: 'Open Photo_2.png' })).toHaveFocus();
      } finally {
        await session.send('Emulation.setEmulatedMedia', { features: [] });
      }
    });
  });
});
