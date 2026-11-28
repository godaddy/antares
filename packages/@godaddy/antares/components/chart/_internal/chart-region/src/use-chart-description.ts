import { useCallback, useMemo, useState } from 'react';
import { useId } from 'react-aria';

export function useChartDescription(externalDescription?: string) {
  const id = useId();
  const [descriptionCount, setDescriptionCount] = useState(0);
  const ref = useCallback(function descriptionRef(element: HTMLElement | null) {
    setDescriptionCount((count) => count + (element ? 1 : -1));
  }, []);

  const descriptionSlot = useMemo(() => ({ id, ref }), [id, ref]);
  const describedBy = [externalDescription, descriptionCount > 0 ? id : undefined].filter(Boolean).join(' ');

  return { descriptionSlot, describedBy: describedBy || undefined };
}
