import { Grid } from '@godaddy/antares';

/**
 * Test-only host composition example.
 * @ignore
 */
export function HostCompositionExample() {
  return (
    <Grid as="span" className="custom" columns="1fr 1fr" style={{ opacity: 0.5 }}>
      Cell
    </Grid>
  );
}
