import {
  InlineDrawer,
  InlineDrawerTrigger,
  InlineDrawerPanel,
  Flex,
  Box,
  Text,
  type InlineDrawerPlacement
} from '@godaddy/antares';

const PLACEMENTS: InlineDrawerPlacement[] = ['top', 'bottom', 'left', 'right'];

export function PlacementsExample() {
  return (
    <Flex direction="column" gap="md" style={{ maxInlineSize: 360 }}>
      {PLACEMENTS.map(function renderOne(placement) {
        return (
          <InlineDrawer key={placement} placement={placement} defaultExpanded minSize={44} maxSize={160}>
            <InlineDrawerTrigger>{placement}</InlineDrawerTrigger>
            <InlineDrawerPanel>
              {/* nowrap + border so horizontal (left/right) collapse clips cleanly
                  and vertical (top/bottom) collapse reveals by height. */}
              <Box padding="sm" style={{ whiteSpace: 'nowrap', border: '1px solid var(--bd-base)' }}>
                <Text>{placement} axis</Text>
              </Box>
            </InlineDrawerPanel>
          </InlineDrawer>
        );
      })}
    </Flex>
  );
}
