import { Detail, Flex, Heading, Label, Text } from '@godaddy/antares';

/** Six fixed tiers across body, supporting copy, headings, and form labels. */
export function TreatmentsExample() {
  return (
    <Flex direction="column" gap="md">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Flex key={size} gap="md" alignItems="baseline" wrap="wrap">
          <Heading size={size}>Heading {size}</Heading>
          <Text size={size}>Body {size}</Text>
          <Detail size={size}>Detail {size}</Detail>
          <Label size={size}>Label {size}</Label>
        </Flex>
      ))}
      <Text as="strong">Strong body</Text>
      <Detail as="em">Emphasized detail</Detail>
      <Text as="p">Paragraph body</Text>
      {(
        ['critical', 'warning', 'success', 'info', 'highlight', 'premium', 'internal', 'neutral', 'passive'] as const
      ).map((emphasis) => (
        <Text key={emphasis} emphasis={emphasis}>
          {emphasis}
        </Text>
      ))}
    </Flex>
  );
}
