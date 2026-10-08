import { Button, CornerActions, Header, Heading, Icon, Tag, Text, TextLockup } from '@godaddy/antares';

/**
 * Put CornerActions before Heading in a Header. Lines beside the actions wrap, while later
 * lines use the full width. Header keeps the body below both the title and the actions.
 * @order 7
 */
export function CornerActionsExample() {
  return (
    <TextLockup size="lg" style={{ maxWidth: '24rem' }}>
      <Tag slot="eyebrow">Recommended</Tag>
      <Header>
        <CornerActions>
          <Button aria-label="More options">
            <Icon icon="ellipsis" />
          </Button>
        </CornerActions>
        <Heading slot="title" level={2}>
          A longer heading that wraps around its actions and fills the width below them
        </Heading>
      </Header>
      <Text slot="body">The lockup owns the text layout, wherever you place it.</Text>
    </TextLockup>
  );
}
