import { Box, Detail, Flex, Heading, Icon, Image } from '@godaddy/antares';
import { appointmentsImage } from '../../constants/config';
import { DashboardCard } from '../dashboard-card';
import styles from './index.module.css';

/** Shows the appointments promotion card below the users card. */
export function AppointmentsPromotionCard() {
  return (
    <Flex direction="column" gap="lg">
      <Heading level={3}>GoDaddy can do more for you</Heading>
      <DashboardCard padding="xl" className={styles.mediaCard}>
        <Flex className={styles.mediaCardContent} alignItems="center" gap="2xl" wrap="wrap">
          <Flex className={styles.mediaCardCopy} direction="column" gap="lg" flex="1 1 14rem">
            <Flex alignItems="center" gap="sm">
              <Icon icon="calendar" aria-hidden="true" />
              <Detail emphasis="passive">ONLINE APPOINTMENTS</Detail>
            </Flex>
            <Heading level={4}>Start selling your services with online appointments</Heading>
            <Detail emphasis="passive">
              Use your professional email to simplify bookings with automated appointment confirmations and seamless
              calendar syncing.
            </Detail>
          </Flex>

          <Box className={styles.mediaCardImage} flex="0 1 11rem">
            <Image
              src={appointmentsImage}
              alt="Illustration for online appointments"
              width={176}
              height={112}
              loading="lazy"
              decoding="async"
              className={styles.mediaImage}
            />
          </Box>
        </Flex>
      </DashboardCard>
    </Flex>
  );
}
