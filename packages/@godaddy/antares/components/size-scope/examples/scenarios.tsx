import { Button, Detail, Flex, Heading, Input, Label, SizeScope, Text, TextField, TextLockup } from '@godaddy/antares';

/**
 * Fixture for the size rules: one region per rule, each with a test id.
 * @ignore
 */
export function ScenariosExample() {
  return (
    <Flex direction="column" gap="lg" alignItems="start">
      <Button data-testid="unscoped">Save</Button>

      <SizeScope size="sm">
        <Button data-testid="sm">Save</Button>
        <SizeScope size="sm">
          <Button data-testid="sm-in-sm">Save</Button>
        </SizeScope>
        <Button data-testid="explicit-md" size="md">
          Save
        </Button>
        <Button data-testid="composed">
          <Text>Save</Text>
        </Button>
        <Button data-testid="emphasis">
          <Text emphasis="critical" maxLines={1}>
            Save
          </Text>
        </Button>

        <div data-testid="bare">Bare text</div>
        <Text data-testid="text">Body text</Text>
        <Detail data-testid="detail">Detail text</Detail>
        <Label data-testid="label">Label text</Label>

        <Heading level={2}>Level two</Heading>
        <Heading level={4}>Level four</Heading>

        <Text data-testid="sized-text" size="xl">
          Large <Detail data-testid="nested-detail">nested detail</Detail>
        </Text>

        <TextField>
          <Label>Email</Label>
          <Input />
          <Text slot="description" data-testid="description">
            Owner size
          </Text>
        </TextField>
        <TextField>
          <Label>Name</Label>
          <Input />
          <Text slot="description" size="lg" data-testid="explicit-description">
            Explicit size
          </Text>
        </TextField>
        <TextField>
          <Label>Phone</Label>
          <Input />
          <Detail slot="description" data-testid="detail-description">
            Owner size
          </Detail>
        </TextField>
        <TextField>
          <Label>Address</Label>
          <Input />
          <Detail slot="description" size="lg" data-testid="explicit-detail-description">
            Explicit size
          </Detail>
        </TextField>

        <TextLockup size="xl">
          <Heading slot="title">Lockup title</Heading>
          <Button data-testid="lockup-button">Lockup action</Button>
        </TextLockup>
      </SizeScope>

      <SizeScope size="lg">
        <Button data-testid="lg">Save</Button>
      </SizeScope>
    </Flex>
  );
}
