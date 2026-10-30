import { Button, Flex, Icon, Tag, Text } from '@godaddy/antares';
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
