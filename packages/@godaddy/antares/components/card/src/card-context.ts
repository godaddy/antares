import { createContext } from 'react';
import type { LinkProps } from '#components/link';

export interface CardContextValue {
  href?: LinkProps['href'];
  onPress?: LinkProps['onPress'];
  ariaLabel?: string;
  ariaLabelledBy?: string;
  isDisabled?: boolean;
}

export const CardContext = createContext<CardContextValue | null>(null);
