import { Accordion, Collapsible, CollapsiblePanel, Heading, Button, Icon, Text } from '@godaddy/antares';

/**
 * Nested sections keep independent state. Prefer a flatter structure when possible.
 * @order 8
 */
export function NestedExample() {
  return (
    <Accordion defaultExpandedKeys={['outer']}>
      <Collapsible id="outer">
        <Heading level={2}>
          <Button slot="trigger">
            <Text>Outer question</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>
          <Collapsible>
            <Heading>
              <Button slot="trigger">
                <Text>Independent detail</Text>
                <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
              </Button>
            </Heading>
            <CollapsiblePanel>Independent answer.</CollapsiblePanel>
          </Collapsible>
          <Accordion>
            <Collapsible id="inner">
              <Heading>
                <Button slot="trigger">
                  <Text>Inner question</Text>
                  <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
                </Button>
              </Heading>
              <CollapsiblePanel>Inner answer.</CollapsiblePanel>
            </Collapsible>
          </Accordion>
        </CollapsiblePanel>
      </Collapsible>
    </Accordion>
  );
}
