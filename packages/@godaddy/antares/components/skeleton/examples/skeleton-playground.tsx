import { Skeleton, type SkeletonRounding, type SkeletonSize } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  size?: SkeletonSize;
  rounding?: SkeletonRounding;
  width?: string;
  height?: string;
  aspectRatio?: string;
}

export function PlaygroundExample({
  size = 'md',
  rounding = 'default',
  width,
  height,
  aspectRatio
}: PlaygroundExampleProps) {
  return (
    <Skeleton
      size={size}
      rounding={rounding}
      width={width || undefined}
      height={height || undefined}
      aspectRatio={aspectRatio || undefined}
    />
  );
}
