import { useState } from 'react';
import {
  Button,
  CornerActions,
  Header,
  Heading,
  Icon,
  Menu,
  MenuItem,
  MenuTrigger,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * An article introduction with a menu to mark it as read. Put CornerActions before Heading
 * inside Header so the title wraps around the menu button.
 * @order 7
 */
export function CornerActionsExample() {
  const [read, setRead] = useState(false);

  return (
    <TextLockup size="lg" style={{ maxWidth: '24rem' }}>
      <Tag slot="eyebrow">Business guide</Tag>
      <Header>
        <CornerActions>
          <MenuTrigger popoverProps={{ placement: 'bottom end' }}>
            <Button aria-label="More options">
              <Icon icon="ellipsis" />
            </Button>
            <Menu aria-label="Article actions">
              <MenuItem id="read" onAction={() => setRead(!read)}>
                {read ? 'Mark as unread' : 'Mark as read'}
              </MenuItem>
            </Menu>
          </MenuTrigger>
        </CornerActions>
        <Heading slot="title" level={2}>
          Prepare your online store for launch and make a great first impression on every customer
        </Heading>
      </Header>
      <Text slot="body">
        Check your product photos, payment options, and shipping details before opening your doors.
      </Text>
      <Text role="status">{read ? 'Marked as read' : '5 min read'}</Text>
    </TextLockup>
  );
}
