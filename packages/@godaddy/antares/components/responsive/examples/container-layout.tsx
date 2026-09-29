import { Box, Grid, Text } from '@godaddy/antares';

interface ContainerLayoutExampleProps {
  width?: number;
}

/**
 * The cards respond to their named container, independently of the viewport. The local
 * 30rem threshold belongs to this layout, not the shared viewport scale.
 * @order 4
 */
export function ContainerLayoutExample({ width = 640 }: ContainerLayoutExampleProps) {
  return (
    <>
      <style>{`
        .responsive-container-example {
          container: responsive-example / inline-size;
          inline-size: 100%;
        }

        .responsive-container-example-grid {
          grid-template-columns: minmax(0, 1fr);
        }

        @container responsive-example (min-width: 30rem) {
          .responsive-container-example-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
      <Box className="responsive-container-example" style={{ maxInlineSize: width }}>
        <Grid as="section" aria-label="Container layout" gap="md" className="responsive-container-example-grid">
          <Box padding="md" elevation="card">
            <Text>Account settings</Text>
          </Box>
          <Box padding="md" elevation="card">
            <Text>Billing settings</Text>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
