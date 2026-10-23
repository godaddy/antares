import type { ImageItem } from './types';

/** Fixed IDs keep the sample photographs consistent between visits. */
const photographs: ImageItem[] = [
  {
    id: 'sample-1015',
    name: 'file_name.png',
    alt: 'Blue fjord between rocky mountains',
    src: 'https://picsum.photos/id/1015/960/640',
    size: 5 * 1024 * 1024
  },
  {
    id: 'sample-1016',
    name: 'Photo_2.png',
    alt: 'Red sandstone mesas beneath a cloudy sky',
    src: 'https://picsum.photos/id/1016/960/640',
    size: 2 * 1024 * 1024
  },
  {
    id: 'sample-1018',
    name: 'Photo_3.png',
    alt: 'Winding road beneath grass-covered cliffs',
    src: 'https://picsum.photos/id/1018/960/640',
    size: 4 * 1024 * 1024
  },
  {
    id: 'sample-1025',
    name: 'Photo_4.png',
    alt: 'Pug wrapped in a blanket',
    src: 'https://picsum.photos/id/1025/960/640',
    size: 6 * 1024 * 1024
  },
  {
    id: 'sample-1035',
    name: 'Photo_5.png',
    alt: 'Waterfall flowing over a rocky cliff',
    src: 'https://picsum.photos/id/1035/960/640',
    size: 3 * 1024 * 1024
  },
  {
    id: 'sample-1043',
    name: 'Photo_6.png',
    alt: 'Granite cliffs above a river and pine forest',
    src: 'https://picsum.photos/id/1043/960/640',
    size: 4 * 1024 * 1024
  },
  {
    id: 'sample-1050',
    name: 'Photo_7.png',
    alt: 'White sea stacks along a rugged coast',
    src: 'https://picsum.photos/id/1050/960/640',
    size: 5 * 1024 * 1024
  },
  {
    id: 'sample-1069',
    name: 'Photo_8.png',
    alt: 'Jellyfish in dark blue water',
    src: 'https://picsum.photos/id/1069/960/640',
    size: 3 * 1024 * 1024
  },
  {
    id: 'sample-1068',
    name: 'Photo_9.png',
    alt: 'Potted plant and glass jar on a table against a blue wall',
    src: 'https://picsum.photos/id/1068/960/640',
    size: 4 * 1024 * 1024
  },
  {
    id: 'sample-1074',
    name: 'Photo_10.png',
    alt: 'Close-up of a lioness against a dark background',
    src: 'https://picsum.photos/id/1074/960/640',
    size: 6 * 1024 * 1024
  },
  {
    id: 'sample-error',
    name: 'Photo_error.png',
    alt: 'Landscape photograph that could not be loaded',
    src: 'https://picsum.photos/id/1084/960/640',
    size: 5 * 1024 * 1024,
    status: 'error',
    errorMessage: 'Couldn’t load Photo_error.png.'
  }
];

/** Small previews and responsive originals illustrate an image-service integration. */
export const sampleImages: ImageItem[] = photographs.map((image) => ({
  ...image,
  thumbnailSrc: image.src.replace('/960/640', '/240/160'),
  width: 960,
  height: 640,
  srcSet: `${image.src.replace('/960/640', '/480/320')} 480w, ${image.src} 960w`,
  sizes: '(max-width: 60rem) 90vw, 960px'
}));
