import { createContext, useContext } from 'react';
import { cx } from 'cva';
import { useSize } from '#components/size-provider';
import styles from './index.module.css';

export type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

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
  /** Typography tier. Defaults to the owning part, then the interface size. */
  size?: TypographySize;

  /** Feedback color. Inherits surrounding color when omitted. */
  emphasis?: TypographyEmphasis;
}

type TypographyRole = 'body' | 'detail' | 'heading' | 'label';

interface Treatment extends TypographyProps {
  role?: TypographyRole;
  inherit?: boolean;
  className?: string;
}

type Treatments = Partial<Record<TypographyRole, Treatment>>;

interface TypographyDefaults {
  defaults?: Treatments;
  slots?: Record<string, Treatments>;
}

/** Presentation only. React Aria continues to own semantic and accessibility contexts. */
export const TypographyContext = createContext<TypographyDefaults>({});

export const inheritedText = { defaults: { body: { inherit: true } } } satisfies TypographyDefaults;

export function typographyClassName(role: TypographyRole, size: TypographySize) {
  return cx(styles.typography, styles[role], styles[size]);
}

export function useTypography(role: TypographyRole, props: TypographyProps & { slot?: string | null }) {
  const context = useContext(TypographyContext);
  const interfaceSize = useSize();
  const treatment =
    props.slot === null ? undefined : (context.slots?.[props.slot ?? '']?.[role] ?? context.defaults?.[role]);
  const size = props.size ?? treatment?.size ?? interfaceSize;
  const emphasis = props.emphasis ?? treatment?.emphasis;

  return cx(
    typographyClassName(treatment?.role ?? role, size),
    treatment?.className,
    treatment?.inherit && styles.inherit,
    props.size && styles.explicitSize,
    emphasis && styles[emphasis]
  );
}
