import {
  Field,
  FieldButton,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Flex,
  type FieldGroupProps
} from '@godaddy/antares';

export function FieldGroupLeadingControl(props: FieldGroupProps) {
  return (
    <Field>
      <FieldLabel>Phone</FieldLabel>
      <FieldGroup gap="sm" {...props}>
        <FieldButton aria-label="Country code" edge="start">
          Click Me
        </FieldButton>
        <Flex as="span" flex={1} alignItems="center" padding="md">
          Placeholder content
        </Flex>
      </FieldGroup>
      <FieldDescription>Enter your phone number</FieldDescription>
    </Field>
  );
}
