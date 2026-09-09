import { Button, Chip, ChipGroup, ChipList, Label, Text, type ChipSize } from '@godaddy/antares';

/** Props for configuring the Chip playground story. */
export interface PlaygroundExampleProps {
  groupLabel: string;
  description: string;
  errorMessage: string;
  size: ChipSize;
  selectionMode: 'none' | 'single' | 'multiple';
  disallowEmptySelection: boolean;
  empty: boolean;
  children: string;
  textValue: string;
  isChipDisabled: boolean;
  href: string;
  removable: boolean;
  showError: boolean;
}

/** @ignore */
export function PlaygroundExample({
  groupLabel,
  description,
  errorMessage,
  size,
  selectionMode,
  disallowEmptySelection,
  empty,
  children,
  textValue,
  isChipDisabled,
  href,
  removable,
  showError
}: PlaygroundExampleProps) {
  const items = empty ? [] : [{ id: 'playground', name: children }];

  return (
    <ChipGroup
      size={size}
      selectionMode={selectionMode === 'none' ? undefined : selectionMode}
      disallowEmptySelection={disallowEmptySelection}
      onRemove={
        removable
          ? function noop() {
              /* playground */
            }
          : undefined
      }
    >
      <Label>{groupLabel}</Label>
      <ChipList items={items} renderEmptyState={() => 'No chips'}>
        {(item) => (
          <Chip id={item.id} textValue={textValue || item.name} isDisabled={isChipDisabled} href={href || undefined}>
            <Text>{item.name}</Text>
            {removable ? <Button slot="remove" /> : null}
          </Chip>
        )}
      </ChipList>
      {showError ? (
        <Text slot="errorMessage">{errorMessage}</Text>
      ) : description ? (
        <Text slot="description">{description}</Text>
      ) : null}
    </ChipGroup>
  );
}
