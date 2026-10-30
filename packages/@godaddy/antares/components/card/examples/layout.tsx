import { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CornerActions,
  Flex,
  Grid,
  Header,
  Heading,
  Icon,
  Image,
  LinkButton,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 240%22%3E%3Crect width=%22320%22 height=%22240%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22220%22 cy=%2270%22 r=%2250%22 fill=%22%234ecdc4%22/%3E%3C/svg%3E';

/**
 * A featured business guide and a responsive reading list. Grid adapts the layout to the
 * available space, while each guide keeps its own height.
 * @title Layout
 * @order 10
 */
export function LayoutExample() {
  const [saved, setSaved] = useState(new Set<string>());

  function toggleSaved(id: string) {
    setSaved(function updateSaved(current) {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <Flex direction="column" gap="xl">
      <Box style={{ maxWidth: '48rem', width: '100%' }}>
        <Card>
          <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="center">
            <Image
              src={image}
              alt="Blue abstract landscape"
              data-testid="container-query-media"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
            <TextLockup data-testid="container-query-content">
              <Tag slot="eyebrow">Featured guide</Tag>
              <Heading slot="title">Build a website that works for your business</Heading>
              <Text slot="body">
                Choose your pages, tell your story, and make it easy for customers to get in touch.
              </Text>
            </TextLockup>
          </Grid>
        </Card>
      </Box>

      <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="md" alignItems="start">
        {[
          ['domain', 'Find your domain', 'Choose a name customers will remember.'],
          ['brand', 'Build your brand', 'Bring your colors, logo, and business story together.'],
          [
            'store',
            'Turn your first online store into a place customers want to come back to',
            'Build trust with clear product photos, straightforward shipping, and a checkout that is easy to use.'
          ]
        ].map(function renderCard([id, title, body], index) {
          return (
            <Card key={id} gap="md" data-testid={`collection-card-${index}`}>
              <TextLockup>
                <Tag slot="eyebrow">Recommended</Tag>
                <Header>
                  <CornerActions>
                    <Button aria-label={`Save ${title}`} aria-pressed={saved.has(id)} onPress={() => toggleSaved(id)}>
                      <Icon icon="star" />
                    </Button>
                  </CornerActions>
                  <Heading slot="title">{title}</Heading>
                </Header>
                <Text slot="body">{body}</Text>
              </TextLockup>

              <ButtonGroup justifyContent="end">
                <LinkButton variant="primary" href={`#${id}-guide`}>
                  Read guide
                </LinkButton>
              </ButtonGroup>
            </Card>
          );
        })}
      </Grid>
    </Flex>
  );
}
