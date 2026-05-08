import { ButtonGroup, ButtonGroupItem, Icon } from '@godaddy/antares';

export function IconOnlyExample() {
  return (
    <ButtonGroup aria-label="Layout" defaultSelectedKeys={['list']} selectionMode="single">
      <ButtonGroupItem id="list" aria-label="List view">
        <Icon icon="bulleted-list" />
      </ButtonGroupItem>
      <ButtonGroupItem id="grid" aria-label="Grid view">
        <Icon icon="grid" />
      </ButtonGroupItem>
    </ButtonGroup>
  );
}
