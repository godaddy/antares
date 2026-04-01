import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { StoryRenderer } from './story-renderer';
import type { ComponentType } from 'react';

/** No-op — frontmatter handles the title in Fumadocs */
export function Meta() {
  return null;
}

/**
 * Renders the example component via a client boundary.
 *
 * `Meta` must remain a server component so that `<Meta of={Stories}>` (where
 * `Stories` is a module namespace object) never triggers RSC serialization.
 * `Story` delegates rendering to `StoryRenderer` which is `'use client'`.
 */
export function Story({ of: Component }: { of: ComponentType | undefined }) {
  return <StoryRenderer component={Component} />;
}

/** Renders a syntax-highlighted code block with a copy button. */
export function Source({ code, language = 'tsx' }: { code: string; language?: string }) {
  return <DynamicCodeBlock lang={language} code={code} />;
}

/** No-op fallback — `remarkArgTypes` replaces these nodes at build time */
export function ArgTypes() {
  return null;
}

/** No-op — Storybook Controls have no equivalent in the docs site */
export function Controls() {
  return null;
}
