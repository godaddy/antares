import{i as e}from"./preload-helper-BUun7Ttb.js";import{F as t}from"./iframe-COaLMhix.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-hG6xWfC3.js";import{t as c}from"./mdx-react-shim-Dzkeonf4.js";import{t as l}from"./runtime-cfuOSczO.js";import{Actions as u,CardGroupProps as d,CardSelectionIndicatorProps as f,CornerActions as p,Default as m,Disabled as h,GroupedLinks as g,Layout as _,Link as v,Media as y,MultipleSelection as b,Props as x,SingleSelection as S,TextLockup as C,n as w,t as T}from"./card.stories-DuNZ3Fbv.js";function E(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(o,{of:T,name:`Overview`}),`
`,(0,O.jsx)(t.h1,{id:`card`,children:`Card`}),`
`,(0,O.jsx)(t.p,{children:`A surface that groups related content and actions.`}),`
`,(0,O.jsxs)(t.p,{children:[`Card groups related content, like media, text, and actions, on a single surface. On its own, a Card
is a static surface, or a link when you pass `,(0,O.jsx)(t.code,{children:`href`}),`. Put Cards in a `,(0,O.jsx)(t.code,{children:`CardGroup`}),` to make them
selectable or to give them an action: the group owns selection, row actions, focus, and arrow-key
navigation.`]}),`
`,(0,O.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,O.jsx)(t.pre,{children:(0,O.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,O.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,O.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,O.jsx)(t.p,{children:`A static Card just renders its children.`}),`
`,(0,O.jsx)(i,{of:m,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Card } from '@godaddy/antares';

export function DefaultExample() {
  return <Card>Sample children example</Card>;
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`text-lockup`,children:`Text lockup`}),`
`,(0,O.jsx)(t.p,{children:`Compose Card with TextLockup for eyebrow, title, and body.`}),`
`,(0,O.jsx)(i,{of:C,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Card, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

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
`,(0,O.jsx)(t.h3,{id:`corner-actions`,children:`Corner actions`}),`
`,(0,O.jsx)(t.p,{children:`Direct CornerActions sit at the top-end of the Card.`}),`
`,(0,O.jsx)(i,{of:p,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Button, ButtonGroup, Card, CornerActions, Heading, Icon, Tag, Text, TextLockup } from '@godaddy/antares';

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
`,(0,O.jsx)(t.h3,{id:`link`,children:`Link`}),`
`,(0,O.jsxs)(t.p,{children:[(0,O.jsx)(t.code,{children:`href`}),` renders the Card itself as a native link, so layered content like an elevated Box stays
clickable. The link takes its name from its content unless you pass `,(0,O.jsx)(t.code,{children:`aria-label`}),`. Do not nest
controls in a link Card.`]}),`
`,(0,O.jsx)(i,{of:v,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Box, Card, Grid, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

export function LinkExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card href="/" aria-label="Link card">
        This is a link card
      </Card>

      <Card href="#domains">
        <TextLockup>
          <Tag slot="eyebrow" emphasis="info">
            Domains
          </Tag>
          <Heading slot="title">Find your domain</Heading>
          <Text slot="body">Search for the perfect name for your business.</Text>
        </TextLockup>
      </Card>

      <Card href="#hosting">
        <Box elevation="raised" rounding="md" padding="md">
          <Text>Layered content</Text>
        </Box>
        <TextLockup>
          <Heading slot="title">Web hosting</Heading>
          <Text slot="body">An elevated Box inside the Card still opens the link.</Text>
        </TextLockup>
      </Card>
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`grouped-links`,children:`Grouped links`}),`
`,(0,O.jsx)(t.p,{children:`Open a domain's settings by pressing its Card or Enter. Toggle auto-renew or manage DNS without
opening the Card. Arrow keys move between domains, skipping the domain being transferred.`}),`
`,(0,O.jsx)(i,{of:g,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { useState } from 'react';
import { Card, CardGroup, Flex, Heading, LinkButton, Switch, Text, TextLockup } from '@godaddy/antares';

export function GroupedLinksExample() {
  const [opened, setOpened] = useState<string[]>([]);
  const [autoRenew, setAutoRenew] = useState(false);

  function open(key: string) {
    setOpened((keys) => [...keys, key]);
  }

  return (
    <>
      <CardGroup aria-label="Domain names" selectionMode="none">
        <Card
          id="example-com"
          textValue="example.com"
          href="#example-com-settings"
          onAction={() => open('example.com')}
        >
          <TextLockup>
            <Heading slot="title">example.com</Heading>
            <Text slot="body">Auto-renew is {autoRenew ? 'on' : 'off'}. Open this domain to view its settings.</Text>
          </TextLockup>
          <Flex alignItems="center" justifyContent="space-between" gap="md" wrap="wrap">
            <Switch isSelected={autoRenew} onChange={setAutoRenew}>
              Auto-renew
            </Switch>
            <LinkButton variant="primary" href="#example-com-dns">
              Manage DNS
            </LinkButton>
          </Flex>
        </Card>
        <Card
          id="example-net"
          textValue="example.net"
          href="#example-net-settings"
          onAction={() => open('example.net')}
        >
          <Heading>example.net</Heading>
          <Text>Auto-renew is on. Open this domain to view its settings.</Text>
        </Card>
        <Card
          id="example-org"
          textValue="example.org"
          href="#example-org-settings"
          onAction={() => open('example.org')}
          isDisabled
        >
          <Heading>example.org</Heading>
          <Text>Transfer in progress. Settings will be available when the transfer is complete.</Text>
        </Card>
      </CardGroup>
      <Text>Opened: {opened.join(',') || 'none'}</Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`media`,children:`Media`}),`
`,(0,O.jsx)(t.p,{children:`Use default padding for inset media, or zero Card padding with a padded lockup for full bleed.
Media can stand alone, follow the text, or be a custom Box. Clip only the media region.`}),`
`,(0,O.jsx)(i,{of:y,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Box, Card, Grid, Heading, Image, Tag, Text, TextLockup } from '@godaddy/antares';

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
`,(0,O.jsx)(t.h3,{id:`actions`,children:`Actions`}),`
`,(0,O.jsxs)(t.p,{children:[`Inside a CardGroup, `,(0,O.jsx)(t.code,{children:`onAction`}),` runs when the row is pressed or activated with Enter. Nested
buttons keep their own presses, so Save does not open the Modal. Compose a Card inside the Modal
when the action is a focused form.`]}),`
`,(0,O.jsx)(i,{of:u,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardGroup,
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
  const [subscribing, setSubscribing] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <CardGroup aria-label="Newsletters">
        <Card id="newsletter" textValue="Join our mailing list" onAction={() => setSubscribing(true)}>
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
      </CardGroup>

      <Modal isOpen={subscribing} onOpenChange={setSubscribing} aria-label="Join our mailing list">
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
`,(0,O.jsx)(t.h3,{id:`multiple-selection`,children:`Multiple selection`}),`
`,(0,O.jsxs)(t.p,{children:[(0,O.jsx)(t.code,{children:`selectionMode="multiple"`}),` lets each Card toggle on its own. CardSelectionIndicator shows the
state, and its children can render custom content from it. Nested buttons keep their own presses.`]}),`
`,(0,O.jsx)(i,{of:b,inline:!0}),`
`,(0,O.jsx)(r,{code:`import {
  Button,
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Heading,
  Icon,
  Text,
  TextLockup
} from '@godaddy/antares';

export function MultipleSelectionExample() {
  return (
    <CardGroup aria-label="Select add-ons" selectionMode="multiple" defaultSelectedKeys={['privacy']}>
      <Card id="privacy" textValue="Domain privacy">
        <TextLockup>
          <Heading slot="title">Domain privacy</Heading>
          <Text slot="body">Hide your contact details from the public directory.</Text>
        </TextLockup>
        <CornerActions>
          <Button aria-label="More options">
            <Icon icon="ellipsis" />
          </Button>
          <CardSelectionIndicator data-testid="privacy-indicator" />
        </CornerActions>
      </Card>

      <Card id="email" textValue="Professional email">
        <TextLockup>
          <Heading slot="title">Professional email</Heading>
          <Text slot="body">Send from a mailbox at your domain.</Text>
        </TextLockup>
        <CornerActions>
          <CardSelectionIndicator data-testid="email-indicator">
            {({ isSelected }) => <Text>{isSelected ? 'Added' : 'Add'}</Text>}
          </CardSelectionIndicator>
        </CornerActions>
      </Card>
    </CardGroup>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`single-selection`,children:`Single selection`}),`
`,(0,O.jsxs)(t.p,{children:[(0,O.jsx)(t.code,{children:`selectionMode="single"`}),` keeps one Card selected at a time. Arrow keys move between Cards, and
Space selects the focused one.`]}),`
`,(0,O.jsx)(i,{of:S,inline:!0}),`
`,(0,O.jsx)(r,{code:`import {
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Heading,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

export function SingleSelectionExample() {
  return (
    <CardGroup aria-label="Choose a plan" selectionMode="single" defaultSelectedKeys={['starter']}>
      <Card id="starter" textValue="Starter plan">
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
          <CardSelectionIndicator data-testid="starter-indicator" />
        </CornerActions>
      </Card>
      <Card id="pro" textValue="Pro plan">
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
          <CardSelectionIndicator data-testid="pro-indicator" />
        </CornerActions>
      </Card>
    </CardGroup>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,O.jsxs)(t.p,{children:[(0,O.jsx)(t.code,{children:`isDisabled`}),` fades the Card. A disabled link Card does not navigate, and a disabled Card in a
CardGroup cannot be selected, run its action, or take focus. `,(0,O.jsx)(t.code,{children:`disabledKeys`}),` on the group does
the same by key.`]}),`
`,(0,O.jsx)(i,{of:h,inline:!0}),`
`,(0,O.jsx)(r,{code:`import {
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Flex,
  Heading,
  Text,
  TextLockup
} from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Flex direction="column" gap="lg">
      <Card href="#billing" isDisabled>
        <TextLockup>
          <Heading slot="title">Disabled link</Heading>
          <Text slot="body">Pressing the Card does nothing.</Text>
        </TextLockup>
      </Card>

      <CardGroup aria-label="Backups" selectionMode="multiple" disabledKeys={['ssl']}>
        <Card id="backup" textValue="Backup" isDisabled>
          <TextLockup>
            <Heading slot="title">Disabled with isDisabled</Heading>
            <Text slot="body">The Card cannot be selected.</Text>
          </TextLockup>
          <CornerActions>
            <CardSelectionIndicator />
          </CornerActions>
        </Card>

        <Card id="ssl" textValue="SSL">
          <TextLockup>
            <Heading slot="title">Disabled with disabledKeys</Heading>
            <Text slot="body">The group disables this Card by key.</Text>
          </TextLockup>
          <CornerActions>
            <CardSelectionIndicator />
          </CornerActions>
        </Card>
      </CardGroup>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`layout`,children:`Layout`}),`
`,(0,O.jsx)(t.p,{children:`Use Grid for responsiveness.`}),`
`,(0,O.jsx)(i,{of:_,inline:!0}),`
`,(0,O.jsx)(r,{code:`import {
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
`,(0,O.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,O.jsxs)(t.p,{children:[(0,O.jsx)(t.code,{children:`CardSelectionIndicator`}),` only shows a Card's selection state. The `,(0,O.jsx)(t.code,{children:`CardGroup`}),` owns selection, so a
Card stays selectable without an indicator. Pass non-interactive children or a selection-state
render function to replace the default circle and icon. See the Multiple selection example.`]}),`
`,(0,O.jsxs)(t.p,{children:[`Card link options such as `,(0,O.jsx)(t.code,{children:`target`}),`, `,(0,O.jsx)(t.code,{children:`rel`}),`, `,(0,O.jsx)(t.code,{children:`download`}),`, and `,(0,O.jsx)(t.code,{children:`routerOptions`}),` apply to both standalone
links and linked rows in a `,(0,O.jsx)(t.code,{children:`CardGroup`}),`. A `,(0,O.jsx)(t.code,{children:`CardGroup`}),` ref points to its collection surface. Card ids
accept strings or numbers; numeric keys keep their type in group selection and become strings on
standalone DOM elements.`]}),`
`,(0,O.jsxs)(t.p,{children:[`To style a Card by state, target `,(0,O.jsx)(t.code,{children:`[data-selected]`}),`, `,(0,O.jsx)(t.code,{children:`[data-hovered]`}),`, `,(0,O.jsx)(t.code,{children:`[data-pressed]`}),`,
`,(0,O.jsx)(t.code,{children:`[data-focus-visible]`}),`, and `,(0,O.jsx)(t.code,{children:`[data-disabled]`}),` from your `,(0,O.jsx)(t.code,{children:`className`}),`.`]}),`
`,(0,O.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,O.jsxs)(t.ul,{children:[`
`,(0,O.jsxs)(t.li,{children:[`A `,(0,O.jsx)(t.code,{children:`CardGroup`}),` is a grid: each Card is a row, Tab moves into and out of the group, and arrow keys
move between Cards. Name the group with `,(0,O.jsx)(t.code,{children:`aria-label`}),` or `,(0,O.jsx)(t.code,{children:`aria-labelledby`}),`. Each Card takes its
accessible name from `,(0,O.jsx)(t.code,{children:`textValue`}),`, which also drives typeahead. Plain-text children supply it by
default, so set `,(0,O.jsx)(t.code,{children:`textValue`}),` when a Card's content is composed.`]}),`
`,(0,O.jsxs)(t.li,{children:[`In a selectable group, Space toggles the focused Card. Without selection, `,(0,O.jsx)(t.code,{children:`onAction`}),` runs on Enter
or a press. Do not combine them: with both, a press runs the action and only Space selects, so
pointer users cannot select.`]}),`
`,(0,O.jsxs)(t.li,{children:[`Use Antares controls such as `,(0,O.jsx)(t.code,{children:`Button`}),`, `,(0,O.jsx)(t.code,{children:`LinkButton`}),`, and `,(0,O.jsx)(t.code,{children:`Checkbox`}),` inside a grouped Card. React
Aria keeps their presses independent of row selection and actions. For a custom press target,
use `,(0,O.jsx)(t.code,{children:`Pressable`}),` and forward its props and ref to the target.`]}),`
`,(0,O.jsxs)(t.li,{children:[`Set `,(0,O.jsx)(t.code,{children:`keyboardNavigationBehavior="tab"`}),` on `,(0,O.jsx)(t.code,{children:`CardGroup`}),` to move through controls within a row with
Tab. Native controls follow React Aria's event propagation rules.`]}),`
`,(0,O.jsxs)(t.li,{children:[`A `,(0,O.jsx)(t.code,{children:`CardGroup`}),` does not submit form values. Read the selection from `,(0,O.jsx)(t.code,{children:`onSelectionChange`}),`.`]}),`
`,(0,O.jsxs)(t.li,{children:[(0,O.jsx)(t.code,{children:`href`}),` on a standalone Card renders the Card itself as a native link, named by its content unless
you pass `,(0,O.jsx)(t.code,{children:`aria-label`}),`. A link Card cannot contain controls, so do not put CornerActions, buttons,
or inputs in it. Inside a `,(0,O.jsx)(t.code,{children:`CardGroup`}),`, `,(0,O.jsx)(t.code,{children:`href`}),` navigates from the row instead.`]}),`
`,(0,O.jsxs)(t.li,{children:[(0,O.jsx)(t.code,{children:`isDisabled`}),` fades the Card. On a link Card it stops navigation. In a `,(0,O.jsx)(t.code,{children:`CardGroup`}),` it also stops
selection, the action, and focus, as does listing the Card's `,(0,O.jsx)(t.code,{children:`id`}),` in `,(0,O.jsx)(t.code,{children:`disabledKeys`}),`.`]}),`
`,(0,O.jsxs)(t.li,{children:[`On a static Card, `,(0,O.jsx)(t.code,{children:`aria-label`}),`, `,(0,O.jsx)(t.code,{children:`aria-labelledby`}),`, and `,(0,O.jsx)(t.code,{children:`aria-describedby`}),` apply to the surface,
for example with `,(0,O.jsx)(t.code,{children:`role="region"`}),`.`]}),`
`]}),`
`,(0,O.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,O.jsx)(t.pre,{children:(0,O.jsx)(t.code,{className:`language-tsx`,children:`<CardGroup selectionMode="multiple">
  <Card id="privacy" textValue="Domain privacy">
    <CornerActions>
      <CardSelectionIndicator />
    </CornerActions>

    <Image />
    <TextLockup />
    {/* ... */}
  </Card>
</CardGroup>
`})}),`
`,(0,O.jsx)(t.h3,{id:`card-1`,children:`Card`}),`
`,(0,O.jsx)(a,{of:x}),`
`,(0,O.jsx)(t.h3,{id:`cardgroup`,children:`CardGroup`}),`
`,(0,O.jsx)(a,{of:d}),`
`,(0,O.jsx)(t.h3,{id:`cardselectionindicator`,children:`CardSelectionIndicator`}),`
`,(0,O.jsx)(a,{of:f})]})}function D(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,O.jsx)(t,{...e,children:(0,O.jsx)(E,{...e})}):E(e)}var O;e((()=>{O=t(),c(),s(),l(),w()}))();export{D as default};