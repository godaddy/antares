import { Pagination, type PaginationProps } from '@godaddy/antares';

/** Props for the pagination playground example. */
export interface PlaygroundExampleProps extends Pick<PaginationProps, 'total' | 'hideControls' | 'limit'> {
  /** Pagination variant. Use 'none' to hide dots. */
  variant?: 'dots' | 'none';
}

export function PlaygroundExample({
  total = 10,
  variant = 'dots',
  hideControls = false,
  limit = 1
}: PlaygroundExampleProps) {
  return (
    <Pagination total={total} variant={variant === 'none' ? null : variant} hideControls={hideControls} limit={limit} />
  );
}
