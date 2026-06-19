import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupHorizontal() {
  return (
    <CheckboxGroup label="Favorite colors" orientation="horizontal">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
