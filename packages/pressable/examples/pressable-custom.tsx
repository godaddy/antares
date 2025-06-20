import { Pressable } from '@bento/pressable';
/* v8 ignore next */
import React from 'react';

//
// to make a custom component pressable, you need to forward the ref to the
// child element and pass the props to the child element
//
const CustomComponent = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div {...props} ref={ref}>
      Custom Component
    </div>
  );
});

export function PressableCustomExample() {
  return (
    <Pressable
      onPress={() => {
        console.log('custom component pressed!');
      }}
    >
      <CustomComponent />
    </Pressable>
  );
}
