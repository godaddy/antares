import { cx } from 'cva';
import styles from './index.module.css';

/** A step on a text component's own ramp. */
export type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Feedback color for text. */
export type TypographyEmphasis =
  | 'critical'
  | 'warning'
  | 'success'
  | 'info'
  | 'highlight'
  | 'premium'
  | 'internal'
  | 'neutral'
  | 'passive';

export interface TypographyProps {
  /** Step on the component's ramp. Follows the size scope when omitted. */
  size?: TypographySize;

  /** Feedback color. Inherits the surrounding color when omitted. */
  emphasis?: TypographyEmphasis;
}

type TypographyRole = 'text' | 'detail' | 'heading' | 'label';

const ROLE: Record<TypographyRole, string> = {
  text: styles.typeText,
  detail: styles.typeDetail,
  heading: styles.typeHeading,
  label: styles.typeLabel
};

const SIZE: Record<TypographySize, string> = {
  xs: styles.typeXs,
  sm: styles.typeSm,
  md: styles.typeMd,
  lg: styles.typeLg,
  xl: styles.typeXl,
  '2xl': styles.type2xl
};

const EMPHASIS: Record<TypographyEmphasis, string> = {
  critical: styles.typeCritical,
  warning: styles.typeWarning,
  success: styles.typeSuccess,
  info: styles.typeInfo,
  highlight: styles.typeHighlight,
  premium: styles.typePremium,
  internal: styles.typeInternal,
  neutral: styles.typeNeutral,
  passive: styles.typePassive
};

/** Classes for a text component: its role, plus only the properties the caller set. */
export function typographyClassName(role: TypographyRole, { size, emphasis }: TypographyProps) {
  return cx(styles.type, ROLE[role], size && SIZE[size], emphasis && EMPHASIS[emphasis]);
}

/**
 * The treatment of a role, for an owner's part. On a `Text` it replaces the body treatment it
 * would otherwise inherit, including the ramp an explicit `size` reads.
 */
export function roleClassName(role: Exclude<TypographyRole, 'text'>) {
  return ROLE[role];
}

/** Body typography for a scope's own element, which bare text inside it inherits. */
export const surfaceClassName = styles.typeSurface;
