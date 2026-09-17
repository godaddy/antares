import{i as e}from"./preload-helper-BUun7Ttb.js";import{F as t}from"./iframe-MZxffkAc.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-mDEoHYHT.js";import{t as c}from"./mdx-react-shim-5Ea-rS-q.js";import{t as l}from"./runtime-cfuOSczO.js";import{Actions as u,CardSelectionIndicatorProps as d,Checkbox as f,Default as p,Layout as m,Media as h,Props as g,Radio as _,n as v,t as y}from"./card.stories-B8NRZkbD.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{of:y,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`card`,children:`Card`}),`
`,(0,S.jsx)(t.p,{children:`A padded surface for composing media, content, actions, and selection.`}),`
`,(0,S.jsxs)(t.p,{children:[`Card is a layout surface. Default padding and gap are `,(0,S.jsx)(t.code,{children:`lg`}),`. `,(0,S.jsx)(t.code,{children:`href`}),` and `,(0,S.jsx)(t.code,{children:`onPress`}),` add a primary
action. `,(0,S.jsx)(t.code,{children:`selection`}),` adds a checkbox or radio; place `,(0,S.jsx)(t.code,{children:`CardSelectionIndicator`}),` yourself.`]}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsx)(t.p,{children:`A composed static Card surface with heading and description.`}),`
`,(0,S.jsx)(i,{of:p,inline:!0}),`
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

const mediaImageStyle = { display: 'block', width: '100%', height: 'auto' } as const;

export function MediaExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card>
        <Image src={image} alt="Blue mountain landscape" width="640" height="360" style={mediaImageStyle} />
        <Content gap="sm">
          <Heading level={3}>Inset media</Heading>
          <Text>The default Card padding keeps media inset.</Text>
        </Content>
      </Card>

      <Card padding="0" gap="0">
        <Box style={{ overflow: 'hidden', borderStartStartRadius: 'inherit', borderStartEndRadius: 'inherit' }}>
          <Image src={image} alt="Blue mountain landscape" width="640" height="360" style={mediaImageStyle} />
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
            style={mediaImageStyle}
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
`,(0,S.jsx)(t.p,{children:`Use onPress for an action or href for navigation. Nested buttons keep their own hits; the rest of
the surface activates the Card.`}),`
`,(0,S.jsx)(i,{of:u,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { Button, Card, Content, CornerActions, Flex, Text } from '@godaddy/antares';

export function ActionsExample() {
  const [count, setCount] = useState(0);

  return (
    <Flex direction="column" gap="lg">
      <Card aria-label="Open details" onPress={() => setCount((value) => value + 1)}>
        <Text>Open details</Text>
        <Button onPress={() => setCount((value) => value + 10)}>Independent action ({count})</Button>
        <CornerActions>
          <Button onPress={() => setCount((value) => value + 100)}>Corner action</Button>
        </CornerActions>
      </Card>
      <Card href="/about" aria-label="About this product">
        <Content>
          <Text>About this product</Text>
          <Button>Save</Button>
        </Content>
        <CornerActions>
          <Button>Share</Button>
        </CornerActions>
      </Card>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`checkbox`,children:`Checkbox`}),`
`,(0,S.jsx)(t.p,{children:`Standalone checkbox Cards own their state. Grouped cards belong in CheckboxGroup. Pair href with
selectionProps when the body navigates and the indicator selects.`}),`
`,(0,S.jsx)(i,{of:f,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { Card, CardSelectionIndicator, CheckboxGroup, Content, CornerActions, Flex, Text } from '@godaddy/antares';

export function CheckboxExample() {
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
          <CardSelectionIndicator data-testid="card-selection-indicator" />
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
            <CardSelectionIndicator data-testid="combined-selection-indicator" />
          </CornerActions>
        </Card>
      </CheckboxGroup>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`radio`,children:`Radio`}),`
`,(0,S.jsx)(t.p,{children:`Radio Cards require a value and live in RadioGroup, which owns selection and arrow-key movement.`}),`
`,(0,S.jsx)(i,{of:_,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Card, CardSelectionIndicator, CornerActions, RadioGroup, Text } from '@godaddy/antares';

export function RadioExample() {
  return (
    <RadioGroup aria-label="Choose a plan" defaultValue="starter">
      <Card selection="radio" value="starter" aria-label="Starter plan">
        <Text>Starter plan</Text>
        <CornerActions>
          <CardSelectionIndicator data-testid="radio-starter-indicator" />
        </CornerActions>
      </Card>
      <Card selection="radio" value="pro" aria-label="Pro plan">
        <Text>Pro plan</Text>
        <CornerActions>
          <CardSelectionIndicator data-testid="radio-pro-indicator" />
        </CornerActions>
      </Card>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`layout`,children:`Layout`}),`
`,(0,S.jsx)(t.p,{children:`Own responsiveness with a container query. In a collection, let Content grow so footer actions
align, and wrap long titles beside CornerActions.`}),`
`,(0,S.jsx)(i,{of:m,inline:!0}),`
`,(0,S.jsx)(r,{code:`import {
  Box,
  Button,
  Card,
  Content,
  CornerActions,
  Flex,
  Footer,
  Grid,
  Header,
  Heading,
  Image,
  Text,
  TextLockup
} from '@godaddy/antares';
import styles from './layout.module.css';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 240%22%3E%3Crect width=%22320%22 height=%22240%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22220%22 cy=%2270%22 r=%2250%22 fill=%22%234ecdc4%22/%3E%3C/svg%3E';

export function LayoutExample() {
  return (
    <Flex direction="column" gap="xl">
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
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Name a primary action with `,(0,S.jsx)(t.code,{children:`aria-label`}),` or `,(0,S.jsx)(t.code,{children:`aria-labelledby`}),`. The stretched control has no visible
label of its own.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Name selection separately with `,(0,S.jsx)(t.code,{children:`selectionProps`}),` when the Card also has a primary action.`]}),`
`,(0,S.jsx)(t.li,{children:`Nested buttons, links, labels, and fields keep their own behavior. Clicking body text activates
the Card; dragging text selects it.`}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`isDisabled`}),` disables only the primary. `,(0,S.jsx)(t.code,{children:`isSelectionDisabled`}),` disables only selection. Radio
read-only belongs on `,(0,S.jsx)(t.code,{children:`RadioGroup`}),`.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`<Card>
  <Image />
  <Content>
    {/* ... */}
  </Content>
  <CornerActions>
    <CardSelectionIndicator />
    {/* ... */}
  </CornerActions>
</Card>
`})}),`
`,(0,S.jsx)(t.h3,{id:`card-1`,children:`Card`}),`
`,(0,S.jsx)(a,{of:g}),`
`,(0,S.jsx)(t.h3,{id:`cardselectionindicator`,children:`CardSelectionIndicator`}),`
`,(0,S.jsx)(a,{of:d})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;e((()=>{S=t(),c(),s(),l(),v()}))();export{x as default};