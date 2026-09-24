import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { WithStatusExample } from '../examples/with-status.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { PlaygroundExample } from '../examples/collapsible-playground.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Collapsible', function collapsibleTests() {
    it.each([
      ['default-closed', <DefaultExample />],
      ['default-open', <DefaultExample defaultExpanded />],
      ['controlled', <ControlledExample />],
      ['disabled-closed', <DisabledExample />],
      ['disabled-open', <DisabledExample defaultExpanded />],
      ['with-status', <WithStatusExample />],
      [
        'long-content',
        <PlaygroundExample
          headingText="How do I transfer a domain when my account name and the domain name are both very long?"
          content="Check your contact information, unlock the domain, and request an authorization code from your current provider. Keep a copy of your confirmation email. You can return to these instructions while the transfer is processing. Reference: exceptionally-long-domain-name-without-spaces-for-testing.example"
          defaultExpanded
        />
      ],
      ['playground', <PlaygroundExample defaultExpanded />],
      ['custom-content', <PlaygroundExample contentProps={{ padding: 'sm' }} defaultExpanded />],
      ['unpadded-content', <PlaygroundExample contentProps={{ padding: '0' }} defaultExpanded />]
    ] as const)('renders %s', function renderExample(_name, example) {
      const result = renderToString(example);

      expect(result).toMatchSnapshot();
    });
  });
});
