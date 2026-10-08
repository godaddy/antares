import { useState } from 'react';
import { Card, CardGroup, Flex, Heading, LinkButton, Switch, Text, TextLockup } from '@godaddy/antares';

/**
 * Open a domain's settings by pressing its Card or Enter. Toggle auto-renew or manage DNS without
 * opening the Card. Arrow keys move between domains, skipping the domain being transferred.
 * @title Grouped links
 * @order 5
 */
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
}
