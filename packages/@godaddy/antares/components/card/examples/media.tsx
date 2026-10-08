import { useState } from 'react';
import { Box, Button, Card, CornerActions, Grid, Heading, Icon, Image, Tag, Text, TextLockup } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22480%22 cy=%22110%22 r=%2270%22 fill=%22%234ecdc4%22/%3E%3Cpath d=%22M0 300 180 150l120 100 90-75 250 185H0z%22 fill=%22%230b3d91%22/%3E%3C/svg%3E';

/**
 * Preview website templates with inset, full bleed, or standalone media, and a brand palette
 * with custom media. Direct CornerActions place the favorite action over the template preview.
 * @order 5
 */
export function MediaExample() {
  const [saved, setSaved] = useState(false);

  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card>
        <CornerActions>
          <Button aria-label="Favorite" aria-pressed={saved} onPress={() => setSaved(!saved)}>
            <Icon icon="star" />
          </Button>
        </CornerActions>
        <Image
          src={image}
          alt="Blue mountain landscape"
          style={{ display: 'block', width: '100%', borderRadius: 'inherit' }}
        />
        <TextLockup>
          <Tag slot="eyebrow">Portfolio</Tag>
          <Heading slot="title">Lakeside portfolio</Heading>
          <Text slot="body">A calm, spacious template that puts your work first.</Text>
          <Text role="status">{saved ? 'Saved to your templates' : 'Free template'}</Text>
        </TextLockup>
      </Card>

      <Card padding="0" gap="0">
        <Box style={{ overflow: 'hidden', borderStartStartRadius: 'inherit', borderStartEndRadius: 'inherit' }}>
          <Image src={image} alt="Blue mountain landscape" style={{ display: 'block', width: '100%' }} />
        </Box>

        <TextLockup padding="lg">
          <Tag slot="eyebrow">Photography</Tag>
          <Heading slot="title">Horizon photography</Heading>
          <Text slot="body">Give your photos room to tell the story.</Text>
        </TextLockup>
      </Card>

      <Card padding="0" gap="0">
        <Box style={{ overflow: 'hidden', borderRadius: 'inherit' }}>
          <Image
            src={image}
            alt="Blue mountain landscape preview for the Horizon website template"
            style={{ display: 'block', width: '100%' }}
          />
        </Box>
      </Card>

      <Card>
        <TextLockup>
          <Tag slot="eyebrow">Branding</Tag>
          <Heading slot="title">Find your brand colors</Heading>
          <Text slot="body">A blue and turquoise palette for a fresh, confident first impression.</Text>
        </TextLockup>
        <Box
          role="img"
          aria-label="Blue and turquoise brand palette"
          rounding="lg"
          style={{ aspectRatio: '16 / 9', background: 'linear-gradient(135deg, #145fa9, #4ecdc4)' }}
        />
      </Card>
    </Grid>
  );
}
