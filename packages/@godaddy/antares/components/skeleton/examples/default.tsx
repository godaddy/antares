import { Skeleton, type SkeletonProps } from '@godaddy/antares';

/**
 * A Skeleton fills the width of its container at the `md` height.
 * @order 1
 */
export function DefaultExample(props: SkeletonProps) {
  return <Skeleton {...props} />;
}
