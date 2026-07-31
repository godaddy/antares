import { NumberField } from '@godaddy/antares';

const devanagariFormatOptions = Intl.NumberFormat('hi-IN-u-nu-deva').resolvedOptions();

/**
 * By default, NumberField displays the value using the numbering system for the user's locale. Use the `formatOptions` prop to override the numbering system by setting the Unicode numbering system locale extension.
 * @title Format options (numbering system)
 * @order 7
 */
export function NumberFieldFormatOptionsExample() {
  return (
    <NumberField
      label="Number (Devanagari)"
      description="By default, NumberField uses the user's locale. Use formatOptions to override with a Unicode numbering system locale extension (e.g. nu-deva)."
      hideStepper
      value={1024}
      formatOptions={devanagariFormatOptions}
    />
  );
}
