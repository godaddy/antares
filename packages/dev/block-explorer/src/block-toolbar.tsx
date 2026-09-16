import type { ReactNode } from 'react';
import { Flex, Text } from '@godaddy/antares';
import { BlockInstallButton } from './block-install-button.tsx';

/** Props for the {@link BlockToolbar} component. */
export interface BlockToolbarProps {
  /** Short explanation of the block's purpose. */
  description?: string;

  /** Optional shadcn command copied by the Install action. */
  installCommand?: string;

  /** Block identifier used by the Install action's accessible label. */
  blockId?: string;

  /** Preview/code view controls. */
  children: ReactNode;
}

/**
 * Places the view controls and the block purpose on one quiet documentation row.
 *
 * @param props - View controls and the optional short block description.
 */
export function BlockToolbar({ description, installCommand, blockId, children }: BlockToolbarProps) {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
      gap="md"
      inlinePadding="md"
      blockPadding="md"
    >
      <Flex alignItems="center" gap="sm">
        {children}
        {installCommand && blockId ? <BlockInstallButton blockId={blockId} command={installCommand} /> : null}
      </Flex>
      {description ? (
        <Text as="p" maxLines={1} wrap="nowrap">
          {description}
        </Text>
      ) : null}
    </Flex>
  );
}
