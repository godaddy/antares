import { Calendar } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  /** Number of month grids to display (maps to `visibleDuration`). */
  months?: number;
}

export function PlaygroundExample(props: PlaygroundExampleProps) {
  const { months = 1, ...rest } = props;
  return <Calendar aria-label="Calendar" {...rest} visibleDuration={{ months }} />;
}
