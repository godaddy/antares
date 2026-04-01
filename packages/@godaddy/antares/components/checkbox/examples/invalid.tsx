import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupInvalid() {
  return (
    <CheckboxGroup label="Favorite colors" isInvalid description="Choose your favorite color">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
