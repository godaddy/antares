'use client';

import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Gallery, type GalleryProps, type ImageStatus } from './index.tsx';
import { sampleImages } from './data/sample-images.ts';

export default getMeta({
  title: 'Blocks/Gallery',
  id: 'blocks-gallery',
  parameters: { layout: 'fullscreen' }
});

const sampleGalleryProps: GalleryProps = { initialImages: sampleImages };
export const Preview = getStory(Gallery, { args: sampleGalleryProps });
export const ListView = getStory(Gallery, { args: { ...sampleGalleryProps, defaultView: 'list' } });
const emptyGalleryProps: GalleryProps = { initialImages: [] };
export const Empty = getStory(Gallery, { args: emptyGalleryProps });

const errorStatus: ImageStatus = 'error';
export const UploadError = getStory(Gallery, {
  args: {
    initialImages: [
      {
        id: 'upload-error',
        name: 'upload-error.png',
        src: 'https://picsum.photos/id/1025/960/640',
        size: 5 * 1024 * 1024,
        status: errorStatus,
        errorMessage: 'File upload failed. Please try again.'
      }
    ]
  }
});
