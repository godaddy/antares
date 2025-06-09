import { useSVGSprite } from '@bento/use-svg-sprite';
import React from 'react';

export function BasicUsage() {
  const Icon = useSVGSprite(
    'check',
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );

  return <div>{Icon}</div>;
}
