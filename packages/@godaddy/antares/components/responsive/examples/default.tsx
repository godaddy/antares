import { Button, Flex, Grid, Heading, Text } from '@godaddy/antares';

const plans = [
  { name: 'Economy', summary: 'One website with 25 GB of storage.' },
  { name: 'Deluxe', summary: 'Ten websites with 50 GB of storage.' },
  { name: 'Ultimate', summary: 'Twenty-five websites with 75 GB of storage.' }
];

/**
 * Hosting plans wrap into as many columns as fit, with no breakpoint. `auto-fill` and `minmax()`
 * pick the column count from the available width. Start here before reaching for a query.
 * @title Intrinsic layout
 * @order 1
 */
export function DefaultExample() {
  return (
    <Grid as="section" aria-label="Hosting plans" columns="repeat(auto-fill, minmax(min(16rem, 100%), 1fr))" gap="md">
      {plans.map(function plan({ name, summary }) {
        return (
          <Flex key={name} direction="column" alignItems="start" gap="sm" padding="md" elevation="card">
            <Heading level={3}>{name}</Heading>
            <Text>{summary}</Text>
            <Button variant="secondary">Choose {name}</Button>
          </Flex>
        );
      })}
    </Grid>
  );
}
