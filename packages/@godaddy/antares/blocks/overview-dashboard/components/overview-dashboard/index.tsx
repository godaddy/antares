'use client';

import { Box, Flex, Grid, Heading } from '@godaddy/antares';
import { useState } from 'react';
import { defaultActiveNavigationItem } from '../../constants/config';
import { AppointmentsPromotionCard } from '../appointments-promotion-card';
import { ConversationsCard } from '../conversations-card';
import { DashboardHeader } from '../dashboard-header';
import { DashboardSidebar } from '../dashboard-sidebar';
import { SalesChannelsCard } from '../sales-channels-card';
import { UsersCard } from '../users-card';
import styles from './index.module.css';

/** Renders the responsive overview dashboard block. */
export function OverviewDashboard() {
  const [activeNavigationItem, setActiveNavigationItem] = useState(defaultActiveNavigationItem);
  const [isNavigationPinnedOpen, setIsNavigationPinnedOpen] = useState(true);
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

  function openMobileNavigation() {
    setIsNavigationPinnedOpen(true);
    setIsMobileNavigationOpen(true);
  }

  function toggleNavigation() {
    if (isMobileNavigationOpen) {
      setIsMobileNavigationOpen(false);
      setIsNavigationPinnedOpen(false);
      return;
    }

    setIsNavigationPinnedOpen(function togglePinnedNavigation(isOpen) {
      return !isOpen;
    });
  }

  function handleMobileNavigationChange(isOpen: boolean) {
    setIsMobileNavigationOpen(isOpen);
    if (!isOpen) {
      setIsNavigationPinnedOpen(false);
    }
  }

  return (
    <Box className={styles.dashboardFrame}>
      <Grid className={styles.dashboardShell}>
        <DashboardSidebar
          activeItem={activeNavigationItem}
          isPinnedOpen={isNavigationPinnedOpen}
          onSelectItem={setActiveNavigationItem}
          onToggleCollapse={toggleNavigation}
          isMobileNavigationOpen={isMobileNavigationOpen}
          onMobileNavigationChange={handleMobileNavigationChange}
        />

        <Flex className={styles.dashboardMain} direction="column" gap="xl" padding="xl">
          <DashboardHeader onOpenNavigation={openMobileNavigation} />

          <Heading level={2}>Overview</Heading>

          <Grid className={styles.contentGrid} gap="xl">
            <Flex direction="column" gap="xl">
              <UsersCard />
              <AppointmentsPromotionCard />
            </Flex>

            <Flex direction="column" gap="xl">
              <SalesChannelsCard />
              <ConversationsCard />
            </Flex>
          </Grid>
        </Flex>
      </Grid>
    </Box>
  );
}
