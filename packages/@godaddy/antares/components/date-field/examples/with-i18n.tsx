import { parseDate } from '@internationalized/date';
import { DateField, Flex, I18nProvider } from '@godaddy/antares';

export function DateFieldWithI18nExample() {
  return (
    <Flex direction="column" gap="md">
      <I18nProvider locale="en-US">
        <DateField label="Start date (en-US)" defaultValue={parseDate('2024-03-15')} />
      </I18nProvider>
      <I18nProvider locale="ar-AE">
        <DateField label="Start date (ar-AE)" defaultValue={parseDate('2024-03-15')} />
      </I18nProvider>
    </Flex>
  );
}
