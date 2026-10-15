import { Content, Drawer, Flex, InlineDrawer } from '@godaddy/antares';
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
