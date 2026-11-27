import { useCallback, useEffect, useId, useMemo, useState } from 'react';

/** Links the chart to its description on the server and drops an unused reference after mounting. */
export function useChartDescription(hasChildren: boolean, externalDescription?: string) {
  const id = useId();
  const [hasDescription, setHasDescription] = useState<boolean>();
  const ref = useCallback(function descriptionRef(element: HTMLElement | null) {
    setHasDescription(element !== null);
  }, []);

  useEffect(function clearUnusedDescription() {
    setHasDescription((current) => current ?? false);
  }, []);

  const descriptionSlot = useMemo(() => ({ id, ref }), [id, ref]);
  const describedBy = [externalDescription, (hasDescription ?? hasChildren) ? id : undefined].filter(Boolean).join(' ');

  return { descriptionSlot, describedBy: describedBy || undefined };
}
