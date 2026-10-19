import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,l as i,s as a,u as o}from"./blocks-CZtzCCg_.js";import{n as s}from"./runtime-DQgsNdQi.js";import{n as c,t as l}from"./storybook-runtime-C2ydQXSQ.js";import{n as u,t as d}from"./overview-dashboard.stories-Cd0dGVo-.js";import{n as f,t as p}from"./sign-in-form.stories-vX0FDI19.js";import{r as m,t as h}from"./gallery.stories-Dr3wYzVL.js";import{n as g,t as _}from"./project-inquiry-form.stories-C3n9vEy3.js";function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...r(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(a,{title:`Blocks`,id:`blocks`}),`
`,(0,b.jsx)(t.h1,{id:`build-product-experiences-with-antares`,children:`Build product experiences with Antares.`}),`
`,(0,b.jsx)(t.p,{children:`Discover complete UI patterns, inspect how they are built, and use them as a foundation for your product.`}),`
`,(0,b.jsx)(t.h2,{id:`install-a-block`,children:`Install a block`}),`
`,(0,b.jsx)(t.p,{children:`From the root of your application, run the command copied by the block's Install button:`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-bash`,children:`npx shadcn@latest add godaddy/antares/blocks/sign-in-form
`})}),`
`,(0,b.jsx)(t.h2,{id:`blocks`,children:`Blocks`}),`
`,(0,b.jsx)(t.h3,{id:`overview-dashboard`,children:`Overview dashboard`}),`
`,(0,b.jsx)(l,{block:{id:`overview-dashboard`,description:`A responsive Antares overview dashboard with users, sales channels, and conversations.`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/overview-dashboard`,files:[{path:`components/appointments-promotion-card/index.module.css`,language:`css`,source:`.mediaCard {
  min-inline-size: 0;
}

.mediaImage {
  display: block;
  max-inline-size: 100%;
  block-size: auto;
  border-radius: var(--rounding-sm);
}

.mediaCardContent,
.mediaCardCopy,
.mediaCardImage {
  min-inline-size: 0;
}
`},{path:`components/appointments-promotion-card/index.tsx`,language:`tsx`,source:`import { Box, Card, Detail, Flex, Heading, Icon, Image } from '@godaddy/antares';
import { appointmentsImage } from '../../constants/config';
import styles from './index.module.css';

/** Shows the appointments promotion card below the users card. */
export function AppointmentsPromotionCard() {
  return (
    <Flex direction="column" gap="lg">
      <Heading level={3}>GoDaddy can do more for you</Heading>
      <Card padding="xl" elevation="card" className={styles.mediaCard}>
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
              alt=""
              width={176}
              height={112}
              loading="lazy"
              decoding="async"
              className={styles.mediaImage}
            />
          </Box>
        </Flex>
      </Card>
    </Flex>
  );
}
`},{path:`components/conversations-card/index.module.css`,language:`css`,source:`.conversationsCard {
  min-inline-size: 0;
}
`},{path:`components/conversations-card/index.tsx`,language:`tsx`,source:`import { Button, Card, Flex, Heading, Tag, Text } from '@godaddy/antares';
import styles from './index.module.css';

/** Demonstrates a secondary conversations card with a connection action. */
export function ConversationsCard() {
  return (
    <Card elevation="card" className={styles.conversationsCard}>
      <Flex direction="column" gap="md">
        <Flex justifyContent="space-between" alignItems="center" gap="md">
          <Heading level={3}>Conversations</Heading>
          <Tag emphasis="info" size="sm">
            Included
          </Tag>
        </Flex>
        <Text>Manage all your emails and messages in one place with a unified inbox.</Text>
        <Button variant="secondary" size="sm">
          Connect Email
        </Button>
      </Flex>
    </Card>
  );
}
`},{path:`components/dashboard-header/index.module.css`,language:`css`,source:`.mobileMenuButton,
.mobileNavLogo,
.mobileNavAction {
  display: none;
}

.navDivider {
  block-size: 1.25rem;
  border-inline-start: 1px solid var(--color-surface-border-base, var(--ux-97h3vl, #d4dbe0));
}

.navigation {
  gap: var(--sp-lg);
}

.navActions {
  gap: var(--sp-md);
}

@container (max-width: 40rem) {
  .mobileMenuButton,
  .mobileNavLogo,
  .mobileNavAction {
    display: inline-flex;
  }

  .desktopNavAction,
  .navDivider {
    display: none;
  }

  .navigation,
  .navActions {
    gap: var(--sp-sm);
  }
}
`},{path:`components/dashboard-header/index.tsx`,language:`tsx`,source:`import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Pressable,
  Text
} from '@godaddy/antares';
import styles from './index.module.css';

interface DashboardHeaderProps {
  /** Opens the product navigation from the compact mobile header. */
  onOpenNavigation: () => void;
}

/** Renders the compact application header shown above the dashboard. */
export function DashboardHeader({ onOpenNavigation }: DashboardHeaderProps) {
  return (
    <Flex className={styles.navigation} justifyContent="space-between" alignItems="center" wrap="wrap">
      <Flex alignItems="center" gap="lg">
        <Button
          className={styles.mobileMenuButton}
          variant="minimal"
          size="sm"
          aria-label="Open navigation"
          onPress={onOpenNavigation}
        >
          <Icon icon="hamburger" aria-hidden="true" />
        </Button>
        <Icon className={styles.mobileNavLogo} icon="gd-the-go" aria-label="GoDaddy" />
      </Flex>

      <Flex className={styles.navActions} alignItems="center" wrap="wrap">
        <Button className={styles.desktopNavAction} variant="minimal" size="sm" aria-label="Hire an Expert">
          Hire an Expert
        </Button>
        <Box as="span" className={styles.navDivider} aria-hidden="true" />
        <Button className={styles.desktopNavAction} variant="minimal" size="sm" aria-label="Help Center">
          Help Center
        </Button>
        <Button className={styles.mobileNavAction} variant="minimal" size="sm" aria-label="Help Center">
          <Icon icon="help" aria-hidden="true" />
        </Button>
        <Button className={styles.desktopNavAction} variant="minimal" size="sm" aria-label="Notifications">
          <Icon icon="bell" aria-hidden="true" />
        </Button>
        <Button className={styles.mobileNavAction} variant="minimal" size="sm" aria-label="Apps">
          <Icon icon="apps" aria-hidden="true" />
        </Button>
        <MenuTrigger popoverProps={{ placement: 'bottom end' }}>
          <Pressable aria-label="Account menu">
            <Avatar size="sm" emphasis="primary" role="button">
              <Text>MT</Text>
            </Avatar>
          </Pressable>
          <Menu aria-label="Account actions">
            <MenuItem id="profile">View profile</MenuItem>
            <MenuItem id="settings">Account settings</MenuItem>
            <MenuItem id="switch-account">Switch account</MenuItem>
            <MenuSeparator />
            <MenuItem id="sign-out">Sign out</MenuItem>
          </Menu>
        </MenuTrigger>
        <Button variant="minimal" size="sm" aria-label="Shopping cart">
          <Icon icon="cart" aria-hidden="true" />
        </Button>
      </Flex>
    </Flex>
  );
}
`},{path:`components/dashboard-sidebar-content/index.module.css`,language:`css`,source:`.content {
  inline-size: 100%;
  --navigation-rail-size: 56px;
}

.navigationHeader {
  padding-inline-end: var(--sp-sm, 0.25rem);
  padding-inline-start: calc((var(--navigation-rail-size) - 24px) / 2);
}

.sideNavigationLogo,
.navigationToggle {
  flex-shrink: 0;
}

:where([data-collapsed]):where(:not([data-expanded])) .navigationToggle,
:where([data-collapsed]):where(:not([data-expanded])) .sideNavContent {
  display: none;
}

.sideNavItem {
  justify-content: flex-start;
  inline-size: 100%;
  padding-inline-end: var(--sp-md, 0.5rem);
  padding-inline-start: calc((var(--navigation-rail-size) - 1lh) / 2 - 1px);
  position: relative;
  text-align: start;
}

.sideNavItem::before {
  background: transparent;
  border-radius: var(--rounding-full);
  content: "";
  inset-block: 0;
  inset-inline-start: 0;
  position: absolute;
  width: var(--sp-sm);
}

.sideNavItem:where([aria-pressed="true"]) {
  background: var(--ux-9i7okd, #f5f7f8);
  font-weight: 600;
}

.sideNavItem:where([aria-pressed="true"]):where([data-hovered]) {
  background: var(--color-action-background-tertiary-hovered, var(--ux-1m7qrkf, #f5f5f5));
  color: var(--color-action-text-tertiary-hovered, var(--ux-unx9i2, #008080));
}

.sideNavItem:where([aria-pressed="true"]):where([data-pressed]) {
  background: var(--color-action-background-tertiary-pressed, var(--ux-9qpf6c, #dcdcdc));
  color: var(--color-action-text-tertiary-pressed, var(--ux-h6e7c1, #191970));
}

.sideNavItem:where([aria-pressed="true"])::before {
  background: var(--ux-18lg5k, #a6fff8);
}

.sideNavContent {
  min-inline-size: 0;
}

.sideNavLabel {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sideNavIcon {
  display: inline-flex;
  flex-shrink: 0;
}
`},{path:`components/dashboard-sidebar-content/index.tsx`,language:`tsx`,source:`import { Button, Flex, Icon, Tag, Text } from '@godaddy/antares';
import { dashboardNavigationItems, type DashboardNavigationItemLabel } from '../../constants/config';
import styles from './index.module.css';

interface DashboardSidebarContentProps {
  /** Item label that receives the active marker. */
  activeItem: DashboardNavigationItemLabel;

  /** Whether the desktop rail is pinned open. */
  isPinnedOpen: boolean;

  /** Whether the content is rendered inside the mobile drawer. */
  isMobileNavigation?: boolean;

  /** Selects a menu item without navigating the example. */
  onSelectItem: (label: DashboardNavigationItemLabel) => void;

  /** Toggles the desktop rail or closes the mobile navigation. */
  onToggleCollapse: () => void;
}

/** Renders the shared navigation content used by desktop and mobile navigation. */
export function DashboardSidebarContent({
  activeItem,
  isPinnedOpen,
  isMobileNavigation = false,
  onSelectItem,
  onToggleCollapse
}: DashboardSidebarContentProps) {
  const navigationToggleLabel = isMobileNavigation
    ? 'Close navigation'
    : isPinnedOpen
      ? 'Collapse navigation'
      : 'Expand navigation';

  return (
    <Flex className={styles.content} direction="column" gap="xl">
      <Flex className={styles.navigationHeader} justifyContent="space-between" alignItems="center" gap="md">
        <Icon className={styles.sideNavigationLogo} icon="gd-the-go" aria-label="GoDaddy" />
        <Button
          className={styles.navigationToggle}
          variant="minimal"
          size="sm"
          aria-label={navigationToggleLabel}
          onPress={onToggleCollapse}
        >
          <Icon icon={isPinnedOpen ? 'sidebar-collapse' : 'sidebar-expand'} aria-hidden="true" />
        </Button>
      </Flex>

      <Flex direction="column" gap="sm">
        {dashboardNavigationItems.map(function renderNavigationItem(item) {
          const isActive = activeItem === item.label;

          return (
            <Button
              key={item.label}
              className={styles.sideNavItem}
              variant="minimal"
              size="sm"
              aria-pressed={isActive}
              aria-label={!isPinnedOpen ? item.label : undefined}
              onPress={() => onSelectItem(item.label)}
            >
              <Icon className={styles.sideNavIcon} icon={item.icon} aria-hidden="true" />
              <Flex className={styles.sideNavContent} flex="1" alignItems="center" justifyContent="flex-start" gap="sm">
                <Text className={styles.sideNavLabel}>{item.label}</Text>
                {'badge' in item && item.badge ? (
                  <Tag emphasis="highlight" size="sm">
                    {item.badge}
                  </Tag>
                ) : null}
              </Flex>
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
}
`},{path:`components/dashboard-sidebar/index.module.css`,language:`css`,source:`.sideNavigationContainer {
  align-self: stretch;
  background: var(--ux-9i7okd, #f5f7f8);
  block-size: auto;
  min-inline-size: 0;
  overflow: visible;
  position: relative;
}

.sideNavigation {
  background: var(--ux-9i7okd, #f5f7f8);
  block-size: 100%;
  inline-size: 100%;
  min-inline-size: 0;
  overflow: hidden;
  padding-block-start: var(--sp-md, 0.5rem);
  transition: inline-size 300ms cubic-bezier(0.32, 0.72, 0, 1);
}

.sideNavigationContainer:where([data-expanded]) {
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  .sideNavigation {
    transition: none;
  }
}

@container (max-width: 40rem) {
  .sideNavigationContainer {
    display: none;
  }
}
`},{path:`components/dashboard-sidebar/index.tsx`,language:`tsx`,source:`import { Content, Drawer, Flex, InlineDrawer } from '@godaddy/antares';
import type { DashboardNavigationItemLabel } from '../../constants/config';
import { DashboardSidebarContent } from '../dashboard-sidebar-content';
import styles from './index.module.css';

interface DashboardSidebarProps {
  /** Item label that receives the active marker. */
  activeItem: DashboardNavigationItemLabel;

  /** Whether the navigation is pinned open on desktop. */
  isPinnedOpen: boolean;

  /** Selects a menu item without navigating the example. */
  onSelectItem: (label: DashboardNavigationItemLabel) => void;

  /** Toggles the desktop rail or closes the mobile navigation. */
  onToggleCollapse: () => void;

  /** Whether the desktop rail is expanded by a temporary hover state. */
  isNavigationExpanded: boolean;

  /** Keeps the desktop rail width in sync with its hover state. */
  onNavigationHoverChange: (isHovering: boolean) => void;

  /** Whether the mobile drawer is currently open. */
  isMobileNavigationOpen: boolean;

  /** Keeps the mobile drawer state controlled by the parent. */
  onMobileNavigationChange: (isOpen: boolean) => void;
}

/** Renders the responsive desktop rail and mobile navigation drawer. */
export function DashboardSidebar({
  activeItem,
  isPinnedOpen,
  onSelectItem,
  onToggleCollapse,
  isNavigationExpanded,
  onNavigationHoverChange,
  isMobileNavigationOpen,
  onMobileNavigationChange
}: DashboardSidebarProps) {
  return (
    <>
      <InlineDrawer
        className={styles.sideNavigationContainer}
        placement="left"
        isExpanded={isNavigationExpanded}
        onMouseEnter={() => onNavigationHoverChange(true)}
        onMouseLeave={() => onNavigationHoverChange(false)}
        minSize={56}
        maxSize={224}
        data-collapsed={!isPinnedOpen || undefined}
      >
        <Flex as="nav" className={styles.sideNavigation} direction="column" aria-label="Product navigation">
          <DashboardSidebarContent
            activeItem={activeItem}
            isPinnedOpen={isPinnedOpen}
            onSelectItem={onSelectItem}
            onToggleCollapse={onToggleCollapse}
          />
        </Flex>
      </InlineDrawer>

      <Drawer
        placement="left"
        isOpen={isMobileNavigationOpen}
        onOpenChange={onMobileNavigationChange}
        isDismissable
        maxSize={224}
        aria-label="Product navigation"
      >
        <Content role="navigation" aria-label="Product navigation" padding="lg">
          <DashboardSidebarContent
            activeItem={activeItem}
            isPinnedOpen
            isMobileNavigation
            onSelectItem={onSelectItem}
            onToggleCollapse={onToggleCollapse}
          />
        </Content>
      </Drawer>
    </>
  );
}
`},{path:`components/overview-dashboard/index.module.css`,language:`css`,source:`.dashboardFrame {
  container-type: inline-size;
  inline-size: 100%;
  block-size: 100%;
}

.dashboardShell {
  grid-template-columns: 56px minmax(0, 1fr);
  gap: var(--sp-xl);
  min-block-size: 100%;
  min-inline-size: 0;
  transition: grid-template-columns 300ms cubic-bezier(0.32, 0.72, 0, 1);
}

.dashboardShell:where([data-navigation-pinned-open]) {
  grid-template-columns: 224px minmax(0, 1fr);
}

.dashboardMain {
  align-items: center;
  min-block-size: 100%;
  min-inline-size: 0;
}

.dashboardContent {
  box-sizing: border-box;
  inline-size: 100%;
  max-inline-size: 80rem;
}

.contentGrid {
  grid-template-columns: minmax(0, 2.25fr) minmax(17.5rem, 1fr);
}

@media (prefers-reduced-motion: reduce) {
  .dashboardShell {
    transition: none;
  }
}

@container (max-width: 56rem) {
  .contentGrid {
    grid-template-columns: 1fr;
  }
}

@container (max-width: 40rem) {
  .dashboardShell {
    grid-template-columns: 1fr;
  }
}
`},{path:`components/overview-dashboard/index.tsx`,language:`tsx`,source:`'use client';

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

        <Flex className={styles.dashboardMain} direction="column">
          <Flex className={styles.dashboardContent} direction="column" gap="xl" padding="xl">
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
        </Flex>
      </Grid>
    </Box>
  );
}
`},{path:`components/sales-channels-card/index.module.css`,language:`css`,source:`.salesCardMeasure {
  min-inline-size: 0;
}
`},{path:`components/sales-channels-card/index.tsx`,language:`tsx`,source:`import { Card, DonutChart, Flex, Heading } from '@godaddy/antares';
import { salesChannelData } from '../../constants/config';
import styles from './index.module.css';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

const totalSales = salesChannelData.reduce(function sumSales(total, channel) {
  return total + channel.value;
}, 0);

const salesChannelAriaLabel = [
  'Sales by sales channels donut chart',
  ...salesChannelData.map(function describeChannel(channel) {
    return \`\${channel.name}: \${formatCurrency(channel.value)}\`;
  })
].join('. ');

/** Demonstrates sales-channel performance with a responsive donut chart. */
export function SalesChannelsCard() {
  return (
    <Card elevation="card" className={styles.salesCardMeasure}>
      <Flex direction="column" gap="lg">
        <Heading level={3}>Sales by Sales Channels</Heading>
        <DonutChart
          data={salesChannelData}
          label={formatNumber(totalSales)}
          subLabel="USD"
          legend="bottom"
          formatValue={formatCurrency}
          aria-label={salesChannelAriaLabel}
        />
      </Flex>
    </Card>
  );
}
`},{path:`components/users-card/index.module.css`,language:`css`,source:`.usersCard {
  min-inline-size: 0;
}

.userRow {
  align-items: center;
}

.userDivider {
  border: 0;
  border-block-start: 1px solid var(--color-surface-border-base, var(--ux-97h3vl, #d4dbe0));
  margin-block: var(--sp-md);
}

@container (max-width: 40rem) {
  .restoreUsersLabel {
    display: none;
  }

  .userRow {
    align-items: flex-start;
  }

  .userActions {
    inline-size: 100%;
    justify-content: flex-end;
  }
}
`},{path:`components/users-card/index.tsx`,language:`tsx`,source:`import { Box, Button, Card, Detail, Flex, Heading, Icon, Tag, Text } from '@godaddy/antares';
import { dashboardUsers } from '../../constants/config';
import styles from './index.module.css';

/** Shows the user-management card from the dashboard composition. */
export function UsersCard() {
  return (
    <Card elevation="card" className={styles.usersCard}>
      <Flex direction="column" gap="lg">
        <Flex justifyContent="space-between" alignItems="center" gap="md">
          <Heading level={3}>Users</Heading>
          <Button variant="minimal" size="sm" aria-label="Restore deleted users">
            <Flex alignItems="center" gap="sm">
              <Icon icon="trash" aria-hidden="true" />
              <Text className={styles.restoreUsersLabel}>Restore deleted users</Text>
            </Flex>
          </Button>
        </Flex>

        <Flex direction="column" gap="lg">
          {dashboardUsers.map(function renderUser(user, index) {
            return (
              <Box key={user.email}>
                <Flex className={styles.userRow} justifyContent="space-between" gap="lg" wrap="wrap">
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
                    <Button variant="tertiary" size="sm" aria-label={\`Upgrade \${user.name}\`}>
                      Upgrade
                    </Button>
                    <Button variant="tertiary" size="sm" aria-label={\`Manage \${user.name}\`}>
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
    </Card>
  );
}
`},{path:`constants/config.ts`,language:`ts`,source:`import type { DonutChartProps } from '@godaddy/antares';

/** Navigation entries shown by the dashboard shell. */
export const dashboardNavigationItems = [
  { label: 'Dashboard', icon: 'dashboard' },
  { label: 'Advanced Email Security', icon: 'mail-lock' },
  { label: 'Add-Ons', icon: 'addon' },
  { label: 'My Brand', icon: 'color-palette' },
  { label: 'Deals', icon: 'deals', badge: 'New' }
] as const satisfies readonly { label: string; icon: string; badge?: string }[];

export type DashboardNavigationItemLabel = (typeof dashboardNavigationItems)[number]['label'];

/** Initial dashboard navigation item. */
export const defaultActiveNavigationItem: DashboardNavigationItemLabel = dashboardNavigationItems[0].label;

/** User rows displayed by the dashboard's Users card. */
export const dashboardUsers = [
  { name: 'John Doe', email: 'john@cakebake.com', isAdmin: true },
  { name: 'Jane Smith', email: 'jane@cakebake.com', isAdmin: false }
] as const;

/** Sales-channel slices displayed by the responsive chart. */
export const salesChannelData = [
  { id: 'shopify', name: 'Shopify', value: 400 },
  { id: 'facebook-marketplace', name: 'Facebook Marketplace', value: 300 },
  { id: 'instagram', name: 'Instagram', value: 200 },
  { id: 'other', name: 'Other', value: 100 }
] satisfies DonutChartProps['data'];

/** Self-contained local image used by the appointments promotion card. */
export const appointmentsImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 176 112%22%3E%3Cdefs%3E%3ClinearGradient id=%22bg%22 x1=%220%22 y1=%220%22 x2=%221%22 y2=%221%22%3E%3Cstop stop-color=%22%2302242a%22/%3E%3Cstop offset=%221%22 stop-color=%22%2309757a%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22176%22 height=%22112%22 rx=%228%22 fill=%22url(%23bg)%22/%3E%3Ccircle cx=%22134%22 cy=%2230%22 r=%2230%22 fill=%22%23d6f5f1%22 opacity=%22.8%22/%3E%3Cpath d=%22M0 86c30-26 54-16 82-34 26-17 41-6 94 26v34H0z%22 fill=%22%23f4b7d7%22 opacity=%22.85%22/%3E%3Cpath d=%22M0 93c27-11 49-5 79-20 24-12 58 3 97 17v22H0z%22 fill=%22%23f7c84b%22 opacity=%22.9%22/%3E%3Ctext x=%2288%22 y=%2262%22 fill=%22white%22 font-family=%22Arial,sans-serif%22 font-size=%2212%22 text-anchor=%22middle%22%3Eappointments%3C/text%3E%3C/svg%3E';
`},{path:`index.tsx`,language:`tsx`,source:`export { OverviewDashboard } from './components/overview-dashboard';
`}]},children:(0,b.jsx)(i,{of:d,inline:!0})}),`
`,(0,b.jsx)(t.h3,{id:`project-inquiry-form`,children:`Project inquiry form`}),`
`,(0,b.jsx)(l,{block:{id:`project-inquiry-form`,description:`A responsive project inquiry page with local file previews.`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/project-inquiry-form`,files:[{path:`components/attached-files/index.module.css`,language:`css`,source:`.row {
  inline-size: 100%;
  max-inline-size: 45.625rem;
}

.details {
  min-inline-size: 0;
  padding-inline-end: var(--size-space-040, calc(var(--ux-1sbfig8, 0.25rem) * 4));
}

.fileName {
  overflow-wrap: anywhere;
}

.pickerButton {
  --_attached-files-picker-padding-block: var(--size-space-030, calc(var(--ux-1sbfig8, 0.25rem) * 3));
  --_attached-files-picker-padding-inline: var(--size-space-040, calc(var(--ux-1sbfig8, 0.25rem) * 4));

  inline-size: 100%;
  min-block-size: 5rem;
  padding: var(--_attached-files-picker-padding-block) var(--_attached-files-picker-padding-inline);
  border: 1px dashed var(--color-surface-border-card, var(--ux-97h3vl, #d4dbe0));
  border-radius: var(--ux-2jubes, 6px);
  background: var(--ux-1mh0ktr, #f5f5f5);
  white-space: normal;
}
`},{path:`components/attached-files/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useId, useRef } from 'react';
import { Button, Card, CornerActions, Detail, FileTrigger, Flex, Icon, Text } from '@godaddy/antares';
import { ACCEPTED_FILE_TYPES, fileKey, formatFileSize } from '../../data/files';
import { FilePreview } from '../file-preview';
import styles from './index.module.css';

interface AttachedFilesProps {
  /** Files currently selected in the form. */
  files: File[];

  /** Validation or reading error shared by both attachment entry points. */
  error: string;

  /** Sends the native selection to the form's shared file handler. */
  onSelect: (files: FileList | null) => void;

  /** Removes one attachment from the form. */
  onRemove: (file: File) => void;
}

interface AttachmentRowProps {
  /** Attachment represented by the row. */
  file: File;

  /** Removes the represented attachment from the form. */
  onRemove: (file: File) => void;

  /** Restores focus after the row is removed. */
  onRestoreFocus: () => void;
}

/** Renders a selected attachment with its preview, size, and remove action. */
function AttachmentRow({ file, onRemove, onRestoreFocus }: AttachmentRowProps) {
  const handleRemove = useCallback(
    function handleRemove() {
      onRemove(file);
      onRestoreFocus();
    },
    [file, onRemove, onRestoreFocus]
  );

  return (
    <Card direction="row" gap="sm" padding="sm" rounding="lg" className={styles.row}>
      <FilePreview file={file} />
      <Flex direction="column" gap="sm" flex="1" className={styles.details}>
        <Text className={styles.fileName}>{file.name}</Text>
        <Detail size="sm">{formatFileSize(file)}</Detail>
      </Flex>
      <CornerActions>
        <Button type="button" variant="minimal" size="sm" aria-label={\`Remove \${file.name}\`} onPress={handleRemove}>
          <Icon icon="x" aria-hidden="true" />
        </Button>
      </CornerActions>
    </Card>
  );
}

/** Presents the full-area file picker trigger and selected attachments. */
export function AttachedFiles({ files, error, onSelect, onRemove }: AttachedFilesProps) {
  const sizeHintId = useId();
  const formatHintId = useId();
  const errorId = useId();
  const pickerButtonRef = useRef<HTMLButtonElement>(null);

  const restorePickerFocus = useCallback(function restorePickerFocus() {
    pickerButtonRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <Flex direction="column" gap="sm" role="group" aria-label="Attach files (required)">
      <Text>
        Attach files <span aria-hidden="true">*</span>
      </Text>

      <FileTrigger acceptedFileTypes={ACCEPTED_FILE_TYPES} allowsMultiple onSelect={onSelect}>
        <Button
          ref={pickerButtonRef}
          type="button"
          variant="minimal"
          aria-label="Add files"
          aria-describedby={\`\${sizeHintId} \${formatHintId}\${error ? \` \${errorId}\` : ''}\`}
          className={styles.pickerButton}
        >
          <Flex direction="column" alignItems="center" gap="xs">
            <Flex alignItems="center" gap="xs">
              <Icon icon="add" aria-hidden="true" />
              <Text as="strong">Add files</Text>
              <Text>or drag them here.</Text>
            </Flex>
            <Detail id={sizeHintId} align="center" size="sm">
              Each file must be less than 256 MiB; up to 10 files and 256 MiB total
            </Detail>
          </Flex>
        </Button>
      </FileTrigger>

      <Detail id={formatHintId} align="center" size="sm">
        Supported formats: <strong>.pdf, .jpg, .jpeg, .gif, .png</strong>
      </Detail>

      {error ? (
        <Text id={errorId} role="alert" emphasis="critical">
          {error}
        </Text>
      ) : null}

      {files.map(function renderFile(file) {
        return (
          <AttachmentRow key={fileKey(file)} file={file} onRemove={onRemove} onRestoreFocus={restorePickerFocus} />
        );
      })}
    </Flex>
  );
}
`},{path:`components/benefits/index.module.css`,language:`css`,source:`.list {
  margin: 0;
  padding: 0;
  list-style: none;
}
`},{path:`components/benefits/index.tsx`,language:`tsx`,source:`'use client';

import { Detail, Flex, Icon, Text } from '@godaddy/antares';
import styles from './index.module.css';

const benefits = [
  {
    title: 'Website Design Services',
    description: 'We’ll build your website so you can get back to focusing on your business.'
  },
  {
    title: 'Marketing Services',
    description: 'Our team of experts will create and manage your social media presence.'
  },
  {
    title: 'SEO Services',
    description: 'We’ll use Google’s best practices to help your site get the traffic it deserves.'
  }
] as const;

/** Lists the services that can support the visitor alongside the inquiry form. */
export function Benefits() {
  return (
    <Flex as="ul" direction="column" gap="lg" aria-label="Services we can help with" className={styles.list}>
      {benefits.map(function renderBenefit(benefit) {
        return (
          <Flex as="li" key={benefit.title} gap="sm" alignItems="start">
            <Icon icon="checkmark" width={18} height={18} aria-hidden="true" />
            <Flex direction="column" gap="xs">
              <Text as="strong">{benefit.title}</Text>
              <Detail size="sm">{benefit.description}</Detail>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}
`},{path:`components/drop-overlay/index.module.css`,language:`css`,source:`.overlay {
  position: absolute;
  z-index: 1;
  border: 1px dashed var(--ux-f7kpiw, #00a4a6);
  border-radius: inherit;
  background-color: rgba(216, 239, 239, 0.9);
  color: var(--color-surface-text-base, var(--ux-1leynsm, #111));
  pointer-events: none;
  inset: 0;
}
`},{path:`components/drop-overlay/index.tsx`,language:`tsx`,source:`import { Flex, Icon, Text } from '@godaddy/antares';
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
      <Text as="strong">Drop files to upload.</Text>
    </Flex>
  );
}
`},{path:`components/fields/index.tsx`,language:`tsx`,source:`'use client';

import { useRef } from 'react';
import {
  Box,
  Button,
  DatePicker,
  DatePickerCalendar,
  Detail,
  FieldError,
  Flex,
  Input,
  Label,
  Select,
  SelectItem,
  SelectOptions,
  Text,
  TextField
} from '@godaddy/antares';
import type { CalendarDate } from '@godaddy/antares/date';

const fields = [
  { name: 'fullName', label: 'Full name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone Number', type: 'tel', autoComplete: 'tel' }
] as const;

/** Names of the required contact fields rendered by the form. */
type FieldName = (typeof fields)[number]['name'];

interface FieldsProps {
  /** Current text field values. */
  values: Record<FieldName, string>;

  /** Current optional date. */
  dueDate: CalendarDate | null;

  /** Updates one text field. */
  onChange: (name: FieldName, value: string) => void;

  /** Clears the demo confirmation after a field changes. */
  onProjectTypeChange: () => void;

  /** Updates the optional date. */
  onDateChange: (value: CalendarDate | null) => void;

  /** Clears the optional date. */
  onClearDate: () => void;
}

interface ContactFieldProps {
  /** Field metadata used to render the contact input. */
  field: (typeof fields)[number];

  /** Current value for the contact input. */
  value: string;

  /** Updates the field value in the parent form. */
  onChange: (name: FieldName, value: string) => void;
}

/** Renders one required contact field from the form's field metadata. */
function ContactField({ field, value, onChange }: ContactFieldProps) {
  return (
    <TextField
      name={field.name}
      type={field.type}
      value={value}
      isRequired
      validationBehavior="native"
      onChange={function handleChange(nextValue: string) {
        onChange(field.name, nextValue);
      }}
    >
      <Label>{field.label}</Label>
      <Input autoComplete={field.autoComplete} />
      <FieldError />
    </TextField>
  );
}

/** Composes the required contact fields with the optional project metadata. */
export function Fields({ values, dueDate, onChange, onProjectTypeChange, onDateChange, onClearDate }: FieldsProps) {
  const datePickerTriggerRef = useRef<HTMLButtonElement>(null);

  function handleClearDate() {
    onClearDate();
    datePickerTriggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <>
      {fields.map(function renderField(field) {
        return <ContactField key={field.name} field={field} value={values[field.name]} onChange={onChange} />;
      })}

      <Select name="projectType" defaultValue="airo" isRequired onChange={onProjectTypeChange}>
        <Label>Project type</Label>
        <Button slot="trigger" />
        <Detail slot="description">Choose the service that best fits your goals.</Detail>
        <SelectOptions popoverProps={{ 'aria-label': 'Project type' }}>
          <SelectItem id="airo">Airo App Builder</SelectItem>
          <SelectItem id="antares">GoDaddy Antares</SelectItem>
          <SelectItem id="none">None</SelectItem>
        </SelectOptions>
      </Select>

      <Flex direction="column" gap="sm">
        <DatePicker name="dueDate" value={dueDate} onChange={onDateChange}>
          <Label>Due date</Label>
          <Button ref={datePickerTriggerRef} slot="trigger" />
          <Text slot="description">Leave blank if there’s no set date.</Text>
          <DatePickerCalendar popoverProps={{ 'aria-label': 'Due date' }} />
        </DatePicker>
        {dueDate ? (
          <Box alignSelf="start">
            <Button type="button" variant="inline" onPress={handleClearDate}>
              Clear date
            </Button>
          </Box>
        ) : null}
      </Flex>
    </>
  );
}

export type { FieldName };
`},{path:`components/file-preview/index.module.css`,language:`css`,source:`.preview {
  inline-size: 3.5rem;
  block-size: 3.5rem;
  flex-shrink: 0;
  object-fit: cover;
}
`},{path:`components/file-preview/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, Flex, Text } from '@godaddy/antares';
import { filePreviewKind } from '../../data/files';
import styles from './index.module.css';

interface FilePreviewProps {
  /** Selected file to preview. */
  file: File;
}

/** Creates local image previews and gives non-image files a readable fallback. */
export function FilePreview({ file }: FilePreviewProps) {
  const [url, setUrl] = useState<string>();
  const [failed, setFailed] = useState(false);
  const previewKind = filePreviewKind(file);

  useEffect(
    function createPreview() {
      if (previewKind !== 'image') return;

      const next = URL.createObjectURL(file);
      setUrl(next);
      setFailed(false);

      return function releasePreview() {
        URL.revokeObjectURL(next);
      };
    },
    [file, previewKind]
  );

  const handlePreviewError = useCallback(function handlePreviewError() {
    setFailed(true);
  }, []);

  if (url && !failed) {
    return (
      <Box
        as="img"
        src={url}
        alt=""
        loading="lazy"
        decoding="async"
        width={56}
        height={56}
        rounding="lg"
        className={styles.preview}
        onError={handlePreviewError}
      />
    );
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      rounding="lg"
      elevation="card"
      aria-hidden="true"
      className={styles.preview}
    >
      <Text>{previewKind === 'pdf' ? 'PDF' : 'IMG'}</Text>
    </Flex>
  );
}
`},{path:`components/project-inquiry-form/index.module.css`,language:`css`,source:`.root {
  box-sizing: border-box;
  inline-size: 100%;
  max-inline-size: 80rem;
  min-inline-size: 0;
  margin-inline: auto;
}

.columns {
  min-inline-size: 0;
}

.visualColumn {
  inline-size: 100%;
  min-inline-size: 0;
}

.heroImage {
  display: block;
  inline-size: 100%;
  block-size: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.form {
  position: relative;
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
}

.dropZone {
  inline-size: 100%;
  max-inline-size: 100%;
  min-inline-size: 0;
}
`},{path:`components/project-inquiry-form/index.tsx`,language:`tsx`,source:`'use client';

import { useId, useReducer, useRef, useState, type FormEvent } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  TextContext,
  isFileDropItem,
  useDrop,
  type DropEvent
} from '@godaddy/antares';
import type { CalendarDate } from '@godaddy/antares/date';
import { DropOverlay } from '../drop-overlay';
import { AttachedFiles } from '../attached-files';
import { Benefits } from '../benefits';
import { type FieldName, Fields } from '../fields';
import { fileKey, isAcceptedFile, MAX_FILE_COUNT, MAX_TOTAL_FILE_SIZE } from '../../data/files';
import styles from './index.module.css';

const initialValues: Record<FieldName, string> = { fullName: '', email: '', phone: '' };
const heroImage = {
  src: 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" viewBox="0 0 1280 720"%3E%3Crect width="1280" height="720" fill="%23eef2f7"%2F%3E%3Ctext x="640" y="360" fill="%23667085" font-family="sans-serif" font-size="48" text-anchor="middle"%3EProject image%3C%2Ftext%3E%3C%2Fsvg%3E',
  alt: 'Project image placeholder',
  width: 1280,
  height: 720
};

const fileFormatError = 'Use PDF, JPG, GIF, or PNG files smaller than 256 MiB.';
const fileLimitError = 'Use up to 10 files with a combined size of 256 MiB or less.';
const dropZoneLabel = 'Upload project files';

interface AttachmentState {
  files: File[];
  error: string;
}

type AttachmentAction = { type: 'add'; files: File[] } | { type: 'read-error' } | { type: 'remove'; file: File };

const initialAttachmentState: AttachmentState = { files: [], error: '' };

function attachmentReducer(state: AttachmentState, action: AttachmentAction): AttachmentState {
  if (action.type === 'read-error') {
    return { ...state, error: 'We couldn’t read these files. Please try again.' };
  }

  if (action.type === 'remove') {
    return {
      files: state.files.filter(function keepFile(candidate) {
        return fileKey(candidate) !== fileKey(action.file);
      }),
      error: ''
    };
  }

  const valid = action.files.filter(isAcceptedFile);
  const validationError = valid.length === action.files.length ? '' : fileFormatError;

  if (valid.length === 0) {
    return { ...state, error: validationError };
  }

  const unique = new Map(
    state.files.map(function identify(file) {
      return [fileKey(file), file];
    })
  );

  for (const file of valid) {
    const key = fileKey(file);
    if (!unique.has(key)) unique.set(key, file);
  }

  const nextFiles = Array.from(unique.values());
  const totalSize = nextFiles.reduce(function sumFileSizes(total, file) {
    return total + file.size;
  }, 0);

  if (nextFiles.length > MAX_FILE_COUNT || totalSize > MAX_TOTAL_FILE_SIZE) {
    return { ...state, error: fileLimitError };
  }

  return { files: nextFiles, error: validationError };
}

type FormDropEvent = DropEvent;

/** A complete, interactive project inquiry page with a local demo submission. */
export function ProjectInquiryForm() {
  const headingId = useId();
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(initialValues);
  const [dueDate, setDueDate] = useState<CalendarDate | null>(null);
  const [attachments, dispatchAttachments] = useReducer(attachmentReducer, initialAttachmentState);
  const [submitted, setSubmitted] = useState(false);
  const canSubmit =
    Object.values(values).every(function isFilled(value) {
      return value.trim().length > 0;
    }) && attachments.files.length > 0;

  const { dropProps, isDropTarget } = useDrop({
    ref: dropZoneRef,
    hasDropButton: false,
    onDrop: handleDrop
  });

  function clearConfirmation() {
    setSubmitted(false);
  }

  function addFiles(list: FileList | File[] | null) {
    if (!list?.length) return;

    const incoming = Array.from(list);
    dispatchAttachments({ type: 'add', files: incoming });
    if (incoming.some(isAcceptedFile)) clearConfirmation();
  }

  async function handleDrop(event: FormDropEvent) {
    try {
      const dropped = await Promise.all(
        event.items.filter(isFileDropItem).map(function readFile(item) {
          return item.getFile();
        })
      );
      addFiles(dropped);
    } catch {
      dispatchAttachments({ type: 'read-error' });
    }
  }

  function handleFieldChange(name: FieldName, value: string) {
    setValues(function updateValues(previous) {
      return { ...previous, [name]: value };
    });
    clearConfirmation();
  }

  function handleDateChange(value: CalendarDate | null) {
    setDueDate(value);
    clearConfirmation();
  }

  function handleClearDate() {
    setDueDate(null);
    clearConfirmation();
  }

  function handleRemoveFile(file: File) {
    dispatchAttachments({ type: 'remove', file });
    clearConfirmation();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) setSubmitted(true);
  }

  return (
    <Box padding="xl" className={styles.root}>
      <Grid
        columns="repeat(auto-fit, minmax(min(100%, 30rem), 1fr))"
        gap="2xl"
        alignItems="start"
        className={styles.columns}
      >
        <Flex direction="column" gap="xl" className={styles.visualColumn}>
          <Box
            as="img"
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            rounding="xl"
            alignSelf="start"
            className={styles.heroImage}
          />
          <Benefits />
        </Flex>

        <Flex
          ref={dropZoneRef}
          role="region"
          aria-label={dropZoneLabel}
          padding="0"
          alignItems="stretch"
          justifyContent="start"
          {...dropProps}
          data-drop-target={isDropTarget || undefined}
          className={styles.dropZone}
        >
          <TextContext.Provider value={null}>
            <Flex
              as="form"
              direction="column"
              gap="lg"
              padding="xl"
              rounding="xl"
              elevation="card"
              aria-labelledby={headingId}
              onSubmit={handleSubmit}
              className={styles.form}
            >
              <Flex direction="column" gap="xs">
                <Heading id={headingId} level={2}>
                  Talk with an expert to help with your project goals.
                </Heading>
              </Flex>

              <Fields
                values={values}
                dueDate={dueDate}
                onChange={handleFieldChange}
                onProjectTypeChange={clearConfirmation}
                onDateChange={handleDateChange}
                onClearDate={handleClearDate}
              />

              <AttachedFiles
                files={attachments.files}
                error={attachments.error}
                onSelect={addFiles}
                onRemove={handleRemoveFile}
              />

              <Button type="submit" variant="primary" isDisabled={!canSubmit}>
                <Icon icon="calendar" aria-hidden="true" />
                Schedule a Call
              </Button>

              <Text>
                Or call us at <a href="tel:+14803663344">(480) 366-3344</a>
              </Text>

              <Checkbox name="receiveTexts" onChange={clearConfirmation}>
                I want to receive texts from GoDaddy about these products and services.
              </Checkbox>

              {submitted ? (
                <Alert emphasis="success">Demo complete. No information was sent and no call was scheduled.</Alert>
              ) : null}

              <DropOverlay isDropTarget={isDropTarget} />
            </Flex>
          </TextContext.Provider>
        </Flex>
      </Grid>
    </Box>
  );
}
`},{path:`data/files.ts`,language:`ts`,source:`/** MIME types accepted by the project inquiry attachment picker. */
export const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/gif', 'image/png'];

/** File extensions accepted when the browser does not provide MIME metadata. */
const ACCEPTED_FILE_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.gif', '.png'];

const IMAGE_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.gif', '.png'];

/** Maximum accepted attachment size in bytes. */
const MAX_FILE_SIZE = 256 * 1024 * 1024;

/** Maximum number of attachments kept in memory at once. */
export const MAX_FILE_COUNT = 10;

/** Maximum combined size of attachments kept in memory at once. */
export const MAX_TOTAL_FILE_SIZE = 256 * 1024 * 1024;

const byteFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const kibibyteFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
const mebibyteFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

/** Returns the stable identity used to deduplicate and remove an attachment. */
export function fileKey(file: File) {
  return JSON.stringify([file.name, file.size, file.type, file.lastModified]);
}

/** Returns the extension used when a browser does not provide MIME metadata. */
function fileExtension(file: File) {
  const lastDot = file.name.lastIndexOf('.');
  return lastDot >= 0 ? file.name.slice(lastDot).toLowerCase() : '';
}

/** Classifies a supported attachment for its local preview. */
export function filePreviewKind(file: File) {
  const extension = fileExtension(file);

  if (file.type === 'application/pdf' || (!file.type && extension === '.pdf')) return 'pdf';
  if (file.type.startsWith('image/') || (!file.type && IMAGE_FILE_EXTENSIONS.includes(extension))) return 'image';

  return 'unknown';
}

/** Returns whether a file matches the supported format and size constraints. */
export function isAcceptedFile(file: File) {
  const extension = fileExtension(file);
  const hasAcceptedType = ACCEPTED_FILE_TYPES.includes(file.type);
  const hasAcceptedExtension = !file.type && ACCEPTED_FILE_EXTENSIONS.includes(extension);

  return (hasAcceptedType || hasAcceptedExtension) && file.size < MAX_FILE_SIZE;
}

/** Formats an attachment size using the same unit shown by the picker. */
export function formatFileSize(file: File) {
  if (file.size < 1024) return \`\${byteFormatter.format(file.size)} B\`;
  if (file.size < 1024 * 1024) return \`\${kibibyteFormatter.format(file.size / 1024)} KiB\`;

  return \`\${mebibyteFormatter.format(file.size / (1024 * 1024))} MiB\`;
}
`},{path:`index.tsx`,language:`tsx`,source:`export { ProjectInquiryForm } from './components/project-inquiry-form';
`}]},children:(0,b.jsx)(i,{of:_,inline:!0})}),`
`,(0,b.jsx)(t.h3,{id:`gallery`,children:`Gallery`}),`
`,(0,b.jsx)(l,{block:{id:`gallery`,description:`Browse images in a list or grid, add local files, and open a media viewer.`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/gallery`,files:[{path:`components/empty-state/index.module.css`,language:`css`,source:`.emptyState {
  min-block-size: 256px;
  text-align: center;
}

.description {
  max-inline-size: 30rem;
}
`},{path:`components/empty-state/index.tsx`,language:`tsx`,source:`import { Box, Flex, Heading, Icon, Text } from '@godaddy/antares';
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
      <Box padding="md" rounding="full" elevation="card" aria-hidden="true">
        <Icon icon="upload" />
      </Box>
      <Heading level={3}>Start your gallery</Heading>
      <Text className={styles.description}>Drop images here or choose Add files above to upload.</Text>
    </Flex>
  );
}
`},{path:`components/file-cover/index.module.css`,language:`css`,source:`.surface {
  max-inline-size: 100%;
  object-fit: cover;
}

.surface:where(img) {
  display: block;
}

.surface:where([data-variant="horizontal"]) {
  inline-size: 56px;
  block-size: 56px;
}

.surface:where([data-variant="vertical"]) {
  inline-size: 100%;
  aspect-ratio: 1;
}

.error {
  background: var(--color-feedback-critical-subtle, var(--ux-1iiiqs3, #fde8e7));
  color: var(--color-feedback-critical-onsubtle, var(--ux-xaxxaq, #8b0000));
}
`},{path:`components/file-cover/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useState } from 'react';
import { Flex, Icon } from '@godaddy/antares';
import type { ImageItem } from '../../data/types';
import { ImageSurface, useImageLoadState } from '../image/image-surface';
import styles from './index.module.css';

/** Cover geometry used by Gallery's list and grid presentations. */
export type FileCoverVariant = 'horizontal' | 'vertical';

interface FileCoverProps {
  /** File represented by the cover. */
  image: ImageItem;

  /** Cover geometry used by the parent presentation. */
  variant: FileCoverVariant;

  /** Opens a successful image in the viewer. */
  onOpen?: (id: string) => void;

  /** Reports an image decode or network failure to the owning gallery. */
  onLoadError?: (id: string) => void;

  /** Reports a successful retry to the owning gallery. */
  onLoadSuccess?: (id: string) => void;
}

/** A small, reusable image/error surface shared by every Gallery presentation. */
export function FileCover({ image, variant, onOpen, onLoadError, onLoadSuccess }: FileCoverProps) {
  const [failedThumbnail, setFailedThumbnail] = useState<string | null>(null);
  const thumbnail = image.thumbnailSrc && failedThumbnail !== image.thumbnailSrc ? image.thumbnailSrc : undefined;
  const reportLoadError = useCallback(
    function reportLoadError() {
      if (thumbnail) setFailedThumbnail(thumbnail);
      else onLoadError?.(image.id);
    },
    [thumbnail, image.id, onLoadError]
  );
  const reportLoadSuccess = useCallback(() => onLoadSuccess?.(image.id), [image.id, onLoadSuccess]);
  const { state, imageRef, onLoad, onError } = useImageLoadState(thumbnail ?? image.src, {
    resetKey: \`\${image.id}:\${image.status ?? ''}\`,
    onLoad: onLoadSuccess ? reportLoadSuccess : undefined,
    onError: reportLoadError
  });
  const hasError = image.status === 'error' || state === 'error';

  if (hasError) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        role="img"
        aria-label={\`\${image.name}: \${image.errorMessage ?? 'File needs attention.'}\`}
        rounding="md"
        className={\`\${styles.surface} \${styles.error}\`}
        data-variant={variant}
      >
        <Icon icon="alert" aria-hidden="true" />
      </Flex>
    );
  }

  return (
    <ImageSurface
      ref={imageRef}
      src={thumbnail ?? image.src}
      srcSet={thumbnail ? undefined : image.srcSet}
      sizes={thumbnail ? undefined : image.sizes}
      width={thumbnail ? undefined : image.width}
      height={thumbnail ? undefined : image.height}
      alt={image.alt ?? image.name}
      className={styles.surface}
      variant={variant}
      loading="lazy"
      onLoad={onLoad}
      onError={onError}
      onOpen={onOpen ? () => onOpen(image.id) : undefined}
      label={\`Open \${image.name}\`}
    />
  );
}
`},{path:`components/file-item/index.module.css`,language:`css`,source:`.item {
  inline-size: 100%;
  min-inline-size: 0;
}

.card {
  --_gallery-file-action-space: calc(var(--size-space-080, calc(var(--ux-1sbfig8, 0.25rem) * 5)) * 2);
}

.card:where([data-error]) {
  border-color: var(--color-feedback-critical-strong, var(--ux-1fhc073, #db1802));
}

.details {
  min-inline-size: 0;
  padding-inline-end: var(--_gallery-file-action-space);
}

.details:where([data-variant="vertical"]) {
  padding-inline-end: 0;
}

.errorDetails {
  min-inline-size: 0;
}
`},{path:`components/file-item/index.tsx`,language:`tsx`,source:`'use client';

import { useRef } from 'react';
import { Box, Button, Card, CornerActions, Detail, Flex, Icon, Text } from '@godaddy/antares';
import { FileCover, type FileCoverVariant } from '../file-cover';
import type { ImageItem } from '../../data/types';
import styles from './index.module.css';

export interface FileItemProps {
  /** File to render. */
  image: ImageItem;

  /** Presentation variant from the parent view. */
  variant: FileCoverVariant;

  /** Opens a successful image in the viewer. */
  onOpen: (id: string) => void;

  /** Removes the file. */
  onRemove: (image: ImageItem) => void;

  /** Retries an error item. */
  onRetry: (image: ImageItem) => void;

  /** Reports an image decode or network failure. */
  onLoadError: (id: string) => void;

  /** Reports a successful image load. */
  onLoadSuccess: (id: string) => void;
}

const fileSizeFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

/** Preserves useful precision for small files instead of rounding their size to zero MiB. */
function formatFileSize(bytes: number | undefined) {
  if (bytes === undefined) return 'Size unavailable';
  if (bytes < 1024) return fileSizeFormatter.format(bytes) + ' B';
  if (bytes < 1024 * 1024) return fileSizeFormatter.format(bytes / 1024) + ' KiB';
  return fileSizeFormatter.format(bytes / (1024 * 1024)) + ' MiB';
}

/** One file item with the same actions and states across list and grid views. */
export function FileItem({ image, variant, onOpen, onRemove, onRetry, onLoadError, onLoadSuccess }: FileItemProps) {
  const removeButton = useRef<HTMLButtonElement>(null);
  const size = formatFileSize(image.size);
  const isError = image.status === 'error';
  const isLoading = image.status === 'loading';
  const canOpen = !isError && !isLoading;

  function handleRetry() {
    // Retry disappears while loading. Keep focus on an action in the same file.
    removeButton.current?.focus({ preventScroll: true });
    onRetry(image);
  }

  return (
    <Box as="li" className={styles.item} data-gallery-image-id={image.id}>
      <Card
        direction={variant === 'horizontal' ? 'row' : 'column'}
        gap="sm"
        padding="sm"
        alignItems={variant === 'horizontal' ? 'center' : undefined}
        className={styles.card}
        data-error={isError || undefined}
      >
        <Box flexShrink={0}>
          <FileCover
            image={image}
            variant={variant}
            onOpen={canOpen ? onOpen : undefined}
            onLoadError={onLoadError}
            onLoadSuccess={isLoading ? onLoadSuccess : undefined}
          />
        </Box>

        <Flex
          direction="column"
          gap="sm"
          justifyContent="center"
          flex="1 1 auto"
          className={styles.details}
          data-variant={variant}
        >
          <Text maxLines={1} emphasis={isError ? 'critical' : undefined}>
            {image.name}
          </Text>
          {isError ? (
            <Flex
              direction={variant === 'horizontal' ? 'row' : 'column'}
              gap="xs"
              alignItems={variant === 'horizontal' ? 'center' : 'start'}
              wrap={variant === 'horizontal' ? 'nowrap' : undefined}
              className={styles.errorDetails}
              role={variant === 'vertical' ? 'alert' : undefined}
            >
              <Detail emphasis="critical" maxLines={1}>
                {image.errorMessage ?? 'File needs attention.'}
              </Detail>
              <Button variant="inline" size="sm" aria-label={\`Retry \${image.name}\`} onPress={handleRetry}>
                <Icon icon="refresh" aria-hidden="true" />
                Retry
              </Button>
            </Flex>
          ) : (
            <Detail>{isLoading ? 'Loading image…' : size}</Detail>
          )}
        </Flex>

        <CornerActions>
          <Button
            ref={removeButton}
            data-gallery-remove=""
            variant="secondary"
            size="sm"
            aria-label={\`Remove \${image.name}\`}
            onPress={() => onRemove(image)}
          >
            <Icon icon="x" aria-hidden="true" />
          </Button>
        </CornerActions>
      </Card>
    </Box>
  );
}
`},{path:`components/file-items/index.tsx`,language:`tsx`,source:`'use client';

import { FileItem, type FileItemProps } from '../file-item';
import type { ImageItem } from '../../data/types';

interface FileItemsProps
  extends Pick<FileItemProps, 'onOpen' | 'onRemove' | 'onRetry' | 'onLoadError' | 'onLoadSuccess'> {
  /** Images to render in source order. */
  images: ImageItem[];

  /** Layout variant shared by every item in the collection. */
  variant: FileItemProps['variant'];
}

/** Shared collection renderer used by the list and grid layouts. */
export function FileItems({ images, variant, onOpen, onRemove, onRetry, onLoadError, onLoadSuccess }: FileItemsProps) {
  return images.map(function renderFileItem(image) {
    return (
      <FileItem
        key={image.id}
        image={image}
        variant={variant}
        onOpen={onOpen}
        onRemove={onRemove}
        onRetry={onRetry}
        onLoadError={onLoadError}
        onLoadSuccess={onLoadSuccess}
      />
    );
  });
}
`},{path:`components/gallery/index.module.css`,language:`css`,source:`.content {
  inline-size: 100%;
  min-inline-size: 0;
}

/* Keep the live region mounted without reserving a gap before the first update. */
.notice:where(:empty) {
  position: absolute;
}

.dropOverlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  border: 1px dashed var(--ux-f7kpiw, #00a4a6);
  border-radius: var(--ux-2jubes, 16px);
  background-color: rgba(216, 239, 239, 0.9);
  color: var(--color-surface-text-base, var(--ux-1leynsm, #111));
  pointer-events: none;
}

.dropZone {
  position: relative;
  box-sizing: border-box;
  inline-size: 100%;
  max-inline-size: 80rem;
  min-inline-size: 0;
  margin-inline: auto;
}
`},{path:`components/gallery/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  Box,
  Detail,
  type DropEvent,
  type DropOptions,
  Flex,
  Heading,
  Icon,
  Label,
  ProgressBar,
  SegmentedController,
  SegmentedControllerItem,
  Tag,
  Text,
  isFileDropItem,
  useDrop
} from '@godaddy/antares';
import { EmptyState } from '../empty-state';
import type { GalleryLimits, ImageItem } from '../../data/types';
import { acceptedTypes, defaultLimits, useGalleryImages } from '../../hooks/use-gallery-images';
import { GridView } from '../grid-view';
import { ListView } from '../list-view';
import { UploadPrompt } from '../upload-prompt';
import { Viewer } from '../viewer';
import styles from './index.module.css';

export interface GalleryProps {
  /** Initial images; read once on mount. Defaults to an empty gallery. IDs must be unique. */
  initialImages?: ImageItem[];

  /** Initial presentation; switching views preserves the collection. */
  defaultView?: 'list' | 'grid';

  /** Local ingestion budgets. Initial images are retained even when they exceed a budget. */
  limits?: GalleryLimits;

  /** Layout and viewer navigation direction. Pass the host application's direction. Defaults to ltr. */
  dir?: 'ltr' | 'rtl';

  /** Notifies the host after collection or load-state changes. Blob URLs remain owned by this instance. */
  onImagesChange?: (images: ImageItem[]) => void;
}

/**
 * Copyable local gallery with shared list/grid state and a modal image viewer.
 * Files stay in this browser session. Replace ingestion/removal with your service integration
 * when persistence is needed; initialImages is read only on mount.
 *
 * @example
 * <Gallery initialImages={[{ id: 'cover', name: 'Cover.jpg', src: '/cover.jpg' }]} />
 */
export function Gallery({
  initialImages = [],
  defaultView = 'grid',
  limits,
  dir = 'ltr',
  onImagesChange
}: GalleryProps) {
  const resolvedLimits = {
    maxFiles: limits?.maxFiles ?? defaultLimits.maxFiles,
    maxFileSize: limits?.maxFileSize ?? defaultLimits.maxFileSize,
    maxTotalSize: limits?.maxTotalSize ?? defaultLimits.maxTotalSize
  };
  const { images, error, notice, processing, addFiles, removeImage, retryImage, markReady, markError, reportError } =
    useGalleryImages(initialImages, resolvedLimits, onImagesChange);
  const [view, setView] = useState(defaultView);
  const [activeId, setActiveId] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const addButton = useRef<HTMLButtonElement>(null);
  const removalFocus = useRef<{ id: string | null } | null>(null);

  useLayoutEffect(
    function focusAfterRemoval() {
      if (!removalFocus.current) return;
      const id = removalFocus.current.id;
      removalFocus.current = null;
      const item = Array.from(dropZoneRef.current?.querySelectorAll<HTMLElement>('[data-gallery-image-id]') ?? []).find(
        (element) => element.dataset.galleryImageId === id
      );
      (item?.querySelector<HTMLButtonElement>('[data-gallery-remove]') ?? addButton.current)?.focus();
    },
    [images]
  );

  const handleRemoveImage = useCallback(
    function handleRemoveImage(image: ImageItem) {
      const items = Array.from(dropZoneRef.current?.querySelectorAll<HTMLElement>('[data-gallery-image-id]') ?? []);
      const index = items.findIndex((element) => element.dataset.galleryImageId === image.id);
      removalFocus.current = { id: (items[index + 1] ?? items[index - 1])?.dataset.galleryImageId ?? null };
      removeImage(image);
    },
    [removeImage]
  );

  const handleDropOperation = useCallback<NonNullable<DropOptions['getDropOperation']>>(function handleDropOperation(
    types
  ) {
    return acceptedTypes.some(function supportsType(type) {
      return types.has(type);
    })
      ? 'copy'
      : 'cancel';
  }, []);

  const handleDrop = useCallback(
    async function handleDrop(event: DropEvent) {
      const results = await Promise.allSettled(event.items.filter(isFileDropItem).map((item) => item.getFile()));
      const files = results.flatMap((result) => (result.status === 'fulfilled' ? [result.value] : []));
      await addFiles(files);
      if (results.some((result) => result.status === 'rejected')) {
        reportError('Some dropped files couldn’t be read. Please select them again.');
      }
    },
    [addFiles, reportError]
  );

  const handleViewChange = useCallback(function handleViewChange(key: string) {
    if (key === 'list' || key === 'grid') setView(key);
  }, []);

  const handleOpenImage = useCallback(function handleOpenImage(id: string) {
    setActiveId(id);
  }, []);

  const handleImageLoadError = useCallback(
    function handleImageLoadError(id: string) {
      setActiveId((current) => (current === id ? null : current));
      markError(id);
    },
    [markError]
  );

  const handleCloseViewer = useCallback(function handleCloseViewer() {
    setActiveId(null);
  }, []);

  const { dropProps, isDropTarget } = useDrop({
    ref: dropZoneRef,
    hasDropButton: false,
    isDisabled: activeId !== null,
    getDropOperation: handleDropOperation,
    onDrop: handleDrop
  });

  return (
    <>
      <Flex
        ref={dropZoneRef}
        dir={dir}
        role="region"
        aria-label="Add files to gallery"
        padding="0"
        alignItems="stretch"
        justifyContent="start"
        {...dropProps}
        className={styles.dropZone}
      >
        <Flex direction="column" gap="lg" padding="lg" className={styles.content}>
          <Flex gap="md" wrap="wrap" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" gap="sm" wrap="wrap">
              <Heading level={2}>Gallery</Heading>
              <Tag size="sm">
                {images.length} {images.length === 1 ? 'image' : 'images'}
              </Tag>
            </Flex>

            <Flex alignItems="center" gap="sm" wrap="wrap">
              <UploadPrompt
                ref={addButton}
                isDropTarget={isDropTarget}
                error={error}
                acceptedTypes={acceptedTypes}
                onSelect={addFiles}
              />
              <SegmentedController aria-label="Layout" value={view} onSelectionChange={handleViewChange}>
                <SegmentedControllerItem value="list">
                  <Icon icon="bulleted-list" />
                  List
                </SegmentedControllerItem>
                <SegmentedControllerItem value="grid">
                  <Icon icon="grid" />
                  Grid
                </SegmentedControllerItem>
              </SegmentedController>
            </Flex>
          </Flex>

          {processing ? (
            <ProgressBar
              value={processing.completed}
              maxValue={processing.total}
              valueLabel={\`\${processing.completed} of \${processing.total} files processed\`}
            >
              <Label>Processing images</Label>
              <Box slot="value" />
              <Box slot="track" />
            </ProgressBar>
          ) : null}

          <Detail role="status" aria-label="Gallery updates" aria-atomic="true" className={styles.notice}>
            {notice}
          </Detail>

          <Box role="region" aria-label={\`\${view === 'list' ? 'List' : 'Grid'} view\`}>
            {images.length === 0 ? (
              <EmptyState />
            ) : view === 'list' ? (
              <ListView
                images={images}
                onOpen={handleOpenImage}
                onRemove={handleRemoveImage}
                onRetry={retryImage}
                onLoadError={handleImageLoadError}
                onLoadSuccess={markReady}
              />
            ) : (
              <GridView
                images={images}
                onOpen={handleOpenImage}
                onRemove={handleRemoveImage}
                onRetry={retryImage}
                onLoadError={handleImageLoadError}
                onLoadSuccess={markReady}
              />
            )}
          </Box>
        </Flex>
        {isDropTarget ? (
          <Flex
            role="status"
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap="sm"
            padding="lg"
            className={styles.dropOverlay}
          >
            <Icon icon="upload" aria-hidden="true" />
            <Text as="strong">Drop files to upload.</Text>
          </Flex>
        ) : null}
      </Flex>
      <Viewer
        images={images.filter(function filterViewableImage(image) {
          return image.status !== 'error' && image.status !== 'loading';
        })}
        dir={dir}
        activeId={activeId}
        onClose={handleCloseViewer}
        onSelectImage={handleOpenImage}
      />
    </>
  );
}
`},{path:`components/grid-view/index.module.css`,language:`css`,source:`.items {
  inline-size: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}
`},{path:`components/grid-view/index.tsx`,language:`tsx`,source:`'use client';

import { Grid } from '@godaddy/antares';
import { FileItems } from '../file-items';
import type { ImageItem } from '../../data/types';
import styles from './index.module.css';

interface GridViewProps {
  /** Images to render in source order. */
  images: ImageItem[];

  /** Opens the media viewer. */
  onOpen: (id: string) => void;

  /** Removes an image from the collection. */
  onRemove: (image: ImageItem) => void;

  /** Retries a failed upload. */
  onRetry: (image: ImageItem) => void;

  /** Reports an image decode or network failure. */
  onLoadError: (id: string) => void;

  /** Reports a successful image load. */
  onLoadSuccess: (id: string) => void;
}

/** Cards keep a consistent preview size, including small collections. */
export function GridView({ images, onOpen, onRemove, onRetry, onLoadError, onLoadSuccess }: GridViewProps) {
  return (
    <Grid
      as="ul"
      columns="repeat(auto-fill, minmax(min(100%, 240px), 1fr))"
      gap="sm"
      justifyContent="start"
      alignItems="start"
      aria-label="Gallery image grid"
      className={styles.items}
    >
      <FileItems
        images={images}
        variant="vertical"
        onOpen={onOpen}
        onRemove={onRemove}
        onRetry={onRetry}
        onLoadError={onLoadError}
        onLoadSuccess={onLoadSuccess}
      />
    </Grid>
  );
}
`},{path:`components/image/image-surface.module.css`,language:`css`,source:`.openButton {
  display: block;
  inline-size: 100%;
  min-inline-size: 0;
  padding: 0;
}
`},{path:`components/image/image-surface.tsx`,language:`tsx`,source:`'use client';

import { forwardRef, useCallback, useRef, useState, type ReactEventHandler } from 'react';
import { Box, Button, type ButtonProps, Image } from '@godaddy/antares';
import styles from './image-surface.module.css';

type ImageLoadState = 'loading' | 'ready' | 'error';

interface UseImageLoadStateOptions {
  /** Resets the resource when the owning image changes state. */
  resetKey?: string;

  /** Called after the image loads successfully. */
  onLoad?: () => void;

  /** Called after the image fails to load. */
  onError?: () => void;
}

/**
 * Shares image loading and retry across covers, slides, and thumbnails.
 * The ref inspects cached images whose native load event may precede React's handlers.
 * Report each outcome once per resource/attempt: callback refs also run when handlers change.
 */
export function useImageLoadState(
  src: string,
  { resetKey = '', onLoad: reportLoad, onError: reportError }: UseImageLoadStateOptions = {}
) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<ImageLoadState>('loading');
  const reportedErrorKey = useRef<string | null>(null);
  const reportedLoadKey = useRef<string | null>(null);
  const resourceKey = JSON.stringify([src, resetKey]);
  const previousResourceKey = useRef(resourceKey);

  if (previousResourceKey.current !== resourceKey) {
    previousResourceKey.current = resourceKey;
    reportedErrorKey.current = null;
    reportedLoadKey.current = null;
    // Reset before the image ref inspects a resource that may already be complete.
    setAttempt(0);
    setState('loading');
  }

  const loadKey = \`\${resourceKey}:\${attempt}\`;

  const reportLoadOnce = useCallback(
    function reportLoadedResource() {
      if (reportedLoadKey.current === loadKey) return;

      reportedLoadKey.current = loadKey;
      reportLoad?.();
    },
    [loadKey, reportLoad]
  );

  const reportErrorOnce = useCallback(
    function reportFailedResource() {
      if (reportedErrorKey.current === loadKey) return;

      reportedErrorKey.current = loadKey;
      reportError?.();
    },
    [loadKey, reportError]
  );

  const imageRef = useCallback(
    function inspectLoadedImage(element: HTMLImageElement | null) {
      if (!element?.complete) return;

      if (element.naturalWidth > 0) {
        setState('ready');
        reportLoadOnce();
      } else {
        setState('error');
        reportErrorOnce();
      }
    },
    [reportErrorOnce, reportLoadOnce]
  );

  const onLoad = useCallback(
    function handleLoad() {
      setState('ready');
      reportLoadOnce();
    },
    [reportLoadOnce]
  );

  const onError = useCallback(
    function handleError() {
      setState('error');
      reportErrorOnce();
    },
    [reportErrorOnce]
  );

  const retry = useCallback(function retryImage() {
    setAttempt(function increment(value) {
      return value + 1;
    });
    setState('loading');
  }, []);

  return { attempt, imageRef, onLoad, onError, retry, src, state };
}

interface ImageSurfaceProps {
  /** Resource to display. */
  src: string;

  /** Responsive candidates for the displayed resource. */
  srcSet?: string;

  /** Sizes corresponding to responsive candidates. */
  sizes?: string;

  /** Intrinsic width, when known. */
  width?: number;

  /** Intrinsic height, when known. */
  height?: number;

  /** Keyboard position for an interactive thumbnail. */
  tabIndex?: number;

  /** Keyboard navigation supplied by the viewer. */
  onKeyDown?: NonNullable<ButtonProps['onKeyDown']>;

  /** Image name; decorative inside a separately named action. */
  alt: string;

  /** Presentation variant consumed by the caller's stylesheet. */
  variant?: string;

  /** Styles owned by the calling cover, slide, or thumbnail. */
  className?: string;

  /** Prioritize the active slide; defer offscreen resources. */
  loading?: 'eager' | 'lazy';

  /** Native successful decode notification. */
  onLoad?: ReactEventHandler<HTMLImageElement>;

  /** Native decode or network error notification. */
  onError?: ReactEventHandler<HTMLImageElement>;

  /** Optional activation wrapper for a viewable image. */
  onOpen?: () => void;

  /** Name of the image action, including its filename. */
  label?: string;

  /** Marks the active thumbnail without introducing selection semantics. */
  selected?: boolean;
}

/** Renders the shared image element and optional accessible action wrapper. */
export const ImageSurface = forwardRef<HTMLImageElement, ImageSurfaceProps>(function ImageSurface(
  {
    src,
    srcSet,
    sizes,
    width,
    height,
    alt,
    variant,
    className,
    loading = 'lazy',
    onLoad,
    onError,
    onOpen,
    label,
    selected,
    tabIndex,
    onKeyDown
  },
  ref
) {
  const image = (
    <Box
      as={Image}
      ref={ref}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={onOpen ? '' : alt}
      className={className}
      data-variant={variant}
      rounding="md"
      loading={loading}
      decoding="async"
      onLoad={onLoad}
      onError={onError}
    />
  );

  if (!onOpen) return image;

  return (
    <Button
      variant={selected ? 'secondary' : 'minimal'}
      aria-label={label ?? \`Open \${alt}\`}
      aria-current={selected ? 'true' : undefined}
      onPress={onOpen}
      excludeFromTabOrder={tabIndex === -1}
      onKeyDown={onKeyDown}
      className={styles.openButton}
    >
      {image}
    </Button>
  );
});
`},{path:`components/image/index.module.css`,language:`css`,source:`.image {
  max-inline-size: 100%;
}

.image:where(img) {
  display: block;
}

.image:where([data-variant="viewer"]) {
  inline-size: 100%;
  max-block-size: 55dvh;
  object-fit: contain;
}

.image:where([data-variant="thumbnail"]) {
  inline-size: 80px;
  block-size: 60px;
  object-fit: cover;
}

.container {
  min-inline-size: 0;
}

.errorSurface {
  background: var(--color-feedback-critical-subtle, var(--ux-1iiiqs3, #fde8e7));
  color: var(--color-feedback-critical-onsubtle, var(--ux-xaxxaq, #8b0000));
}
`},{path:`components/image/index.tsx`,language:`tsx`,source:`'use client';

import { Button, type ButtonProps, Flex, Icon, Text } from '@godaddy/antares';
import type { ImageItem } from '../../data/types';
import { ImageSurface, useImageLoadState } from './image-surface';
import styles from './index.module.css';
import surfaceStyles from './image-surface.module.css';

interface GalleryImageProps {
  /** Image to load; remount this component when its identity changes. */
  image: ImageItem;

  /** Presentation size for the image. */
  variant?: 'default' | 'viewer' | 'thumbnail';

  /** Optional activation for cards and the viewer's thumbnail strip. */
  onOpen?: (id: string) => void;

  /** Accessible action name when the image is interactive. */
  label?: string;

  /** Marks the viewer's current thumbnail. */
  selected?: boolean;

  /** Loading strategy for the image resource. */
  loading?: 'eager' | 'lazy';

  /** Keyboard position in the thumbnail rail. */
  tabIndex?: number;

  /** Handles thumbnail keyboard navigation. */
  onKeyDown?: NonNullable<ButtonProps['onKeyDown']>;
}

/** Handles image loading failures without simulating an upload. */
export function GalleryImage({
  image,
  variant = 'default',
  onOpen,
  label,
  selected,
  loading = 'lazy',
  tabIndex,
  onKeyDown
}: GalleryImageProps) {
  const { attempt, imageRef, onError, onLoad, retry, src, state } = useImageLoadState(
    variant === 'thumbnail' ? (image.thumbnailSrc ?? image.src) : image.src,
    {
      resetKey: image.id
    }
  );

  if (state === 'error') {
    if (variant === 'thumbnail') {
      const errorSurface = (
        <Flex
          alignItems="center"
          justifyContent="center"
          className={\`\${styles.image} \${styles.errorSurface}\`}
          data-variant={variant}
          role="img"
          aria-label={\`\${image.name} failed to load\`}
        >
          <Icon icon="alert" aria-hidden="true" />
        </Flex>
      );

      if (!onOpen) return errorSurface;

      return (
        <Button
          variant={selected ? 'secondary' : 'minimal'}
          aria-label={label ?? \`View \${image.name}\`}
          excludeFromTabOrder={tabIndex === -1}
          onKeyDown={onKeyDown}
          aria-current={selected ? 'true' : undefined}
          onPress={() => onOpen(image.id)}
          className={surfaceStyles.openButton}
        >
          {errorSurface}
        </Button>
      );
    }

    return (
      <Flex direction="column" gap="xs" padding="sm" role="alert">
        <Icon icon="alert" aria-hidden="true" />
        <Text emphasis="critical">Couldn’t load {image.name}.</Text>
        <Button variant="inline" aria-label={\`Retry \${image.name}\`} onPress={retry}>
          Retry
        </Button>
      </Flex>
    );
  }

  const picture = (
    <ImageSurface
      ref={imageRef}
      key={attempt}
      src={src}
      alt={image.alt ?? image.name}
      srcSet={variant === 'thumbnail' ? undefined : image.srcSet}
      sizes={variant === 'thumbnail' ? undefined : image.sizes}
      width={variant === 'thumbnail' ? 80 : image.width}
      height={variant === 'thumbnail' ? 60 : image.height}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      className={styles.image}
      variant={variant}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
      onOpen={onOpen ? () => onOpen(image.id) : undefined}
      label={label ?? \`View \${image.name}\`}
      selected={selected}
    />
  );

  return (
    <Flex direction="column" gap="xs" aria-busy={state === 'loading'} className={styles.container}>
      {picture}
      {state === 'loading' ? <Text>Loading image…</Text> : null}
    </Flex>
  );
}
`},{path:`components/list-view/index.module.css`,language:`css`,source:`.root {
  inline-size: 100%;
}

.items {
  margin: 0;
  padding: 0;
  list-style: none;
}
`},{path:`components/list-view/index.tsx`,language:`tsx`,source:`'use client';

import { useEffect, useRef, useState } from 'react';
import { Flex } from '@godaddy/antares';
import { FileItems } from '../file-items';
import { ViewBanner } from '../view-banner';
import type { ImageItem } from '../../data/types';
import styles from './index.module.css';

interface ListViewProps {
  /** Images to render in source order. */
  images: ImageItem[];

  /** Opens the media viewer. */
  onOpen: (id: string) => void;

  /** Removes an image from the collection. */
  onRemove: (image: ImageItem) => void;

  /** Retries a failed image. */
  onRetry: (image: ImageItem) => void;

  /** Reports an image decode or network failure. */
  onLoadError: (id: string) => void;

  /** Reports a successful image load. */
  onLoadSuccess: (id: string) => void;
}

const MAX_VISIBLE_ITEMS = 5;

/** Horizontal file list with counter and error banner. */
export function ListView({ images, onOpen, onRemove, onRetry, onLoadError, onLoadSuccess }: ListViewProps) {
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const firstRevealedIndex = useRef<number | null>(null);
  const visibleImages = showAll ? images : images.slice(0, MAX_VISIBLE_ITEMS);
  const errorCount = images.filter(function countError(image) {
    return image.status === 'error';
  }).length;

  useEffect(
    function focusRevealedFile() {
      const index = firstRevealedIndex.current;
      if (index === null) return;

      firstRevealedIndex.current = null;
      const item = listRef.current?.children[index];
      item?.querySelector<HTMLButtonElement>('button')?.focus();
    },
    [showAll]
  );

  function handleShowAll() {
    firstRevealedIndex.current = visibleImages.length;
    setShowAll(true);
  }

  return (
    <Flex direction="column" gap="sm" className={styles.root}>
      <Flex as="ul" ref={listRef} direction="column" gap="sm" aria-label="Gallery files" className={styles.items}>
        <FileItems
          images={visibleImages}
          variant="horizontal"
          onOpen={onOpen}
          onRemove={onRemove}
          onRetry={onRetry}
          onLoadError={onLoadError}
          onLoadSuccess={onLoadSuccess}
        />
      </Flex>
      <ViewBanner
        visibleCount={visibleImages.length}
        totalCount={images.length}
        errorCount={errorCount}
        onShowAll={handleShowAll}
      />
    </Flex>
  );
}
`},{path:`components/upload-prompt/index.tsx`,language:`tsx`,source:`'use client';

import { forwardRef, useId } from 'react';
import { Button, FileTrigger, Flex, Icon, Text } from '@godaddy/antares';

interface UploadPromptProps {
  /** Whether an accepted file is currently over the gallery. */
  isDropTarget: boolean;

  /** Validation message shared with the picker and drop target. */
  error: string;

  /** MIME types accepted by the gallery picker. */
  acceptedTypes: string[];

  /** Adds files selected from the native picker. */
  onSelect: (files: FileList | null) => void;
}

/** Compact file-upload action shared by Gallery's list and grid views. */
export const UploadPrompt = forwardRef<HTMLButtonElement, UploadPromptProps>(function UploadPrompt(
  { isDropTarget, error, acceptedTypes, onSelect },
  ref
) {
  const helpId = useId();
  const errorId = useId();
  const describedBy = [isDropTarget ? null : helpId, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  return (
    <Flex alignItems="center" gap="sm" wrap="wrap" role="group" aria-label="Add files to gallery">
      <FileTrigger allowsMultiple acceptedFileTypes={acceptedTypes} onSelect={onSelect}>
        <Button
          ref={ref}
          type="button"
          size="md"
          variant="secondary"
          aria-label="Add files"
          aria-describedby={describedBy}
        >
          <Icon icon="upload" aria-hidden="true" />
          Add files
        </Button>
      </FileTrigger>
      {isDropTarget ? null : <Text id={helpId}>or drag them here.</Text>}
      {error ? (
        <Text id={errorId} role="alert" emphasis="critical">
          {error}
        </Text>
      ) : null}
    </Flex>
  );
});
`},{path:`components/view-banner/index.tsx`,language:`tsx`,source:`'use client';

import { Button, Flex, Icon, Text } from '@godaddy/antares';

interface ViewBannerProps {
  /** Number of files currently rendered. */
  visibleCount: number;

  /** Number of files in the collection. */
  totalCount: number;

  /** Number of failed files. */
  errorCount: number;

  /** Reveals the remaining files. */
  onShowAll: () => void;
}

/** Counter and image-error feedback used below the file list. */
export function ViewBanner({ visibleCount, totalCount, errorCount, onShowAll }: ViewBannerProps) {
  const hasMore = visibleCount < totalCount;
  if (!hasMore && errorCount === 0) return null;

  return (
    <Flex direction="column" gap="sm" blockPadding="sm">
      <Flex justifyContent="space-between" alignItems="center" gap="sm">
        <Text>
          {visibleCount} of {totalCount} files
        </Text>
        {hasMore ? (
          <Button variant="inline" onPress={onShowAll}>
            Show all
          </Button>
        ) : null}
      </Flex>

      {errorCount > 0 ? (
        <Flex justifyContent="center" alignItems="center" gap="xs" role="alert">
          <Icon icon="alert" aria-hidden="true" />
          <Text emphasis="critical">
            {errorCount} file{errorCount === 1 ? ' needs' : 's need'} attention.
          </Text>
        </Flex>
      ) : null}
    </Flex>
  );
}
`},{path:`components/viewer/index.module.css`,language:`css`,source:`.modal {
  inline-size: 100%;
  max-inline-size: 60rem;
}

.slide {
  min-inline-size: 0;
  max-inline-size: 100%;
}

.name {
  overflow-wrap: anywhere;
}

.thumbnails {
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  list-style: none;
}
`},{path:`components/viewer/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Button, Carousel, Box, CloseButton, Content, Flex, Heading, Icon, Modal, Text } from '@godaddy/antares';
import { GalleryImage } from '../image';
import type { ImageItem } from '../../data/types';
import styles from './index.module.css';

type PropagatingKeyboardEvent<T extends Element> = ReactKeyboardEvent<T> & {
  continuePropagation(): void;
};

interface ViewerProps {
  /** Shared direction for layout, keyboard navigation, and carousel gestures. */
  dir: 'ltr' | 'rtl';

  /** Current viewable gallery order, shared by the list and grid views. */
  images: ImageItem[];

  /** Stable image ID, or null while the viewer is closed. */
  activeId: string | null;

  /** Closes the viewer. */
  onClose: () => void;

  /** Selects an image from the viewer controls or thumbnail rail. */
  onSelectImage: (id: string) => void;
}

/** Modal image viewer that reuses Antares Carousel for the main image sequence. */
export function Viewer({ dir, images, activeId, onClose, onSelectImage }: ViewerProps) {
  const strip = useRef<HTMLUListElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const previousButton = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const focusCurrentThumbnail = useRef(false);
  const index = images.findIndex(function findActiveImage(image) {
    return image.id === activeId;
  });
  const image = images[index];

  useEffect(
    function revealCurrentThumbnail() {
      const thumbnail = strip.current?.querySelector<HTMLButtonElement>('[aria-current="true"]');
      thumbnail?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      if (focusCurrentThumbnail.current) {
        (thumbnail ?? closeButton.current)?.focus();
        focusCurrentThumbnail.current = false;
      }
    },
    [activeId]
  );

  const move = useCallback(
    function move(offset: number) {
      const nextImage = images[index + offset];
      if (!nextImage) return;

      // Boundary controls become disabled; focus the current thumbnail before continuing by Tab.
      focusCurrentThumbnail.current =
        focusCurrentThumbnail.current ||
        (document.activeElement === previousButton.current && index + offset === 0) ||
        (document.activeElement === nextButton.current && index + offset === images.length - 1);
      onSelectImage(nextImage.id);
    },
    [images, index, onSelectImage]
  );

  const navigate = useCallback(
    function navigate(event: ReactKeyboardEvent<HTMLElement>) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        focusCurrentThumbnail.current = !!strip.current?.contains(document.activeElement);
        if (event.key === 'Home') move(-index);
        else if (event.key === 'End') move(images.length - 1 - index);
        else move((event.key === 'ArrowLeft' ? -1 : 1) * (dir === 'rtl' ? -1 : 1));
      }
    },
    [dir, images.length, index, move]
  );

  const handleCloseKeyDown = useCallback(
    function handleCloseKeyDown(event: PropagatingKeyboardEvent<HTMLButtonElement>) {
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) navigate(event);
      else event.continuePropagation();
    },
    [navigate]
  );

  const handleOpenChange = useCallback(
    function handleOpenChange(open: boolean) {
      if (!open) onClose();
    },
    [onClose]
  );

  const handlePrevious = useCallback(
    function handlePrevious() {
      move(-1);
    },
    [move]
  );

  const handleNext = useCallback(
    function handleNext() {
      move(1);
    },
    [move]
  );

  const handleCarouselChange = useCallback(
    function handleCarouselChange(nextIndex: number) {
      const nextImage = images[nextIndex];
      if (nextImage && nextImage.id !== activeId) onSelectImage(nextImage.id);
    },
    [activeId, images, onSelectImage]
  );

  const renderSlide = useCallback(
    function renderSlide(slideImage: ImageItem, slideIndex: number) {
      return (
        <Flex key={slideImage.id} alignItems="center" justifyContent="center" className={styles.slide}>
          {Math.abs(slideIndex - index) <= 1 ? (
            <GalleryImage image={slideImage} variant="viewer" loading={slideImage.id === activeId ? 'eager' : 'lazy'} />
          ) : (
            <Box aria-hidden="true" />
          )}
        </Flex>
      );
    },
    [activeId, index]
  );

  const renderThumbnail = useCallback(
    function renderThumbnail(thumbnailImage: ImageItem) {
      return (
        <Flex as="li" key={thumbnailImage.id} flexShrink={0}>
          <GalleryImage
            image={thumbnailImage}
            variant="thumbnail"
            selected={thumbnailImage.id === activeId}
            label={\`View \${thumbnailImage.name}\`}
            tabIndex={thumbnailImage.id === activeId ? 0 : -1}
            onKeyDown={handleCloseKeyDown}
            onOpen={onSelectImage}
          />
        </Flex>
      );
    },
    [activeId, handleCloseKeyDown, onSelectImage]
  );

  if (!image) return null;

  return (
    <Modal isOpen dir={dir} aria-label="Media gallery" onOpenChange={handleOpenChange} className={styles.modal}>
      <Heading slot="title" level={2}>
        Media gallery
      </Heading>
      <CloseButton ref={closeButton} aria-label="Close gallery" onKeyDown={handleCloseKeyDown} />
      <Content onKeyDown={navigate}>
        <Carousel
          activeIndex={index}
          onChange={handleCarouselChange}
          hideDots
          hideNavigationControls
          hideMaskEdges
          emblaOptions={{ direction: dir, duration: 0 }}
          emblaAccessibilityOptions={{ carouselAriaLabel: 'Gallery images', announceChanges: false }}
        >
          {images.map(renderSlide)}
        </Carousel>
        <Flex justifyContent="space-between" alignItems="center" gap="sm" wrap="wrap">
          <Text className={styles.name} role="status" aria-atomic="true">
            {image.name} · {index + 1} of {images.length}
          </Text>
          <Flex gap="xs" alignItems="center">
            <Button
              ref={previousButton}
              onKeyDown={handleCloseKeyDown}
              variant="secondary"
              aria-label="Previous image"
              isDisabled={index === 0}
              onPress={handlePrevious}
            >
              <Icon icon={dir === 'rtl' ? 'chevron-right' : 'chevron-left'} aria-hidden="true" />
            </Button>
            <Button
              ref={nextButton}
              onKeyDown={handleCloseKeyDown}
              variant="secondary"
              aria-label="Next image"
              isDisabled={index === images.length - 1}
              onPress={handleNext}
            >
              <Icon icon={dir === 'rtl' ? 'chevron-left' : 'chevron-right'} aria-hidden="true" />
            </Button>
          </Flex>
        </Flex>
        <Flex as="ul" ref={strip} gap="sm" aria-label="Image thumbnails" className={styles.thumbnails}>
          {images.map(renderThumbnail)}
        </Flex>
      </Content>
    </Modal>
  );
}
`},{path:`data/sample-images.ts`,language:`ts`,source:`import type { ImageItem } from './types';

/** Fixed IDs keep the sample photographs consistent between visits. */
const photographs: ImageItem[] = [
  {
    id: 'sample-1015',
    name: 'file_name.png',
    alt: 'Blue fjord between rocky mountains',
    src: 'https://picsum.photos/id/1015/960/640',
    size: 5 * 1024 * 1024
  },
  {
    id: 'sample-1016',
    name: 'Photo_2.png',
    alt: 'Red sandstone mesas beneath a cloudy sky',
    src: 'https://picsum.photos/id/1016/960/640',
    size: 2 * 1024 * 1024
  },
  {
    id: 'sample-1018',
    name: 'Photo_3.png',
    alt: 'Winding road beneath grass-covered cliffs',
    src: 'https://picsum.photos/id/1018/960/640',
    size: 4 * 1024 * 1024
  },
  {
    id: 'sample-1025',
    name: 'Photo_4.png',
    alt: 'Pug wrapped in a blanket',
    src: 'https://picsum.photos/id/1025/960/640',
    size: 6 * 1024 * 1024
  },
  {
    id: 'sample-1035',
    name: 'Photo_5.png',
    alt: 'Waterfall flowing over a rocky cliff',
    src: 'https://picsum.photos/id/1035/960/640',
    size: 3 * 1024 * 1024
  },
  {
    id: 'sample-1043',
    name: 'Photo_6.png',
    alt: 'Granite cliffs above a river and pine forest',
    src: 'https://picsum.photos/id/1043/960/640',
    size: 4 * 1024 * 1024
  },
  {
    id: 'sample-1050',
    name: 'Photo_7.png',
    alt: 'White sea stacks along a rugged coast',
    src: 'https://picsum.photos/id/1050/960/640',
    size: 5 * 1024 * 1024
  },
  {
    id: 'sample-1069',
    name: 'Photo_8.png',
    alt: 'Jellyfish in dark blue water',
    src: 'https://picsum.photos/id/1069/960/640',
    size: 3 * 1024 * 1024
  },
  {
    id: 'sample-1068',
    name: 'Photo_9.png',
    alt: 'Potted plant and glass jar on a table against a blue wall',
    src: 'https://picsum.photos/id/1068/960/640',
    size: 4 * 1024 * 1024
  },
  {
    id: 'sample-1074',
    name: 'Photo_10.png',
    alt: 'Close-up of a lioness against a dark background',
    src: 'https://picsum.photos/id/1074/960/640',
    size: 6 * 1024 * 1024
  },
  {
    id: 'sample-error',
    name: 'Photo_error.png',
    alt: 'Landscape photograph that could not be loaded',
    src: 'https://picsum.photos/id/1084/960/640',
    size: 5 * 1024 * 1024,
    status: 'error',
    errorMessage: 'Couldn’t load Photo_error.png.'
  }
];

/** Small previews and responsive originals illustrate an image-service integration. */
export const sampleImages: ImageItem[] = photographs.map((image) => ({
  ...image,
  thumbnailSrc: image.src.replace('/960/640', '/240/160'),
  width: 960,
  height: 640,
  srcSet: \`\${image.src.replace('/960/640', '/480/320')} 480w, \${image.src} 960w\`,
  sizes: '(max-width: 60rem) 90vw, 960px'
}));
`},{path:`data/types.ts`,language:`ts`,source:`/** The load state shown by a gallery file item. */
type ImageStatus = 'ready' | 'loading' | 'error';

/** An image shown by the gallery. IDs must be unique and stable. */
export interface ImageItem {
  /** Identity used by navigation and removal. */
  id: string;

  /** Visible filename and accessible action name. */
  name: string;

  /** Description of the visual content. Falls back to the filename for file-management use cases. */
  alt?: string;

  /** Remote URL, data URL, or locally owned object URL for the full image. */
  src: string;

  /** Smaller resource for covers and the thumbnail rail; defaults to src. */
  thumbnailSrc?: string;

  /** Responsive full-image candidates supplied by the image service. */
  srcSet?: string;

  /** Display sizes corresponding to srcSet. */
  sizes?: string;

  /** Intrinsic full-image width, when known. */
  width?: number;

  /** Intrinsic full-image height, when known. */
  height?: number;

  /** Actual bytes when known; unknown remote sizes are excluded from the byte budget. */
  size?: number;

  /** Current image load state. */
  status?: ImageStatus;

  /** Optional message associated with an image error. */
  errorMessage?: string;
}

/** Local collection budgets. Initial images count toward these limits but are never discarded. */
export interface GalleryLimits {
  /** Maximum collection size, including initial images. Defaults to 50. */
  maxFiles?: number;

  /** Exclusive per-file byte limit. Defaults to 256 MiB. */
  maxFileSize?: number;

  /** Inclusive total byte budget for images with a known size. Defaults to 256 MiB. */
  maxTotalSize?: number;
}
`},{path:`hooks/use-gallery-images.ts`,language:`ts`,source:`'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { GalleryLimits, ImageItem } from '../data/types';

export const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MiB = 1024 * 1024;
export const defaultLimits: Required<GalleryLimits> = { maxFiles: 50, maxFileSize: 256 * MiB, maxTotalSize: 256 * MiB };

/** Hashing is optional; an unreadable file still fails independently of the rest of its batch. */
async function contentKey(file: File) {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) return null;
  const bytes = await file.arrayBuffer();
  try {
    const digest = await subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  } catch {
    return null;
  }
}

/** Owns local resources, serialized ingestion, and the image collection independently of its presentation. */
export function useGalleryImages(
  initialImages: ImageItem[],
  limits: Required<GalleryLimits>,
  onImagesChange?: (images: ImageItem[]) => void
) {
  const [images, setImages] = useState(() => [...initialImages]);
  const collection = useRef(images);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [processing, setProcessing] = useState<{ completed: number; total: number } | null>(null);
  const progress = useRef({ completed: 0, total: 0 });
  const mounted = useRef(false);
  const instanceId = useId();
  const counter = useRef(0);
  const owned = useRef(new Map<string, { id: string; url: string }>());
  const keys = useRef(new Map<string, string>());
  const queue = useRef(Promise.resolve());
  const callback = useRef(onImagesChange);
  callback.current = onImagesChange;
  const previous = useRef(images);

  useEffect(
    function notifyCollectionChange() {
      if (previous.current !== images) {
        previous.current = images;
        callback.current?.([...images]);
      }
    },
    [images]
  );

  useEffect(function manageResources() {
    mounted.current = true;
    const urls = owned.current;
    const ids = keys.current;
    return function releaseResources() {
      mounted.current = false;
      for (const { url } of urls.values()) URL.revokeObjectURL(url);
      urls.clear();
      ids.clear();
    };
  }, []);

  const updateImages = useCallback(function updateImages(update: (previous: ImageItem[]) => ImageItem[]) {
    collection.current = update(collection.current);
    setImages(collection.current);
  }, []);

  const reportError = useCallback(function reportError(message: string) {
    if (mounted.current) setError((previous) => (previous ? \`\${previous} \${message}\` : message));
  }, []);

  const addFiles = useCallback(
    function addFiles(list: FileList | File[] | null) {
      const files = Array.from(list ?? []);
      if (!mounted.current || !files.length) return Promise.resolve();
      progress.current.total += files.length;
      setProcessing({ ...progress.current });

      const process = async function processFiles() {
        if (!mounted.current) return;
        let added = 0;
        let duplicates = 0;
        let invalid = 0;
        let overBudget = 0;
        let unreadable = 0;
        for (const file of files) {
          if (!mounted.current) return;
          try {
            if (!acceptedTypes.includes(file.type) || file.size >= limits.maxFileSize) {
              invalid++;
              continue;
            }
            const totalBytes = collection.current.reduce((total, image) => total + (image.size ?? 0), 0);
            if (collection.current.length >= limits.maxFiles || totalBytes + file.size > limits.maxTotalSize) {
              overBudget++;
              continue;
            }
            const hash = await contentKey(file);
            if (!mounted.current) return;
            const id = \`local-\${instanceId}-\${counter.current++}\`;
            const key = hash ? JSON.stringify([file.name, hash]) : \`unique:\${id}\`;
            if (hash && owned.current.has(key)) {
              duplicates++;
              continue;
            }
            const url = URL.createObjectURL(file);
            owned.current.set(key, { id, url });
            keys.current.set(id, key);
            updateImages((previous) => [...previous, { id, name: file.name, size: file.size, src: url }]);
            added++;
          } catch {
            unreadable++;
          } finally {
            progress.current.completed++;
            if (mounted.current) setProcessing({ ...progress.current });
          }
        }
        if (!mounted.current) return;
        const errors = [];
        if (invalid) errors.push(\`Use JPG, PNG, GIF, or WebP images smaller than \${limits.maxFileSize / MiB} MiB.\`);
        if (overBudget)
          errors.push(\`Gallery limit reached: \${limits.maxFiles} images and \${limits.maxTotalSize / MiB} MiB total.\`);
        if (unreadable) errors.push('We couldn’t read some images. Please try again.');
        setError(errors.join(' '));
        const messages = [];
        if (added) messages.push(\`\${added} \${added === 1 ? 'image' : 'images'} added.\`);
        if (duplicates) messages.push(\`\${duplicates} \${duplicates === 1 ? 'duplicate' : 'duplicates'} skipped.\`);
        setNotice(messages.join(' '));
      };
      const pending = queue.current.then(process);
      queue.current = pending
        .catch(function failedBatch() {
          reportError('We couldn’t read these images. Please try again.');
        })
        .finally(function finishBatch() {
          if (progress.current.completed === progress.current.total) {
            progress.current = { completed: 0, total: 0 };
            if (mounted.current) setProcessing(null);
          }
        });
      return queue.current;
    },
    [instanceId, limits.maxFiles, limits.maxFileSize, limits.maxTotalSize, reportError, updateImages]
  );

  const removeImage = useCallback(
    function removeImage(image: ImageItem) {
      const key = keys.current.get(image.id);
      const entry = key ? owned.current.get(key) : undefined;
      if (key && entry) {
        URL.revokeObjectURL(entry.url);
        owned.current.delete(key);
        keys.current.delete(image.id);
      }
      updateImages((previous) => previous.filter((item) => item.id !== image.id));
      setNotice(\`\${image.name} removed.\`);
    },
    [updateImages]
  );

  const retryImage = useCallback(
    function retryImage(image: ImageItem) {
      updateImages((previous) =>
        previous.map((item) => (item.id === image.id ? { ...item, status: 'loading', errorMessage: undefined } : item))
      );
      setNotice(\`\${image.name} is retrying.\`);
    },
    [updateImages]
  );

  const markReady = useCallback(
    function markReady(id: string) {
      updateImages((previous) =>
        previous.map((item) => (item.id === id ? { ...item, status: 'ready', errorMessage: undefined } : item))
      );
      setNotice('Image is ready to view.');
    },
    [updateImages]
  );

  const markError = useCallback(
    function markError(id: string) {
      updateImages((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, status: 'error', errorMessage: \`Couldn’t load \${item.name}.\` } : item
        )
      );
      setNotice('Image failed to load.');
    },
    [updateImages]
  );

  return { images, error, notice, processing, addFiles, removeImage, retryImage, markReady, markError, reportError };
}
`},{path:`index.tsx`,language:`tsx`,source:`export { Gallery, type GalleryProps } from './components/gallery';
export type { ImageItem } from './data/types';
`}]},children:(0,b.jsx)(i,{of:h,inline:!0})}),`
`,(0,b.jsx)(t.h3,{id:`sign-in-form`,children:`Sign-in form`}),`
`,(0,b.jsx)(l,{block:{id:`sign-in-form`,description:`A simple Antares sign-in experience.`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/sign-in-form`,files:[{path:`components/sign-in-fields.tsx`,language:`tsx`,source:`import { Flex, Input, Label, TextField } from '@godaddy/antares';
import { signInCopy } from '../data/copy';

/** Groups the accessible fields used by the sign-in form block. */
export function SignInFields() {
  return (
    <Flex direction="column" gap="md">
      <TextField name="email" isRequired>
        <Label>{signInCopy.emailLabel}</Label>
        <Input type="email" autoComplete="email" placeholder="you@example.com" />
      </TextField>
      <TextField name="password" isRequired>
        <Label>{signInCopy.passwordLabel}</Label>
        <Input type="password" autoComplete="current-password" />
      </TextField>
    </Flex>
  );
}
`},{path:`components/sign-in-form.tsx`,language:`tsx`,source:`'use client';

import { Box, Button, Flex, Heading, Text } from '@godaddy/antares';
import { signInCopy } from '../data/copy';
import { SignInFields } from './sign-in-fields';

/**
 * Provides a sign-in form composition to copy and adapt. Submission is prevented
 * until the consuming application supplies its authentication behavior.
 *
 * @example
 * \`\`\`tsx
 * <SignInForm />
 * \`\`\`
 */
export function SignInForm() {
  return (
    <Flex justifyContent="center">
      <Box flex="0 1 28rem" padding="xl" rounding="md" elevation="card">
        <Flex
          as="form"
          direction="column"
          gap="lg"
          onSubmit={function handleSubmit(event) {
            event.preventDefault();
          }}
        >
          <Heading level={2}>{signInCopy.title}</Heading>
          <Text>{signInCopy.description}</Text>
          <SignInFields />
          <Button type="submit" variant="primary">
            {signInCopy.submitLabel}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
`},{path:`data/copy.ts`,language:`ts`,source:`export const signInCopy = {
  title: 'Sign in to your account',
  description: 'Use your email and password to continue.',
  emailLabel: 'Email',
  passwordLabel: 'Password',
  submitLabel: 'Sign in'
} as const;
`},{path:`index.tsx`,language:`tsx`,source:`export { SignInForm } from './components/sign-in-form';
`}]},children:(0,b.jsx)(i,{of:p,inline:!0})})]})}function y(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;function x(){return(x=e((()=>{b=t(),n(),c(),o(),s(),u(),f(),m(),g()})))()}x();export{y as default};