import { DefaultExample, type FieldGroupBasicProps } from './default';

/** Props for the field group playground example. */
export interface PlaygroundExampleProps extends FieldGroupBasicProps {}

export function PlaygroundExample({
  label = 'Label',
  isRequired = false,
  isDisabled = false,
  ...rest
}: PlaygroundExampleProps) {
  return <DefaultExample label={label} isRequired={isRequired} isDisabled={isDisabled} {...rest} />;
}
