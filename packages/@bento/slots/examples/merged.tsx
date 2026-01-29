/* v8 ignore next */
import React from 'react';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';

/* v8 ignore next 3: This slot will be replaced with the one in Merged and won't run */
function betterSummarySlot(props: any) {
  return <span>Better summary</span>;
}

const bestSummarySlot = { className: 'best-summary-class', id: 'best-summary' };

/**
 * Label component for the slots example.
 */
const Label = withSlots('SlotsExampleMergedLabel', function Label(args: Record<string, any>) {
  const { props } = useProps(args);
  return <label {...props}>{props.children}</label>;
});

/**
 * Description component that uses the Label component.
 */
const Description = withSlots('SlotsExampleMergedDescription', function Description(args: any) {
  const { props } = useProps(args);

  return (
    <p {...props}>
      <span>Description: </span>
      <Label slot="label" />
      <Label slot="summary" />
      <Label slot="error" />
      {props.children}
    </p>
  );
});

/**
 * Component that uses the Description component and overrides the label slot.
 */
const BetterDescription = withSlots('SlotsExampleMergedBetterDesc', function BetterDesc(args: any) {
  const { props } = useProps(args);

  return (
    <Description
      {...props}
      slot="description"
      slots={{
        label: { className: 'better-class', title: 'better-title' },
        summary: betterSummarySlot,
        error: function betterError() {
          return <span>Better error</span>;
        }
      }}
    />
  );
});

const BestDescription = withSlots('SlotsExampleMergedImprovedDesc', function ImprovedDesc(args: any) {
  const { props } = useProps(args);

  return (
    <BetterDescription
      {...props}
      slot="better-desc"
      slots={{
        'description.label': { className: 'best-class', id: 'best' },
        'description.summary': bestSummarySlot
      }}
    />
  );
});

/**
 * Component that uses the `BetterDescription` and expects the label slot to be
 * merged with the one from `BetterDescription`.
 */
export const Merged = withSlots('SlotsExampleMerged', function Merged() {
  return (
    <BestDescription
      slots={{
        'better-desc.description.label': { className: 'merged-class', id: 'merged' },
        'better-desc.description.summary': function mergedSummary({ previous }: any) {
          /* v8 ignore next 3: these should not throw */
          if (previous.length !== 2) throw new Error('previous should be an array with 2 slots');
          if (previous[0] !== betterSummarySlot) throw new Error('first slot should be the betterSummarySlot');
          if (previous[1] !== bestSummarySlot) throw new Error('second slot should be bestSummarySlot');

          return <span>Merged summary</span>;
        }
      }}
    >
      Expect class "merged-class", id "merged" and title "better-title".
    </BestDescription>
  );
});
