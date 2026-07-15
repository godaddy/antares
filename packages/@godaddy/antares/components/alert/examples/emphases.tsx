import { Alert, Flex } from '@godaddy/antares';

const emphases = ['critical', 'warning', 'success', 'info', 'highlight', 'premium', 'internal'] as const;

export function EmphasesExample() {
  return (
    <Flex direction="column" gap="1rem">
      {emphases.map((emphasis) => (
        <Alert key={emphasis} emphasis={emphasis} title={`This is a ${emphasis} alert`}>
          Description for the {emphasis} emphasis variant.
        </Alert>
      ))}
    </Flex>
  );
}
