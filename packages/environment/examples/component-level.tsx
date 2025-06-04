import { Environment } from '@bento/environment';
import { Icon, set } from '@bento/icon';
import React from 'react';

//
// Uses the exposed `set` method to introduce the icons and their content to
// the icon store.
//
set({
  'my-icon': (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 22v-20l18 10-18 10z" />
    </svg>
  )
});

/**
 * Example component demonstrating component-level overrides.
 *
 * @returns {JSX.Element} The rendered component with overridden icon.
 * @public
 */
export const ComponentLevelExample: React.FC = function ComponentLevelExample() {
  return (
    <Environment
      components={{
        BentoIcon: {
          props: { mode: 'sprite' }
        }
      }}
    >
      <div>
        <Icon
          height={48}
          width={48}
          icon="my-icon"
          title="In this example it should be rendered as sprite through environment level configuration"
        />

        <p>This icon will be loaded as sprite, even though the mode is not specified.</p>
      </div>
    </Environment>
  );
};
