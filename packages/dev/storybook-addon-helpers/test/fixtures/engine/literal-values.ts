export type Emphasis = 'error' | 'message';
export type ExtendedEmphasis = Emphasis | 'success';

export interface LiteralBaseProps {
  emphasis?: ExtendedEmphasis;
}
