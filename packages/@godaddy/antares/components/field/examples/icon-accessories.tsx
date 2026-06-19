import { Flex, Icon } from '@godaddy/antares';
import { Field, FieldButton, FieldDescription, FieldGroup, FieldLabel, Input, type FieldGroupProps } from '../src';

export function FieldGroupIconAccessories(props: FieldGroupProps) {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldGroup {...props}>
        <Flex as="span" alignItems="center" inlinePaddingStart="sm">
          <Icon icon="star" />
        </Flex>
        <Input placeholder="Email" edge="middle" />
        <FieldButton aria-label="Verify email address" edge="end">
          Verify
        </FieldButton>
      </FieldGroup>
      <FieldDescription>Enter your email address</FieldDescription>
    </Field>
  );
}
