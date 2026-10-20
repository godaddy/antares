import { Gallery } from '../index';
import { sampleImages } from '../data/sample-images';

export function GridGalleryExample() {
  return <Gallery initialImages={sampleImages} defaultView="grid" />;
}
