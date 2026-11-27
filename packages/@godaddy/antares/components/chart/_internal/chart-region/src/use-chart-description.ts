import { useCallback, useEffect, useId, useMemo, useState } from 'react';

/** Links the chart to its description on the server and drops an unused reference after mounting. */
export function useChartDescription(hasChildren: boolean, externalDescription?: string) {
  const id = useId();
  const [descriptionCount, setDescriptionCount] = useState<number>();
  const ref = useCallback(function descriptionRef(element: HTMLElement | null) {
    setDescriptionCount((count) => (count ?? 0) + (element ? 1 : -1));
  }, []);

  useEffect(function clearUnusedDescription() {
    setDescriptionCount((count) => count ?? 0);
  }, []);

  const descriptionSlot = useMemo(() => ({ id, ref }), [id, ref]);
  const hasDescription = descriptionCount === undefined ? hasChildren : descriptionCount > 0;
  const describedBy = [externalDescription, hasDescription ? id : undefined].filter(Boolean).join(' ');

  return { descriptionSlot, describedBy: describedBy || undefined };
}
