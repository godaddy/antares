'use client';

import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Gallery, type GalleryProps, type ImageStatus } from './index.tsx';

export default getMeta({
  title: 'Blocks/Gallery',
  id: 'blocks-gallery',
  parameters: { layout: 'fullscreen' }
});

export const Preview = getStory(Gallery);
export const ListView = getStory(Gallery, { args: { defaultView: 'list' } });
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
