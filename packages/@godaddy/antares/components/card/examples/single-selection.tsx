import { useState } from 'react';
import {
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Flex,
  Header,
  Heading,
  type Selection,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * Pick a plan and see its monthly price. `disallowEmptySelection` keeps one plan selected.
 * @title Single selection
 * @order 8
 */
export function SingleSelectionExample() {
  const [selected, setSelected] = useState<Selection>(new Set(['starter']));
  const starterPrice = 10;
  const proPrice = 25;
  const isPro = selected !== 'all' && selected.has('pro');

  return (
    <Flex direction="column" gap="md">
      <CardGroup
        aria-label="Choose a plan"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <Card id="starter" textValue="Starter plan">
          <TextLockup>
            <Tag slot="eyebrow" emphasis="success">
              Popular
            </Tag>
            <Header>
              <CornerActions>
                <CardSelectionIndicator data-testid="starter-indicator" />
              </CornerActions>
              <Heading slot="title">Starter plan</Heading>
            </Header>
            <Text slot="body">For getting started with a single project.</Text>
            <Text>${starterPrice}/month</Text>
          </TextLockup>
        </Card>
        <Card id="pro" textValue="Pro plan">
          <TextLockup>
            <Tag slot="eyebrow" emphasis="premium">
              Upgrade
            </Tag>
            <Header>
              <CornerActions>
                <CardSelectionIndicator data-testid="pro-indicator" />
              </CornerActions>
              <Heading slot="title">Pro plan</Heading>
            </Header>
            <Text slot="body">For teams that need more room to grow.</Text>
            <Text>${proPrice}/month</Text>
          </TextLockup>
        </Card>
      </CardGroup>
      <Text role="status">
        Selected plan: {isPro ? 'Pro' : 'Starter'} - ${isPro ? proPrice : starterPrice}/month
      </Text>
    </Flex>
  );
}
