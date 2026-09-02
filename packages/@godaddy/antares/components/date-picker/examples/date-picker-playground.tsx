import {
  Button,
  Calendar,
  Content,
  DatePicker,
  DatePickerValue,
  FieldError,
  Group,
  Icon,
  Label,
  Popover,
  Text
} from '@godaddy/antares';

export interface PlaygroundExampleProps {
  label?: string;
  description?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

export function PlaygroundExample({
  label = 'Event date',
  description,
  placeholder,
  isDisabled,
  isRequired,
  isInvalid,
  errorMessage
}: PlaygroundExampleProps) {
  return (
    <DatePicker isDisabled={isDisabled} isRequired={isRequired} isInvalid={isInvalid}>
      <Label>{label}</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <Icon icon="calendar" />
          <DatePickerValue placeholder={placeholder} />
        </Button>
      </Group>
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>
      <Popover hideArrow>
        <Content>
          <Calendar />
        </Content>
      </Popover>
    </DatePicker>
  );
}
