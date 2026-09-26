import { Box, Grid, Text } from '@godaddy/antares';
import styles from './layout.module.css';

/**
 * CSS changes this layout from one column to two at the shared `lg` viewport threshold.
 * Leave `columns` unset so it does not place a competing value in inline styles.
 * @order 3
 */
export function ViewportLayoutExample() {
  return (
    <Grid as="section" aria-label="Viewport layout" gap="md" className={styles.viewportLayout}>
      <Box padding="md" elevation="card">
        <Text>Account settings</Text>
      </Box>
      <Box padding="md" elevation="card">
        <Text>Billing settings</Text>
      </Box>
    </Grid>
  );
}
