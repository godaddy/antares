import { Chip, ChipGroup, ChipList, type ChipProps } from '@godaddy/antares';

/** @ignore */
export function LinkedChipExample({ onAction }: Pick<ChipProps, 'onAction'>) {
  return (
    <ChipGroup aria-label="Filters">
      <ChipList>
        <Chip id="filters" href="/filters" onAction={onAction}>
          Filters
        </Chip>
      </ChipList>
    </ChipGroup>
  );
}
