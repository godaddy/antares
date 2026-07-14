export interface WidgetProps {
  /** The visible label. */
  label: string;
  /** Click handler. */
  onPress?: () => void;
  /** Change handler. */
  onChange?: () => void;
  size?: 'sm' | 'lg';
}

export function Widget(_props: WidgetProps) {
  return null;
}
