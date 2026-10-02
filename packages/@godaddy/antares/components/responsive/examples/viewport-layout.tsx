import { Box, Grid, Text } from '@godaddy/antares';

/**
 * CSS changes this layout from one column to two at the shared `lg` viewport threshold.
 * Leave `columns` unset so it does not place a competing value in inline styles.
 * @order 3
 */
export function ViewportLayoutExample() {
  return (
    <>
      <style>{`
        .responsive-viewport-example {
          grid-template-columns: minmax(0, 1fr);
        }

        @media (min-width: 64rem) {
          .responsive-viewport-example {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
      <Grid as="section" aria-label="Viewport layout" gap="md" className="responsive-viewport-example">
        <Box padding="md" elevation="card">
          <Text>Account settings</Text>
        </Box>
        <Box padding="md" elevation="card">
          <Text>Billing settings</Text>
        </Box>
      </Grid>
    </>
  );
}
