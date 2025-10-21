/* v8 ignore next */
import React from 'react';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';

/**
 * Simple wrapper component
 */
/* v8 ignore next 4: This is being overridden in the below components so this is not run */
const Wrapper = withSlots('SlotsExampleMergedFunctionWrapper', function Wrapper(args: any) {
  const { props } = useProps(args);
  return <div {...props}>{props.children}</div>;
});

/**
 * Base component
 */
const BaseComponent = withSlots('SlotsExampleMergedFunctionBase', function BaseComponent(args: any) {
  const { props } = useProps(args);

  return (
    <Wrapper {...props} slot="container">
      Base Content
    </Wrapper>
  );
});

/**
 * First enhancement
 */
export const FirstEnhancement = withSlots('SlotsExampleMergedFunctionFirst', function FirstEnhancement(args: any) {
  const { props } = useProps(args);

  return (
    <BaseComponent
      {...props}
      slot="base-comp"
      slots={{
        container: function firstWrapper({ previous, original, props }: any) {
          return <div>First Enhancement</div>;
        }
      }}
    />
  );
});

/**
 * Second enhancement
 */
export const SecondEnhancement = withSlots('SlotsExampleMergedFunctionSecond', function SecondEnhancement(args: any) {
  const { props } = useProps(args);

  return (
    <FirstEnhancement
      {...props}
      slot="first-enh"
      slots={{
        'base-comp.container': function secondWrapper({ previous, original, props }: any) {
          return <div>Second Enhancement</div>;
        }
      }}
    />
  );
});

/**
 * Third enhancement
 */
export const ThirdEnhancement = withSlots('SlotsExampleMergedFunctionThird', function ThirdEnhancement(args: any) {
  const { props } = useProps(args);

  return (
    <SecondEnhancement
      {...props}
      slot="second-enh"
      slots={{
        'first-enh.base-comp.container': function thirdWrapper({ previous, original, props }: any) {
          return <div>Third Enhancement: {props.className}</div>;
        }
      }}
    />
  );
});

/**
 * Main export demonstrating function slot merging with "previous" array and order.
 */
export const MergedFunction = withSlots('SlotsExampleMergedFunctionExample', function MergedFunction() {
  return (
    <ThirdEnhancement
      className="merged-fn"
      slots={{
        'second-enh.first-enh.base-comp.container': function wrapper({ previous, original, props }: any) {
          return (
            <div>
              {previous[0]({ original, props })}
              {previous[1]({ original, props })}
              {previous[2]({ original, props })}
            </div>
          );
        }
      }}
    >
      Base Component
    </ThirdEnhancement>
  );
});
