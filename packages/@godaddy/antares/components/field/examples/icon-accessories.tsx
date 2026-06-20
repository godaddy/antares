import {
  Field,
  FieldButton,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Flex,
  Icon,
  FieldInput,
  type FieldGroupProps
} from '@godaddy/antares';

export function FieldGroupIconAccessories(props: FieldGroupProps) {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldGroup {...props}>
        <Flex as="span" alignItems="center" inlinePaddingStart="sm">
          <Icon icon="star" />
        </Flex>
        <FieldInput placeholder="Email" />
        <FieldButton aria-label="Verify email address">Verify</FieldButton>
      </FieldGroup>
      <FieldDescription>Enter your email address</FieldDescription>
    </Field>
  );
}
