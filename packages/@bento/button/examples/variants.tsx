/* v8 ignore next */
import React, { type ComponentProps } from 'react';
import { Button } from '@bento/button';

export function ButtonVariantsExample(args: Partial<ComponentProps<typeof Button>>) {
  const { children = 'Click me!' } = args;

  return <Button {...args}>{children}</Button>;
}
