import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardGroup,
  CardSelectionIndicator,
  type CardSelectionIndicatorProps,
  Checkbox,
  CornerActions,
  LinkButton,
  Menu,
  MenuItem,
  MenuTrigger,
  Pressable,
  RangeField,
  Text
} from '@godaddy/antares';

/**
 * Hidden fixture for CardGroup selection, row actions, and nested controls.
 * @ignore
 */
export function InteractionsExample({
  selectionMode = 'multiple',
  withAction,
  isDisabled,
  slider,
  indicatorChildren
}: {
  selectionMode?: 'single' | 'multiple' | 'none';
  withAction?: boolean;
  isDisabled?: boolean;
  slider?: boolean;
  indicatorChildren?: CardSelectionIndicatorProps['children'];
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [rowActions, setRowActions] = useState<string[]>([]);
  const [actions, setActions] = useState(0);

  function act() {
    setActions((count) => count + 1);
  }

  function runRowAction(key: string) {
    setRowActions((keys) => [...keys, key]);
  }

  function changeSelection(keys: 'all' | Set<string | number>) {
    setSelected(keys === 'all' ? ['all'] : [...keys].map(String));
  }

  return (
    <>
      <CardGroup
        aria-label="Choose an option"
        selectionMode={selectionMode}
        keyboardNavigationBehavior="tab"
        onSelectionChange={changeSelection}
      >
        <Card
          id="one"
          textValue="Option one"
          isDisabled={isDisabled}
          onAction={withAction ? () => runRowAction('one') : undefined}
        >
          <Text>One: copy this text.</Text>
          <Button onPress={act}>Independent One</Button>
          <Pressable onPress={act}>
            <Box role="button">Custom action One</Box>
          </Pressable>
          <Checkbox onChange={act}>Remember One</Checkbox>
          <LinkButton href="#independent-destination" onPress={act}>
            Independent link One
          </LinkButton>
          <MenuTrigger>
            <Button>Menu One</Button>
            <Menu aria-label="Menu One" onAction={act}>
              <MenuItem id="nested">Menu action One</MenuItem>
            </Menu>
          </MenuTrigger>
          <CornerActions data-testid="corner-One" padding="sm">
            <CardSelectionIndicator data-testid="indicator-One">{indicatorChildren}</CardSelectionIndicator>
          </CornerActions>
          {slider ? <RangeField label="Volume" defaultValue={10} /> : null}
        </Card>
        <Card id="two" textValue="Option two" onAction={withAction ? () => runRowAction('two') : undefined}>
          <Text>Two</Text>
          <CornerActions>
            <CardSelectionIndicator data-testid="indicator-Two" />
          </CornerActions>
        </Card>
      </CardGroup>
      <Text>Selected: {selected.join(',') || 'none'}</Text>
      <Text>Row actions: {rowActions.join(',') || 'none'}</Text>
      <Text>Independent activations: {actions}</Text>
    </>
  );
}
