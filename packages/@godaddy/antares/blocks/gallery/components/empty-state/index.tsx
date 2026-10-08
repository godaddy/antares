import { Box, Flex, Heading, Icon, Text } from '@godaddy/antares';
import styles from './index.module.css';

/** Welcomes users to an empty gallery and points them to the upload action. */
export function EmptyState() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="sm"
      padding="2xl"
      role="region"
      aria-label="Empty gallery"
      className={styles.emptyState}
    >
      <Box padding="md" rounding="full" aria-hidden="true" className={styles.iconSurface}>
        <Icon icon="upload" />
      </Box>
      <Heading level={3}>Start your gallery</Heading>
      <Text className={styles.description}>Drop images here or choose Add files above to upload.</Text>
    </Flex>
  );
}
