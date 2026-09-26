import { Box, Grid, Text } from '@godaddy/antares';
import styles from './layout.module.css';

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
    <Box className={styles.container} style={{ maxInlineSize: width }}>
      <Grid as="section" aria-label="Container layout" gap="md" className={styles.containerLayout}>
        <Box padding="md" elevation="card">
          <Text>Account settings</Text>
        </Box>
        <Box padding="md" elevation="card">
          <Text>Billing settings</Text>
        </Box>
      </Grid>
    </Box>
  );
}
