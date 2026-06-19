import { Field, FieldButton, FieldDescription, FieldGroup, FieldLabel, Input, type FieldGroupProps } from '../src';

export function FieldGroupTrailingControl(props: FieldGroupProps) {
  return (
    <Field>
      <FieldLabel>Search</FieldLabel>
      <FieldGroup gap="sm" {...props}>
        <Input placeholder="Type..." edge="start" />
        <FieldButton aria-label="Search" edge="end">
          Search
        </FieldButton>
      </FieldGroup>
      <FieldDescription>Search by keyword</FieldDescription>
    </Field>
  );
}
