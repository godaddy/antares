import React, { useCallback } from 'react';
import { Button } from './button.tsx';

/**
 * Memo component demonstrating class name composition with useCallback.
 *
 * @param {Record<string, unknown>} props - The component props.
 * @returns {JSX.Element} The rendered button with composed class names.
 * @public
 */
export function Memo(props: Record<string, unknown>) {
  const className = useCallback(
    function renderProps({ original }: { original: string }) {
      return [original, 'my-className', props.className].filter(Boolean).join(' ');
    },
    [props.className]
  );

  return (
    <Button className={className} as="a" href="https://example.com" target="_blank">
      This button has a different class Name
    </Button>
  );
}
