/* v8 ignore next */
import React from 'react';
import { Slot, Box } from '@bento/box';

/**
 * Simple example showing how Slot merges slots into Box context.
 * This demonstrates the concept - in real usage, child components would
 * use @bento/slots and @bento/use-props to consume these slot props.
 */
export function SlotExample() {
  // Define slots that will be passed to children via Box context
  const slots = {
    trigger: {
      onClick: 'handler',
      'aria-label': 'Example trigger'
    },
    content: {
      role: 'dialog',
      'aria-modal': true
    }
  };

  return (
    <Slot slots={slots}>
      {/*
        Any child component that uses withSlots and useProps can now
        access these slots via the Box context.

        For example:
        - A component with slot="trigger" would receive the trigger props
        - A component with slot="content" would receive the content props
      */}
      <Box.Consumer>
        {function render(ctx) {
          return (
            <div>
              <h3>Slots in Box Context:</h3>
              <pre>{JSON.stringify(ctx.slots.assigned, null, 2)}</pre>
            </div>
          );
        }}
      </Box.Consumer>
    </Slot>
  );
}
