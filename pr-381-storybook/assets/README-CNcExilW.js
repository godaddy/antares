import{i as e}from"./preload-helper-BXP-kQWF.js";import{F as t}from"./iframe-CT5nU2_M.js";import{S as n,l as r,s as i,u as a}from"./blocks-tn-Te800.js";import{t as o}from"./mdx-react-shim-Bye7yoLQ.js";import{n as s}from"./runtime-RUhKoRnb.js";import{n as c,t as l}from"./storybook-runtime-eXxtWWfz.js";import{Preview as u,t as d}from"./overview-dashboard.stories-Da0mN2ZK.js";function f(e){let t={h1:`h1`,p:`p`,...n(),...e.components};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(i,{title:`Blocks/Overview Dashboard`,id:`blocks-overview-dashboard--overview`}),`
`,(0,m.jsx)(t.h1,{id:`overview-dashboard`,children:`Overview dashboard`}),`
`,(0,m.jsx)(t.p,{children:`A responsive Antares overview dashboard with users, sales channels, and conversations.`}),`
`,(0,m.jsx)(l,{block:{id:`overview-dashboard`,description:`A responsive Antares overview dashboard with users, sales channels, and conversations.`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/overview-dashboard`,files:[{path:`components/appointments-promotion-card/index.module.css`,language:`css`,source:`.mediaCard {
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
              alt="Illustration for online appointments"
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
`},{path:`components/dashboard-header/index.tsx`,language:`tsx`,source:`import { Avatar, Box, Button, Flex, Icon, Text } from '@godaddy/antares';
import styles from './index.module.css';

interface DashboardHeaderProps {
  /** Opens the product navigation from the compact mobile header. */
  onOpenNavigation: () => void;
}

/** Renders the compact application header shown above the dashboard. */
export function DashboardHeader({ onOpenNavigation }: DashboardHeaderProps) {
  return (
    <Flex className={styles.navigation} justifyContent="space-between" alignItems="center" gap="lg" wrap="wrap">
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

      <Flex className={styles.navActions} alignItems="center" gap="md" wrap="wrap">
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
        <Button variant="minimal" size="sm" aria-label="Account menu">
          <Avatar size="sm" emphasis="primary">
            <Text>MT</Text>
          </Avatar>
        </Button>
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

:where([data-collapsed]) .navigationToggle,
:where([data-collapsed]) .sideNavContent {
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

.sideNavItem:where([aria-current="page"]) {
  background: var(--ux-9i7okd, #f5f7f8);
  font-weight: 600;
}

.sideNavItem:where([aria-current="page"]):where([data-hovered]) {
  background: var(--color-action-background-tertiary-hovered, var(--ux-1m7qrkf, #f5f5f5));
  color: var(--color-action-text-tertiary-hovered, var(--ux-unx9i2, #008080));
}

.sideNavItem:where([aria-current="page"]):where([data-pressed]) {
  background: var(--color-action-background-tertiary-pressed, var(--ux-9qpf6c, #dcdcdc));
  color: var(--color-action-text-tertiary-pressed, var(--ux-h6e7c1, #191970));
}

.sideNavItem:where([aria-current="page"])::before {
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

@media (hover: hover) and (pointer: fine) {
  :where([data-collapsed]):where(:hover) .navigationToggle {
    display: inline-flex;
  }

  :where([data-collapsed]):where(:hover) .sideNavContent {
    display: flex;
  }
}
`},{path:`components/dashboard-sidebar-content/index.tsx`,language:`tsx`,source:`import { Button, Flex, Icon, Tag, Text } from '@godaddy/antares';
import { dashboardNavigationItems, type DashboardNavigationItemLabel } from '../../constants/config';
import styles from './index.module.css';

interface DashboardSidebarContentProps {
  /** Item label that receives the active marker. */
  activeItem: DashboardNavigationItemLabel;

  /** Whether the desktop rail is pinned open. */
  isPinnedOpen: boolean;

  /** Selects a menu item without navigating the example. */
  onSelectItem: (label: DashboardNavigationItemLabel) => void;

  /** Toggles the desktop rail or closes the mobile navigation. */
  onToggleCollapse: () => void;
}

/** Renders the shared navigation content used by desktop and mobile navigation. */
export function DashboardSidebarContent({
  activeItem,
  isPinnedOpen,
  onSelectItem,
  onToggleCollapse
}: DashboardSidebarContentProps) {
  const navigationToggleLabel = isPinnedOpen ? 'Collapse navigation' : 'Expand navigation';

  return (
    <Flex className={styles.content} direction="column" gap="xl">
      <Flex className={styles.navigationHeader} justifyContent="space-between" alignItems="center" gap="md">
        <Icon className={styles.sideNavigationLogo} icon="gd-the-go" aria-label="GoDaddy" />
        <Button
          className={styles.navigationToggle}
          variant="minimal"
          size="sm"
          aria-label={navigationToggleLabel}
          aria-pressed={isPinnedOpen}
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
              aria-current={isActive ? 'page' : undefined}
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

.sideNavigationContainer:where([data-pinned-open]) .sideNavigation {
  inline-size: var(--_max-size);
}

.sideNavigationContainer:where([data-pinned-open]) {
  z-index: 1;
}

@media (hover: hover) and (pointer: fine) {
  .sideNavigationContainer:where(:hover):where(:not([data-pinned-open])) {
    z-index: 1;
  }

  .sideNavigationContainer:where(:hover):where(:not([data-pinned-open])) .sideNavigation {
    inline-size: var(--_max-size);
  }
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
`},{path:`components/dashboard-sidebar/index.tsx`,language:`tsx`,source:`import { Drawer, Flex, InlineDrawer } from '@godaddy/antares';
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
  isMobileNavigationOpen,
  onMobileNavigationChange
}: DashboardSidebarProps) {
  return (
    <>
      <InlineDrawer
        className={styles.sideNavigationContainer}
        placement="left"
        isExpanded={isPinnedOpen}
        minSize={56}
        maxSize={224}
        data-pinned-open={isPinnedOpen || undefined}
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
        <Flex as="nav" direction="column" aria-label="Product navigation" padding="lg">
          <DashboardSidebarContent
            activeItem={activeItem}
            isPinnedOpen
            onSelectItem={onSelectItem}
            onToggleCollapse={onToggleCollapse}
          />
        </Flex>
      </Drawer>
    </>
  );
}
`},{path:`components/overview-dashboard/index.module.css`,language:`css`,source:`.dashboardFrame {
  container-type: inline-size;
}

.dashboardShell {
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--sp-xl);
  min-inline-size: 0;
}

.dashboardMain {
  min-inline-size: 0;
}

.contentGrid {
  grid-template-columns: minmax(0, 2.25fr) minmax(17.5rem, 1fr);
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
import { useState } from 'react';
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
  const [activeNavigationItem, setActiveNavigationItem] =
    useState<DashboardNavigationItemLabel>(defaultActiveNavigationItem);
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
`},{path:`components/sales-channels-card/index.module.css`,language:`css`,source:`.salesCardMeasure {
  min-inline-size: 0;
}
`},{path:`components/sales-channels-card/index.tsx`,language:`tsx`,source:`import { Card, DonutChart, Flex, Heading } from '@godaddy/antares';
import { salesChannelData } from '../../constants/config';
import styles from './index.module.css';

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

/** Demonstrates sales-channel performance with a responsive donut chart. */
export function SalesChannelsCard() {
  return (
    <Card elevation="card" className={styles.salesCardMeasure}>
      <Flex direction="column" gap="lg">
        <Heading level={4}>Sales by Sales Channels</Heading>
        <DonutChart
          data={salesChannelData}
          label="$1,000"
          subLabel="Sub Label"
          legend="bottom"
          formatValue={formatCurrency}
          aria-label="Sales by sales channels donut chart"
        />
      </Flex>
    </Card>
  );
}
`},{path:`components/users-card/index.module.css`,language:`css`,source:`.usersCard {
  min-inline-size: 0;
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
  { id: 'shopify', name: 'Shopify', value: 40 },
  { id: 'facebook-marketplace', name: 'Facebook Marketplace', value: 30 },
  { id: 'instagram', name: 'Instagram', value: 20 },
  { id: 'other', name: 'Other', value: 10 }
] satisfies DonutChartProps['data'];

/** Self-contained local image used by the appointments promotion card. */
export const appointmentsImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 176 112%22%3E%3Cdefs%3E%3ClinearGradient id=%22bg%22 x1=%220%22 y1=%220%22 x2=%221%22 y2=%221%22%3E%3Cstop stop-color=%22%2302242a%22/%3E%3Cstop offset=%221%22 stop-color=%22%2309757a%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22176%22 height=%22112%22 rx=%228%22 fill=%22url(%23bg)%22/%3E%3Ccircle cx=%22134%22 cy=%2230%22 r=%2230%22 fill=%22%23d6f5f1%22 opacity=%22.8%22/%3E%3Cpath d=%22M0 86c30-26 54-16 82-34 26-17 41-6 94 26v34H0z%22 fill=%22%23f4b7d7%22 opacity=%22.85%22/%3E%3Cpath d=%22M0 93c27-11 49-5 79-20 24-12 58 3 97 17v22H0z%22 fill=%22%23f7c84b%22 opacity=%22.9%22/%3E%3Ctext x=%2288%22 y=%2262%22 fill=%22white%22 font-family=%22Arial,sans-serif%22 font-size=%2212%22 text-anchor=%22middle%22%3Eappointments%3C/text%3E%3C/svg%3E';
`},{path:`index.tsx`,language:`tsx`,source:`export { OverviewDashboard } from './components/overview-dashboard';
`}]},children:(0,m.jsx)(r,{of:u,inline:!0})})]})}function p(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(f,{...e})}):f(e)}var m;e((()=>{m=t(),o(),c(),a(),s(),d()}))();export{p as default};