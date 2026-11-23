import { createContext, forwardRef, type ReactNode } from 'react';
import { DEFAULT_SLOT, useContextProps, type ContextValue } from 'react-aria-components';
import { textTreatmentClassName } from '#components/_internal/typography';
import { Flex, type FlexProps } from '#components/layout/flex';
import { TextContext } from '#components/text';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export interface DonutChartCenterProps extends Omit<FlexProps<'div'>, 'as'> {
  /** Content centered in the ring. Use the `value` and `description` slots for the default text styles. */
  children?: ReactNode;
}

export const DonutChartCenterContext =
  /* @__PURE__ */ createContext<ContextValue<DonutChartCenterProps, HTMLDivElement>>(null);

/** Positions content inside a donut ring. */
export const DonutChartCenter = /* @__PURE__ */ forwardRef<HTMLDivElement, DonutChartCenterProps>(
  function DonutChartCenter(props, ref) {
    const [{ children, ...rest }, centerRef] = useContextProps(props, ref, DonutChartCenterContext);
    const textSlots = {
      [DEFAULT_SLOT]: {},
      value: { className: composeClassName(undefined, styles.value, textTreatmentClassName('inherit')) },
      description: { className: composeClassName(undefined, styles.description, textTreatmentClassName('inherit')) }
    };
    return (
      <Flex alignItems="center" justifyContent="center" direction="column" {...rest} ref={centerRef}>
        <TextContext.Provider value={{ slots: textSlots }}>{children}</TextContext.Provider>
      </Flex>
    );
  }
);
