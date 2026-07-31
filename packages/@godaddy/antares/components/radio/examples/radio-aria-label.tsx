import { Radio, RadioGroup } from '@godaddy/antares';

/**
 * A radio group using `aria-label` instead of a visible label.
 * @title Aria Label
 * @order 8
 */
export function RadioAriaLabelExample() {
  return (
    <RadioGroup aria-label="Sort order" defaultValue="newest">
      <Radio value="newest">Newest first</Radio>
      <Radio value="oldest">Oldest first</Radio>
      <Radio value="popular">Most popular</Radio>
    </RadioGroup>
  );
}
