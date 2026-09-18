import {
  Button,
  Detail,
  FieldError,
  Flex,
  Group,
  Heading,
  Input,
  Label,
  SizeProvider,
  Tag,
  Text,
  TextField,
  TextLockup
} from '@godaddy/antares';

/** Compare the provisional pilot mappings and their explicit overrides. */
export function PilotExample() {
  return (
    <Flex gap="xl" wrap="wrap">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <section key={size} data-scope={size} style={{ flex: '1 1 18rem', minWidth: 0 }}>
          <SizeProvider size={size}>
            <Flex direction="column" gap="md" data-spacing="explicit">
              <Heading level={2}>{size} section</Heading>
              <Heading level={4}>{size} subsection</Heading>
              <Text>Body {size}</Text>
              <Detail>Detail {size}</Detail>
              <Label>Standalone label {size}</Label>
              <Flex gap="sm" wrap="wrap">
                <Button>Direct {size}</Button>
                <Button>
                  <Text>Wrapped {size}</Text>
                </Button>
                <Button>
                  <Text emphasis="critical" maxLines={1}>
                    Color {size}
                  </Text>
                </Button>
                <Button>
                  <Text size="xl">Large label {size}</Text>
                </Button>
                <Button size="lg">Explicit {size}</Button>
              </Flex>
              <SizeProvider>
                <SizeProvider size={size}>
                  <Button>Nested {size}</Button>
                </SizeProvider>
              </SizeProvider>
              <TextField isInvalid defaultValue="hello@example.com">
                <Label>Email {size}</Label>
                <Group>
                  <Input />
                  <Button slot="control">Clear {size}</Button>
                </Group>
                <Detail slot="description">Receipts {size}</Detail>
                <FieldError>Invalid email {size}</FieldError>
              </TextField>
              <TextLockup size="xl">
                <Tag slot="eyebrow">New {size}</Tag>
                <Heading slot="title">Lockup {size}</Heading>
                <Text slot="body">Lockup body {size}</Text>
                <Text>Unslotted {size}</Text>
                <Button>Lockup action {size}</Button>
                <TextLockup>
                  <Heading slot="title">Nested lockup {size}</Heading>
                </TextLockup>
              </TextLockup>
            </Flex>
          </SizeProvider>
        </section>
      ))}
    </Flex>
  );
}
