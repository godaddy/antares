import { useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Icon, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

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
        <Menu
          selectionMode="single"
          selectedKeys={[alignment]}
          onSelectionChange={(keys) => setAlignment(new Set([...(keys as Set<Alignment>)]))}
        >
          <MenuItem id="left">{ALIGNMENT_LABELS.left}</MenuItem>
          <MenuItem id="center">{ALIGNMENT_LABELS.center}</MenuItem>
          <MenuItem id="right">{ALIGNMENT_LABELS.right}</MenuItem>
        </Menu>
      </MenuTrigger>
    </ToggleButtonGroup>
  );
}
