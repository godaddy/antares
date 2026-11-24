import { Heading } from '#components/heading';
import { Legend } from '../src/index.tsx';

/** @ignore */
export function LegendLabelledByExample() {
  return (
    <>
      <Heading id="legend-heading" level={3}>
        Quarterly revenue
      </Heading>
      <Legend
        aria-labelledby="legend-heading"
        series={[
          { id: 'q1', name: 'Q1' },
          { id: 'q2', name: 'Q2' }
        ]}
      />
    </>
  );
}
