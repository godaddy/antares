import { createContext, useContext, type ReactNode } from 'react';
import { DEFAULT_SLOT, useContextProps, type ContextValue } from 'react-aria-components';
import { textTreatmentClassName } from '#components/_internal/typography';
import { Flex, type FlexProps } from '#components/layout/flex';
import { TextContext } from '#components/text';
import { composeClassName } from '#utils/render-props.ts';
import { DonutChartCenterLayoutContext } from './donut-chart-context.ts';
import styles from './index.module.css';

export interface DonutChartCenterProps extends Omit<FlexProps<'div'>, 'as'> {
  /** Content centered in the ring. Use the `value` and `description` slots for the default text styles. */
  children?: ReactNode;
}

export const DonutChartCenterContext = createContext<ContextValue<DonutChartCenterProps, HTMLDivElement>>(null);

/** Positions content inside a donut ring. */
export function DonutChartCenter(props: DonutChartCenterProps) {
  const [{ children, className, ...rest }] = useContextProps(props, null, DonutChartCenterContext);
  const layoutClassName = useContext(DonutChartCenterLayoutContext);
  const textSlots = {
    [DEFAULT_SLOT]: {},
    value: { className: composeClassName(undefined, styles.value, textTreatmentClassName('inherit')) },
    description: { className: composeClassName(undefined, styles.description, textTreatmentClassName('inherit')) }
  };
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      {...rest}
      className={composeClassName(className, layoutClassName)}
    >
      <TextContext.Provider value={{ slots: textSlots }}>{children}</TextContext.Provider>
    </Flex>
  );
}
