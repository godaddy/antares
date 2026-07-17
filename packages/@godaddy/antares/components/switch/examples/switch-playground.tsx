import { Switch } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  children?: string;
  size?: 'sm' | 'md';
  labelPosition?: 'start' | 'end';
  isSelected?: boolean;
  isDisabled?: boolean;
}

export function PlaygroundExample({
  children = 'Wi-Fi',
  size = 'md',
  labelPosition = 'start',
  isSelected = false,
  isDisabled = false
}: PlaygroundExampleProps) {
  return (
    <Switch size={size} labelPosition={labelPosition} isSelected={isSelected} isDisabled={isDisabled}>
      {children}
    </Switch>
  );
}
