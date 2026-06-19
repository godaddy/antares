import { Flex } from '@godaddy/antares';
import { Field, FieldButton, FieldDescription, FieldGroup, FieldLabel, type FieldGroupProps } from '../src';

export function FieldGroupLeadingControl(props: FieldGroupProps) {
  return (
    <Field>
      <FieldLabel>Phone</FieldLabel>
      <FieldGroup gap="sm" {...props}>
        <FieldButton aria-label="Country code" data-field-group-start>
          Click Me
        </FieldButton>
        <Flex as="span" alignItems="center" padding="md" data-field-group-middle data-field-group-end>
          Placeholder content
        </Flex>
      </FieldGroup>
      <FieldDescription>Enter your phone number</FieldDescription>
    </Field>
  );
}
