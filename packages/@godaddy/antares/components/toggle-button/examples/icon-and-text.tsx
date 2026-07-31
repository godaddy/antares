import { ToggleButtonGroup, ToggleButton, Icon } from '@godaddy/antares';

/**
 * Items can include an `Icon` alongside text for added visual context.
 * @title Icon + Text
 * @order 6
 */
export function IconAndTextExample() {
  return (
    <ToggleButtonGroup aria-label="Layout" defaultSelectedKeys={['list']} selectionMode="single">
      <ToggleButton id="list">
        <Icon icon="bulleted-list" />
        List
      </ToggleButton>
      <ToggleButton id="grid">
        <Icon icon="grid" />
        Grid
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
