import{i as e}from"./preload-helper-BUun7Ttb.js";import{F as t}from"./iframe-DLes9dmg.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CNR5c7sm.js";import{t as c}from"./mdx-react-shim-k2dh6em6.js";import{t as l}from"./runtime-cfuOSczO.js";import{Actions as u,CardGroupProps as d,CardSelectionIndicatorProps as f,CornerActions as p,Default as m,Disabled as h,GroupedLinks as g,Layout as _,Link as v,Media as y,MultipleSelection as b,Props as x,SingleSelection as S,TextLockup as C,n as w,t as T}from"./card.stories-X21SFqkt.js";function E(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(o,{of:T,name:`Overview`}),`
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
`,(0,O.jsx)(t.p,{children:`A simple website status message.`}),`
`,(0,O.jsx)(i,{of:m,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Card } from '@godaddy/antares';

export function DefaultExample() {
  return <Card>Your website is published and ready for visitors.</Card>;
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`text-lockup`,children:`Text lockup`}),`
`,(0,O.jsx)(t.p,{children:`Introduce the next step in setting up a business website.`}),`
`,(0,O.jsx)(i,{of:C,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Card, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

export function TextLockupExample() {
  return (
    <Card>
      <TextLockup>
        <Tag slot="eyebrow" emphasis="info">
          New
        </Tag>
        <Heading slot="title">Connect your domain</Heading>
        <Text slot="body">Give your website a memorable address so customers can find your business.</Text>
      </TextLockup>
    </Card>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`corner-actions`,children:`Corner actions`}),`
`,(0,O.jsx)(t.p,{children:`Save a business guide for later, mark it as read from the menu, or open the guide.`}),`
`,(0,O.jsx)(i,{of:p,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CornerActions,
  Header,
  Heading,
  Icon,
  LinkButton,
  Menu,
  MenuItem,
  MenuTrigger,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

export function CornerActionsExample({ dir }: { dir?: 'ltr' | 'rtl' } = {}) {
  const [saved, setSaved] = useState(false);
  const [read, setRead] = useState(false);

  return (
    <Card dir={dir} style={{ maxWidth: '24rem' }}>
      <TextLockup>
        <Header>
          <CornerActions>
            <Button aria-label="Favorite" aria-pressed={saved} onPress={() => setSaved(!saved)}>
              <Icon icon="star" />
            </Button>
            <MenuTrigger popoverProps={{ placement: 'bottom end' }}>
              <Button aria-label="More options">
                <Icon icon="ellipsis" />
              </Button>
              <Menu aria-label="Guide actions">
                <MenuItem id="read" onAction={() => setRead(!read)}>
                  {read ? 'Mark as unread' : 'Mark as read'}
                </MenuItem>
              </Menu>
            </MenuTrigger>
          </CornerActions>
          <Heading slot="title">
            Everything you need to launch your first online store and turn new visitors into returning customers
          </Heading>
        </Header>
        <Text slot="body">
          A practical checklist for your products, payments, shipping, and first marketing campaign.
        </Text>
        {read && <Tag>Read</Tag>}
        <Text role="status">{saved ? 'Saved to your reading list' : '5 min read'}</Text>
      </TextLockup>

      <ButtonGroup>
        <LinkButton variant="primary" href="#store-launch-guide">
          Read guide
        </LinkButton>
      </ButtonGroup>
    </Card>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`link`,children:`Link`}),`
`,(0,O.jsx)(t.p,{children:`Link to billing, domain search, or hosting from the whole Card. Keep nested controls out of
standalone link Cards.`}),`
`,(0,O.jsx)(i,{of:v,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Box, Card, Grid, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

export function LinkExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card href="#billing" aria-label="Manage billing">
        Manage your billing and payment methods
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
          <Text>99.9% uptime</Text>
        </Box>
        <TextLockup>
          <Heading slot="title">Web hosting</Heading>
          <Text slot="body">Keep your website online with hosting that grows with your business.</Text>
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
      <CardGroup aria-label="Domain names" selectionMode="none" keyboardNavigationBehavior="tab">
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
`,(0,O.jsx)(t.p,{children:`Preview website templates with inset, full bleed, or standalone media, and a brand palette
with custom media. Direct CornerActions place the favorite action over the template preview.`}),`
`,(0,O.jsx)(i,{of:y,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { useState } from 'react';
import { Box, Button, Card, CornerActions, Grid, Heading, Icon, Image, Tag, Text, TextLockup } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22480%22 cy=%22110%22 r=%2270%22 fill=%22%234ecdc4%22/%3E%3Cpath d=%22M0 300 180 150l120 100 90-75 250 185H0z%22 fill=%22%230b3d91%22/%3E%3C/svg%3E';

export function MediaExample() {
  const [saved, setSaved] = useState(false);

  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card>
        <CornerActions>
          <Button variant="secondary" aria-label="Favorite" aria-pressed={saved} onPress={() => setSaved(!saved)}>
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
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`actions`,children:`Actions`}),`
`,(0,O.jsx)(t.p,{children:`Open a newsletter signup from the Card, or save it without opening the form. Submit a valid
email to see a local confirmation.`}),`
`,(0,O.jsx)(i,{of:u,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { useState, type FormEvent } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardGroup,
  FieldError,
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
  const [subscribedEmail, setSubscribedEmail] = useState('');

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribedEmail(String(new FormData(event.currentTarget).get('email')));
    setSubscribing(false);
  }

  return (
    <>
      <CardGroup aria-label="Newsletters" keyboardNavigationBehavior="tab">
        <Card id="newsletter" textValue="Join our mailing list" onAction={() => setSubscribing(true)}>
          <TextLockup>
            <Tag slot="eyebrow">Newsletter</Tag>
            <Heading slot="title">Join our mailing list</Heading>
            <Text slot="body">Get practical tips for growing your business, delivered to your inbox every month.</Text>
          </TextLockup>

          <ButtonGroup justifyContent="end">
            <Button variant="primary" aria-pressed={saved} onPress={() => setSaved(!saved)}>
              {saved ? 'Saved' : 'Save'}
            </Button>
          </ButtonGroup>
        </Card>
      </CardGroup>
      <Text role="status">{subscribedEmail ? \`Subscribed with \${subscribedEmail}\` : ''}</Text>

      <Modal isOpen={subscribing} onOpenChange={setSubscribing} aria-label="Join our mailing list">
        <Box as="form" onSubmit={subscribe}>
          <Card elevation="base">
            <TextLockup>
              <Heading slot="title">Join our mailing list</Heading>
              <Text slot="body">One email a month. Unsubscribe whenever you like.</Text>
            </TextLockup>

            <TextField type="email" name="email" isRequired>
              <Label>Email</Label>
              <Input placeholder="you@example.com" />
              <Box style={{ minHeight: '1.5em' }}>
                <FieldError>Enter a valid email address.</FieldError>
              </Box>
            </TextField>

            <ButtonGroup justifyContent="end">
              <Button slot="close">Cancel</Button>
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </ButtonGroup>
          </Card>
        </Box>
      </Modal>
    </>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`multiple-selection`,children:`Multiple selection`}),`
`,(0,O.jsx)(t.p,{children:`Choose optional add-ons and see the monthly total update. The indicators show selection,
including a custom text indicator for email.`}),`
`,(0,O.jsx)(i,{of:b,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { useState } from 'react';
import {
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Flex,
  Header,
  Heading,
  type Selection,
  Text,
  TextLockup
} from '@godaddy/antares';

export function MultipleSelectionExample() {
  const [selected, setSelected] = useState<Selection>(new Set(['privacy']));
  const privacyPrice = 5;
  const emailPrice = 8;
  const total =
    (selected === 'all' || selected.has('privacy') ? privacyPrice : 0) +
    (selected === 'all' || selected.has('email') ? emailPrice : 0);

  return (
    <Flex direction="column" gap="md">
      <CardGroup
        aria-label="Select add-ons"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <Card id="privacy" textValue="Domain privacy">
          <TextLockup>
            <Header>
              <CornerActions>
                <CardSelectionIndicator data-testid="privacy-indicator" />
              </CornerActions>
              <Heading slot="title">Domain privacy</Heading>
            </Header>
            <Text slot="body">Hide your contact details from the public directory.</Text>
            <Text>\${privacyPrice}/month</Text>
          </TextLockup>
        </Card>

        <Card id="email" textValue="Professional email">
          <TextLockup>
            <Header>
              <CornerActions>
                <CardSelectionIndicator data-testid="email-indicator">
                  {({ isSelected }) => <Text>{isSelected ? 'Added' : 'Add'}</Text>}
                </CardSelectionIndicator>
              </CornerActions>
              <Heading slot="title">Professional email</Heading>
            </Header>
            <Text slot="body">Send from a mailbox at your domain.</Text>
            <Text>\${emailPrice}/month</Text>
          </TextLockup>
        </Card>
      </CardGroup>
      <Text role="status">Add-ons total: \${total}/month</Text>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`single-selection`,children:`Single selection`}),`
`,(0,O.jsxs)(t.p,{children:[`Pick a plan and see its monthly price. `,(0,O.jsx)(t.code,{children:`disallowEmptySelection`}),` keeps one plan selected.`]}),`
`,(0,O.jsx)(i,{of:S,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { useState } from 'react';
import {
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Flex,
  Header,
  Heading,
  type Selection,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

export function SingleSelectionExample() {
  const [selected, setSelected] = useState<Selection>(new Set(['starter']));
  const starterPrice = 10;
  const proPrice = 25;
  const isPro = selected !== 'all' && selected.has('pro');

  return (
    <Flex direction="column" gap="md">
      <CardGroup
        aria-label="Choose a plan"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <Card id="starter" textValue="Starter plan">
          <TextLockup>
            <Tag slot="eyebrow" emphasis="success">
              Popular
            </Tag>
            <Header>
              <CornerActions>
                <CardSelectionIndicator data-testid="starter-indicator" />
              </CornerActions>
              <Heading slot="title">Starter plan</Heading>
            </Header>
            <Text slot="body">For getting started with a single project.</Text>
            <Text>\${starterPrice}/month</Text>
          </TextLockup>
        </Card>
        <Card id="pro" textValue="Pro plan">
          <TextLockup>
            <Tag slot="eyebrow" emphasis="premium">
              Upgrade
            </Tag>
            <Header>
              <CornerActions>
                <CardSelectionIndicator data-testid="pro-indicator" />
              </CornerActions>
              <Heading slot="title">Pro plan</Heading>
            </Header>
            <Text slot="body">For teams that need more room to grow.</Text>
            <Text>\${proPrice}/month</Text>
          </TextLockup>
        </Card>
      </CardGroup>
      <Text role="status">
        Selected plan: {isPro ? 'Pro' : 'Starter'} - \${isPro ? proPrice : starterPrice}/month
      </Text>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,O.jsxs)(t.p,{children:[`Explain why billing or add-ons are unavailable. Disable an individual Card with `,(0,O.jsx)(t.code,{children:`isDisabled`}),`,
or disable Cards by key with `,(0,O.jsx)(t.code,{children:`disabledKeys`}),` on the group.`]}),`
`,(0,O.jsx)(i,{of:h,inline:!0}),`
`,(0,O.jsx)(r,{code:`import {
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Flex,
  Header,
  Heading,
  Text,
  TextLockup
} from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Flex direction="column" gap="lg">
      <Card href="#billing" isDisabled>
        <TextLockup>
          <Heading slot="title">Billing temporarily unavailable</Heading>
          <Text slot="body">Finish transferring your account to manage billing.</Text>
        </TextLockup>
      </Card>

      <CardGroup aria-label="Available add-ons" selectionMode="multiple" disabledKeys={['ssl']}>
        <Card id="backup" textValue="Automatic backups" isDisabled>
          <TextLockup>
            <Header>
              <CornerActions>
                <CardSelectionIndicator />
              </CornerActions>
              <Heading slot="title">Automatic backups</Heading>
            </Header>
            <Text slot="body">Add a hosting plan to enable daily backups.</Text>
          </TextLockup>
        </Card>

        <Card id="ssl" textValue="SSL certificate">
          <TextLockup>
            <Header>
              <CornerActions>
                <CardSelectionIndicator />
              </CornerActions>
              <Heading slot="title">SSL certificate</Heading>
            </Header>
            <Text slot="body">Connect a domain to activate your SSL certificate.</Text>
          </TextLockup>
        </Card>
      </CardGroup>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`layout`,children:`Layout`}),`
`,(0,O.jsx)(t.p,{children:`A featured business guide and a responsive reading list. Grid adapts the layout to the
available space, while each guide keeps its own height.`}),`
`,(0,O.jsx)(i,{of:_,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { useState } from 'react';
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
            <Card key={id} gap="md" data-testid={\`collection-card-\${index}\`}>
              <TextLockup>
                <Tag slot="eyebrow">Recommended</Tag>
                <Header>
                  <CornerActions>
                    <Button aria-label={\`Save \${title}\`} aria-pressed={saved.has(id)} onPress={() => toggleSaved(id)}>
                      <Icon icon="star" />
                    </Button>
                  </CornerActions>
                  <Heading slot="title">{title}</Heading>
                </Header>
                <Text slot="body">{body}</Text>
              </TextLockup>

              <ButtonGroup justifyContent="end">
                <LinkButton variant="primary" href={\`#\${id}-guide\`}>
                  Read guide
                </LinkButton>
              </ButtonGroup>
            </Card>
          );
        })}
      </Grid>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,O.jsxs)(t.p,{children:[`Customize `,(0,O.jsx)(t.code,{children:`CardSelectionIndicator`}),` with non-interactive children or a selection-state render
function. `,(0,O.jsx)(t.code,{children:`CardGroup`}),` owns selection, which works without an indicator.`]}),`
`,(0,O.jsxs)(t.p,{children:[`Use `,(0,O.jsx)(t.code,{children:`className`}),` with `,(0,O.jsx)(t.code,{children:`[data-selected]`}),`, `,(0,O.jsx)(t.code,{children:`[data-hovered]`}),`, `,(0,O.jsx)(t.code,{children:`[data-pressed]`}),`, `,(0,O.jsx)(t.code,{children:`[data-focus-visible]`}),`,
and `,(0,O.jsx)(t.code,{children:`[data-disabled]`}),` to style Card states.`]}),`
`,(0,O.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,O.jsxs)(t.ul,{children:[`
`,(0,O.jsxs)(t.li,{children:[`Name `,(0,O.jsx)(t.code,{children:`CardGroup`}),` with `,(0,O.jsx)(t.code,{children:`aria-label`}),` or `,(0,O.jsx)(t.code,{children:`aria-labelledby`}),`, and set `,(0,O.jsx)(t.code,{children:`textValue`}),` on Cards with composed
content for accessible names and typeahead.`]}),`
`,(0,O.jsxs)(t.li,{children:[(0,O.jsx)(t.code,{children:`CardGroup`}),` uses grid navigation: Tab enters or leaves, arrow keys move between Cards, and Space
changes selection. Enter activates row actions or links. Choose selection or `,(0,O.jsx)(t.code,{children:`onAction`}),`;
combining them prevents pointer selection.`]}),`
`,(0,O.jsxs)(t.li,{children:[`Use `,(0,O.jsx)(t.code,{children:`keyboardNavigationBehavior="tab"`}),` for nested controls. Antares controls keep their actions
independent of the Card; use `,(0,O.jsx)(t.code,{children:`Pressable`}),` for custom controls.`]}),`
`,(0,O.jsxs)(t.li,{children:[`A standalone Card with `,(0,O.jsx)(t.code,{children:`href`}),` is a link and must not contain buttons, inputs, or other controls.`]}),`
`]}),`
`,(0,O.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,O.jsx)(t.pre,{children:(0,O.jsx)(t.code,{className:`language-tsx`,children:`<CardGroup selectionMode="multiple">
  <Card id="privacy" textValue="Domain privacy">
    <CornerActions />
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