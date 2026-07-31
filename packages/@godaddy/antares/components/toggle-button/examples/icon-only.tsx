import { ToggleButtonGroup, ToggleButton, Icon } from '@godaddy/antares';

/**
 * For compact layouts, items can contain only icons. Always provide an `aria-label` on each icon-only item.
 * @order 7
 */
export function IconOnlyExample() {
  return (
    <ToggleButtonGroup aria-label="Layout" defaultSelectedKeys={['list']} selectionMode="single">
      <ToggleButton id="list" aria-label="List view">
        <Icon icon="bulleted-list" />
      </ToggleButton>
      <ToggleButton id="grid" aria-label="Grid view">
        <Icon icon="grid" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
