import { Box, Card, Grid, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

/**
 * `href` renders the Card itself as a native link, so layered content like an elevated Box stays
 * clickable. The link takes its name from its content unless you pass `aria-label`. Do not nest
 * controls in a link Card.
 * @title Link
 * @order 4
 */
export function LinkExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card href="/" aria-label="Link card">
        This is a link card
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
          <Text>Layered content</Text>
        </Box>
        <TextLockup>
          <Heading slot="title">Web hosting</Heading>
          <Text slot="body">An elevated Box inside the Card still opens the link.</Text>
        </TextLockup>
      </Card>
    </Grid>
  );
}
