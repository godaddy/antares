import { VisuallyHidden, type VisuallyHiddenProps } from '@bento/visually-hidden';
/* v8 ignore next */
import React from 'react';

export function DefaultExample(args: VisuallyHiddenProps) {
  return (
    <div>
      <button>
        <VisuallyHidden {...args}>Skip to main content</VisuallyHidden>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
