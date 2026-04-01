import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react';

const canUseDOM = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

const CHART_COLOR_COUNT = 9;
const VARIABLE_PREFIX = '--viz';

function chartColorForIndex(index: number): string {
  return `var(${VARIABLE_PREFIX}${(index % CHART_COLOR_COUNT) + 1})`;
}

interface ChartColorContextValue {
  register: () => number;
  unregister: (index: number) => void;
}

const ChartColorContext = createContext<ChartColorContextValue | null>(null);

/**
 * Props for ChartColorProvider.
 * @public Used by component docs (ArgTypes in README.mdx); fumadocs resolves by name.
 */
export interface ChartColorProviderProps {
  children: ReactNode;
}

export function ChartColorProvider(props: ChartColorProviderProps) {
  const { children } = props;
  const nextIndexRef = useRef(0);
  const freedRef = useRef<Set<number>>(new Set());

  const register = useCallback(function registerConsumer(): number {
    const freed = freedRef.current;
    if (freed.size > 0) {
      const index = Math.min(...freed);
      freed.delete(index);
      return index;
    }
    const index = nextIndexRef.current;
    nextIndexRef.current += 1;
    return index;
  }, []);

  const unregister = useCallback(function unregisterConsumer(index: number): void {
    freedRef.current.add(index);
  }, []);

  function getContextValue(): ChartColorContextValue {
    return { register, unregister };
  }
  const value = useMemo(getContextValue, [register, unregister]);

  return <ChartColorContext.Provider value={value}>{children}</ChartColorContext.Provider>;
}

/**
 * Returns the chart color CSS variable for this component. The index is
 * assigned when the component mounts (in an effect), so allocation is safe
 * under React concurrent rendering and StrictMode. Same component instance
 * always receives the same color. Wrap the tree with ChartColorProvider.
 */
export function useChartColor(): string {
  const ctx = useContext(ChartColorContext);
  const [index, setIndex] = useState<number | null>(null);

  if (!ctx) {
    throw new Error('useChartColor must be used within ChartColorProvider');
  }

  const { register, unregister } = ctx;

  useIsomorphicLayoutEffect(
    function allocateIndex() {
      const i = register();
      setIndex(i);
      return function cleanup() {
        unregister(i);
      };
    },
    [register, unregister]
  );

  return chartColorForIndex(index ?? 0);
}
