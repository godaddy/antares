import { NumberField } from '@godaddy/antares';

const devanagariFormatOptions = Intl.NumberFormat('hi-IN-u-nu-deva').resolvedOptions();

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
