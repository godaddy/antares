import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioAriaLabelExample() {
  return (
    <RadioGroup aria-label="Sort order" defaultValue="newest">
      <Radio value="newest">Newest first</Radio>
      <Radio value="oldest">Oldest first</Radio>
      <Radio value="popular">Most popular</Radio>
    </RadioGroup>
  );
}
