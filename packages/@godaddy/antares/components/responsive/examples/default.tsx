import { Text, useMediaQuery, viewportQueries } from '@godaddy/antares';

interface DefaultExampleProps {
  query?: string;
  ssrMatch?: boolean;
}

/**
 * Resize the viewport across `lg` to see the query change. Use this hook for behavior that
 * needs JavaScript; ordinary responsive styles belong in CSS.
 * @order 1
 */
export function DefaultExample({ query = viewportQueries.lg, ssrMatch = false }: DefaultExampleProps) {
  const matches = useMediaQuery(query, { ssrMatch });
  return <Text role="status">{matches ? 'Matches' : 'Does not match'}</Text>;
}
