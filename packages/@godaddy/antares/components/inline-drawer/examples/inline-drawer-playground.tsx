import {
  InlineDrawer,
  InlineDrawerTrigger,
  InlineDrawerPanel,
  Box,
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
        <Box padding="md" style={{ inlineSize: 220, whiteSpace: 'nowrap' }}>
          <Text>Playground content.</Text>
        </Box>
      </InlineDrawerPanel>
    </InlineDrawer>
  );
}
