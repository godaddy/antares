import { Calendar } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  /** Number of month grids to display (maps to `visibleDuration`). */
  pageCount?: number;
}

export function PlaygroundExample(props: PlaygroundExampleProps) {
  const { pageCount = 1, ...rest } = props;
  return <Calendar aria-label="Calendar" {...rest} pageCount={pageCount} />;
}
