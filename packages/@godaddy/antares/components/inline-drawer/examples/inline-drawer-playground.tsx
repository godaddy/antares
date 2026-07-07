import {
  InlineDrawer,
  InlineDrawerPanel,
  Button,
  Box,
  Text,
  type InlineDrawerPlacement
} from '@godaddy/antares';

export interface PlaygroundExampleProps {
  placement?: InlineDrawerPlacement;
  animate?: boolean;
  isDisabled?: boolean;
}

export function PlaygroundExample({ placement, animate, isDisabled }: PlaygroundExampleProps) {
  return (
    <InlineDrawer placement={placement} animate={animate} isDisabled={isDisabled}>
      <Button slot="trigger">Toggle panel</Button>
      <InlineDrawerPanel>
        <Box padding="md">
          <Text>Playground content.</Text>
        </Box>
      </InlineDrawerPanel>
    </InlineDrawer>
  );
}
