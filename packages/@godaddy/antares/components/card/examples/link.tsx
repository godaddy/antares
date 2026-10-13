import { Box, Card, Grid, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

/**
 * Link to billing, domain search, or hosting from the whole Card. Keep nested controls out of
 * standalone link Cards.
 * @title Link
 * @order 4
 */
export function LinkExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card href="#billing" aria-label="Manage billing">
        Manage your billing and payment methods
      </Card>

      <Card href="#domains">
        <TextLockup>
          <Tag slot="eyebrow" emphasis="info">
            Domains
          </Tag>
          <Heading slot="title">Find your domain</Heading>
          <Text slot="body">Search for the perfect name for your business.</Text>
        </TextLockup>
      </Card>

      <Card href="#hosting">
        <Box elevation="raised" rounding="md" padding="md">
          <Text>99.9% uptime</Text>
        </Box>
        <TextLockup>
          <Heading slot="title">Web hosting</Heading>
          <Text slot="body">Keep your website online with hosting that grows with your business.</Text>
        </TextLockup>
      </Card>
    </Grid>
  );
}
