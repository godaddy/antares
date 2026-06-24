import { Field, FieldDescription, FieldGroup, FieldLabel, Flex } from '@godaddy/antares';

/** Props for the composed field-group examples. */
export interface FieldGroupBasicProps {
  /** Class name merged onto the FieldGroup. */
  className?: string;

  /** Helper text shown below the group. */
  description?: string;

  /** Whether the control is disabled. */
  isDisabled?: boolean;

  /** Whether the field is required. */
  isRequired?: boolean;

  /** Label text shown above the group. */
  label?: string;
}

/**
 * Composes the presentational field primitives (Field, FieldLabel, FieldGroup,
 * FieldDescription) into a minimal boxed field, showing how the group and its
 * position markers are assembled. The fill is a static placeholder — real value,
 * focus, and validation behavior is wired up by the field components (TextField,
 * NumberField, Select).
 */
export function FieldGroupBasic({ className, description, isDisabled, isRequired, label }: FieldGroupBasicProps) {
  return (
    <Field>
      <FieldLabel isRequired={isRequired}>{label}</FieldLabel>
      <FieldGroup className={className} isDisabled={isDisabled} gap="sm">
        <Flex as="span" alignItems="center" padding="md">
          Placeholder content
        </Flex>
      </FieldGroup>
      <FieldDescription>{description}</FieldDescription>
    </Field>
  );
}
