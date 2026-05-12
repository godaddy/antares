import { ToggleButtonGroup, ToggleButton, Icon } from '@godaddy/antares';

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
