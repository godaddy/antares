import { useDataAttributes } from '@bento/use-data-attributes';
import { useRenderProps } from '@bento/use-render-props';
import { withSlots } from '@bento/slots';
import React, { useState } from 'react';

export const Container = withSlots('MyDataPropsContainer', function Containers(args: object) {
  //
  // Always supply the `useRenderProps` hook with the state of your component.
  // This allows the renderProps to refer the state of the component and render
  // the correct content accordingly.
  //
  const [loading] = useState(true);
  const [props] = useRenderProps(args, { loading });

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
