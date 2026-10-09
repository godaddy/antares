import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CornerActions,
  Header,
  Heading,
  Icon,
  LinkButton,
  Menu,
  MenuItem,
  MenuTrigger,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * Save a business guide for later, mark it as read from the menu, or open the guide.
 * @title Corner actions
 * @order 3
 */
export function CornerActionsExample({ dir }: { dir?: 'ltr' | 'rtl' } = {}) {
  const [saved, setSaved] = useState(false);
  const [read, setRead] = useState(false);

  return (
    <Card dir={dir} style={{ maxWidth: '24rem' }}>
      <TextLockup>
        <Header>
          <CornerActions>
            <Button aria-label="Favorite" aria-pressed={saved} onPress={() => setSaved(!saved)}>
              <Icon icon="star" />
            </Button>
            <MenuTrigger popoverProps={{ placement: 'bottom end' }}>
              <Button aria-label="More options">
                <Icon icon="ellipsis" />
              </Button>
              <Menu aria-label="Guide actions">
                <MenuItem id="read" onAction={() => setRead(!read)}>
                  {read ? 'Mark as unread' : 'Mark as read'}
                </MenuItem>
              </Menu>
            </MenuTrigger>
          </CornerActions>
          <Heading slot="title">
            Everything you need to launch your first online store and turn new visitors into returning customers
          </Heading>
        </Header>
        <Text slot="body">
          A practical checklist for your products, payments, shipping, and first marketing campaign.
        </Text>
        {read && <Tag>Read</Tag>}
        <Text role="status">{saved ? 'Saved to your reading list' : '5 min read'}</Text>
      </TextLockup>

      <ButtonGroup>
        <LinkButton variant="primary" href="#store-launch-guide">
          Read guide
        </LinkButton>
      </ButtonGroup>
    </Card>
  );
}
