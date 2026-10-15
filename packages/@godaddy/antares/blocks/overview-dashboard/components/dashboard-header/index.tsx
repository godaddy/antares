import {
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
