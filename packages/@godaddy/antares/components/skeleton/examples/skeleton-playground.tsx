import { Skeleton, type SkeletonRounding, type SkeletonSize } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  size?: SkeletonSize;
  rounding?: SkeletonRounding;
  width?: string;
  height?: string;
}

export function PlaygroundExample({ size = 'md', rounding = 'default', width, height }: PlaygroundExampleProps) {
  return <Skeleton size={size} rounding={rounding} width={width || undefined} height={height || undefined} />;
}
