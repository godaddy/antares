import { Box, Button, Detail, Flex, Heading, Icon, Tag, Text } from '@godaddy/antares';
import { dashboardUsers } from '../../constants/config';
import { DashboardCard } from '../dashboard-card';
import styles from './index.module.css';

/** Shows the user-management card from the dashboard composition. */
export function UsersCard() {
  return (
    <DashboardCard className={styles.usersCard}>
      <Flex direction="column" gap="lg">
        <Flex justifyContent="space-between" alignItems="center" gap="md">
          <Heading level={3}>Users</Heading>
          <Button className={styles.restoreUsersButton} variant="minimal" size="sm" aria-label="Restore deleted users">
            <Flex className={styles.restoreUsersContent} alignItems="center" gap="sm">
              <Icon icon="trash" aria-hidden="true" />
              <Text className={styles.restoreUsersLabel}>Restore deleted users</Text>
            </Flex>
          </Button>
        </Flex>

        <Flex direction="column" gap="lg">
          {dashboardUsers.map(function renderUser(user, index) {
            return (
              <Box key={user.email}>
                <Flex
                  className={styles.userRow}
                  justifyContent="space-between"
                  alignItems="center"
                  gap="lg"
                  wrap="wrap"
                >
                  <Flex direction="column" gap="xs">
                    <Flex alignItems="center" gap="sm" wrap="wrap">
                      <Text>{user.name}</Text>
                      {user.isAdmin ? (
                        <Tag emphasis="info" size="sm">
                          Admin
                        </Tag>
                      ) : null}
                    </Flex>
                    <Detail>{user.email}</Detail>
                  </Flex>

                  <Flex className={styles.userActions} alignItems="center" gap="md">
                    <Button variant="tertiary" size="sm">
                      Upgrade
                    </Button>
                    <Button variant="tertiary" size="sm">
                      Manage
                    </Button>
                  </Flex>
                </Flex>
                {index < dashboardUsers.length - 1 ? (
                  <Box as="hr" className={styles.userDivider} aria-hidden="true" />
                ) : null}
              </Box>
            );
          })}
        </Flex>
      </Flex>
    </DashboardCard>
  );
}
