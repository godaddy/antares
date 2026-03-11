import { Pressable } from '@bento/pressable';
/* v8 ignore next */
import React from 'react';

export function PressableLinkExample() {
  return (
    <Pressable
      onPress={function handlePress() {
        console.log('link pressed!');
      }}
    >
      <a href="/">Pressable Link</a>
    </Pressable>
  );
}
