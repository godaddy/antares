import { stringify } from '@bento/to-attribute-value';
import { withSlots } from '@bento/slots';
/* c8 ignore next */
import React from 'react';

interface Example {
  [key: string]: any;
}

/**
 * Container component demonstrating attribute value stringification.
 *
 * @param {Record<string, any>} props - The component props to be stringified.
 * @returns {JSX.Element} The rendered pre element with stringified props.
 * @public
 */
export const Container: React.FC<Example> = withSlots(
  'MyAsAttributeValueContainer',
  function Containers(props: Record<string, any>) {
    const content = Object.keys(props)
      .map(function createContent(key) {
        return `prop "${key}" is formatted as "${stringify(props[key])}"`;
      })
      .join('\n');

    return <pre>{content}</pre>;
  }
);
