import type { ReactNode } from 'react';
import {
  Collapsible,
  CollapsiblePanel,
  Heading,
  Button,
  Icon,
  Text,
  type CollapsibleProps,
  type CollapsiblePanelProps
} from '@godaddy/antares';

interface PlaygroundProps
  extends Pick<CollapsibleProps, 'defaultExpanded' | 'isDisabled'>,
    Pick<CollapsiblePanelProps, 'contentProps'> {
  /** Text used to identify the section. */
  headingText?: string;

  /** Information revealed when the section expands. */
  content?: ReactNode;

  /** Show a completion icon and its text label. */
  showStatus?: boolean;

  /** Show the expansion indicator. */
  showIndicator?: boolean;
}

/** Explore section content, optional icons, expansion, and disabled state. */
export function PlaygroundExample({
  headingText = 'Additional details',
  content = 'Optional content for this section.',
  showStatus = false,
  showIndicator = true,
  contentProps,
  ...props
}: PlaygroundProps = {}) {
  return (
    <Collapsible key={String(props.defaultExpanded)} {...props}>
      <Heading>
        <Button slot="trigger">
          {showStatus && <Icon icon="checkmark" aria-hidden="true" />}
          <Text>
            {headingText}
            {showStatus && ' (Completed)'}
          </Text>
          {showIndicator && <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />}
        </Button>
      </Heading>
      <CollapsiblePanel contentProps={contentProps}>{content}</CollapsiblePanel>
    </Collapsible>
  );
}
