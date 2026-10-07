import { useState } from 'react';
import { Button, Card, CardGroup, Heading, LinkButton, Text, TextLockup } from '@godaddy/antares';

/**
 * Linked Cards in a CardGroup navigate on a press or Enter. Arrow keys move between rows, and
 * nested controls keep their own actions. Disable a Card to prevent its navigation.
 * @title Grouped links
 * @order 5
 */
export function GroupedLinksExample() {
  const [opened, setOpened] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  function open(key: string) {
    setOpened((keys) => [...keys, key]);
  }

  return (
    <>
      <CardGroup aria-label="Project links" selectionMode="none">
        <Card id="domains" textValue="Domains" href="#domain-overview" onAction={() => open('domains')}>
          <TextLockup>
            <Heading slot="title">Domains</Heading>
            <Text slot="body">Manage your domain names.</Text>
          </TextLockup>
          <Button onPress={() => setSaved(true)}>{saved ? 'Domain saved' : 'Save domain'}</Button>
          <LinkButton href="#domain-help">Help with domains</LinkButton>
        </Card>
        <Card id="hosting" textValue="Hosting" href="#hosting-overview" onAction={() => open('hosting')}>
          <Heading>Hosting</Heading>
          <Text>Manage your web hosting.</Text>
        </Card>
        <Card id="email" textValue="Email" href="#email-overview" onAction={() => open('email')} isDisabled>
          <Heading>Email</Heading>
          <Text>Email is unavailable.</Text>
        </Card>
      </CardGroup>
      <Text>Opened: {opened.join(',') || 'none'}</Text>
    </>
  );
}
