/* v8 ignore next */
import React from 'react';
import { Divider } from '@bento/divider';
import { withSlots } from '@bento/slots';

export const MergeClassName = withSlots('DividerClassNameOverrideExample', function MergeClassName() {
  return (
    <Divider
      orientation="vertical"
      className={function mergeClassNames({ original }: { original: string }) {
        return ['custom-divider-class', original].filter(Boolean).join(' ');
      }}
      style={{ height: '100px' }}
    />
  );
});
