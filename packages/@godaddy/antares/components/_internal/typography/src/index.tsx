import { cx } from 'cva';
import { sizeScaleClassName, useDeclaredSize } from '#components/size-scope';
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

const SLOT_SIZE: Record<TypographySize, string> = {
  xs: styles.typeSlotXs,
  sm: styles.typeSlotSm,
  md: styles.typeSlotMd,
  lg: styles.typeSlotLg,
  xl: styles.typeSlotXl,
  '2xl': styles.typeSlot2xl
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

/** Classes for a text component: its role, the scope's size, and only the properties the caller set. */
export function useTypographyClassName(role: TypographyRole, { size, emphasis }: TypographyProps) {
  const scale = sizeScaleClassName(useDeclaredSize());
  return cx(styles.type, ROLE[role], scale, size && SIZE[size], emphasis && EMPHASIS[emphasis]);
}

/** A role's treatment, for an owner's part. */
export function roleClassName(role: Exclude<TypographyRole, 'text'>) {
  return ROLE[role];
}

/** The body treatment, for an owner's part. */
export const bodyPartClassName = styles.typeBody;

/** A part that takes its owner's typography, such as a control's label. */
export const inheritPartClassName = styles.typeInherit;

/** A part's tier on the ramp of the text that fills it. An explicit `size` still wins. */
export function slotSizeClassName(size: TypographySize) {
  return SLOT_SIZE[size];
}
