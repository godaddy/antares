import { BentoError, type BentoErrorArgs } from '@bento/error';
import React, { useCallback, type JSX } from 'react';

/**
 * Throws component renders a button that logs a BentoError to the console when clicked.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} A button element that triggers the createError function on click.
 *
 * @example
 * <Throws message={value} method="example" name="error" />
 *
 * @component
 */
export function Throws(props: BentoErrorArgs): JSX.Element {
  //
  // We're using useCallback here to prevent the function from being recreated
  // on every render as it's passed as a prop to the button component.
  //
  const createError = useCallback(
    function createError() {
      console.error(new BentoError(props));
    },
    [props]
  );

  return <button onClick={createError}>Log bento error in console</button>;
}
