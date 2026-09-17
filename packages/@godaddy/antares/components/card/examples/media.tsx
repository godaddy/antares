import { Box, Card, Content, Grid, Heading, Image, Text } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22480%22 cy=%22110%22 r=%2270%22 fill=%22%234ecdc4%22/%3E%3Cpath d=%22M0 300 180 150l120 100 90-75 250 185H0z%22 fill=%22%230b3d91%22/%3E%3C/svg%3E';

/**
 * Use default padding for inset media, or zero padding with a padded Content for full bleed.
 * Media can stand alone, follow the text, or be a custom Box. Clip only the media region.
 * @order 2
 */
export function MediaExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card>
        <Image src={image} alt="Blue mountain landscape" width="640" height="360" />
        <Content gap="sm">
          <Heading level={3}>Inset media</Heading>
          <Text>The default Card padding keeps media inset.</Text>
        </Content>
      </Card>

      <Card padding="0" gap="0">
        <Box style={{ overflow: 'hidden', borderStartStartRadius: 'inherit', borderStartEndRadius: 'inherit' }}>
          <Image
            src={image}
            alt="Blue mountain landscape"
            width="640"
            height="360"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </Box>
        <Content padding="lg" gap="sm">
          <Heading level={3}>Full bleed media</Heading>
          <Text>Content supplies its own padding beneath the edge-to-edge image.</Text>
        </Content>
      </Card>

      <Card padding="0" gap="0">
        <Box style={{ overflow: 'hidden', borderRadius: 'inherit' }}>
          <Image
            src={image}
            alt="A media-only card showing a blue mountain landscape"
            width="640"
            height="360"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </Box>
      </Card>

      <Card>
        <Content gap="sm">
          <Heading level={3}>Custom media after content</Heading>
          <Text>A plain Box can hold a gradient or illustration, before or after the text.</Text>
        </Content>
        <Box
          style={{
            aspectRatio: '16 / 9',
            background: 'linear-gradient(135deg, #145fa9 0%, #4ecdc4 100%)',
            borderRadius: 6
          }}
        />
      </Card>
    </Grid>
  );
}
