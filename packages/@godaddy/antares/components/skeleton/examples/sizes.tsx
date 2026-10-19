import { Grid, Skeleton, Text } from '@godaddy/antares';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

/**
 * Size presets set the height, from `xs` (0.75rem) to `2xl` (3.5rem). They suit text and basic
 * controls such as inputs and buttons.
 * @order 2
 */
export function SizesExample() {
  return (
    <Grid columns="2.5rem 1fr" alignItems="center" gap="md">
      {sizes.map(function renderSize(size) {
        return [<Text key={`${size}-label`}>{size}</Text>, <Skeleton key={size} size={size} />];
      })}
    </Grid>
  );
}
