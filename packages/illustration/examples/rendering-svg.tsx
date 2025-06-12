import { Illustration } from '@bento/illustration';
import { UnknownObject } from '@bento/types';
/* v8 ignore next */
import React from 'react';

/**
 * Example component demonstrating SVG rendering with Illustration.
 *
 * @param {UnknownObject} args - The component props.
 * @returns {JSX.Element} The rendered component with SVG illustration.
 * @public
 */
export function RenderingSvg(args: UnknownObject) {
  return (
    <Illustration {...args}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
        />
      </svg>
    </Illustration>
  );
}
