import { Box, Card, Image } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23f1b24a%22/%3E%3Cpath d=%22M0 360 210 120l130 120 80-70 220 190H0z%22 fill=%22%23d45d3f%22/%3E%3C/svg%3E';

/** A media-only card composed with zero padding for an image surface. */
export function MediaOnlyExample() {
  return (
    <Card padding="0" gap="0">
      <Box slot="media" style={{ overflow: 'hidden', borderRadius: 'inherit' }}>
        <Image
          src={image}
          alt="Warm abstract landscape"
          width="640"
          height="360"
          style={{ display: 'block', width: '100%' }}
        />
      </Box>
    </Card>
  );
}
