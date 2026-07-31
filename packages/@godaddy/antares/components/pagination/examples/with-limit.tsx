import { Pagination } from '@godaddy/antares';

/**
 * Limit the number of items shown per page. When `limit` is greater than 1, the number of pages (dots) is derived from `Math.ceil(total / limit)`. For example, 10 items with a limit of 3 produces 4 pages (dots).
 * @order 4
 */
export function WithLimitExample() {
  return <Pagination total={10} limit={3} />;
}
