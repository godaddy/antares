import { Tooltip, TooltipTrigger, Button, type TooltipTriggerProps, type TooltipProps } from '@godaddy/antares';
import type { CSSProperties } from 'react';

/**
 * Use it with `TooltipTrigger`, which wraps both the tooltip content and a focusable element such as a `Button`. The tooltip appears on hover and focus.
 * @order 1
 */
export function DefaultExample(props: {
  tooltipTriggerProps?: Partial<TooltipTriggerProps>;
  tooltipProps?: Partial<TooltipProps>;
}) {
  const { children = 'This is the tooltip content!', ...tooltipProps } = props.tooltipProps ?? {};

  return (
    <TooltipTrigger {...props.tooltipTriggerProps}>
      <Button variant="primary">Hover me</Button>
      <Tooltip style={{ '--size-space-020': '8px', '--size-space-050': '16px' } as CSSProperties} {...tooltipProps}>
        {children}
      </Tooltip>
    </TooltipTrigger>
  );
}
