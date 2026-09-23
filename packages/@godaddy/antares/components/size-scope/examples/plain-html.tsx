import { SizeScope, Text } from '@godaddy/antares';

/**
 * A scope sizes Antares components only. Plain HTML keeps its own typography, so put copy in
 * `Text` to follow the scope.
 * @order 4
 */
export function PlainHtmlExample() {
  return (
    <SizeScope size="lg">
      <p>A plain paragraph keeps the page's typography.</p>
      <Text>Text follows the scope.</Text>
    </SizeScope>
  );
}
