import { ScrollLock } from '@bento/scroll-lock';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function BasicExample() {
  return (
    <>
      {/* Scrollable page content */}
      <Container style={{ padding: '1rem' }}>
        <Text as="h1">Page with Scroll Lock</Text>
        <Text>Try to scroll the page - scrolling is prevented when ScrollLock is active.</Text>

        {/* Create enough content to require scrolling */}
        {Array.from({ length: 50 }, (_, i) => (
          <Text key={i} style={{ marginBottom: '0.5rem' }} as="p">
            This is paragraph {i + 1}. The page has enough content to scroll, but the ScrollLock component prevents
            background scrolling.
          </Text>
        ))}
      </Container>

      {/* ScrollLock prevents scrolling of the above content */}
      <ScrollLock />
    </>
  );
}
