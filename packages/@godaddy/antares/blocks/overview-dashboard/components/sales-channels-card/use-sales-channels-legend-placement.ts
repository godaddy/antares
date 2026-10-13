import { useEffect, useRef, useState } from 'react';

const salesChannelsRightLegendMinWidth = 22 * 16;

/** Chooses the chart legend direction from the available sales card width. */
export function useSalesChannelsLegendPlacement() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [legendPlacement, setLegendPlacement] = useState<'bottom' | 'right'>('bottom');

  useEffect(function observeSalesCardWidth() {
    const card = cardRef.current;
    if (!card) {
      return undefined;
    }
    const observedCard = card;

    function syncLegendPlacement() {
      const nextPlacement =
        observedCard.getBoundingClientRect().width >= salesChannelsRightLegendMinWidth ? 'right' : 'bottom';
      setLegendPlacement(function preserveStablePlacement(currentPlacement) {
        return currentPlacement === nextPlacement ? currentPlacement : nextPlacement;
      });
    }

    syncLegendPlacement();
    const observer = new ResizeObserver(syncLegendPlacement);
    observer.observe(observedCard);

    return function disconnectSalesCardObserver() {
      observer.disconnect();
    };
  }, []);

  return { cardRef, legendPlacement };
}
