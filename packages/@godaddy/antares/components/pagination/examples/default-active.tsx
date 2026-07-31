import { Pagination } from '@godaddy/antares';

/**
 * Use `defaultActiveIndex` to set the starting page in uncontrolled mode.
 * @order 3
 */
export function DefaultActiveExample() {
  return <Pagination total={5} defaultActiveIndex={2} />;
}
