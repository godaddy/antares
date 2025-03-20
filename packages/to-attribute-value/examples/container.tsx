import { stringify } from '@bento/to-attribute-value';
import { withSlots } from '@bento/slots';
import React, { useState } from 'react';

export const Container = withSlots('MyAsAttributeValueContainer', function Containers(props: Record<string, any>) {
  const content = Object.keys(props)
    .map(function createContent(key) {
      return `prop "${key}" is formatted as "${stringify(props[key])}"`;
    })
    .join('\n');

  return <pre>{content}</pre>;
});
