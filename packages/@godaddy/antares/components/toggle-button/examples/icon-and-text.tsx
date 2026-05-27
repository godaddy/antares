import { ToggleButtonGroup, ToggleButton, Icon } from '@godaddy/antares';

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
