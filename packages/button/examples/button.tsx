import { Button } from '@bento/button';
/* v8 ignore next */
import React from 'react';

export function ButtonExample() {
  return (
    <Button
      onPress={() => {
        console.log('button pressed!');
      }}
    >
      Click me!
    </Button>
  );
}
