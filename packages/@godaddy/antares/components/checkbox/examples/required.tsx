import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupRequired() {
  return (
    <CheckboxGroup
      label="Favorite colors"
      errorMessage="At least one color must be selected"
      description="Choose your favorite color"
      isRequired
    >
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
