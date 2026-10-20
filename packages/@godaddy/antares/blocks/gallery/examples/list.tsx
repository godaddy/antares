import { Gallery } from '../index';
import { sampleImages } from '../data/sample-images';

export function ListGalleryExample() {
  return <Gallery initialImages={sampleImages} defaultView="list" />;
}
