import { useRef, useState } from 'react';
import { Button, Card, CardGroup, CardSelectionIndicator, CornerActions, LinkButton, Text } from '@godaddy/antares';

/**
 * Internal review coverage for Card refs, ids, layout props on rows, plain-text rows, controlled
 * selection, and an indicator on a Card outside a CardGroup.
 * @ignore
 */
export function CustomizationExample() {
  const rowRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const staticRef = useRef<HTMLDivElement>(null);
  const contentLinkRef = useRef<HTMLAnchorElement>(null);
  const [selected, setSelected] = useState<'all' | Set<string | number>>(new Set());
  const [changes, setChanges] = useState(0);
  const [refsReady, setRefsReady] = useState(false);

  function changeSelection(keys: 'all' | Set<string | number>) {
    setSelected(keys);
    setChanges((count) => count + 1);
  }

  // GridList attaches rows after its collection pass, so check on demand rather than on mount.
  function checkForwardedRefs() {
    setRefsReady(
      rowRef.current?.getAttribute('role') === 'row' &&
        linkRef.current?.tagName === 'A' &&
        staticRef.current?.getAttribute('data-card') === 'static' &&
        contentLinkRef.current?.tagName === 'A'
    );
  }

  return (
    <>
      <CardGroup
        aria-label="Review cards"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={changeSelection}
      >
        <Card
          ref={rowRef}
          id="row"
          textValue="Row props card"
          className="review-row-card"
          padding="sm"
          gap="xs"
          direction="row"
        >
          <Text>Row props card</Text>
          <CornerActions>
            <CardSelectionIndicator data-testid="props-row-indicator" />
          </CornerActions>
        </Card>
        <Card id="plain-text">Plain text card</Card>
      </CardGroup>
      <Text>Selection changes: {changes}</Text>

      <Card ref={linkRef} id="props-link" href="/props-review-linked" aria-label="Linked content ref">
        Linked content ref
      </Card>

      <Card ref={staticRef}>
        <LinkButton href="#custom-content-link" ref={contentLinkRef}>
          Custom content link
        </LinkButton>
      </Card>
      <Button onPress={checkForwardedRefs}>Check refs</Button>
      <Text data-testid="props-ref-status">{refsReady ? 'Refs ready' : 'Refs pending'}</Text>

      <Card id="props-static" role="region" aria-label="Card without group" aria-describedby="props-static-description">
        <Text id="props-static-description">Static surface description</Text>
        <CornerActions>
          <CardSelectionIndicator data-testid="props-static-indicator" />
        </CornerActions>
      </Card>
    </>
  );
}
