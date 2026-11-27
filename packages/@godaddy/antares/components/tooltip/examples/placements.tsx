import { Button, Grid, Tooltip, TooltipTrigger } from '@godaddy/antares';

const placements = [
  'top left',
  'top',
  'top right',
  'bottom left',
  'bottom',
  'bottom right',
  'left top',
  'left',
  'left bottom',
  'right top',
  'right',
  'right bottom'
] as const;

/** @ignore */
export function PlacementsExample({ hideArrow }: { hideArrow: boolean }) {
  return (
    <Grid columns="repeat(3, 1fr)" gap="md" padding="2xl">
      {placements.map((placement) => (
        <Grid
          key={placement}
          columns="112px"
          rows="20px 116px"
          alignItems="center"
          justifyContent="center"
          justifyItems="stretch"
        >
          <code style={{ fontSize: 12, textAlign: 'center', whiteSpace: 'nowrap' }}>{placement}</code>
          <TooltipTrigger isOpen>
            <Button variant="primary">Hover me</Button>
            <Tooltip placement={placement} hideArrow={hideArrow}>
              Tooltip
            </Tooltip>
          </TooltipTrigger>
        </Grid>
      ))}
    </Grid>
  );
}
