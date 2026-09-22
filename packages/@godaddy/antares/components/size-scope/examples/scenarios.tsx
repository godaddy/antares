import type { CSSProperties } from 'react';
import {
  Button,
  DatePicker,
  DatePickerCalendar,
  Detail,
  Flex,
  Group,
  Heading,
  Input,
  Label,
  NumberField,
  SizeScope,
  Text,
  TextField,
  TextLockup
} from '@godaddy/antares';

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
        <Detail as="strong" data-testid="strong-detail">
          Strong detail
        </Detail>
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
          <Text slot="body" data-testid="lockup-body">
            Lockup body
          </Text>
          <Detail slot="body" data-testid="lockup-detail-body">
            Lockup body
          </Detail>
          <Button data-testid="lockup-button">Lockup action</Button>
        </TextLockup>
      </SizeScope>

      <SizeScope size="lg">
        <Button data-testid="lg">Save</Button>
        <NumberField size="md">
          <Label>Seats</Label>
          <Group>
            <Button slot="decrement" />
            <Input />
            <Button slot="increment" />
          </Group>
        </NumberField>
        <DatePicker size="md">
          <Label>Start date</Label>
          <Button slot="trigger" />
          <DatePickerCalendar />
        </DatePicker>
      </SizeScope>

      <div style={{ '--ux-cxbe8g': '20px' } as CSSProperties}>
        <SizeScope size="lg">
          <Button data-testid="legacy-scoped">Save</Button>
          <Button data-testid="legacy-explicit" size="lg">
            Save
          </Button>
        </SizeScope>
      </div>
    </Flex>
  );
}
