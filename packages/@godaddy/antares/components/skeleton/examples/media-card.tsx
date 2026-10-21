import { Card, Flex, Grid, Skeleton } from '@godaddy/antares';

/**
 * Compose Skeletons inside a Card to preview media and text.
 * @title Media card
 * @order 8
 */
export function MediaCardExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card>
        <Skeleton aspectRatio="16 / 9" />
        <Flex direction="column" gap="sm">
          <Skeleton size="lg" width="60%" />
          <Skeleton size="sm" />
          <Skeleton size="sm" width="80%" />
        </Flex>
      </Card>

      <Card>
        <Grid columns="6rem 1fr" gap="lg" alignItems="center">
          <Skeleton aspectRatio={1} />
          <Flex direction="column" gap="sm">
            <Skeleton size="lg" width="70%" />
            <Skeleton size="sm" />
            <Skeleton size="sm" width="50%" />
          </Flex>
        </Grid>
      </Card>
    </Grid>
  );
}
