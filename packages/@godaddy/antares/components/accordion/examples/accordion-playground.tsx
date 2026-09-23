import {
  Accordion,
  Collapsible,
  CollapsiblePanel,
  Heading,
  type AccordionProps,
  Button,
  Icon,
  Text
} from '@godaddy/antares';

/** Explore single or multiple expansion, initial keys and disabled behavior. */
export function PlaygroundExample(
  props: Pick<AccordionProps, 'isDisabled' | 'defaultExpandedKeys' | 'allowsMultipleExpanded'>
) {
  return (
    <Accordion
      key={JSON.stringify([props.allowsMultipleExpanded, Array.from(props.defaultExpandedKeys ?? [])])}
      {...props}
    >
      <Collapsible id="first">
        <Heading>
          <Button slot="trigger">
            <Text>First question</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>First answer.</CollapsiblePanel>
      </Collapsible>
      <Collapsible id="second">
        <Heading>
          <Button slot="trigger">
            <Text>Second question</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Second answer.</CollapsiblePanel>
      </Collapsible>
      <Collapsible id="third">
        <Heading>
          <Button slot="trigger">
            <Text>Third question</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Third answer.</CollapsiblePanel>
      </Collapsible>
    </Accordion>
  );
}
