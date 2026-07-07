import {
  InlineDrawer,
  InlineDrawerTrigger,
  InlineDrawerPanel,
  Flex,
  Box,
  Text,
  type InlineDrawerPlacement
} from '@godaddy/antares';

const BG: Record<InlineDrawerPlacement, string> = {
  left: '#eef2ff',
  right: '#ecfdf5',
  top: '#fef3c7',
  bottom: '#fde2e4'
};

const PLACEMENTS: InlineDrawerPlacement[] = ['left', 'right', 'top', 'bottom'];

export function PlacementsExample() {
  return (
    <Flex direction="column" gap="md" style={{ maxInlineSize: 360 }}>
      {PLACEMENTS.map(function renderOne(placement) {
        return (
          <InlineDrawer key={placement} placement={placement} defaultExpanded minSize={40} maxSize={160}>
            <InlineDrawerTrigger>{placement}</InlineDrawerTrigger>
            <InlineDrawerPanel>
              <Box padding="sm" style={{ background: BG[placement] }}>
                <Text>Collapses along the {placement} axis.</Text>
              </Box>
            </InlineDrawerPanel>
          </InlineDrawer>
        );
      })}
    </Flex>
  );
}
