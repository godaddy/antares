import { Button, type ButtonProps } from '@bento/button';
/* v8 ignore next */
import React from 'react';

export function ButtonExample(props: ButtonProps) {
  return <Button {...props}>{props.children || 'Click me'}</Button>;
}
