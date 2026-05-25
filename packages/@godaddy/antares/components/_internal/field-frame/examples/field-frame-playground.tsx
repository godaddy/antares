import { FieldFrame, type FieldFrameProps } from '../src';

/** Props for the field frame playground example. */
export interface PlaygroundExampleProps
  extends Pick<FieldFrameProps, 'label' | 'description' | 'errorMessage' | 'isRequired' | 'isDisabled'> {}

export function PlaygroundExample({
  label = 'Label',
  description,
  errorMessage,
  isRequired = false,
  isDisabled = false
}: PlaygroundExampleProps) {
  return (
    <FieldFrame
      label={label}
      description={description}
      errorMessage={errorMessage}
      isRequired={isRequired}
      isDisabled={isDisabled}
    >
      <input placeholder="Placeholder content" />
    </FieldFrame>
  );
}
