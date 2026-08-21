import { Box, Flex, Pressable, Text, type PressableProps } from '@godaddy/antares';
import type { FocusEventHandler, PointerEventHandler, Ref } from 'react';

export interface PlaygroundExampleProps extends Omit<Partial<PressableProps>, 'children'> {
  /** Ref forwarded to the child element for testing composition */
  childRef?: Ref<HTMLDivElement>;
  /** Ref forwarded to the Pressable element for testing composition */
  pressableRef?: Ref<HTMLElement>;
  /** Pointer-enter handler on the child element for testing event composition */
  onChildPointerEnter?: PointerEventHandler<HTMLDivElement>;
  /** Pointer-leave handler on the child element for testing event composition */
  onChildPointerLeave?: PointerEventHandler<HTMLDivElement>;
  /** Focus handler on the child element for testing event composition */
  onChildFocus?: FocusEventHandler<HTMLDivElement>;
  /** Blur handler on the child element for testing event composition */
  onChildBlur?: FocusEventHandler<HTMLDivElement>;
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
  onChildPointerEnter,
  onChildPointerLeave,
  onChildFocus,
  onChildBlur,
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
        onPointerEnter={onChildPointerEnter}
        onPointerLeave={onChildPointerLeave}
        onFocus={onChildFocus}
        onBlur={onChildBlur}
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
