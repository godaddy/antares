import { FieldGroupBasic, type FieldGroupBasicProps } from './basic';

/** Props for the field group playground example. */
export interface PlaygroundExampleProps extends FieldGroupBasicProps {}

export function PlaygroundExample({
  label = 'Label',
  isRequired = false,
  isDisabled = false,
  ...rest
}: PlaygroundExampleProps) {
  return <FieldGroupBasic label={label} isRequired={isRequired} isDisabled={isDisabled} {...rest} />;
}
