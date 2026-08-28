import { Image } from '@godaddy/antares';

const defaultImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 180%22%3E%3Crect width=%22320%22 height=%22180%22 fill=%22%23145fa9%22/%3E%3Ctext x=%22160%22 y=%2298%22 fill=%22white%22 font-family=%22Arial%22 font-size=%2228%22 text-anchor=%22middle%22%3EGoDaddy%3C/text%3E%3C/svg%3E';

export interface PlaygroundExampleProps {
  /** A URL for the image resource. */
  src?: string;
  /** Alternative text announced for the image. */
  alt?: string;
  /** Native image loading preference. */
  loading?: 'eager' | 'lazy';
  /** The rendered image width in pixels. */
  width?: number;
  /** The rendered image height in pixels. */
  height?: number;
}

export function PlaygroundExample({
  src = defaultImage,
  alt = 'GoDaddy blue brand panel',
  loading = 'eager',
  width = 320,
  height = 180
}: PlaygroundExampleProps) {
  return <Image src={src} alt={alt} loading={loading} width={width} height={height} />;
}
