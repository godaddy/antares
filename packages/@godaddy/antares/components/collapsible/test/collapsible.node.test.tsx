import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { WithStatusExample } from '../examples/with-status.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { LongContentExample } from '../examples/long-content.tsx';
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
      ['long-content', <LongContentExample />],
      ['playground', <PlaygroundExample defaultExpanded />]
    ] as const)('renders %s', function renderExample(_name, example) {
      const result = renderToString(example);

      expect(result).toMatchSnapshot();
    });
  });
});
