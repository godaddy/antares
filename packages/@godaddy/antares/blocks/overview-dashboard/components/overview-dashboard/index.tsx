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
  const [isNavigationHovered, setIsNavigationHovered] = useState(false);
  const [isNavigationHoverSuppressed, setIsNavigationHoverSuppressed] = useState(false);
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

    if (isNavigationPinnedOpen) {
      setIsNavigationHoverSuppressed(isNavigationHovered);
      setIsNavigationHovered(false);
    }

    setIsNavigationPinnedOpen(function togglePinnedNavigation(isOpen) {
      return !isOpen;
    });
  }

  function handleNavigationHoverChange(isHovering: boolean) {
    if (!isHovering) {
      setIsNavigationHoverSuppressed(false);
      setIsNavigationHovered(false);
      return;
    }

    if (!isNavigationHoverSuppressed) {
      setIsNavigationHovered(true);
    }
  }

  function handleMobileNavigationChange(isOpen: boolean) {
    setIsMobileNavigationOpen(isOpen);
  }

  const isNavigationExpanded = isNavigationPinnedOpen || isNavigationHovered;

  return (
    <Box ref={dashboardFrameRef} className={styles.dashboardFrame}>
      <Grid className={styles.dashboardShell} data-navigation-pinned-open={isNavigationPinnedOpen || undefined}>
        <DashboardSidebar
          activeItem={activeNavigationItem}
          isPinnedOpen={isNavigationPinnedOpen}
          onSelectItem={setActiveNavigationItem}
          onToggleCollapse={toggleNavigation}
          isNavigationExpanded={isNavigationExpanded}
          onNavigationHoverChange={handleNavigationHoverChange}
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
