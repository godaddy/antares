import { useState } from 'react';
import { Icon, Menu, MenuItem, MenuTrigger, Popover, Text, ToggleButton, ToggleButtonGroup } from '@godaddy/antares';

type Alignment = 'left' | 'center' | 'right';

const ALIGNMENT_ICONS: Record<Alignment, string> = {
  left: 'align-left',
  center: 'align-center',
  right: 'align-right'
};

const ALIGNMENT_LABELS: Record<Alignment, string> = {
  left: 'Align Left',
  center: 'Align Center',
  right: 'Align Right'
};

/**
 * Wrap a `ToggleButton` in a `MenuTrigger` to add sub-options to a group item.
 * @title With Dropdown
 * @order 8
 */
export function WithDropdownExample() {
  const [formatting, setFormatting] = useState<Set<string>>(new Set());
  const [[alignment], setAlignment] = useState<Set<Alignment>>(new Set(['left']));

  return (
    <ToggleButtonGroup
      aria-label="Text formatting"
      selectionMode="multiple"
      selectedKeys={formatting}
      onSelectionChange={(keys) => setFormatting(new Set([...(keys as Set<string>)].filter((k) => k !== 'align')))}
    >
      <ToggleButton id="bold" aria-label="Bold">
        <Icon icon="bold" />
      </ToggleButton>
      <ToggleButton id="italic" aria-label="Italic">
        <Icon icon="italic" />
      </ToggleButton>

      <MenuTrigger>
        <ToggleButton id="align" aria-label={ALIGNMENT_LABELS[alignment]}>
          <Icon icon={ALIGNMENT_ICONS[alignment]} />
          <Icon icon="chevron-down" />
        </ToggleButton>
        <Popover aria-label="Menu">
          <Menu
            aria-label="Alignment"
            selectionMode="single"
            selectedKeys={[alignment]}
            onSelectionChange={(keys) => setAlignment(new Set([...(keys as Set<Alignment>)]))}
          >
            {(['left', 'center', 'right'] as const).map((id) => (
              <MenuItem key={id} id={id} textValue={ALIGNMENT_LABELS[id]}>
                {({ isSelected }) => (
                  <>
                    <Text slot="label">{ALIGNMENT_LABELS[id]}</Text>
                    {isSelected ? <Icon icon="checkmark" /> : null}
                  </>
                )}
              </MenuItem>
            ))}
          </Menu>
        </Popover>
      </MenuTrigger>
    </ToggleButtonGroup>
  );
}
