import{i as e}from"./preload-helper-BUun7Ttb.js";import{F as t}from"./iframe-COIyrJX3.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DiMnASRh.js";import{t as c}from"./mdx-react-shim-DCgMRPIu.js";import{t as l}from"./runtime-cfuOSczO.js";import{Actions as u,CardSelectionIndicatorProps as d,Collection as f,ContainerQuery as p,Default as m,Media as h,Props as g,Selection as _,n as v,t as y}from"./card.stories-Dm-0Unza.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{of:y,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`card`,children:`Card`}),`
`,(0,S.jsx)(t.p,{children:`A padded surface for composing media, content, actions, and selection.`}),`
`,(0,S.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,S.jsx)(t.p,{children:`Card is a layout surface. Compose its contents with Antares layout and structure primitives. It
supports text-only, media-only, and mixed compositions, while the consumer chooses media order,
sizing, orientation, and responsive behavior.`}),`
`,(0,S.jsxs)(t.p,{children:[`The default Card padding and gap are `,(0,S.jsx)(t.code,{children:`lg`}),`. Override them with the normal layout props. Full bleed
media is composed with `,(0,S.jsx)(t.code,{children:`padding="0"`}),` and a separately padded content region; Card has no media
bleed prop.`]}),`
`,(0,S.jsxs)(t.p,{children:[`Card draws its own background, border, and text color. Setting `,(0,S.jsx)(t.code,{children:`elevation`}),` hands that chrome to
`,(0,S.jsx)(t.code,{children:`Box`}),` instead, so a raised or overlay Card looks like every other surface at that elevation.`]}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsx)(t.p,{children:`A composed static Card surface with heading and description.`}),`
`,(0,S.jsx)(i,{of:m,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Card, Heading, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Card>
      <Heading level={3}>A composed card</Heading>
      <Text>Cards provide a surface while consumers own the interior layout.</Text>
    </Card>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`media`,children:`Media`}),`
`,(0,S.jsx)(t.p,{children:`Use default padding for inset media, or zero padding with a padded Content for full bleed.
Media can stand alone, follow the text, or be a custom Box. Clip only the media region.`}),`
`,(0,S.jsx)(i,{of:h,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Box, Card, Content, Grid, Heading, Image, Text } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22480%22 cy=%22110%22 r=%2270%22 fill=%22%234ecdc4%22/%3E%3Cpath d=%22M0 300 180 150l120 100 90-75 250 185H0z%22 fill=%22%230b3d91%22/%3E%3C/svg%3E';

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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`actions-and-navigation`,children:`Actions and navigation`}),`
`,(0,S.jsx)(t.p,{children:`Use onPress for an action or href for navigation. Body text stays copyable and inner buttons act independently.`}),`
`,(0,S.jsx)(i,{of:u,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { Button, Card, Content, Flex, Text } from '@godaddy/antares';

export function ActionsExample() {
  const [count, setCount] = useState(0);

  return (
    <Flex direction="column" gap="lg">
      <Card aria-label="Open details" onPress={() => setCount((value) => value + 1)}>
        <Text>Open details</Text>
        <Button onPress={() => setCount((value) => value + 10)}>Independent action ({count})</Button>
      </Card>
      <Card href="/about" aria-label="About this product">
        <Content>
          <Text>About this product</Text>
          <Button>Save</Button>
        </Content>
      </Card>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`selection`,children:`Selection`}),`
