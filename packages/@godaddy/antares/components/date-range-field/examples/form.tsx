import { parseDate } from '@internationalized/date';
import { type FormEvent, useState } from 'react';
import { Button, DateRangeField, Flex, Text } from '@godaddy/antares';

export function DateRangeFieldFormExample() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSubmitted(`${formData.get('from') ?? ''} – ${formData.get('to') ?? ''}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="md" alignItems="flex-start">
        <DateRangeField
          label="Trip dates"
          startName="from"
          endName="to"
          defaultValue={{ start: parseDate('2024-03-15'), end: parseDate('2024-03-20') }}
          isRequired
        />
        <Button type="submit">Submit</Button>
        {submitted !== null && (
          <Text>
            <strong>Submitted:</strong> {submitted}
          </Text>
        )}
      </Flex>
    </form>
  );
}
