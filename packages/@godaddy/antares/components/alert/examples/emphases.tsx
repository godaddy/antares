import { Alert, Flex } from '@godaddy/antares';

const emphases = ['critical', 'warning', 'success', 'info', 'highlight', 'premium', 'internal'] as const;

/**
 * All 7 emphasis categories. Each variant carries a distinct visual accent and semantic icon so the type of message is never communicated by color alone.
 * @title Emphasis Variants
 * @order 2
 */
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
