import { Select, SelectItem, SelectSection, SelectHeader } from '@godaddy/antares';

export function SelectSectionsExample() {
  return (
    <Select aria-label="Sectioned select">
      <SelectSection>
        <SelectHeader>Fruits</SelectHeader>
        <SelectItem id="apple">Apple</SelectItem>
        <SelectItem id="banana">Banana</SelectItem>
      </SelectSection>
      <SelectSection>
        <SelectHeader>Vegetables</SelectHeader>
        <SelectItem id="carrot">Carrot</SelectItem>
        <SelectItem id="lettuce">Lettuce</SelectItem>
      </SelectSection>
    </Select>
  );
}
