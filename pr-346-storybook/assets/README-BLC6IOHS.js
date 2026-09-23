import{i as e}from"./preload-helper-BUun7Ttb.js";import{F as t}from"./iframe-CJxMJVMa.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-kClA1YCh.js";import{t as c}from"./mdx-react-shim-BSq6Y4Un.js";import{t as l}from"./runtime-cfuOSczO.js";import{Actions as u,CardSelectionIndicatorProps as d,Checkbox as f,CornerActions as p,Default as m,Disabled as h,Layout as g,Link as _,Media as v,Props as y,Radio as b,TextLockup as x,n as S,t as C}from"./card.stories-U3oQb7Qo.js";function w(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(o,{of:C,name:`Overview`}),`
`,(0,E.jsx)(t.h1,{id:`card`,children:`Card`}),`
`,(0,E.jsx)(t.p,{children:`A padded surface for composing media, content, actions, and selection.`}),`
`,(0,E.jsxs)(t.p,{children:[`Card is a layout surface. Default padding and gap are `,(0,E.jsx)(t.code,{children:`lg`}),`. Direct `,(0,E.jsx)(t.code,{children:`CornerActions`}),` sit at the
top-end. `,(0,E.jsx)(t.code,{children:`href`}),` and `,(0,E.jsx)(t.code,{children:`onPress`}),` add a primary action. `,(0,E.jsx)(t.code,{children:`selection`}),` adds a checkbox or radio instead;
place `,(0,E.jsx)(t.code,{children:`CardSelectionIndicator`}),` yourself. A Card has a primary action or selection, not both.
Clicking the Card body activates whichever it has.`]}),`
`,(0,E.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,E.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,E.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,E.jsx)(t.p,{children:`A static Card just renders its children.`}),`
`,(0,E.jsx)(i,{of:m,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Card } from '@godaddy/antares';

export function DefaultExample() {
  return <Card>Sample children example</Card>;
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`text-lockup`,children:`Text lockup`}),`
`,(0,E.jsx)(t.p,{children:`Compose Card with TextLockup for eyebrow, title, and body.`}),`
`,(0,E.jsx)(i,{of:x,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Card, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

export function TextLockupExample() {
  return (
    <Card>
      <TextLockup>
        <Tag slot="eyebrow" emphasis="info">
          New
        </Tag>
        <Heading slot="title">A composed card</Heading>
        <Text slot="body">Cards provide a surface while consumers own the interior layout.</Text>
      </TextLockup>
    </Card>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`corner-actions`,children:`Corner actions`}),`
`,(0,E.jsx)(t.p,{children:`Direct CornerActions sit at the top-end of the Card.`}),`
`,(0,E.jsx)(i,{of:p,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Button, ButtonGroup, Card, CornerActions, Heading, Icon, Tag, Text, TextLockup } from '@godaddy/antares';

export function CornerActionsExample() {
  return (
    <Card>
      <CornerActions>
        <Button aria-label="Favorite">
          <Icon icon="star" />
        </Button>
        <Button aria-label="More options">
          <Icon icon="ellipsis" />
        </Button>
      </CornerActions>

      <TextLockup>
        <Tag slot="eyebrow" emphasis="info">
          New
        </Tag>
        <Heading slot="title">A composed card</Heading>
        <Text slot="body">Cards provide a surface while consumers own the interior layout.</Text>
      </TextLockup>

      <ButtonGroup>
        <Button variant="primary">Confirm</Button>
      </ButtonGroup>
    </Card>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`link`,children:`Link`}),`
`,(0,E.jsx)(t.p,{children:`href turns the Card into a native link.`}),`
`,(0,E.jsx)(i,{of:_,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Card } from '@godaddy/antares';

export function LinkExample() {
  return (
    <Card href="/" aria-label="Link card">
      This is a link card
    </Card>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`media`,children:`Media`}),`
`,(0,E.jsx)(t.p,{children:`Use default padding for inset media, or zero Card padding with a padded lockup for full bleed.
Media can stand alone, follow the text, or be a custom Box. Clip only the media region.`}),`
`,(0,E.jsx)(i,{of:v,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Box, Card, Grid, Heading, Image, Tag, Text, TextLockup } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22480%22 cy=%22110%22 r=%2270%22 fill=%22%234ecdc4%22/%3E%3Cpath d=%22M0 300 180 150l120 100 90-75 250 185H0z%22 fill=%22%230b3d91%22/%3E%3C/svg%3E';

export function MediaExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card>
        <Image
          src={image}
          alt="Blue mountain landscape"
          style={{ display: 'block', width: '100%', borderRadius: 'inherit' }}
        />
        <TextLockup>
          <Tag slot="eyebrow">Inset</Tag>
          <Heading slot="title">Inset media</Heading>
          <Text slot="body">The default Card padding keeps media inset.</Text>
        </TextLockup>
      </Card>

      <Card padding="0" gap="0">
        <Box style={{ overflow: 'hidden', borderStartStartRadius: 'inherit', borderStartEndRadius: 'inherit' }}>
          <Image src={image} alt="Blue mountain landscape" style={{ display: 'block', width: '100%' }} />
        </Box>

        <TextLockup padding="lg">
          <Tag slot="eyebrow">Full bleed</Tag>
          <Heading slot="title">Full bleed media</Heading>
          <Text slot="body">The lockup supplies its own padding beneath the edge-to-edge image.</Text>
        </TextLockup>
      </Card>

      <Card padding="0" gap="0">
        <Box style={{ overflow: 'hidden', borderRadius: 'inherit' }}>
          <Image
            src={image}
            alt="A media-only card showing a blue mountain landscape"
            style={{ display: 'block', width: '100%' }}
          />
        </Box>
      </Card>

      <Card>
        <TextLockup>
          <Tag slot="eyebrow">Custom</Tag>
          <Heading slot="title">Custom media after content</Heading>
          <Text slot="body">A plain Box can hold a gradient or illustration, before or after the text.</Text>
        </TextLockup>
        <Box rounding="lg" style={{ aspectRatio: '16 / 9', background: 'linear-gradient(135deg, #145fa9, #4ecdc4)' }} />
      </Card>
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`actions`,children:`Actions`}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.code,{children:`onPress`}),` is the Card primary. Nested buttons keep their own hits, so Save does not open the
Modal. Compose a Card inside the Modal when the action is a focused form.`]}),`
`,(0,E.jsx)(i,{of:u,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Heading,
  Input,
  Label,
  Modal,
  Tag,
  Text,
  TextField,
  TextLockup
} from '@godaddy/antares';

export function ActionsExample() {
  const [isOpen, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <Card aria-label="Join mailing list" onPress={() => setOpen(true)}>
        <TextLockup>
          <Tag slot="eyebrow">Newsletter</Tag>
          <Heading slot="title">Join our mailing list</Heading>
          <Text slot="body">
            Stay up to date on the latest trends. Press the Card to subscribe, or save it for later.
          </Text>
        </TextLockup>

        <ButtonGroup justifyContent="end">
          <Button variant="primary" onPress={() => setSaved(true)}>
            {saved ? 'Saved' : 'Save'}
          </Button>
        </ButtonGroup>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={setOpen} aria-label="Join our mailing list">
        <Card elevation="base">
          <TextLockup>
            <Heading slot="title">Join our mailing list</Heading>
            <Text slot="body">The market is evolving. Stay up to date on the latest trends.</Text>
          </TextLockup>

          <TextField type="email">
            <Label>Email</Label>
            <Input placeholder="you@example.com" />
          </TextField>

          <ButtonGroup justifyContent="end">
            <Button slot="close">Cancel</Button>
            <Button slot="close" variant="primary">
              Submit
            </Button>
          </ButtonGroup>
        </Card>
      </Modal>
    </>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`checkbox`,children:`Checkbox`}),`
`,(0,E.jsx)(t.p,{children:`Standalone checkbox Cards own their state. Grouped cards belong in CheckboxGroup.
Indicator children can render custom content from the current selection state.`}),`
`,(0,E.jsx)(i,{of:f,inline:!0}),`
`,(0,E.jsx)(r,{code:`import {
  Card,
  CardSelectionIndicator,
  CheckboxGroup,
  CornerActions,
  Flex,
  Heading,
  Icon,
  Button,
  Text,
  TextLockup
} from '@godaddy/antares';

export function CheckboxExample() {
  return (
    <Flex direction="column" gap="xl">
      <Flex direction="column" gap="sm">
        <Heading>Single</Heading>

        <Card selection="checkbox" aria-label="Automatic renewal">
          <TextLockup>
            <Heading slot="title">Automatic renewal</Heading>
            <Text slot="body">Keep this plan active when it expires.</Text>
          </TextLockup>
          <CornerActions>
            <CardSelectionIndicator data-testid="card-selection-indicator">
              {({ isSelected }) => <Text>{isSelected ? 'true' : 'false'}</Text>}
            </CardSelectionIndicator>
          </CornerActions>
        </Card>
      </Flex>

      <Flex direction="column" gap="sm">
        <Heading>Group</Heading>

        <CheckboxGroup aria-label="Select add-ons" defaultValue={['privacy']}>
          <Card selection="checkbox" value="privacy" aria-label="Domain privacy">
            <TextLockup>
              <Heading slot="title">Domain privacy</Heading>
              <Text slot="body">Hide your contact details from the public directory.</Text>
            </TextLockup>
            <CornerActions>
              <Button aria-label="More options">
                <Icon icon="ellipsis" />
              </Button>
              <CardSelectionIndicator />
            </CornerActions>
          </Card>

          <Card selection="checkbox" value="email" aria-label="Professional email">
            <TextLockup>
              <Heading slot="title">Professional email</Heading>
              <Text slot="body">Send from a mailbox at your domain.</Text>
            </TextLockup>
            <CornerActions>
              <CardSelectionIndicator>
                {({ isSelected }) => <Text>{isSelected ? 'true' : 'false'}</Text>}
              </CardSelectionIndicator>
            </CornerActions>
          </Card>
        </CheckboxGroup>
      </Flex>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`radio`,children:`Radio`}),`
`,(0,E.jsx)(t.p,{children:`Radio Cards require a value and live in RadioGroup, which owns selection and arrow-key movement.`}),`
`,(0,E.jsx)(i,{of:b,inline:!0}),`
`,(0,E.jsx)(r,{code:`import {
  Card,
  CardSelectionIndicator,
  CornerActions,
  Heading,
  RadioGroup,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

export function RadioExample() {
  return (
    <RadioGroup aria-label="Choose a plan" defaultValue="starter">
      <Card selection="radio" value="starter" aria-label="Starter plan">
        <TextLockup>
          <Tag slot="eyebrow" emphasis="success">
            Popular
          </Tag>
          <Heading slot="title" level={3}>
            Starter plan
          </Heading>
          <Text slot="body">For getting started with a single project.</Text>
        </TextLockup>
        <CornerActions>
          <CardSelectionIndicator data-testid="radio-starter-indicator" />
        </CornerActions>
      </Card>
      <Card selection="radio" value="pro" aria-label="Pro plan">
        <TextLockup>
          <Tag slot="eyebrow" emphasis="premium">
            Upgrade
          </Tag>
          <Heading slot="title" level={3}>
            Pro plan
          </Heading>
          <Text slot="body">For teams that need more room to grow.</Text>
        </TextLockup>
        <CornerActions>
          <CardSelectionIndicator data-testid="radio-pro-indicator" />
        </CornerActions>
      </Card>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.code,{children:`isDisabled`}),` disables the Card's primary action or selection and fades the whole Card. A
disabled CheckboxGroup or RadioGroup does the same. Read-only selection keeps its value visible.`]}),`
`,(0,E.jsx)(i,{of:h,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Card, CardSelectionIndicator, CornerActions, Grid, Heading, Text, TextLockup } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="md" alignItems="start">
      <Card aria-label="Open billing" onPress={() => undefined} isDisabled>
        <TextLockup>
          <Heading slot="title">Disabled action</Heading>
          <Text slot="body">Pressing the Card does nothing.</Text>
        </TextLockup>
      </Card>

      <Card selection="checkbox" aria-label="Backup" isDisabled>
        <TextLockup>
          <Heading slot="title">Disabled selection</Heading>
          <Text slot="body">The Card cannot be selected.</Text>
        </TextLockup>
        <CornerActions>
          <CardSelectionIndicator />
        </CornerActions>
      </Card>

      <Card selection="checkbox" aria-label="SSL" isReadOnly defaultSelected>
        <TextLockup>
          <Heading slot="title">Read-only selection</Heading>
          <Text slot="body">The selection is visible but cannot change.</Text>
        </TextLockup>
        <CornerActions>
          <CardSelectionIndicator />
        </CornerActions>
      </Card>
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`layout`,children:`Layout`}),`
`,(0,E.jsx)(t.p,{children:`Use Grid for responsiveness.`}),`
`,(0,E.jsx)(i,{of:g,inline:!0}),`
`,(0,E.jsx)(r,{code:`import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CornerActions,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 240%22%3E%3Crect width=%22320%22 height=%22240%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22220%22 cy=%2270%22 r=%2250%22 fill=%22%234ecdc4%22/%3E%3C/svg%3E';

export function LayoutExample() {
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
              <Tag slot="eyebrow">Responsive</Tag>
              <Heading slot="title">Grid-owned responsiveness</Heading>
              <Text slot="body">Auto-fit columns decide when this composition stacks or becomes horizontal.</Text>
            </TextLockup>
          </Grid>
        </Card>
      </Box>

      <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="md" alignItems="start">
        {[
          ['Card 1', 'Short description'],
          ['Card 2', 'A medium description gives this card more content.'],
          [
            'A longer title that wraps across lines',
            'A longer description demonstrates that each card can grow while its action stays aligned.'
          ]
        ].map(function renderCard([title, body], index) {
          return (
            <Card key={title} gap="md" data-testid={\`collection-card-\${index}\`}>
              <CornerActions>
                <Button aria-label="More options">
                  <Icon icon="ellipsis" />
                </Button>
              </CornerActions>

              <TextLockup>
                <Tag slot="eyebrow">Recommended</Tag>
                <Heading slot="title">{title}</Heading>
                <Text slot="body">{body}</Text>
              </TextLockup>

              <ButtonGroup justifyContent="end">
                <Button variant="primary">View details</Button>
              </ButtonGroup>
            </Card>
          );
        })}
      </Grid>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,E.jsxs)(t.p,{children:[`Pass non-interactive children or a selection-state render function to `,(0,E.jsx)(t.code,{children:`CardSelectionIndicator`}),`
to replace its default circle and icon. See the Checkbox example. Native selection and keyboard
behavior are preserved.`]}),`
`,(0,E.jsxs)(t.p,{children:[`To style the Card by state, target `,(0,E.jsx)(t.code,{children:`[data-card-selected]`}),` and `,(0,E.jsx)(t.code,{children:`[data-disabled]`}),` from your
`,(0,E.jsx)(t.code,{children:`className`}),`.`]}),`
`,(0,E.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[`Name a primary action or selection with `,(0,E.jsx)(t.code,{children:`aria-label`}),` or `,(0,E.jsx)(t.code,{children:`aria-labelledby`}),`. The stretched control
and the selection input have no visible label of their own.`]}),`
`,(0,E.jsxs)(t.li,{children:[`On a Card without a primary action or selection, `,(0,E.jsx)(t.code,{children:`aria-label`}),`, `,(0,E.jsx)(t.code,{children:`aria-labelledby`}),`, and
`,(0,E.jsx)(t.code,{children:`aria-describedby`}),` apply to the surface, for example with `,(0,E.jsx)(t.code,{children:`role="region"`}),`.`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`href`}),` turns the Card into a native link. Modifier-click, middle-click, and "Open in new tab" work
on the surface. Body text is not selectable. The link covers the whole Card, so do not put
CornerActions, buttons, inputs, selection, or other controls in an `,(0,E.jsx)(t.code,{children:`href`}),` Card. Clicking body text
on an `,(0,E.jsx)(t.code,{children:`onPress`}),` or selection Card activates it; dragging that text selects it.`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`isDisabled`}),` disables the primary action or selection and fades the Card. Controls you nest
inside keep their own disabled state. Required and invalid state belong on `,(0,E.jsx)(t.code,{children:`CheckboxGroup`}),` or
`,(0,E.jsx)(t.code,{children:`RadioGroup`}),`, and so does radio read-only state.`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-tsx`,children:`<Card>
  <CornerActions>
    <CardSelectionIndicator />
  </CornerActions>

  <Image />
  <TextLockup>
    <Tag slot="eyebrow" />
    <Heading slot="title" />
    <Text slot="body" />
  </TextLockup>
  {/* ... */}
</Card>
`})}),`
`,(0,E.jsx)(t.h3,{id:`card-1`,children:`Card`}),`
`,(0,E.jsx)(a,{of:y}),`
`,(0,E.jsx)(t.h3,{id:`cardselectionindicator`,children:`CardSelectionIndicator`}),`
`,(0,E.jsx)(a,{of:d})]})}function T(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,E.jsx)(t,{...e,children:(0,E.jsx)(w,{...e})}):w(e)}var E;e((()=>{E=t(),c(),s(),l(),S()}))();export{T as default};