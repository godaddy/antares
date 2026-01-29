/* v8 ignore next */
import React from 'react';
import { Divider } from '@bento/divider';

export function VerticalDiv() {
  return (
    <div style={{ height: '100px', display: 'flex', alignItems: 'center' }}>
      <Divider orientation="vertical" />
    </div>
  );
}
