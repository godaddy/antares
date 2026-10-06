/** The upload state shown by a gallery file item. */
export type ImageStatus = 'ready' | 'error';

/** An image shown by the gallery. IDs must be unique and stable. */
export interface ImageItem {
  /** Identity used by navigation and removal. */
  id: string;

  /** Visible filename and accessible image name. */
  name: string;

  /** Remote URL, data URL, or locally owned object URL. */
  src: string;

  /** Actual bytes when known; omitted for remote samples. */
  size?: number;

  /** Upload state used by the list/grid examples. */
  status?: ImageStatus;

  /** Optional message associated with a failed upload. */
  errorMessage?: string;
}

/** Fixed IDs keep the sample photographs consistent between visits. */
export const sampleImages: ImageItem[] = [
  { id: 'sample-1015', name: 'file_name.png', src: 'https://picsum.photos/id/1015/960/640', size: 5 * 1024 * 1024 },
  {
    id: 'sample-1016',
    name: 'Photo_2.png',
    src: 'https://picsum.photos/id/1016/960/640',
    size: 2 * 1024 * 1024
  },
  { id: 'sample-1018', name: 'Photo_3.png', src: 'https://picsum.photos/id/1018/960/640', size: 4 * 1024 * 1024 },
  { id: 'sample-1025', name: 'Photo_4.png', src: 'https://picsum.photos/id/1025/960/640', size: 6 * 1024 * 1024 },
  { id: 'sample-1035', name: 'Photo_5.png', src: 'https://picsum.photos/id/1035/960/640', size: 3 * 1024 * 1024 },
  { id: 'sample-1043', name: 'Photo_6.png', src: 'https://picsum.photos/id/1043/960/640', size: 4 * 1024 * 1024 },
  { id: 'sample-1050', name: 'Photo_7.png', src: 'https://picsum.photos/id/1050/960/640', size: 5 * 1024 * 1024 },
  { id: 'sample-1069', name: 'Photo_8.png', src: 'https://picsum.photos/id/1069/960/640', size: 3 * 1024 * 1024 },
  { id: 'sample-1068', name: 'Photo_9.png', src: 'https://picsum.photos/id/1068/960/640', size: 4 * 1024 * 1024 },
  { id: 'sample-1074', name: 'Photo_10.png', src: 'https://picsum.photos/id/1074/960/640', size: 6 * 1024 * 1024 },
  {
    id: 'sample-error',
    name: 'Photo_error.png',
    src: 'https://picsum.photos/id/1084/960/640',
    size: 5 * 1024 * 1024,
    status: 'error',
    errorMessage: 'Couldn’t load Photo_error.png.'
  }
];
