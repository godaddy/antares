import {
  InlineDrawer,
  InlineDrawerTrigger,
  InlineDrawerPanel,
  Text,
  type InlineDrawerPlacement
} from '@godaddy/antares';

export interface PlaygroundExampleProps {
  placement?: InlineDrawerPlacement;
  animate?: boolean;
  minSize?: number | string;
  maxSize?: number | string;
  isDisabled?: boolean;
}

export function PlaygroundExample({ placement, animate, minSize, maxSize, isDisabled }: PlaygroundExampleProps) {
  return (
    <InlineDrawer placement={placement} animate={animate} minSize={minSize} maxSize={maxSize} isDisabled={isDisabled}>
      <InlineDrawerTrigger>Toggle panel</InlineDrawerTrigger>
      <InlineDrawerPanel>
        <Text>Playground content. Adjust props in the controls panel.</Text>
      </InlineDrawerPanel>
    </InlineDrawer>
  );
}
