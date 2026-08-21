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
 * The interactive playground for Pressable.
 * We use `Omit<Partial<PressableProps>, 'children'>` because the children are fixed
 * by this example to demonstrate a specific interactive surface. Allowing a caller
 * to pass `children` would either silently override the fixed content or be ignored,
 * both of which are confusing.
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
