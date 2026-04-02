import { ContextExample } from '../examples/namespace.tsx';
import { SlotExample } from '../examples/slot.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@bento/box examples', function bento() {
  describe('Namespaced', function namespace() {
    it('should render a namespaced component', async function nstest() {
      const { container } = await render(<ContextExample />);
      const result = container.innerHTML;

      assume(result).equals(
        '<p>Slot namespace: level 1</p><p>Slot namespace: level 1 &gt; level 2</p><p>Slot namespace: level 1 &gt; level 2 &gt; level 3</p>'
      );
    });
  });

  describe('Slot', function slotDesc() {
    it('should render slot context with assigned slots', async function slotTest() {
      const { container } = await render(<SlotExample />);
      const result = container.innerHTML;

      // Verify the component renders with the expected structure
      assume(result).includes('<h3>Slots in Box Context:</h3>');
      assume(result).includes('<pre>');

      // Verify the slots are properly assigned in the context
      assume(result).includes('"trigger"');
      assume(result).includes('"onClick"');
      assume(result).includes('"handler"');
      assume(result).includes('"aria-label"');
      assume(result).includes('"Example trigger"');
      assume(result).includes('"content"');
      assume(result).includes('"role"');
      assume(result).includes('"dialog"');
      assume(result).includes('"aria-modal"');
    });
  });
});
