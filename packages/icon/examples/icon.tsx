import { Icon, set } from '@bento/icon';
import React from 'react';

//
// Uses the exposed `set` method to introduce the icons and their content to
// the icon store.
//
set({
  play: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 22v-20l18 10-18 10z" />
    </svg>
  )
});

/**
 * Example component demonstrating basic icon usage.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered icon with description.
 * @public
 */
export function Example(args: any) {
  return (
    <>
      <Icon icon="play" title="A play button" {...args} />
      <p>
        A simple play icon, with an embed <code>title</code> element for a11y.
      </p>
    </>
  );
}
