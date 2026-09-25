import {
  Accordion,
  Collapsible,
  CollapsiblePanel,
  Heading,
  Text,
  Button,
  Icon,
  type AccordionProps
} from '@godaddy/antares';

/**
 * Let people explore short answers one at a time.
 * @title One section at a time
 * @order 1
 */
export function DefaultExample({
  defaultExpandedKeys = ['domains']
}: Pick<AccordionProps, 'defaultExpandedKeys'> = {}) {
  return (
    <Accordion allowsMultipleExpanded={false} defaultExpandedKeys={defaultExpandedKeys}>
      <Collapsible id="domains">
        <Heading>
          <Button slot="trigger">
            <Text>Can I transfer my domain?</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>
          <Text>Yes. Start your transfer from the Domains page.</Text>
        </CollapsiblePanel>
      </Collapsible>
      <Collapsible id="renewal">
        <Heading>
          <Button slot="trigger">
            <Text>How does renewal work?</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>
          <Text>Enable automatic renewal in your account settings.</Text>
        </CollapsiblePanel>
      </Collapsible>
      <Collapsible id="privacy">
        <Heading>
          <Button slot="trigger">
            <Text>Is domain privacy included?</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Domain privacy helps keep your personal contact information private.</CollapsiblePanel>
      </Collapsible>
    </Accordion>
  );
}
