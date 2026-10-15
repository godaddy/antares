import { Box, Flex, Grid, Heading, LinkButton, Text } from '@godaddy/antares';

const sections = [
  { name: 'Profile', href: '#profile' },
  { name: 'Security', href: '#security' },
  { name: 'Payment methods', href: '#payment-methods' },
  { name: 'Notifications', href: '#notifications' }
];

/**
 * Page layout belongs to the app, so its CSS picks the breakpoint. This settings page shows its
 * navigation beside the content from `64rem` and stacks it above the content below that. Leave
 * `columns` unset so it does not place a competing value in inline styles.
 * @title Viewport media query
 * @order 3
 */
export function ViewportLayoutExample() {
  return (
    <>
      <style>{`
        .responsive-viewport-example {
          grid-template-columns: minmax(0, 1fr);
        }

        @media (min-width: 64rem) {
          .responsive-viewport-example {
            grid-template-columns: 16rem minmax(0, 1fr);
          }
        }
      `}</style>
      <Grid as="section" aria-label="Account settings" gap="lg" className="responsive-viewport-example">
        <Box as="nav" aria-label="Settings">
          <Flex direction="column" alignItems="start" gap="xs">
            {sections.map(function section({ name, href }) {
              return (
                <LinkButton key={name} variant="minimal" href={href}>
                  {name}
                </LinkButton>
              );
            })}
          </Flex>
        </Box>
        <Flex as="section" aria-label="Profile" direction="column" gap="sm" padding="md" elevation="card">
          <Heading level={2}>Profile</Heading>
          <Text>Update the name and contact details on your account.</Text>
        </Flex>
      </Grid>
    </>
  );
}
