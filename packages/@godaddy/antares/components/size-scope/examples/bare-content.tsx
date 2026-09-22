import { SizeScope, Text } from '@godaddy/antares';

/**
 * A scope renders a real element, so bare text and ordinary HTML inside it follow its size too.
 * Use `as="span"` around inline content.
 * @order 4
 */
export function BareContentExample() {
  return (
    <SizeScope size="lg">
      <p>A plain paragraph takes the scope's body typography.</p>
      <Text>
        Your trial ends{' '}
        <SizeScope as="span" size="sm">
          in 3 days
        </SizeScope>
        .
      </Text>
    </SizeScope>
  );
}
