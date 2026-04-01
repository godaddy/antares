'use client';

import type { ComponentType } from 'react';

/**
 * Renders a resolved example component inside a client boundary.
 *
 * Split from `Story` (server component) so that `Meta` and other no-op
 * bridge components can remain server components and avoid RSC serialization
 * errors when the MDX passes module namespace objects (e.g. `of={Stories}`)
 * as props.
 */
export function StoryRenderer({ component: Component }: { component: ComponentType | undefined }) {
  if (!Component) {
    return (
      <div className="my-4 p-6 border rounded bg-muted/30">
        <p className="text-sm text-muted-foreground text-center">Example preview available in Storybook</p>
      </div>
    );
  }

  return (
    <div className="my-4 rounded-lg border border-fd-border bg-fd-card p-6">
      <Component />
    </div>
  );
}
