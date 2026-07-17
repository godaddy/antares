import { DatePicker } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  label?: string;
  description?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

export function PlaygroundExample(props: PlaygroundExampleProps) {
  return <DatePicker {...props} />;
}