`,(0,S.jsx)(t.p,{children:`Control a standalone checkbox, or let CheckboxGroup and RadioGroup own selection. Add href when
the body should navigate and only the corner indicator should select, naming the two controls
apart with selectionProps. Omit isSelected and onSelectionChange for uncontrolled standalone
selection, optionally setting defaultSelected.`}),`
`,(0,S.jsx)(i,{of:_,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import {
  Card,
  CardSelectionIndicator,
  CheckboxGroup,
  Content,
  CornerActions,
  Flex,
  RadioGroup,
  Text
} from '@godaddy/antares';

export function SelectionExample() {
  const [selected, setSelected] = useState(false);
  const [changes, setChanges] = useState(0);

  function changeSelection(nextSelected: boolean) {
    setSelected(nextSelected);
    setChanges((count) => count + 1);
  }

  return (
    <Flex direction="column" gap="lg">
      <Card
        selection="checkbox"
        aria-label="Select this card"
        isSelected={selected}
        onSelectionChange={changeSelection}
      >
        <Text>Selectable card content</Text>
        <CornerActions>
          <CardSelectionIndicator data-testid="card-selection-indicator" visibility="always" />
        </CornerActions>
      </Card>
      <Text>Selection changes: {changes}</Text>

      <CheckboxGroup aria-label="Select pages">
        <Card selection="checkbox" value="overview" aria-label="Select overview">
          <Text>Overview</Text>
          <CornerActions>
            <CardSelectionIndicator />
          </CornerActions>
        </Card>
        <Card
          selection="checkbox"
          href="/details"
          value="details"
          aria-label="Open details"
          selectionProps={{ 'aria-label': 'Select details' }}
        >
          <Content>
            <Text slot="description">Open details</Text>
          </Content>
          <CornerActions>
            <CardSelectionIndicator data-testid="combined-selection-indicator" visibility="always" />
          </CornerActions>
        </Card>
      </CheckboxGroup>

      <RadioGroup aria-label="Choose a plan" defaultValue="starter">
        {['starter', 'pro'].map(function plan(value) {
          return (
            <Card key={value} selection="radio" value={value} aria-label={\`\${value} plan\`}>
              <Text>{value === 'starter' ? 'Starter plan' : 'Pro plan'}</Text>
              <CornerActions>
                <CardSelectionIndicator visibility="always" />
              </CornerActions>
            </Card>
          );
        })}
      </RadioGroup>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`responsive-layout`,children:`Responsive layout`}),`
`,(0,S.jsx)(t.p,{children:`Use a consumer container query to switch between vertical and horizontal layouts. The image
fills narrow cards and takes 40% of the width when space allows.`}),`
`,(0,S.jsx)(i,{of:p,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Box, Card, Flex, Heading, Image, Text } from '@godaddy/antares';
import styles from './container-query.module.css';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 240%22%3E%3Crect width=%22320%22 height=%22240%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22220%22 cy=%2270%22 r=%2250%22 fill=%22%234ecdc4%22/%3E%3C/svg%3E';

export function ContainerQueryExample() {
  return (
    <Box className={styles.container} data-testid="container-query-container">
      <Card direction="column" gap="lg" className={styles.card} data-testid="container-query-card">
        <Image
          slot="media"
          src={image}
          alt="Blue abstract landscape"
          width="320"
          height="240"
          data-testid="container-query-media"
        />
        <Flex direction="column" gap="sm" flexGrow={1} data-testid="container-query-content">
          <Heading level={3}>Container-owned responsiveness</Heading>
          <Text>The surrounding container decides when this composition stacks or becomes horizontal.</Text>
        </Flex>
      </Card>
    </Box>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`collections`,children:`Collections`}),`
`,(0,S.jsx)(t.p,{children:`Let Content grow to align bottom actions across equal-height cards. A wrapping Header reserves
room for always-visible CornerActions, while TextLockup coordinates each card's text.`}),`
`,(0,S.jsx)(i,{of:f,inline:!0}),`
`,(0,S.jsx)(r,{code:`import {
  Button,
  Card,
  Content,
  CornerActions,
  Footer,
  Grid,
  Header,
  Heading,
  Text,
  TextLockup
} from '@godaddy/antares';

