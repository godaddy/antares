import type { CSSProperties } from 'react';
import {
  Button,
  Checkbox,
  DatePicker,
  DatePickerCalendar,
  Detail,
  Flex,
  Group,
  Heading,
  Input,
  Label,
  Menu,
  MenuItem,
  NumberField,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  SelectOptions,
  SizeProvider,
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

      <SizeProvider size="sm">
        <Button data-testid="sm">Save</Button>
        <SizeProvider size="sm">
          <Button data-testid="sm-in-sm">Save</Button>
        </SizeProvider>
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
        <Checkbox>Accept terms</Checkbox>
        <RadioGroup aria-label="Plan">
          <Radio value="basic">Basic plan</Radio>
        </RadioGroup>

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
          <Label>Company</Label>
          <Input />
          <Text as="strong" slot="description" data-testid="strong-description">
            Strong description
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

        <TextLockup
          size="xl"
          style={{ '--font-detail-family': 'monospace', '--font-detail-line-height': '2' } as CSSProperties}
        >
          <Text slot="eyebrow" data-testid="lockup-eyebrow">
            Lockup eyebrow
          </Text>
          <Detail slot="eyebrow" data-testid="lockup-detail-eyebrow">
            Lockup eyebrow
          </Detail>
          <Heading slot="title">Lockup title</Heading>
          <Text slot="body" data-testid="lockup-body">
            Lockup body
          </Text>
          <Detail slot="body" data-testid="lockup-detail-body">
            Lockup body
          </Detail>
          <Button data-testid="lockup-button">Lockup action</Button>
        </TextLockup>

        <Menu aria-label="File actions">
          <MenuItem>Rename</MenuItem>
          <MenuItem textValue="Duplicate">
            <Text>Duplicate</Text>
          </MenuItem>
        </Menu>
      </SizeProvider>

      <SizeProvider size="lg">
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
      </SizeProvider>

      <div style={{ '--font-body-size-md': '20px', '--size-space-040': '12px' } as CSSProperties}>
        <NumberField>
          <Label>Rooms</Label>
          <Group>
            <Button slot="decrement" />
            <Input />
            <Button slot="increment" />
          </Group>
        </NumberField>
        <SizeProvider size="md">
          <NumberField>
            <Label>Guests</Label>
            <Group>
              <Button slot="decrement" />
              <Input />
              <Button slot="increment" />
            </Group>
          </NumberField>
        </SizeProvider>
      </div>

      <div style={{ '--size-space-sm': '6px', '--size-space-md': '10px', '--size-space-lg': '14px' } as CSSProperties}>
        <Button data-testid="token-unscoped">Save</Button>
        <Button data-testid="token-explicit-sm" size="sm">
          Save
        </Button>
        <SizeProvider size="md">
          <Button data-testid="token-md">Save</Button>
        </SizeProvider>
        <SizeProvider size="sm">
          <Button data-testid="token-sm">Save</Button>
        </SizeProvider>
        <SizeProvider size="lg">
          <TextField size="md">
            <Label>Phone number</Label>
            <Group>
              <Select aria-label="Country" defaultValue="us" variant="control">
                <Button slot="trigger" />
                <SelectOptions>
                  <SelectItem id="us">+1</SelectItem>
                </SelectOptions>
              </Select>
              <Input />
              <Button slot="control">Verify</Button>
            </Group>
          </TextField>
        </SizeProvider>
      </div>

      <div style={{ '--ux-cxbe8g': '20px' } as CSSProperties}>
        <SizeProvider size="lg">
          <Button data-testid="legacy-scoped">Save</Button>
          <Button data-testid="legacy-explicit" size="lg">
            Save
          </Button>
        </SizeProvider>
      </div>
    </Flex>
  );
}
