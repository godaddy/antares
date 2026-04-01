/**
 * Browser-safe shim for storybook-addon-helpers used in the docs site.
 *
 * The real package imports react-docgen-typescript which uses Node.js-only
 * modules (fs, path, typescript). Stories files have 'use client' so they
 * run in browser/SSR context where those modules aren't available.
 *
 * This shim exports the same API surface the stories files actually use,
 * but with no Node.js dependencies. Storybook uses Vite and ignores the
 * Next.js alias, so it continues to get the real package.
 */

import type { ComponentType } from 'react';

export function getMeta<T>(args: T): T {
  return args;
}

export function getStory<T extends ComponentType>(component: T, _storyObj?: Record<string, unknown>): T {
  return component;
}

export function getComponentDocs(_component: ComponentType) {
  return {};
}
