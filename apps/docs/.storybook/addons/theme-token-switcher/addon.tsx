import React, { useCallback } from 'react';
import { addons, types, useGlobals } from 'storybook/manager-api';
import { ActionList, Button, WithTooltip } from 'storybook/internal/components';
import { CheckIcon, PaintBrushIcon } from '@storybook/icons';
import { TOGGLE_META } from './toggles-meta.ts';

const ADDON_ID = 'theme-token-switcher';
const TOOL_ID = `${ADDON_ID}/tool`;

/**
 * Toolbar tool: renders one checkbox row per entry in
 * {@link TOGGLE_META} and writes each toggle back to `globals` so the
 * preview decorator picks it up. The tooltip stays open across clicks
 * so multiple toggles can be flipped in one visit.
 *
 * Owning the multi-select on the manager side is why the per-toggle
 * `globalTypes` in `preview.tsx` deliberately omit `toolbar` — we are
 * bypassing Storybook's built-in single-select widget.
 */
function ThemeTokensTool() {
  const [globals, updateGlobals] = useGlobals();
  console.log('globals', globals);
  const toggle = useCallback(
    function toggleGlobal(globalKey: string) {
      updateGlobals({ [globalKey]: !globals[globalKey] });
    },
    [globals, updateGlobals]
  );

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={
        <ActionList>
          {TOGGLE_META.map((t) => (
            <ActionList.Item key={t.globalKey}>
              <ActionList.Button
                ariaLabel={false}
                onClick={() => toggle(t.globalKey)}
                style={{ flex: 1, justifyContent: 'space-between' }}
              >
                {t.name}
                {globals[t.globalKey] ? <CheckIcon /> : null}
              </ActionList.Button>
            </ActionList.Item>
          ))}
        </ActionList>
      }
    >
      <Button key={TOOL_ID} ariaLabel={false} variant="ghost" size="small">
        <PaintBrushIcon />
        Theme tokens
      </Button>
    </WithTooltip>
  );
}

addons.register(ADDON_ID, function register() {
  addons.add(TOOL_ID, {
    title: 'Theme tokens',
    type: types.TOOL,
    match: function isVisible({ tabId, viewMode }) {
      return !tabId && Boolean(viewMode?.match(/^(story|docs)$/));
    },
    render: function render() {
      return <ThemeTokensTool />;
    }
  });
});
