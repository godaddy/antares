import {
  Button,
  CheckboxIndicator,
  Header,
  Heading,
  Icon,
  Menu,
  MenuGroup,
  MenuItem,
  Separator,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
  Text,
  type Selection
} from '@godaddy/antares';
import { useState } from 'react';

const detailIds = ['owner', 'type'] as const;

/**
 * Three levels of checkboxes. Groups label the columns and filters, one row pairs an icon with its checkbox, and the details submenu shows a partial selection.
 * @title Multiple selection
 * @order 4
 */
export function MultipleSelectionExample() {
  const [columns, setColumns] = useState<Selection>(new Set(['name']));
  const [details, setDetails] = useState<Selection>(new Set(['owner']));
  const [tags, setTags] = useState<Selection>(new Set(['published']));
  const selectedDetailCount = details === 'all' ? detailIds.length : detailIds.filter((id) => details.has(id)).length;
  const detailsAllSelected = selectedDetailCount === detailIds.length;
  const detailsSomeSelected = selectedDetailCount > 0 && !detailsAllSelected;

  return (
    <MenuTrigger>
      <Button variant="primary">Columns</Button>
      <Popover aria-label="Menu">
        <Menu aria-label="Columns" selectionMode="multiple" selectedKeys={columns} onSelectionChange={setColumns}>
          <MenuGroup>
            <Header>
              <Heading>Columns</Heading>
            </Header>
            <CheckItem id="name">Name</CheckItem>
            <CheckItem id="date">Date modified</CheckItem>
            <CheckItem id="size" icon="database">
              Size
            </CheckItem>
          </MenuGroup>
          <Separator />
          <MenuGroup>
            <Header>
              <Heading>Filters</Heading>
            </Header>
            <SubmenuTrigger>
              <MenuItem id="details" textValue="Details">
                <CheckboxIndicator isSelected={detailsAllSelected} isIndeterminate={detailsSomeSelected} />
                <Text slot="label">Details</Text>
                <Icon icon="chevron-right" />
              </MenuItem>
              <Popover aria-label="Menu">
                <Menu
                  aria-label="Details"
                  selectionMode="multiple"
                  selectedKeys={details}
                  onSelectionChange={setDetails}
                >
                  <CheckItem id="owner">Owner</CheckItem>
                  <CheckItem id="type">Type</CheckItem>
                  <SubmenuTrigger>
                    <MenuItem id="tags" textValue="Tags">
                      <Text slot="label">Tags</Text>
                      <Icon icon="chevron-right" />
                    </MenuItem>
                    <Popover aria-label="Menu">
                      <Menu aria-label="Tags" selectionMode="multiple" selectedKeys={tags} onSelectionChange={setTags}>
                        <CheckItem id="published">Published</CheckItem>
                        <CheckItem id="draft">Draft</CheckItem>
                        <CheckItem id="archived" isDisabled>
                          Archived
                        </CheckItem>
                      </Menu>
                    </Popover>
                  </SubmenuTrigger>
                </Menu>
              </Popover>
            </SubmenuTrigger>
          </MenuGroup>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

function CheckItem({
  id,
  icon,
  isDisabled,
  children
}: {
  id: string;
  icon?: 'database';
  isDisabled?: boolean;
  children: string;
}) {
  return (
    <MenuItem id={id} textValue={children} isDisabled={isDisabled}>
      {({ isSelected }) => (
        <>
          <CheckboxIndicator isSelected={isSelected} />
          {icon ? <Icon icon={icon} /> : null}
          <Text slot="label">{children}</Text>
        </>
      )}
    </MenuItem>
  );
}
