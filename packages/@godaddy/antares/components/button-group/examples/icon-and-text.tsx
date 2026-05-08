import { ButtonGroup, ButtonGroupItem, Icon } from '@godaddy/antares';

export function IconAndTextExample() {
  return (
    <ButtonGroup aria-label="Layout" defaultSelectedKeys={['list']} selectionMode="single">
      <ButtonGroupItem id="list">
        <Icon icon="bulleted-list" />
        List
      </ButtonGroupItem>
      <ButtonGroupItem id="grid">
        <Icon icon="grid" />
        Grid
      </ButtonGroupItem>
    </ButtonGroup>
  );
}
