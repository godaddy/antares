import { Box, Card, Content, Grid, Heading, Image, Tag, Text, TextLockup } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22480%22 cy=%22110%22 r=%2270%22 fill=%22%234ecdc4%22/%3E%3Cpath d=%22M0 300 180 150l120 100 90-75 250 185H0z%22 fill=%22%230b3d91%22/%3E%3C/svg%3E';

const mediaImageStyle = { display: 'block', width: '100%', height: 'auto' } as const;

/**
 * Use default padding for inset media, or zero padding with a padded Content for full bleed.
 * Media can stand alone, follow the text, or be a custom Box. Clip only the media region.
 * @order 5
 */
export function MediaExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card>
        <Image src={image} alt="Blue mountain landscape" width="640" height="360" style={mediaImageStyle} />
        <TextLockup>
          <Tag slot="eyebrow">Inset</Tag>
          <Heading slot="title">Inset media</Heading>
          <Text slot="body">The default Card padding keeps media inset.</Text>
        </TextLockup>
      </Card>

      <Card padding="0">
        <Box style={{ overflow: 'hidden', borderStartStartRadius: 'inherit', borderStartEndRadius: 'inherit' }}>
          <Image src={image} alt="Blue mountain landscape" width="640" height="360" style={mediaImageStyle} />
        </Box>
        <Content padding="lg">
          <TextLockup>
            <Tag slot="eyebrow">Full bleed</Tag>
            <Heading slot="title">Full bleed media</Heading>
            <Text slot="body">Content supplies its own padding beneath the edge-to-edge image.</Text>
          </TextLockup>
        </Content>
      </Card>

      <Card padding="0" gap="0">
        <Box style={{ overflow: 'hidden', borderRadius: 'inherit' }}>
          <Image
            src={image}
            alt="A media-only card showing a blue mountain landscape"
            width="640"
            height="360"
            style={mediaImageStyle}
          />
        </Box>
      </Card>

      <Card>
        <TextLockup>
          <Tag slot="eyebrow">Custom</Tag>
          <Heading slot="title">Custom media after content</Heading>
          <Text slot="body">A plain Box can hold a gradient or illustration, before or after the text.</Text>
        </TextLockup>
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
