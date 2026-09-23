import { Collapsible, CollapsiblePanel, Heading, Button, Icon, Text, type CollapsibleProps } from '@godaddy/antares';

/** Explore the initial expansion and disabled state of one section. */
export function PlaygroundExample(props: Pick<CollapsibleProps, 'defaultExpanded' | 'isDisabled'>) {
  return (
    <Collapsible key={String(props.defaultExpanded)} {...props}>
      <Heading>
        <Button slot="trigger">
          <Text>Additional details</Text>
          <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
        </Button>
      </Heading>
      <CollapsiblePanel>Optional content for this section.</CollapsiblePanel>
    </Collapsible>
  );
}
