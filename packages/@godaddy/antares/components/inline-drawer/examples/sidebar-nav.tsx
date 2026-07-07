import { useState } from 'react';
import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Flex, LinkButton, Icon, Text } from '@godaddy/antares';

const NAV = [
  { icon: 'grid', label: 'Dashboard', href: '#' },
  { icon: 'star', label: 'Favorites', href: '#' },
  { icon: 'comment', label: 'Messages', href: '#' }
] as const;

export function SidebarNavExample() {
  const [expanded, setExpanded] = useState(true);

  return (
    <Flex direction="row" style={{ height: 260, border: '1px solid var(--bd-base)' }}>
      <InlineDrawer
        placement="left"
        isExpanded={expanded}
        onExpandedChange={setExpanded}
        minSize="min-content"
        maxSize="max-content"
      >
        <InlineDrawerTrigger aria-label="Menu">
          <Icon icon="bulleted-list" />
          {expanded ? 'Menu' : null}
        </InlineDrawerTrigger>
        <InlineDrawerPanel>
          <Flex as="nav" direction="column" gap="xs" padding="xs">
            {NAV.map(function renderItem(item) {
              return (
                <LinkButton
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  variant="minimal"
                  style={{ inlineSize: '100%', justifyContent: 'flex-start' }}
                >
                  <Icon icon={item.icon} />
                  {expanded ? item.label : null}
                </LinkButton>
              );
            })}
          </Flex>
        </InlineDrawerPanel>
      </InlineDrawer>
      <Flex padding="md" style={{ flex: 1, borderInlineStart: '1px solid var(--bd-base)' }}>
        <Text>Main content area</Text>
      </Flex>
    </Flex>
  );
}
