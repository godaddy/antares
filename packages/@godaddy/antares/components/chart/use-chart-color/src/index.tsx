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

/** Legacy palette ids — figureColor0–8 (data visualization) order in legacy-tokens.css */
export const CHART_LEGACY_SERIES_COLORS = [
  'var(--ux-k4t5bc)',
  'var(--ux-yscvvt)',
  'var(--ux-3seoiy)',
  'var(--ux-ifyf3f)',
  'var(--ux-1c4rju4)',
  'var(--ux-1qsbael)',
  'var(--ux-vsd31q)',
  'var(--ux-1afwtm7)',
  'var(--ux-3uv4tc)'
] as const;

const CHART_COLOR_COUNT = CHART_LEGACY_SERIES_COLORS.length;
/**
 * Maps a chart position (series, slice, legend row) to the shared nine-color viz palette so strokes, fills, and swatches resolve through `--viz*` tokens.
 */
export function chartColorForIndex(index: number): string {
  return CHART_LEGACY_SERIES_COLORS[index % CHART_COLOR_COUNT] as string;
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
 * Returns `var(--ux-<id>)` for this component (legacy palette; no `variables.css` `--viz*`, no literal fallback).
 * The index is
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
