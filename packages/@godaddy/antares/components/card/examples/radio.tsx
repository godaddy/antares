import {
  Card,
  CardSelectionIndicator,
  CornerActions,
  Heading,
  RadioGroup,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * Radio Cards require a value and live in RadioGroup, which owns selection and arrow-key movement.
 * @title Radio
 * @order 8
 */
export function RadioExample() {
  return (
    <RadioGroup aria-label="Choose a plan" defaultValue="starter">
      <Card selection="radio" value="starter" aria-label="Starter plan">
        <TextLockup>
          <Tag slot="eyebrow" emphasis="success">
            Popular
          </Tag>
          <Heading slot="title" level={3}>
            Starter plan
          </Heading>
          <Text slot="body">For getting started with a single project.</Text>
        </TextLockup>
        <CornerActions>
          <CardSelectionIndicator data-testid="radio-starter-indicator" />
        </CornerActions>
      </Card>
      <Card selection="radio" value="pro" aria-label="Pro plan">
        <TextLockup>
          <Tag slot="eyebrow" emphasis="premium">
            Upgrade
          </Tag>
          <Heading slot="title" level={3}>
            Pro plan
          </Heading>
          <Text slot="body">For teams that need more room to grow.</Text>
        </TextLockup>
        <CornerActions>
          <CardSelectionIndicator data-testid="radio-pro-indicator" />
        </CornerActions>
      </Card>
    </RadioGroup>
  );
}
