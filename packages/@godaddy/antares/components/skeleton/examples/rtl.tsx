import { Box } from '@godaddy/antares';
import { TextBlockExample } from './text-block.tsx';

/**
 * Skeleton follows the `dir` of the page or a parent element. In right-to-left layouts, bars align
 * to the right and the shimmer moves from right to left.
 * @title RTL direction
 * @order 11
 */
export function RTLExample() {
  return (
    <Box dir="rtl">
      <TextBlockExample />
    </Box>
  );
}