export function CollectionExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="md" alignItems="stretch">
      {[
        'Short description',
        'A medium description gives this card more content.',
        'A longer description demonstrates that each card can grow while its action stays aligned.'
      ].map(function renderCard(description, index) {
        return (
          <Card key={description} gap="md" data-testid={\`collection-card-\${index}\`}>
            <Header alignItems="start" wrap="wrap">
              <Heading level={3} style={{ minWidth: 0, flex: '1 1 10rem' }}>
                {index === 2 ? 'A longer title that wraps beside the corner action' : \`Card \${index + 1}\`}
              </Heading>
              <CornerActions>
                <Button variant="minimal" aria-label={\`More options for card \${index + 1}\`}>
                  ...
                </Button>
              </CornerActions>
            </Header>
            <Content flexGrow={1}>
              <TextLockup>
                <Text slot="eyebrow">Recommended</Text>
                <Text slot="body">{description}</Text>
              </TextLockup>
            </Content>
            <Footer justifyContent="end">
              <Button data-testid={\`collection-action-\${index}\`}>View details</Button>
            </Footer>
          </Card>
        );
      })}
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsxs)(t.p,{children:[`Cards are static surfaces by default. `,(0,S.jsx)(t.code,{children:`href`}),` adds a primary navigation destination and `,(0,S.jsx)(t.code,{children:`onPress`}),`
adds a primary action. Always provide `,(0,S.jsx)(t.code,{children:`aria-label`}),` or `,(0,S.jsx)(t.code,{children:`aria-labelledby`}),` for a Card primary action:
the internal action control has no visible label of its own and cannot derive its name from
arbitrary Card body content.`]}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`Card href`}),` renders a real, named link behind the content. Clicking ordinary body content navigates;
buttons, links, menus, editable content, and CornerActions keep their own behavior, including when
nested inside `,(0,S.jsx)(t.code,{children:`Content`}),`. Text remains selectable and copyable. Native link menus and middle-click
navigation are available on the Card background; ordinary body text is not itself a native link.
The primary link is keyboard accessible without making the Card an interactive ancestor of its controls.`]}),`
`,(0,S.jsxs)(t.p,{children:[`Reuse Structure's `,(0,S.jsx)(t.code,{children:`Content`}),`, `,(0,S.jsx)(t.code,{children:`Header`}),`, `,(0,S.jsx)(t.code,{children:`Footer`}),`, and `,(0,S.jsx)(t.code,{children:`CornerActions`}),` to compose the interior. Card
supplies region defaults through their contexts: no additional region padding, `,(0,S.jsx)(t.code,{children:`lg`}),` content gap,
and visible content overflow. Explicit region props override those defaults. `,(0,S.jsx)(t.code,{children:`Content`}),` supports
`,(0,S.jsx)(t.code,{children:`as`}),` when a different element or component is needed.
Use `,(0,S.jsx)(t.code,{children:`selection="checkbox"`}),` or `,(0,S.jsx)(t.code,{children:`selection="radio"`}),` for selectable Cards. Place one
`,(0,S.jsx)(t.code,{children:`CardSelectionIndicator`}),` explicitly, usually last in `,(0,S.jsx)(t.code,{children:`CornerActions`}),`. Card owns the selection
composition and delegates state, keyboard handling, and native input behavior to React Aria.`]}),`
`,(0,S.jsxs)(t.p,{children:[`A Card with both a primary action and selection holds two controls, so name them separately: the
Card's own `,(0,S.jsx)(t.code,{children:`aria-label`}),`/`,(0,S.jsx)(t.code,{children:`aria-labelledby`}),` names the primary action, and `,(0,S.jsx)(t.code,{children:`selectionProps`}),` carries the
name for the selection control. Without it both controls answer to the same name.`]}),`
`,(0,S.jsxs)(t.p,{children:[`Checkbox Cards work standalone or inside the existing `,(0,S.jsx)(t.code,{children:`CheckboxGroup`}),`. Standalone selection uses
`,(0,S.jsx)(t.code,{children:`isSelected`}),`, `,(0,S.jsx)(t.code,{children:`defaultSelected`}),`, and `,(0,S.jsx)(t.code,{children:`onSelectionChange`}),`; grouped state belongs to the group.
Radio Cards require a `,(0,S.jsx)(t.code,{children:`value`}),` and the existing `,(0,S.jsx)(t.code,{children:`RadioGroup`}),`, which owns selection and arrow-key
navigation. Use `,(0,S.jsx)(t.code,{children:`isSelectionDisabled`}),` to disable selection independently of primary or child
actions. `,(0,S.jsx)(t.code,{children:`isDisabled`}),` disables only the Card's primary action. Set `,(0,S.jsx)(t.code,{children:`isReadOnly`}),` on a checkbox Card
or on its group; radio read-only behavior belongs to `,(0,S.jsx)(t.code,{children:`RadioGroup`}),`.`]}),`
`,(0,S.jsxs)(t.p,{children:[`The indicator is automatically revealed on hover, focus within the Card, or selection, and remains
available on touch devices. Use `,(0,S.jsx)(t.code,{children:`visibility="always"`}),` when the selected affordance should stay
visible at rest. Hiding its visual does not remove the underlying selection control from keyboard
or assistive-technology access.`]}),`
`,(0,S.jsx)(t.h3,{id:`cardselectionindicator`,children:`CardSelectionIndicator`}),`
`,(0,S.jsxs)(t.p,{children:[`Place `,(0,S.jsx)(t.code,{children:`CardSelectionIndicator`}),` inside `,(0,S.jsx)(t.code,{children:`CornerActions`}),` on a selectable Card. It
shares the native selection control's state and does not add a second keyboard focus stop.`]}),`
`,(0,S.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Compose media as an ordinary child, an `,(0,S.jsx)(t.code,{children:`Image`}),` or a consumer-owned `,(0,S.jsx)(t.code,{children:`Box`}),`. Card never reads a slot
or infers media, so its order, size, and orientation are yours. A `,(0,S.jsx)(t.code,{children:`slot`}),` or class on it is your own
styling hook, as the responsive example uses `,(0,S.jsx)(t.code,{children:`[slot="media"]`}),` in a container query.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Use `,(0,S.jsx)(t.code,{children:`Flex`}),`, `,(0,S.jsx)(t.code,{children:`Grid`}),`, `,(0,S.jsx)(t.code,{children:`Box`}),`, `,(0,S.jsx)(t.code,{children:`Content`}),`, `,(0,S.jsx)(t.code,{children:`Header`}),`, `,(0,S.jsx)(t.code,{children:`Footer`}),`, `,(0,S.jsx)(t.code,{children:`TextLockup`}),`, and `,(0,S.jsx)(t.code,{children:`ButtonGroup`}),` to define the interior
layout. Keep enough width for long text and reserve CornerActions space explicitly.`]}),`
`,(0,S.jsx)(t.li,{children:`For collections, give cards a shared grid or feed width, let the content region grow, and place
bottom actions after that growing region to align actions across equal-height cards.`}),`
`,(0,S.jsx)(t.li,{children:`Use a container query in the surrounding layout when a card should stack at its available width.
Card does not add automatic breakpoints or reorder children.`}),`
`,(0,S.jsxs)(t.li,{children:[`CornerActions is always visible. Use `,(0,S.jsx)(t.code,{children:`gap`}),`, wrapping, and explicit flexible text widths to avoid
collisions at narrow widths.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,S.jsx)(t.h3,{id:`my-linked-card-contains-a-button-or-another-link`,children:`My linked Card contains a button or another link`}),`
`,(0,S.jsxs)(t.p,{children:[`Keep it in the composed body, including inside `,(0,S.jsx)(t.code,{children:`Content`}),`. Independent controls do not activate
the Card. Do not wrap those controls in your own anchor or button.`]}),`
`,(0,S.jsx)(t.h3,{id:`my-media-has-unexpected-padding`,children:`My media has unexpected padding`}),`
`,(0,S.jsxs)(t.p,{children:[`Card defaults to `,(0,S.jsx)(t.code,{children:`padding="lg"`}),` and `,(0,S.jsx)(t.code,{children:`gap="lg"`}),`. Keep those defaults for inset media, or set
`,(0,S.jsx)(t.code,{children:`padding="0"`}),` and add `,(0,S.jsx)(t.code,{children:`Content padding="lg"`}),` around mixed content for a full bleed composition.`]}),`
`,(0,S.jsx)(t.h3,{id:`corner-actions-overlap-long-text`,children:`Corner actions overlap long text`}),`
`,(0,S.jsxs)(t.p,{children:[`Card does not measure arbitrary children. Compose a `,(0,S.jsx)(t.code,{children:`Header`}),` or `,(0,S.jsx)(t.code,{children:`Flex`}),` with an explicit flexible
text region, `,(0,S.jsx)(t.code,{children:`CornerActions`}),`, and wrapping or a minimum text width appropriate for the container.`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`<Card>
  <Image />
  <Content>
    {/* ...text and independent controls... */}
  </Content>
  <CornerActions>
    {/* ...independent actions or CardSelectionIndicator... */}
  </CornerActions>
  {/* ...other consumer-owned layout regions... */}
</Card>
`})}),`
`,(0,S.jsx)(a,{of:g}),`
`,(0,S.jsx)(a,{of:d})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;e((()=>{S=t(),c(),s(),l(),v()}))();export{x as default};