import { Pressable } from '@bento/pressable';
/* v8 ignore next */
import React from 'react';

export function PressableDivExample() {
  return (
    <Pressable
      onPress={() => {
        console.log('div pressed!');
      }}
    >
      <div>Pressable Div</div>
    </Pressable>
  );
}
