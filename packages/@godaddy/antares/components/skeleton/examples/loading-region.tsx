import { Flex, Grid, Skeleton } from '@godaddy/antares';

/**
 * Skeletons are hidden from assistive technology. Mark the region they fill with `role="status"`,
 * `aria-busy`, and an `aria-label`, then set `aria-busy` to `false` when the content arrives.
 * @title Loading region
 * @order 9
 */
export function LoadingRegionExample() {
  return (
    <Grid role="status" aria-busy="true" aria-label="Loading profile" columns="auto 1fr" gap="md" alignItems="center">
      <Skeleton size="xl" width="xl" rounding="full" />
      <Flex direction="column" gap="sm">
        <Skeleton size="sm" width="40%" />
        <Skeleton size="xs" width="25%" />
      </Flex>
    </Grid>
  );
}
