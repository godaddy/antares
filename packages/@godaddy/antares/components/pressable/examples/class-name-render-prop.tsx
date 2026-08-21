import { Pressable, ProgressBar } from '@godaddy/antares';
import { useState } from 'react';

/**
 * Verify that Pressable composes an Antares ProgressBar className render prop
 * and changes its size on each press.
 * @ignore
 */
export function ClassNameRenderPropExample() {
  const sizes = ['xs', 'sm', 'md'] as const;
  const [sizeIndex, setSizeIndex] = useState(0);

  return (
    <Pressable
      onPress={function changeSize() {
        setSizeIndex(function nextSizeIndex(index) {
          return (index + 1) % sizes.length;
        });
      }}
    >
      <ProgressBar
        aria-label="Change progress size"
        value={60}
        size={sizes[sizeIndex]}
        className={function getClassName({ percentage }) {
          return `size-${sizes[sizeIndex]}-class-${percentage}`;
        }}
      />
    </Pressable>
  );
}
