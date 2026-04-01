import { Select, SelectItem } from '@godaddy/antares';

export function SelectRenderPropsExample() {
  return (
    <Select aria-label="Render props select">
      <SelectItem id="item1" textValue="Item with render function">
        {function renderChildren(renderProps) {
          return <span>{renderProps.isSelected ? 'Selected' : 'Not selected'}</span>;
        }}
      </SelectItem>
      <SelectItem id="item2">Regular item</SelectItem>
      <SelectItem id="item3">
        <span>JSX Element Child</span>
      </SelectItem>
    </Select>
  );
}
