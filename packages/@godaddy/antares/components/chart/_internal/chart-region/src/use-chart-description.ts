import { Children, Fragment, isValidElement, useCallback, useId, useMemo, useRef, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { Detail, Text } from '#components/text';

interface PartProps {
  children?: ReactNode;
  id?: string;
  slot?: string | null;
}

function findPart(
  children: ReactNode,
  matches: (part: ReactElement<PartProps>) => boolean
): ReactElement<PartProps> | undefined {
  for (const child of Children.toArray(children)) {
    if (!isValidElement<PartProps>(child)) continue;
    if (matches(child)) return child;
    if (child.type === Fragment || typeof child.type === 'string') {
      const part = findPart(child.props.children, matches);
      if (part) return part;
    }
  }
  return undefined;
}

/** Links the chart's graphic to the description slot before and after hydration. */
export function useChartDescription(
  children: ReactNode,
  centerType: ReactElement['type'],
  externalDescription?: string
) {
  // React Aria's useId can adopt a slot's explicit ID. React's ID stays independent.
  const fallbackId = useId();
  const [committedId, setCommittedId] = useState<string | null>();
  const observer = useRef<MutationObserver | null>(null);
  const descriptionRef = useCallback(function descriptionRef(element: HTMLElement | null) {
    observer.current?.disconnect();
    observer.current = null;
    if (!element) {
      setCommittedId(null);
      return;
    }
    const readId = () => setCommittedId(element.id || null);
    readId();
    observer.current = new MutationObserver(readId);
    observer.current.observe(element, { attributes: true, attributeFilter: ['id'] });
  }, []);
  const descriptionSlot = useMemo(
    function createDescriptionSlot() {
      return { id: fallbackId, ref: descriptionRef };
    },
    [fallbackId, descriptionRef]
  );

  // The server can inspect composed Text elements. Opaque components register through the ref after mounting.
  let slotId = committedId;
  if (slotId === undefined) {
    const center = findPart(children, (child) => child.type === centerType);
    const slot = findPart(
      center?.props.children,
      ({ type, props }) => (type === Text || type === Detail) && props.slot === 'description'
    );
    slotId = slot ? (slot.props.id ?? fallbackId) : null;
  }
  const describedBy = [externalDescription, slotId].filter(Boolean).join(' ');

  return { descriptionSlot, describedBy: describedBy || undefined };
}
