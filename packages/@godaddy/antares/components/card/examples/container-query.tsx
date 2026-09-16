import { Box, Card, Flex, Heading, Image, Text } from '@godaddy/antares';
import styles from './container-query.module.css';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 240%22%3E%3Crect width=%22320%22 height=%22240%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22220%22 cy=%2270%22 r=%2250%22 fill=%22%234ecdc4%22/%3E%3C/svg%3E';

/** Use a consumer container query to change composition at the width available to the Card. */
export function ContainerQueryExample() {
  return (
    <Box className={styles.container} data-testid="container-query-container">
      <Card direction="column" gap="lg" className={styles.card} data-testid="container-query-card">
        <Image
          slot="media"
          src={image}
          alt="Blue abstract landscape"
          width="320"
          height="240"
          data-testid="container-query-media"
        />
        <Flex direction="column" gap="sm" flexGrow={1} data-testid="container-query-content">
          <Heading level={3}>Container-owned responsiveness</Heading>
          <Text>The surrounding container decides when this composition stacks or becomes horizontal.</Text>
        </Flex>
      </Card>
    </Box>
  );
}
