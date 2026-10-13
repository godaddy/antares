import { Button, Flex, Heading, Tag, Text } from '@godaddy/antares';
import { DashboardCard } from '../dashboard-card';
import styles from './index.module.css';

/** Demonstrates a secondary conversations card with a connection action. */
export function ConversationsCard() {
  return (
    <DashboardCard className={styles.conversationsCard}>
      <Flex direction="column" gap="md">
        <Flex justifyContent="space-between" alignItems="center" gap="md">
          <Heading level={4}>Conversations</Heading>
          <Tag emphasis="info" size="sm">
            Included
          </Tag>
        </Flex>
        <Text>Manage all your emails and messages in one place with a unified inbox.</Text>
        <Button variant="secondary" size="sm">
          Connect Email
        </Button>
      </Flex>
    </DashboardCard>
  );
}
