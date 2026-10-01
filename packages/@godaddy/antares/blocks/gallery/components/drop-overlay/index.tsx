import { Box, Flex, Icon, Text } from '@godaddy/antares';
import styles from './index.module.css';

interface DropOverlayProps {
  /** Whether an accepted file is currently over the gallery. */
  isDropTarget: boolean;
}

/** Shows the green drop feedback while files are over the gallery. */
export function DropOverlay({ isDropTarget }: DropOverlayProps) {
  if (!isDropTarget) return null;

  return (
    <Box role="status" aria-live="polite" aria-label="Drop Files to upload." className={styles.overlay}>
      <Flex direction="column" alignItems="center" gap="sm" padding="xl">
        <Icon icon="upload" aria-hidden="true" />
        <Text as="strong">Drop Files to upload.</Text>
      </Flex>
    </Box>
  );
}
