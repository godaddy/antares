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
  shouldDismissOnBlur?: boolean;
}

export function PlaygroundExample({ placement, animate, shouldDismissOnBlur }: PlaygroundExampleProps) {
  return (
    <InlineDrawer placement={placement} animate={animate} shouldDismissOnBlur={shouldDismissOnBlur}>
      <InlineDrawerTrigger>Toggle panel</InlineDrawerTrigger>
      <InlineDrawerPanel>
        <Text>Playground content. Adjust props in the controls panel.</Text>
      </InlineDrawerPanel>
    </InlineDrawer>
  );
}
