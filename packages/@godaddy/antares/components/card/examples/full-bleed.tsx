import { Box, Card, Content, Heading, Image, Text } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%230b3d91%22/%3E%3Ccircle cx=%22500%22 cy=%22100%22 r=%2280%22 fill=%22%23f1b24a%22/%3E%3C/svg%3E';

/** Full bleed is composed with zero Card padding and an independently padded body region. */
export function FullBleedExample() {
  return (
    <Card padding="0" gap="0" href="/stories/full-bleed" aria-label="Read the full bleed story">
      <Box
        slot="media"
        style={{ overflow: 'hidden', borderStartStartRadius: 'inherit', borderStartEndRadius: 'inherit' }}
      >
        <Image
          src={image}
          alt="Blue sky with a yellow sun"
          width="640"
          height="360"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </Box>
      <Content padding="lg">
        <Heading level={3}>Full bleed media</Heading>
        <Text>The content region supplies its own padding while Card keeps the media edge to edge.</Text>
      </Content>
    </Card>
  );
}
