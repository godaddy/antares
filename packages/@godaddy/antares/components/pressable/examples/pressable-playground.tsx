import { Box, Flex, Pressable, Text, type PressableProps } from '@godaddy/antares';
import type { Ref } from 'react';

export interface PlaygroundExampleProps extends Omit<Partial<PressableProps>, 'children'> {
  /** Ref forwarded to the child element for testing composition */
  childRef?: Ref<HTMLDivElement>;
  /** Ref forwarded to the Pressable element for testing composition */
  pressableRef?: Ref<HTMLElement>;
  /** Click handler on the child element for testing event composition */
  onChildClick?: () => void;
  /** Class name applied to the child element for testing class composition */
  childClassName?: string;
  /** ARIA describedby applied to the child element for testing accessibility composition */
  childAriaDescribedBy?: string;
}

/**
 * Interactive playground for Pressable using a fixed account-summary surface.
 * The child stays fixed so the controls focus on Pressable behavior and state.
 */
export function PlaygroundExample({
  childRef,
  pressableRef,
  onChildClick,
  childClassName,
  childAriaDescribedBy,
  ...props
}: PlaygroundExampleProps) {
  return (
    <Pressable {...props} ref={pressableRef} aria-label="View account summary">
      <Box
        ref={childRef}
        role="button"
        padding="md"
        rounding="md"
        elevation="card"
        className={childClassName}
        onClick={onChildClick}
        aria-describedby={childAriaDescribedBy}
      >
        <Flex direction="column" gap="xs">
          <Text>Account summary</Text>
          <Text>View your account details</Text>
        </Flex>
      </Box>
    </Pressable>
  );
}
