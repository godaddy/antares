import { useCallback, useMemo, useRef, useState } from 'react';
import { useId } from 'react-aria';

export function useChartDescription(externalDescription?: string) {
  // React Aria retains a merged ID when the caller clears it. Keep the slot fallback independent of that merge.
  const id = useId() + '-description';
  const descriptions = useRef(new Set<HTMLElement>());
  const [descriptionId, setDescriptionId] = useState<string>();
  const ref = useCallback(function descriptionRef(element: HTMLElement | null) {
    if (!element) return;
    const mounted = descriptions.current;

    function syncDescriptionId() {
      setDescriptionId(mounted.values().next().value?.id);
    }

    mounted.add(element);
    const observer = new MutationObserver(syncDescriptionId);
    observer.observe(element, { attributes: true, attributeFilter: ['id'] });
    syncDescriptionId();

    return function untrackDescription() {
      observer.disconnect();
      mounted.delete(element);
      syncDescriptionId();
    };
  }, []);

  const descriptionSlot = useMemo(() => ({ id, ref }), [id, ref]);
  const describedBy = [externalDescription, descriptionId].filter(Boolean).join(' ');

  return { descriptionSlot, describedBy: describedBy || undefined };
}
