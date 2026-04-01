import { Radio, RadioGroup } from '@godaddy/antares';
import { type FormEvent, useState } from 'react';

export function RadioFormExample() {
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get('plan');
    setSubmittedValue(value != null ? String(value) : null);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <RadioGroup name="plan" label="Select your plan" defaultValue="standard">
          <Radio value="basic">Basic</Radio>
          <Radio value="standard">Standard</Radio>
          <Radio value="premium">Premium</Radio>
        </RadioGroup>
        <button type="submit" style={{ marginTop: '1rem' }}>
          Submit
        </button>
      </form>
      {submittedValue && <p>Form submitted with value: {submittedValue}</p>}
    </>
  );
}
