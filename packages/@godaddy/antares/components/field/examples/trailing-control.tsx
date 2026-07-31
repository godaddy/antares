import {
  Field,
  FieldButton,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldInput,
  type FieldGroupProps
} from '@godaddy/antares';

/**
 * A field group with an input and a trailing action control.
 * @title Trailing control
 * @order 3
 */
export function FieldGroupTrailingControlExample(props: FieldGroupProps) {
  return (
    <Field>
      <FieldLabel>Search</FieldLabel>
      <FieldGroup gap="sm" {...props}>
        <FieldInput placeholder="Type..." />
        <FieldButton aria-label="Search">Search</FieldButton>
      </FieldGroup>
      <FieldDescription>Search by keyword</FieldDescription>
    </Field>
  );
}
