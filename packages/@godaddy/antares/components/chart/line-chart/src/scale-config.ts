import type { AxisScaleOutput } from '@visx/axis';
import type { ScaleConfig } from '@visx/scale';

/** Input for building a visx axis scale config. Caller owns the scale type union. */
interface ScaleConfigInput {
  type: string;
  domain?: (number | string | Date)[];
  paddingOuter?: number;
  nice?: boolean | number;
  zero?: boolean;
}

/**
 * Builds a visx ScaleConfig from LineChart axis props.
 * Omits optional fields when undefined so the scale uses its defaults.
 *
 * @param input - Axis scale options (type required; domain, paddingOuter, nice, zero optional)
 * @returns ScaleConfig suitable for XYChart xScale/yScale
 */
export function buildScaleConfig(input: ScaleConfigInput): ScaleConfig<AxisScaleOutput> {
  const { type, domain, paddingOuter, nice, zero } = input;

  return {
    type,
    ...(domain && { domain }),
    ...(paddingOuter !== undefined && { paddingOuter }),
    ...(nice !== undefined && { nice }),
    ...(zero !== undefined && { zero })
  } as ScaleConfig<AxisScaleOutput>;
}
