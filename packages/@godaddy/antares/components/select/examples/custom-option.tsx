import { Select, SelectItem, type SelectItemProps } from '@godaddy/antares';

function CountryOption(props: SelectItemProps) {
  return <SelectItem {...props} />;
}

/**
 * Option components may wrap SelectItem and still use Select's default layout.
 * @title Custom option
 * @order 9
 */
export function CustomOptionExample() {
  return (
    <Select label="Country" placeholder="Pick a country">
      <CountryOption id="us">United States</CountryOption>
      <CountryOption id="mx">Mexico</CountryOption>
      <CountryOption id="gb">United Kingdom</CountryOption>
    </Select>
  );
}
