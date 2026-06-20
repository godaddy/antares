import {
  Field,
  FieldButton,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldInput,
  type FieldGroupProps
} from '@godaddy/antares';

export function FieldGroupTrailingControl(props: FieldGroupProps) {
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
