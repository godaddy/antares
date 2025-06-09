import { useSVGSprite } from '@bento/use-svg-sprite';
import React from 'react';

export function MultipleIcons() {
  const Check = useSVGSprite(
    'check',
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <path d="M5 13l4 4L19 7" stroke="green" strokeWidth="2" fill="none" />
    </svg>
  );

  const Alert = useSVGSprite(
    'alert',
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="12" r="10" stroke="red" strokeWidth="2" fill="none" />
      <line x1="12" y1="8" x2="12" y2="12" stroke="red" strokeWidth="2" />
      <circle cx="12" cy="16" r="1" fill="red" />
    </svg>
  );

  return (
    <div>
      {Check}
      {Alert}
    </div>
  );
}
