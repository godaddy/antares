import { useCallback, useMemo, useState } from 'react';
import { useId } from 'react-aria';

/** Links a mounted description slot to the chart's accessible graphic. */
export function useChartDescription(externalDescription?: string) {
  // React Aria tracks an explicit slot ID through the TextContext ID merge.
  const descriptionId = useId();
  const [hasDescription, setHasDescription] = useState(false);
  const descriptionRef = useCallback(function descriptionRef(element: HTMLElement | null) {
    setHasDescription(element !== null);
  }, []);
  const descriptionSlot = useMemo(
    function createDescriptionSlot() {
      return { id: descriptionId, ref: descriptionRef };
    },
    [descriptionId, descriptionRef]
  );
  const describedBy = [externalDescription, hasDescription ? descriptionId : undefined].filter(Boolean).join(' ');

  return { descriptionSlot, describedBy: describedBy || undefined };
}
