'use client';

import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Gallery, type GalleryProps } from './index.tsx';
import { sampleImages } from './data/sample-images.ts';

export default getMeta({
  title: 'Blocks/Gallery',
  id: 'blocks-gallery',
  parameters: { layout: 'fullscreen' }
});

const sampleGalleryProps: GalleryProps = { initialImages: sampleImages };
export const Preview = getStory(Gallery, { args: sampleGalleryProps });
