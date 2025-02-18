import React, { useId, useMemo } from 'react';
import { Nested } from './nested.tsx';

//
// We define the slots object outside of the component scope to avoid
// introducing a new object reference on each render wich would cause
// the Nested component to re-render unnecessarily.
//
const slots = {
  'example-container.label': function example({ props }) {
    return (
      <label {...props}>
        <strong>{props.children}</strong>
      </label>
    );
  }
};

export function SlotFunction() {
  return <Nested slots={slots} />;
}
