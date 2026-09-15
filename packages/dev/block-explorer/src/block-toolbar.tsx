import type { ReactNode } from 'react';
import { Flex, Text } from '@godaddy/antares';

/** Props for the {@link BlockToolbar} component. */
export interface BlockToolbarProps {
  /** Short explanation of the block's purpose. */
  description?: string;

  /** Preview/code tab controls. */
  children: ReactNode;
}

/**
 * Places the view tabs and the block purpose on one quiet documentation row.
 *
 * @param props - Tabs and the optional short block description.
 */
export function BlockToolbar({ description, children }: BlockToolbarProps) {
  return (
    <Flex as="header" alignItems="center" justifyContent="space-between" wrap="wrap" gap="md" blockPadding="md">
      <Flex alignItems="center">{children}</Flex>
      {description ? (
        <Text as="p" maxLines={1} wrap="nowrap">
          {description}
        </Text>
      ) : null}
    </Flex>
  );
}
