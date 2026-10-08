import { Box, Button, Flex, Heading, Text } from '@godaddy/antares';

interface DomainCardProps {
  domain: string;
  renewal: string;
}

function DomainCard({ domain, renewal }: DomainCardProps) {
  return (
    <Box as="article" aria-label={domain} padding="md" elevation="card" className="responsive-domain-card">
      <Flex gap="sm" className="responsive-domain-card-body">
        <Flex direction="column" gap="xs">
          <Heading level={3}>{domain}</Heading>
          <Text>{renewal}</Text>
        </Flex>
        <Flex wrap="wrap" gap="sm">
          <Button variant="secondary">Manage DNS</Button>
          <Button>Renew</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

/**
 * The same domain card sits in a narrow sidebar and a wide main area. It stacks in the sidebar and
 * lines up in the main area at the same viewport width, because it queries its own container. The
 * 28rem threshold belongs to the card. Its CSS owns the direction and alignment, so those props stay
 * unset.
 * @title Container query
 * @order 2
 */
export function ContainerLayoutExample() {
  return (
    <>
      <style>{`
        .responsive-container-example-sidebar {
          flex: 1 1 14rem;
        }

        .responsive-container-example-main {
          flex: 3 1 28rem;
        }

        .responsive-domain-card {
          container: domain-card / inline-size;
        }

        .responsive-domain-card-body {
          flex-direction: column;
        }

        @container domain-card (min-width: 28rem) {
          .responsive-domain-card-body {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
      `}</style>
      <Flex wrap="wrap" gap="md">
        <Box as="aside" aria-label="Sidebar" className="responsive-container-example-sidebar">
          <DomainCard domain="shop.example" renewal="Renews on March 2, 2027" />
        </Box>
        <Box as="main" aria-label="Domains" className="responsive-container-example-main">
          <DomainCard domain="example.com" renewal="Renews on January 12, 2027" />
        </Box>
      </Flex>
    </>
  );
}
