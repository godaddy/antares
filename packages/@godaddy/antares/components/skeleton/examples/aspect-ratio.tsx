import { Grid, Skeleton } from '@godaddy/antares';

const ratios = ['16 / 9', '4 / 3', '1', '3 / 4', '9 / 16'] as const;

/**
 * Set `aspectRatio` for images and other media. The height follows the width, so the placeholder
 * keeps its proportions at any size.
 * @title Aspect ratio
 * @order 5
 */
export function AspectRatioExample() {
  return (
    <Grid columns={`repeat(${ratios.length}, 1fr)`} gap="md" alignItems="end">
      {ratios.map(function renderRatio(ratio) {
        return <Skeleton key={ratio} aspectRatio={ratio} />;
      })}
    </Grid>
  );
}
