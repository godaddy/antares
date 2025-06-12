import { useDataAttributes } from '@bento/use-data-attributes';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
/* v8 ignore next */
import React, { useState } from 'react';

interface Example {
  [key: string]: any;
}

/**
 * Container component demonstrating data attributes usage.
 *
 * @param {object} args - The component props.
 * @returns {JSX.Element} The rendered div element with data attributes.
 * @public
 */
export const Container: React.FC<Example> = withSlots('MyDataPropsContainer', function Containers(args: object) {
  //
  // Always supply the `useRenderProps` hook with the state of your component.
  // This allows the renderProps to refer the state of the component and render
  // the correct content accordingly.
  //
  const [loading] = useState(true);
  const { props } = useProps(args, { loading });

  const dataAttributes = useDataAttributes({
    loading,
    override: ['style', 'className', 'slots']
  });

  const { children, ...rest } = props;

  //
  // This is just to illustrate how props end up in the DOM as data attributes.
  // In a real-world scenario, you would use the `useDataAttributes` hook as
  // referenced above with a curated list of attributes to expose.
  //
  const data = useDataAttributes(rest);
  return (
    <div {...dataAttributes} {...data}>
      {children}
    </div>
  );
});
