import { Calendar } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

export function PlaygroundExample(props: PlaygroundExampleProps) {
  return <Calendar aria-label="Calendar" {...props} />;
}
