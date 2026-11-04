import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { cdp, page, userEvent } from 'vitest/browser';
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

function isThumbnailRevealed(thumbnail: Element, rail: Element) {
  const bounds = thumbnail.getBoundingClientRect();
  const viewport = rail.getBoundingClientRect();
  return bounds.left >= viewport.left && bounds.right <= viewport.right;
}

function scrollPositionsAbove(element: Element) {
  const positions: number[] = [];
  for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
    positions.push(ancestor.scrollTop);
  }
  return positions;
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

      await expect.element(screen.getByRole('heading', { name: 'Gallery', exact: true })).toBeVisible();
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
      await expect.element(screen.getByRole('heading', { name: 'Start your gallery', exact: true })).toBeVisible();
      await expect.element(screen.getByText('or drag images into the gallery below.', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Add files', exact: true })).toBeEnabled();
      await expect.element(screen.getByRole('button', { name: 'Show all', exact: true })).not.toBeInTheDocument();
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
            {
              id: 'fractional',
              name: 'fractional.png',
              src: `data:image/png;base64,${pixel}`,
              size: 1.5 * 1024 * 1024
            },
            { id: 'unknown', name: 'unknown.png', src: `data:image/png;base64,${pixel}` }
          ]}
        />
      );

      await expect.element(screen.getByText('68 B', { exact: true })).toBeVisible();
      await expect.element(screen.getByText('100 KiB', { exact: true })).toBeVisible();
      await expect.element(screen.getByText('1.5 MiB', { exact: true })).toBeVisible();
      await expect.element(screen.getByText('Size unavailable', { exact: true })).toBeVisible();
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

      await expect.element(screen.getByRole('alert')).toHaveTextContent('Retry');
      await expect.element(screen.getByRole('status')).toHaveTextContent('Image failed to load.');
      await expect.element(screen.getByText('Couldn’t load one.png.', { exact: true })).not.toBeInTheDocument();
      await expect.element(screen.getByRole('row', { name: 'Retry one.png' })).toBeVisible();
    });

    it('updates the list failure summary as error images are removed', async function errorSummary() {
      const screen = await render(
        <Gallery initialImages={samples.map((image) => ({ ...image, status: 'error' }))} defaultView="list" />
      );
      await expect.element(screen.getByRole('alert')).toHaveTextContent('2 files need attention.');
      await userEvent.click(screen.getByRole('button', { name: 'Remove one.png' }));
      await expect.element(screen.getByRole('alert')).toHaveTextContent('1 file needs attention.');
      await userEvent.click(screen.getByRole('button', { name: 'Remove two.png' }));
      await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();
      await expect.element(screen.getByRole('region', { name: 'Empty gallery' })).toBeVisible();
    });

    it('switches views without losing the collection and supports keyboard selection', async function views() {
      controlImageEvents();
      vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
      const screen = await render(<Gallery initialImages={samples} />);
      for (const image of samples) {
        screen.getByRole('img', { name: image.name, exact: true }).element().dispatchEvent(new Event('load'));
      }
      const first = screen.getByRole('row', { name: 'Open one.png', exact: true });
      const second = screen.getByRole('row', { name: 'Open two.png', exact: true });
      await expect.element(first).toBeVisible();
      await expect
        .element(screen.getByRole('radio', { name: 'Grid', exact: true }))
        .toHaveAttribute('aria-checked', 'true');
      const list = screen.getByRole('radio', { name: 'List', exact: true });
      list.element().focus();
      await userEvent.keyboard(' ');
      await expect.element(list).toHaveAttribute('aria-checked', 'true');
      await expect.element(list).toHaveFocus();
      await expect.element(first).toBeVisible();
      first.element().focus();
      await userEvent.keyboard('{ArrowDown}');
      await expect.element(second).toHaveFocus();
      await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole('radio', { name: 'Grid', exact: true }));
      await expect
        .element(screen.getByRole('radio', { name: 'Grid', exact: true }))
        .toHaveAttribute('aria-checked', 'true');
      expect(screen.getByRole('row', { name: /^Open / }).all()).toHaveLength(2);
      first.element().focus();
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(second).toHaveFocus();
      await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
    });

    it.each(['click', 'Enter', 'Space'] as const)(
      'reveals all files with %s and continues keyboard interaction from the first revealed row',
      async function listPagination(activation) {
        const screen = await render(<Gallery initialImages={browserSamples} defaultView="list" />);
        const showAll = screen.getByRole('button', { name: 'Show all', exact: true });
        await expect.element(screen.getByText('5 of 11 files', { exact: true })).toBeVisible();
        expect(screen.getByRole('row').all()).toHaveLength(5);
        await expect.element(screen.getByText('Photo_6.png', { exact: true })).not.toBeInTheDocument();

        if (activation === 'click') await userEvent.click(showAll);
        else {
          showAll.element().focus();
          await userEvent.keyboard(activation === 'Enter' ? '{Enter}' : ' ');
        }

        await expect.element(screen.getByText('11 of 11 files', { exact: true })).toBeVisible();
        expect(screen.getByRole('row').all()).toHaveLength(11);
        await expect.element(showAll).not.toBeInTheDocument();
        await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
        const revealed = screen.getByRole('row', { name: 'Open Photo_6.png', exact: true });
        await expect.element(revealed).toHaveFocus();
        await userEvent.keyboard('{ArrowDown}');
        await expect.element(screen.getByRole('row', { name: 'Open Photo_7.png', exact: true })).toHaveFocus();
        await userEvent.keyboard('{ArrowUp}');
        await expect.element(revealed).toHaveFocus();
        await userEvent.keyboard('{Tab}');
        await expect.element(screen.getByRole('button', { name: 'Remove Photo_6.png', exact: true })).toHaveFocus();
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await expect.element(revealed).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        const dialog = screen.getByRole('dialog', { name: 'Media gallery' });
        await expect.element(dialog).toBeVisible();
        await expect.element(dialog.getByRole('status')).toHaveTextContent('Photo_6.png');
        await userEvent.keyboard('{Escape}');
        await expect.element(dialog).not.toBeInTheDocument();
        await expect.element(revealed).toHaveFocus();
      }
    );

    it('keeps focus on the revealed file and its remove action while images finish loading', async function revealedFileLoading() {
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
      await userEvent.keyboard('{Enter} ');
      await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
      screen.getByRole('img', { name: 'Photo_6.png', exact: true }).element().dispatchEvent(new Event('load'));
      await expect.element(screen.getByRole('row', { name: 'Open Photo_6.png' })).toBeVisible();
      await expect.element(revealed).toHaveFocus();
      await userEvent.keyboard('{Tab}');
      const remove = screen.getByRole('button', { name: 'Remove Photo_6.png', exact: true });
      await expect.element(remove).toHaveFocus();
      screen.getByRole('img', { name: 'Photo_7.png', exact: true }).element().dispatchEvent(new Event('load'));
      await expect.element(screen.getByRole('row', { name: 'Open Photo_7.png' })).toBeVisible();
      await expect.element(remove).toHaveFocus();
      await expect.element(screen.getByRole('button', { name: 'Show all', exact: true })).not.toBeInTheDocument();
    });

    it.each([
      ['grid', '{Enter}'],
      ['grid', ' '],
      ['list', '{Enter}'],
      ['list', ' ']
    ] as const)('navigates rows, opens with %s / %s, and tabs to Remove', async function collectionKeyboard(view, key) {
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
      await userEvent.keyboard('{Tab}');
      await expect.element(screen.getByRole('button', { name: 'Remove two.png' })).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect.element(second).not.toBeInTheDocument();
      await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
      await expect.element(first).toHaveFocus();
      await userEvent.click(screen.getByText('one.png', { exact: true }));
      await expect.element(screen.getByRole('dialog')).toBeVisible();
    });

    it.each(['grid', 'list'] as const)(
      'finds files by typing their names and navigates to collection boundaries in %s view',
      async function collectionTypeahead(view) {
        const screen = await render(
          <Gallery
            defaultView={view}
            initialImages={['Alpine.png', 'Bridge.png', 'Coast.png'].map(function namedImage(name) {
              return { ...samples[0], id: name, name };
            })}
          />
        );
        const first = screen.getByRole('row', { name: 'Open Alpine.png', exact: true });
        await expect.element(first).toBeVisible();
        first.element().focus();
        await userEvent.keyboard('b');
        await expect.element(screen.getByRole('row', { name: 'Open Bridge.png', exact: true })).toHaveFocus();
        await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
        await userEvent.keyboard('{End}');
        await expect.element(screen.getByRole('row', { name: 'Open Coast.png', exact: true })).toHaveFocus();
        await userEvent.keyboard('{Home}');
        await expect.element(first).toHaveFocus();
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
        await userEvent.click(screen.getByRole('button', { name: 'Show all', exact: true }));
        await expect.element(screen.getByRole('row', { name: 'Open Photo_5.png', exact: true })).toHaveFocus();
        expect(screen.getByRole('row').all()).toHaveLength(count + 1);
      }
    );

    it('refills a shortened list after removal and continues from the next hidden file when expanded', async function revealAfterRemoval() {
      const screen = await render(<Gallery initialImages={browserSamples} defaultView="list" />);
      await userEvent.click(screen.getByRole('button', { name: 'Remove file_name.png', exact: true }));
      await expect.element(screen.getByRole('row', { name: 'Open Photo_6.png', exact: true })).toBeVisible();
      expect(screen.getByRole('row').all()).toHaveLength(5);
      await expect.element(screen.getByText('5 of 10 files', { exact: true })).toBeVisible();
      await userEvent.click(screen.getByRole('button', { name: 'Show all', exact: true }));
      await expect.element(screen.getByRole('row', { name: 'Open Photo_7.png', exact: true })).toHaveFocus();
      expect(screen.getByRole('row').all()).toHaveLength(10);
    });

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
      'preserves picker focus and page scroll while adding images in %s view',
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
        const initialScroll = document.scrollingElement?.scrollTop;

        for (const [index, name] of ['first.png', 'second.png'].entries()) {
          selectFiles(screen.container, [png(name)]);
          await expect.element(screen.getByRole('progressbar', { name: 'Processing images' })).toBeInTheDocument();
          await expect.poll(() => pending.length).toBe(index + 1);
          expect(document.scrollingElement?.scrollTop).toBe(initialScroll);
          pending[index](new ArrayBuffer(32));
          await expect.element(screen.getByRole('button', { name: `Remove ${name}`, exact: true })).toBeInTheDocument();
          await expect.element(screen.getByRole('progressbar')).not.toBeInTheDocument();
          expect(document.scrollingElement?.scrollTop).toBe(initialScroll);
          await expect.element(add).toHaveFocus();
        }
      }
    );

    it.each(['grid', 'list'] as const)(
      'announces and dismisses upload errors without stealing focus in %s view',
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
        await expect.element(alert).toHaveAccessibleName('Upload issues');
        expect(add.element().getAttribute('aria-describedby')?.split(' ')).toContain(alert.element().id);
        await expect.element(screen.getByRole('alert')).toHaveTextContent('smaller than 20 MiB');
        await expect.element(screen.getByRole('alert')).toHaveTextContent('Gallery limit reached: 2 images');
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

    it.each([
      ['jpg', 'image/jpeg'],
      ['png', 'image/png'],
      ['gif', 'image/gif'],
      ['webp', 'image/webp']
    ])('accepts the supported %s file type', async function supportedType(extension, type) {
      const screen = await render(<Gallery />);
      const name = `accepted.${extension}`;
      selectFiles(screen.container, [new File([png()], name, { type })]);
      await expect.element(screen.getByRole('row', { name: `Open ${name}`, exact: true })).toBeVisible();
      await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();
      await expect.element(screen.getByText('1 image', { exact: true })).toBeVisible();
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
        expect(collection.contains(overlayText.element())).toBe(true);
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
      await userEvent.click(dialog.getByRole('row', { name: 'View two.png' }));
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

    describe.each([
      [390, 844],
      [320, 568],
      [568, 320]
    ])('thumbnail navigation at %s by %s', function thumbnailNavigation(width, height) {
      beforeEach(async function resizeViewport() {
        await page.viewport(width, height);
      });

      afterEach(async function restoreViewport() {
        await page.viewport(1280, 800);
      });

      it('reveals the first and last thumbnails by keyboard without scrolling the modal or page', async function keyboardReveal() {
        const screen = await render(<Gallery initialImages={browserSamples.slice(0, 10)} />);
        await userEvent.click(screen.getByRole('row', { name: 'Open file_name.png' }));
        const dialog = screen.getByRole('dialog');
        const rail = dialog.getByRole('grid', { name: 'Image thumbnails' });
        const first = dialog.getByRole('row', { name: 'View file_name.png' });
        const last = dialog.getByRole('row', { name: 'View Photo_10.png' });
        const initialScroll = scrollPositionsAbove(rail.element());
        await expect.element(first).toHaveFocus();
        await userEvent.keyboard('{End}');
        await expect.element(last).toHaveFocus();
        await expect.element(last).toHaveAttribute('aria-selected', 'true');
        await expect.poll(() => isThumbnailRevealed(last.element(), rail.element())).toBe(true);
        await userEvent.keyboard('{Home}');
        await expect.element(first).toHaveFocus();
        await expect.element(first).toHaveAttribute('aria-selected', 'true');
        await expect.poll(() => isThumbnailRevealed(first.element(), rail.element())).toBe(true);
        expect(scrollPositionsAbove(rail.element())).toEqual(initialScroll);
      });

      it.each([
        { direction: 'next', from: 0, to: 3, position: 'intermediate' },
        { direction: 'next', from: 4, to: 5, position: 'last' },
        { direction: 'previous', from: 5, to: 2, position: 'intermediate' },
        { direction: 'previous', from: 1, to: 0, position: 'first' }
      ])(
        'reveals the $position thumbnail with $direction without scrolling the modal or page',
        async function paginationReveal({ direction, from, to }) {
          const forward = direction === 'next';
          const images = browserSamples.slice(0, 6);
          const screen = await render(<Gallery initialImages={images} />);
          await userEvent.click(screen.getByRole('row', { name: `Open ${images[from].name}` }));
          const dialog = screen.getByRole('dialog');
          const rail = dialog.getByRole('grid', { name: 'Image thumbnails' });
          const control = dialog.getByRole('button', { name: forward ? 'Next image' : 'Previous image' });
          const thumbnail = dialog.getByRole('row', { name: `View ${images[to].name}` });
          const initialScroll = scrollPositionsAbove(rail.element());

          for (let step = 0; step < Math.abs(to - from); step++) await userEvent.click(control);
          await expect.element(dialog.getByRole('status')).toHaveTextContent(`${to + 1} of ${images.length}`);
          await expect.element(thumbnail).toHaveAttribute('aria-selected', 'true');
          await expect.poll(() => isThumbnailRevealed(thumbnail.element(), rail.element())).toBe(true);
          if (to === 0 || to === images.length - 1) await expect.element(control).toBeDisabled();
          else await expect.element(control).toHaveFocus();
          expect(scrollPositionsAbove(rail.element())).toEqual(initialScroll);
        }
      );
    });

    it('focuses the active thumbnail when opening an image at the end of the gallery', async function offscreenThumbnail() {
      try {
        await page.viewport(390, 844);
        const screen = await render(<Gallery initialImages={browserSamples.slice(0, 10)} />);
        const opener = screen.getByRole('row', { name: 'Open Photo_10.png' });
        await userEvent.click(opener);
        const dialog = screen.getByRole('dialog');
        const thumbnail = dialog.getByRole('row', { name: 'View Photo_10.png' });
        await expect.element(thumbnail).toHaveFocus();
        await expect.element(thumbnail).toHaveAttribute('aria-selected', 'true');
        await expect
          .poll(() =>
            isThumbnailRevealed(thumbnail.element(), dialog.getByRole('grid', { name: 'Image thumbnails' }).element())
          )
          .toBe(true);
        await userEvent.keyboard('{ArrowLeft}');
        await expect.element(dialog.getByRole('row', { name: 'View Photo_9.png' })).toHaveFocus();
        await expect.element(dialog.getByRole('status')).toHaveTextContent('9 of 10');
        await userEvent.keyboard('{Escape}');
        await expect.element(opener).toHaveFocus();
      } finally {
        await page.viewport(1280, 800);
      }
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

    it('keeps viewer navigation usable while slides and loading states change', async function pendingViewerNavigation() {
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
      const initialScroll = document.scrollingElement?.scrollTop;
      for (const name of [images[1].name, images[2].name]) {
        await userEvent.click(next);
        const picture = dialog.getByRole('img', { name, exact: true });
        for (const state of ['loading', 'ready']) {
          if (state === 'ready') picture.element().dispatchEvent(new Event('load'));
          await expect.element(dialog).toBeVisible();
          await expect.element(next).toHaveFocus();
          await expect.element(dialog.getByRole('status')).toHaveTextContent(name);
          if (state === 'loading') await expect.element(picture).toHaveAttribute('aria-busy', 'true');
          else await expect.element(picture).not.toHaveAttribute('aria-busy');
        }
      }
      await userEvent.click(dialog.getByRole('row', { name: 'View Photo_10.png' }));
      await expect.element(dialog.getByRole('status')).toHaveTextContent('10 of 10');
      expect(document.scrollingElement?.scrollTop).toBe(initialScroll);
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
        const pendingCover = screen.getByRole('img', { name: 'two.png', exact: true }).element();
        await userEvent.click(opener);
        await userEvent.click(screen.getByRole('button', { name: 'Next image' }));
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
        const cover = screen.getByRole('img', { name: 'one.png', exact: true }).element();
        cover.dispatchEvent(new Event('load'));
        const opener = screen.getByRole('row', { name: 'Open one.png' });
        await expect.element(opener).toBeVisible();
        const openerElement = opener.element();
        opener.element().focus();
        await userEvent.keyboard('{Enter}');
        await expect.element(screen.getByRole('dialog')).toBeVisible();
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
      'keeps viewer actions usable in a %s by %s viewport with %s text',
      async function mobileViewer(width, height, fontSize) {
        const originalFontSize = document.documentElement.style.fontSize;
        try {
          await page.viewport(width, height);
          document.documentElement.style.fontSize = fontSize;
          const screen = await render(<Gallery initialImages={browserSamples.slice(0, 4)} />);
          await userEvent.click(screen.getByRole('row', { name: 'Open file_name.png' }));
          const dialog = screen.getByRole('dialog', { name: 'Media gallery' });
          await expect.element(dialog).toBeVisible();
          await userEvent.click(dialog.getByRole('button', { name: 'Next image' }));
          await expect.element(dialog.getByRole('status')).toHaveTextContent('2 of 4');
          await userEvent.click(dialog.getByRole('button', { name: 'Previous image' }));
          await expect.element(dialog.getByRole('status')).toHaveTextContent('1 of 4');
          await userEvent.click(dialog.getByRole('button', { name: 'Close gallery' }));
          await expect.element(screen.getByRole('row', { name: 'Open file_name.png' })).toHaveFocus();
        } finally {
          document.documentElement.style.fontSize = originalFontSize;
          await page.viewport(1280, 800);
        }
      }
    );

    it('uses English labels and US number formatting in the collection and viewer', async function englishGallery() {
      const screen = await render(<Gallery initialImages={[{ ...samples[0], size: 1.5 * 1024 * 1024 }]} />);
      await expect.element(screen.getByRole('heading', { name: 'Gallery', exact: true })).toBeVisible();
      await expect.element(screen.getByText('1.5 MiB', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('button', { name: 'Add files', exact: true })).toBeVisible();
      await expect
        .element(screen.getByRole('region', { name: 'Add files to gallery' }))
        .toHaveAttribute('lang', 'en-US');
      await userEvent.click(screen.getByRole('row', { name: 'Open one.png' }));
      const dialog = screen.getByRole('dialog', { name: 'Media gallery' });
      await expect.element(dialog).toHaveAttribute('lang', 'en-US');
      await expect.element(dialog.getByRole('row', { name: 'View one.png' })).toBeVisible();
      await expect.element(dialog.getByRole('status')).toHaveTextContent('1 of 1');
      await userEvent.keyboard('{Escape}');
      await userEvent.click(screen.getByRole('button', { name: 'Remove one.png' }));
      await expect.element(screen.getByRole('status')).toHaveTextContent('one.png removed.');
    });

    it.each(['horizontal', 'vertical'] as const)(
      'exposes the %s cover loading state and reports a later failure',
      async function coverPlaceholder(variant) {
        controlImageEvents();
        vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        const screen = await render(<FileCover image={samples[0]} variant={variant} />);
        const image = screen.getByRole('img', { name: 'one.png', exact: true });
        await expect.element(image).toHaveAttribute('aria-busy', 'true');
        image.element().dispatchEvent(new Event('load'));
        await expect.element(image).not.toHaveAttribute('aria-busy');
        await expect.element(image).toBeVisible();
        image.element().dispatchEvent(new Event('error'));
        await expect.element(screen.getByRole('img', { name: 'one.png: File needs attention.' })).toBeVisible();
      }
    );

    it.each(['viewer', 'thumbnail'] as const)(
      'clears the %s image loading state after it loads',
      async function viewerPlaceholder(variant) {
        controlImageEvents();
        vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
        const screen = await render(<GalleryImage image={samples[0]} variant={variant} />);
        const image = screen.container.querySelector('img')!;
        await expect.element(image).toHaveAttribute('aria-busy', 'true');
        image.dispatchEvent(new Event('load'));
        await expect.element(image).not.toHaveAttribute('aria-busy');
        await expect.element(image).toBeVisible();
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

      await expect.element(screen.getByRole('alert')).toHaveTextContent('Retry');
      await expect.element(screen.getByRole('status')).toHaveTextContent('Image failed to load.');
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
      const nextChanged = vi.fn();
      const screen = await render(<Gallery initialImages={samples} onImagesChange={changed} />);
      expect(changed).not.toHaveBeenCalled();
      await screen.rerender(<Gallery initialImages={[]} onImagesChange={nextChanged} />);
      await expect.element(screen.getByText('2 images', { exact: true })).toBeVisible();
      expect(changed).not.toHaveBeenCalled();
      expect(nextChanged).not.toHaveBeenCalled();
      await userEvent.click(screen.getByRole('button', { name: 'Remove one.png' }));
      await expect.poll(() => nextChanged.mock.calls.length).toBe(1);
      expect(nextChanged).toHaveBeenLastCalledWith([samples[1]]);
      expect(changed).not.toHaveBeenCalled();
    });

    it('shows descriptive full images and uses thumbnail resources while navigating', async function imageResources() {
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
      await expect
        .element(dialog.getByRole('img', { name: 'Description of Photo_5.png', exact: true }))
        .toHaveAttribute('src', images[4].src);
      expect(dialog.getByRole('row', { name: 'View Photo_5.png' }).element().querySelector('img')?.src).toBe(
        images[4].thumbnailSrc
      );
      await userEvent.click(dialog.getByRole('row', { name: 'View Photo_10.png' }));
      await expect.element(dialog.getByRole('img', { name: 'Description of Photo_10.png', exact: true })).toBeVisible();
      await expect
        .element(dialog.getByRole('img', { name: 'Description of Photo_10.png', exact: true }))
        .toHaveAttribute('src', images[9].src);
      await expect.element(dialog.getByRole('status')).toHaveTextContent('10 of 10');
    });

    it.each([
      ['grid', false],
      ['grid', true],
      ['list', false],
      ['list', true]
    ] as const)(
      'opens a dimensioned image after loading in %s; thumbnail fallback: %s',
      async function dimensionedCover(view, withThumbnail) {
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
        await userEvent.click(opener);
        await expect.element(screen.getByRole('dialog', { name: 'Media gallery' })).toBeVisible();
        await expect.element(screen.getByRole('dialog').getByRole('status')).toHaveTextContent('one.png');
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

    it('navigates the thumbnail rail with a single Tab stop', async function thumbnailKeyboard() {
      const screen = await render(<Gallery initialImages={browserSamples.slice(0, 4)} />);
      await userEvent.click(screen.getByRole('row', { name: 'Open file_name.png' }));
      const dialog = screen.getByRole('dialog');
      const first = dialog.getByRole('row', { name: 'View file_name.png' });
      first.element().focus();
      await userEvent.keyboard('{ArrowRight}');
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
    });

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
