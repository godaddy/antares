import { createContext, forwardRef, type AriaRole, type AriaAttributes } from 'react';
import {
  DisclosureGroup as RACDisclosureGroup,
  useContextProps,
  type ContextValue,
  type DisclosureGroupProps as RACDisclosureGroupProps
} from 'react-aria-components';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

/** Related collapsible sections with React Aria's expansion and interaction props. */
export interface AccordionProps
  extends RACDisclosureGroupProps,
    Pick<AriaAttributes, 'aria-label' | 'aria-labelledby'> {
  /** Optional container role. Pair role="group" with an accessible label to name related sections. */
  role?: AriaRole;
}

/** Supplies optional Accordion defaults and a ref; local props take precedence. */
export const AccordionContext = createContext<ContextValue<AccordionProps, HTMLDivElement>>(null);

/**
 * Groups related sections with single or multiple expansion.
 * Set allowsMultipleExpanded to keep several sections open; React Aria defaults to one.
 * Give each child a stable ID matching the keys used to control expansion.
 *
 * @param props - React Aria group state, accessible label, and composed collapsibles.
 * @example
 * <Accordion allowsMultipleExpanded defaultExpandedKeys={['shipping', 'returns']}>
 *   <Collapsible id="shipping">
 *     <Heading>
 *       <Button slot="trigger">
 *         <Text>Shipping</Text>
 *         <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
 *       </Button>
 *     </Heading>
 *     <CollapsiblePanel>Ships within two business days.</CollapsiblePanel>
 *   </Collapsible>
 *   <Collapsible id="returns">
 *     <Heading>
 *       <Button slot="trigger">
 *         <Text>Returns</Text>
 *         <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
 *       </Button>
 *     </Heading>
 *     <CollapsiblePanel>Return eligible items within thirty days.</CollapsiblePanel>
 *   </Collapsible>
 * </Accordion>
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(props, ref) {
  [props, ref] = useContextProps(props, ref, AccordionContext);
  const { className, role, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, render, ...rest } = props;

  return (
    <RACDisclosureGroup
      {...rest}
      ref={ref}
      className={composeClassName(className, styles.accordion)}
      render={function renderGroup(domProps, state) {
        // DisclosureGroup filters naming props; preserve them on the same primary surface.
        const surfaceProps = { ...domProps, role, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy };
        return render ? render(surfaceProps, state) : <div {...surfaceProps} />;
      }}
    />
  );
});
