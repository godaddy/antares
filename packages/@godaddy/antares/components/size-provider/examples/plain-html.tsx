import { SizeProvider, Text } from '@godaddy/antares';

/**
 * A scope sizes Antares components only. Plain HTML keeps its own typography, so put copy in
 * `Text` to follow the scope.
 * @order 7
 */
export function PlainHtmlExample() {
  return (
    <SizeProvider size="lg">
      <p>A plain paragraph keeps the page's typography.</p>
      <Text>Text follows the scope.</Text>
    </SizeProvider>
  );
}
