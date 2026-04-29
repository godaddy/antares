import { useEffect } from 'react';
import type { Decorator } from '@storybook/react-vite';
import { TOGGLES } from './toggles.ts';

/**
 * One `globals` entry per toggle. `toolbar` is intentionally omitted —
 * the multi-select dropdown lives in `addon.tsx`, so Storybook's
 * built-in single-select toolbar widget is bypassed.
 */
export const globalTypes = Object.fromEntries(
  TOGGLES.map((t) => [
    t.globalKey,
    {
      name: t.name,
      description: t.description,
      defaultValue: t.defaultEnabled
    }
  ])
);

/**
 * Reconciles a single `<style>` tag in `document.head` with the given
 * contents. An empty `css` removes the tag entirely so the off state is
 * a clean cascade reset rather than an empty-but-present rule block.
 *
 * @param id - DOM id used to find or create the tag.
 * @param css - CSS to apply, or `''` to remove the tag.
 */
function syncStyleTag(id: string, css: string): void {
  let el = document.getElementById(id) as HTMLStyleElement | null;

  if (!css) {
    el?.remove();
    return;
  }

  if (!el) {
    el = document.createElement('style');
    el.id = id;
    document.head.appendChild(el);
  }

  if (el.textContent !== css) {
    el.textContent = css;
  }
}

/**
 * Per-story decorator that drives the `<style>`-tag lifecycle from the
 * current `globals`. The composite `stateKey` is a single string that
 * encodes every toggle value, so React's effect dep array re-runs on
 * any flip without needing to list each global individually (which
 * would defeat the purpose of declaring toggles in one place).
 */
const withTokens: Decorator = function withTokens(Story, context) {
  const stateKey = TOGGLES.map((t) => `${t.globalKey}:${context.globals[t.globalKey] ? 1 : 0}`).join('|');

  useEffect(
    function syncStyles() {
      for (const toggle of TOGGLES) {
        const enabled = Boolean(context.globals[toggle.globalKey]);
        syncStyleTag(toggle.styleId, enabled ? toggle.css : '');
      }
    },

    [stateKey]
  );

  return <Story />;
};

export const decorators: Decorator[] = [withTokens];
