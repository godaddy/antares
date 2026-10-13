'use client';

import { Box, Flex, Grid, Heading } from '@godaddy/antares';
import { useEffect, useRef, useState } from 'react';
import { defaultActiveNavigationItem, type DashboardNavigationItemLabel } from '../../constants/config';
import { AppointmentsPromotionCard } from '../appointments-promotion-card';
import { ConversationsCard } from '../conversations-card';
import { DashboardHeader } from '../dashboard-header';
import { DashboardSidebar } from '../dashboard-sidebar';
import { SalesChannelsCard } from '../sales-channels-card';
import { UsersCard } from '../users-card';
import styles from './index.module.css';

/** Renders the responsive overview dashboard block. */
export function OverviewDashboard() {
  const dashboardFrameRef = useRef<HTMLDivElement>(null);
  const [activeNavigationItem, setActiveNavigationItem] =
    useState<DashboardNavigationItemLabel>(defaultActiveNavigationItem);
  const [isNavigationPinnedOpen, setIsNavigationPinnedOpen] = useState(true);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

  useEffect(function observeDashboardLayout() {
    const frame = dashboardFrameRef.current;
    if (!frame) {
      return undefined;
    }
    const observedFrame = frame;

    function syncDashboardLayout() {
      const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const isCompact = observedFrame.getBoundingClientRect().width <= 40 * rootFontSize;

      setIsCompactLayout(function preserveStableLayout(current) {
        return current === isCompact ? current : isCompact;
      });
    }

    syncDashboardLayout();
    const observer = new ResizeObserver(syncDashboardLayout);
    observer.observe(observedFrame);

    return function disconnectDashboardLayoutObserver() {
      observer.disconnect();
    };
  }, []);

  useEffect(
    function closeMobileNavigationOnDesktopLayout() {
      if (!isCompactLayout) {
        setIsMobileNavigationOpen(false);
      }
    },
    [isCompactLayout]
  );

  function openMobileNavigation() {
    setIsMobileNavigationOpen(true);
  }

  function toggleNavigation() {
    if (isMobileNavigationOpen) {
      setIsMobileNavigationOpen(false);
      return;
    }

    setIsNavigationPinnedOpen(function togglePinnedNavigation(isOpen) {
      return !isOpen;
    });
  }

  function handleMobileNavigationChange(isOpen: boolean) {
    setIsMobileNavigationOpen(isOpen);
  }

  return (
    <Box ref={dashboardFrameRef} className={styles.dashboardFrame}>
      <Grid className={styles.dashboardShell}>
        <DashboardSidebar
          activeItem={activeNavigationItem}
          isPinnedOpen={isNavigationPinnedOpen}
          onSelectItem={setActiveNavigationItem}
          onToggleCollapse={toggleNavigation}
          isMobileNavigationOpen={isCompactLayout && isMobileNavigationOpen}
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
