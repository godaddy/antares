import { useState } from 'react';
import { InlineDrawer, Flex, ToggleButton, LinkButton, Icon, Text } from '@godaddy/antares';

const NAV = [
  { icon: 'grid', label: 'Dashboard', href: '#' },
  { icon: 'star', label: 'Favorites', href: '#' },
  { icon: 'comment', label: 'Messages', href: '#' }
] as const;

/**
 * A rail whose content stays visible when collapsed is a composition, not a mode: drive `isExpanded` yourself, render always-visible children (no `InlineDrawerPanel`), and let `minSize`/`maxSize` size the rail. Use numeric (px) sizes so the width animates; intrinsic keywords like `min-content`/`max-content` fit the content exactly but don't animate.
 * @order 3
 */
export function SidebarNavExample() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Flex direction="row">
      <InlineDrawer placement="left" isExpanded={expanded} onExpandedChange={setExpanded} minSize={35} maxSize={150}>
        <Flex direction="column" gap="xs" padding="xs">
          <ToggleButton isSelected={expanded} onChange={setExpanded} aria-label="Menu">
            <Icon icon="bulleted-list" />
          </ToggleButton>
          {NAV.map(function renderItem(item) {
            return (
              <LinkButton
                key={item.label}
                href={item.href}
                aria-label={!expanded ? item.label : undefined}
                variant="minimal"
                style={{ justifyContent: 'flex-start' }}
              >
                <Icon icon={item.icon} />
                {expanded ? item.label : null}
              </LinkButton>
            );
          })}
        </Flex>
      </InlineDrawer>
      <Flex padding="md" style={{ flex: 1, borderInlineStart: '1px solid var(--bd-base)' }}>
        <Text>Main content area</Text>
      </Flex>
    </Flex>
  );
}
