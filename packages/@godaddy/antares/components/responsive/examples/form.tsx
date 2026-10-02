import { Grid, Input, Label, Text, TextField } from '@godaddy/antares';

interface FormExampleProps {
  /** Help text that can wrap onto multiple lines. */
  description?: string;

  /** Reading direction of the form. */
  dir?: 'ltr' | 'rtl';
}

/**
 * Type into a field and resize across `lg`. CSS reflows the same inputs, preserving their
 * values, focus, and selection. Let CSS own columns and allow long descriptions to wrap.
 * @order 5
 */
export function FormExample({
  description = 'Use the name customers recognize on invoices and receipts.',
  dir
}: FormExampleProps) {
  return (
    <>
      <style>{`
        .responsive-form-example {
          grid-template-columns: minmax(0, 1fr);
        }

        .responsive-form-example-field {
          min-inline-size: 0;
          overflow-wrap: anywhere;
        }

        @media (min-width: 64rem) {
          .responsive-form-example {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
      <Grid as="form" aria-label="Account details" dir={dir} gap="md" className="responsive-form-example">
        <TextField name="displayName" className="responsive-form-example-field">
          <Label>Account display name</Label>
          <Input />
          <Text slot="description">{description}</Text>
        </TextField>
        <TextField name="email" type="email" className="responsive-form-example-field">
          <Label>Email</Label>
          <Input />
        </TextField>
      </Grid>
    </>
  );
}
