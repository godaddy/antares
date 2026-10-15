import { Grid, Input, Label, Text, TextField } from '@godaddy/antares';

interface FormExampleProps {
  /** Help text that can wrap onto multiple lines. */
  description?: string;

  /** Reading direction of the form. */
  dir?: 'ltr' | 'rtl';
}

/**
 * Billing details in one column on small screens and two from `64rem`. Type into a field and resize:
 * CSS reflows the same inputs, preserving their values, focus, and selection. Let CSS own the columns
 * and allow long descriptions to wrap.
 * @title Form reflow
 * @order 4
 */
export function FormExample({ description = 'Use the name on your payment card.', dir }: FormExampleProps) {
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

          .responsive-form-example-wide {
            grid-column: 1 / -1;
          }
        }
      `}</style>
      <Grid as="form" aria-label="Billing details" dir={dir} gap="md" className="responsive-form-example">
        <TextField name="name" autoComplete="name" className="responsive-form-example-field">
          <Label>Full name</Label>
          <Input />
          <Text slot="description">{description}</Text>
        </TextField>
        <TextField name="email" type="email" autoComplete="email" className="responsive-form-example-field">
          <Label>Email</Label>
          <Input />
        </TextField>
        <TextField
          name="address"
          autoComplete="street-address"
          className="responsive-form-example-field responsive-form-example-wide"
        >
          <Label>Street address</Label>
          <Input />
        </TextField>
        <TextField name="city" autoComplete="address-level2" className="responsive-form-example-field">
          <Label>City</Label>
          <Input />
        </TextField>
        <TextField name="postalCode" autoComplete="postal-code" className="responsive-form-example-field">
          <Label>Postal code</Label>
          <Input />
        </TextField>
      </Grid>
    </>
  );
}
