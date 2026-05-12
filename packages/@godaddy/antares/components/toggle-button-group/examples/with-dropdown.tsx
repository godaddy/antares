import { useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Icon, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

const ALIGNMENT_ICONS: Record<string, string> = {
  left: 'align-left',
  center: 'align-center',
  right: 'align-right'
};

const ALIGNMENT_LABELS: Record<string, string> = {
  left: 'Align Left',
  center: 'Align Center',
  right: 'Align Right'
};

export function WithDropdownExample() {
  const [formatting, setFormatting] = useState<Set<string>>(new Set());
  const [alignment, setAlignment] = useState('left');

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
          selectedKeys={new Set([alignment])}
          onSelectionChange={function handleAlignmentChange(keys) {
            const next = [...(keys as Set<string>)][0];
            if (next) {
              setAlignment(next);
            }
          }}
        >
          <MenuItem id="left">{ALIGNMENT_LABELS.left}</MenuItem>
          <MenuItem id="center">{ALIGNMENT_LABELS.center}</MenuItem>
          <MenuItem id="right">{ALIGNMENT_LABELS.right}</MenuItem>
        </Menu>
      </MenuTrigger>
    </ToggleButtonGroup>
  );
}
