import { Flex, Icon, Text } from '@godaddy/antares';
import styles from './index.module.css';

interface DropOverlayProps {
  /** Whether an accepted file is currently over the inquiry form. */
  isDropTarget: boolean;
}

/** Shows the green drop feedback while files are over the inquiry form. */
export function DropOverlay({ isDropTarget }: DropOverlayProps) {
  if (!isDropTarget) return null;

  return (
    <Flex
      role="status"
      aria-live="polite"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="sm"
      padding="xl"
      className={styles.overlay}
    >
      <Icon icon="upload" aria-hidden="true" />
      <Text as="strong">Drop Files to upload.</Text>
    </Flex>
  );
}
