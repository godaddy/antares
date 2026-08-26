import { Button, ButtonGroup, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

/**
 * Because you compose the parts, anything else can sit alongside them — a call to action
 * here. Controls keep their own type: the buttons are unaffected by the lockup's `size`.
 * @order 6
 */
export function WithActionsExample() {
  return (
    <TextLockup size="xl">
      <Tag slot="eyebrow" emphasis="premium">
        Pro
      </Tag>
      <Heading level={1}>Upgrade your plan</Heading>
      <Text>Unlock advanced reporting, priority support, and unlimited seats for your whole team.</Text>
      <ButtonGroup>
        <Button variant="primary">Upgrade</Button>
        <Button variant="secondary">Compare plans</Button>
      </ButtonGroup>
    </TextLockup>
  );
}
