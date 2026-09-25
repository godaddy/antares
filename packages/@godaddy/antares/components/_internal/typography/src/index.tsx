import { cx } from 'cva';
import { sizeScaleClassName, useDeclaredSize } from '#components/size-provider';
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
export function useTypographyClassName(role: TypographyRole, { size, emphasis }: TypographyProps = {}) {
  const scale = sizeScaleClassName(useDeclaredSize());
  return cx(styles.type, ROLE[role], scale, size && SIZE[size], emphasis && EMPHASIS[emphasis]);
}

type PartTreatment = 'body' | 'detail' | 'inherit';

const PART: Record<PartTreatment, string> = {
  body: styles.typeBody,
  detail: styles.typeDetail,
  inherit: styles.typeInherit
};

/**
 * An owner's treatment for one of its parts, whichever text component fills it. `inherit` takes the
 * owner's own type, as a control's label does.
 */
export function partClassName(treatment: PartTreatment) {
  return PART[treatment];
}

/** A part's tier on the ramp of the text that fills it. An explicit `size` still wins. */
export function slotSizeClassName(size: TypographySize) {
  return SLOT_SIZE[size];
}
