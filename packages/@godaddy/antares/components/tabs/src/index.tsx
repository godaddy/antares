import { createContext, useContext } from 'react';
import {
  Tab as RACTab,
  TabList as RACTabList,
  TabPanel as RACTabPanel,
  TabPanels as RACTabPanels,
  Tabs as RACTabs,
  type TabListProps as RACTabListProps,
  type TabPanelProps as RACTabPanelProps,
  type TabPanelsProps as RACTabPanelsProps,
  type TabProps as RACTabProps,
  type TabsProps as RACTabsProps
} from 'react-aria-components';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import { Flex } from '#components/layout/flex';
import { composeClassName } from '../../../utils/render-props.ts';
import styles from './index.module.css';
import { useTabsOverflow } from './use-tabs-overflow.ts';

type TabsDesign = 'underline' | 'manila';

interface TabsAriaLabels {
  /** Accessible label for the previous-tab control. */
  previous: string;
  /** Accessible label for the next-tab control. */
  next: string;
}

interface TabsContextValue {
  readonly design: TabsDesign;
  readonly ariaLabels: TabsAriaLabels;
}

const TabsContext = createContext<TabsContextValue>({
  design: 'underline',
  ariaLabels: { previous: '', next: '' }
});

export interface TabsProps extends Omit<RACTabsProps, 'orientation'> {
  /** The visual treatment for the tab group. */
  design?: TabsDesign;

  /** Accessible labels for the automatic overflow controls. */
  ariaLabels: TabsAriaLabels;
}

export interface TabListProps<T> extends Omit<RACTabListProps<T>, 'orientation'> {}

export interface TabProps extends RACTabProps {}

export interface TabPanelsProps<T> extends Omit<RACTabPanelsProps<T>, 'className'> {
  className?: string;
}

export interface TabPanelProps extends RACTabPanelProps {}

function OverflowTabList<T>(props: TabListProps<T>) {
  const { className, ...rest } = props;
  const { ariaLabels } = useContext(TabsContext);
  const { contentRef, viewportRef, state, scrollPrevious, scrollNext } = useTabsOverflow();

  return (
    <div className={styles.listShell}>
      <div ref={viewportRef} className={styles.viewport}>
        <RACTabList ref={contentRef} {...rest} className={composeClassName(className, styles.list)} />
      </div>
      {state.hasOverflow ? (
        <Flex className={styles.controls}>
          <Button
            aria-label={ariaLabels.previous}
            isDisabled={!state.canScrollPrev}
            onPress={scrollPrevious}
            variant="minimal"
            size="md"
          >
            <Icon icon="chevron-left" />
          </Button>
          <Button
            aria-label={ariaLabels.next}
            isDisabled={!state.canScrollNext}
            onPress={scrollNext}
            variant="minimal"
            size="md"
          >
            <Icon icon="chevron-right" />
          </Button>
        </Flex>
      ) : null}
    </div>
  );
}

/**
 * Groups related tabs and their associated panels.
 *
 * Use Tabs for peer sections of content on the same page. For route navigation,
 * use the application's navigation component instead.
 *
 * @param props - The properties {@link TabsProps} passed to the component.
 * @example
 * ```tsx
 * <Tabs aria-label="Account settings">
 *   <TabList>
 *     <Tab id="account">Account</Tab>
 *     <Tab id="billing">Billing</Tab>
 *   </TabList>
 *   <TabPanels>
 *     <TabPanel id="account">Account settings</TabPanel>
 *     <TabPanel id="billing">Billing settings</TabPanel>
 *   </TabPanels>
 * </Tabs>
 * ```
 */
export function Tabs(props: TabsProps) {
  const { ariaLabels, design = 'underline', className, children, ...rest } = props;
  return (
    <TabsContext.Provider value={{ design, ariaLabels }}>
      <Flex
        {...rest}
        as={RACTabs}
        direction="column"
        orientation="horizontal"
        className={composeClassName(className, styles.tabs)}
        data-design={design}
      >
        {children}
      </Flex>
    </TabsContext.Provider>
  );
}

/**
 * Groups selectable tabs and adds automatic horizontal overflow controls.
 *
 * @param props - The properties {@link TabListProps} passed to the component.
 */
export function TabList<T>(props: TabListProps<T>) {
  return <OverflowTabList {...props} />;
}

/**
 * A selectable tab within a {@link TabList}.
 *
 * @param props - The properties {@link TabProps} passed to the component.
 */
export function Tab(props: TabProps) {
  const { className, ...rest } = props;
  const { design } = useContext(TabsContext);
  return <RACTab {...rest} className={composeClassName(className, styles.tab)} data-design={design} />;
}

/**
 * Groups the panels associated with a {@link TabList}.
 *
 * @param props - The properties {@link TabPanelsProps} passed to the component.
 */
export function TabPanels<T>(props: TabPanelsProps<T>) {
  const { className, ...rest } = props;
  const mergedClassName = composeClassName(className, styles.panels);
  return <RACTabPanels {...rest} className={typeof mergedClassName === 'string' ? mergedClassName : styles.panels} />;
}

/**
 * Displays the panel associated with the selected {@link Tab}.
 *
 * @param props - The properties {@link TabPanelProps} passed to the component.
 */
export function TabPanel(props: TabPanelProps) {
  const { className, ...rest } = props;
  return <RACTabPanel {...rest} className={composeClassName(className, styles.panel)} />;
}
