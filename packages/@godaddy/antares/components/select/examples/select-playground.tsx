import {
  Button,
  Content,
  FieldError,
  Group,
  Icon,
  Label,
  ListBox,
  Popover,
  Select,
  SelectItem,
  SelectValue,
  Text,
  type SelectProps
} from '@godaddy/antares';

/** Props for the Select playground example. */
export interface PlaygroundExampleProps
  extends Pick<
    SelectProps<object>,
    'placeholder' | 'selectionMode' | 'isDisabled' | 'isRequired' | 'isInvalid' | 'size'
  > {
  /** Label text shown above the field. */
  label?: string;

  /** Helper text shown below the field. */
  description?: string;

  /** Error message shown when the field is invalid. */
  errorMessage?: string;
}

export function PlaygroundExample({
  label = 'Coffee',
  placeholder = 'Pick a drink',
  description,
  errorMessage,
  selectionMode = 'single',
  isDisabled = false,
  isRequired = false,
  isInvalid = false,
  size = 'md'
}: PlaygroundExampleProps) {
  return (
    <Select
      placeholder={placeholder}
      selectionMode={selectionMode}
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={isInvalid}
      size={size}
    >
      <Label>{label}</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <SelectValue />
          <Icon icon="chevron-down" />
        </Button>
      </Group>
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>
      <Popover hideArrow>
        <Content blockPadding="xs" inlinePadding="0">
          <ListBox>
            <SelectItem id="espresso">Espresso</SelectItem>
            <SelectItem id="latte">Latte</SelectItem>
            <SelectItem id="cappuccino">Cappuccino</SelectItem>
            <SelectItem id="americano">Americano</SelectItem>
            <SelectItem id="mocha">Mocha</SelectItem>
          </ListBox>
        </Content>
      </Popover>
    </Select>
  );
}
