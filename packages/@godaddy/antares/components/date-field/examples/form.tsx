import { parseDate } from '@internationalized/date';
import { type FormEvent, useState } from 'react';
import { Button, DateField, Flex, Text } from '@godaddy/antares';

export function DateFieldFormExample() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSubmitted(String(formData.get('startDate') ?? ''));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="md" alignItems="flex-start">
        <DateField label="Start date" name="startDate" defaultValue={parseDate('2024-03-15')} isRequired />
        <Button type="submit">Submit</Button>
        {submitted !== null && (
          <Text>
            <strong>Submitted:</strong> {submitted || '(empty)'}
          </Text>
        )}
      </Flex>
    </form>
  );
}
