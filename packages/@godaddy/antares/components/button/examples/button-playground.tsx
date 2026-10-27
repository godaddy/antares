import { Button, type ButtonProps } from '@godaddy/antares';

/** Props for the button playground example. */
export interface PlaygroundExampleProps extends Pick<ButtonProps, 'variant' | 'size' | 'isDisabled' | 'isSelected'> {
  /** Button label text. */
  children?: string;
}

export function PlaygroundExample({
  variant = 'primary',
  size = 'md',
  isDisabled = false,
  isSelected,
  children = 'Button'
}: PlaygroundExampleProps) {
  return (
    <Button variant={variant} size={size} isDisabled={isDisabled} isSelected={isSelected}>
      {children}
    </Button>
  );
}
