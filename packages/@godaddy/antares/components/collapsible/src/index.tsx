import { forwardRef, type ReactNode } from 'react';
import {
  DEFAULT_SLOT,
  Disclosure as RACDisclosure,
  DisclosureContext as RACDisclosureContext,
  DisclosurePanel as RACDisclosurePanel,
  DisclosureGroupStateContext as RACDisclosureGroupStateContext,
  Provider as RACProvider,
  composeRenderProps,
  useSlottedContext,
  type DisclosureProps as RACDisclosureProps,
  type DisclosurePanelProps as RACDisclosurePanelProps
} from 'react-aria-components';
import { mergeProps } from 'react-aria';
import { ButtonContext, type ButtonProps } from '#components/button';
import { HeadingContext } from '#components/heading';
import { IconContext } from '#components/icon';
import { TextContext } from '#components/text';
import { Box, type BoxOwnProps } from '#components/layout/box';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

/** Props for one section, used independently or inside an Accordion. */
export interface CollapsibleProps extends RACDisclosureProps {}

/** RAC's disclosure defaults context, shared with integrations using React Aria. */
export const CollapsibleContext = RACDisclosureContext;

interface CollapsibleBodyProps {
  /** Consumer composition, already resolved from Disclosure's render props. */
  children: ReactNode;
}

/**
 * Adds presentation to RAC's trigger slot and retains the empty default button slot.
 * Must render below Disclosure so it reads that Disclosure's IDs, ref and press handlers.
 * Heading defaults apply to the summary; CollapsiblePanel resets them for its content.
 *
 * @param props - The resolved heading, button and panel composition.
 * @returns Local providers without an additional DOM element.
 */
function CollapsibleBody({ children }: CollapsibleBodyProps) {
  const trigger = useSlottedContext(ButtonContext, 'trigger') ?? {};
  const presentation = {
    variant: 'minimal',
    size: 'md'
  } satisfies ButtonProps;

  return (
    <RACProvider
      values={[
        [
          ButtonContext,
          {
            slots: {
              [DEFAULT_SLOT]: {},
              trigger: mergeProps(trigger, presentation)
            }
          }
        ],
        [HeadingContext, { className: styles.heading }],
        [
          IconContext,
          {
            slots: {
              [DEFAULT_SLOT]: {
                width: 24,
                height: 24,
                className: styles.icon
              },
              indicator: {
                width: 24,
                height: 24,
                className: styles.indicator,
                'aria-hidden': true
              }
            }
          }
        ]
      ]}
    >
      {children}
    </RACProvider>
  );
}

/**
 * Reveals related content below its heading.
 * Inside Accordion, control expansion on the group instead of individual items.
 * Use a Heading containing Button slot="trigger" and a decorative indicator.
 *
 * @param props - Disclosure behavior and the composed heading and panel.
 * @example
 * <Collapsible defaultExpanded>
 *   <Heading>
 *     <Button slot="trigger">
 *       <Text>Advanced settings</Text>
 *       <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
 *     </Button>
 *   </Heading>
 *   <CollapsiblePanel>Additional options</CollapsiblePanel>
 * </Collapsible>
 */
export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(function Collapsible(props, ref) {
  const { className, children, ...rest } = props;
  return (
    <RACDisclosure {...rest} ref={ref} className={composeClassName(className, styles.collapsible)} data-collapsible="">
      {composeRenderProps(children, (content) => (
        <CollapsibleBody>{content}</CollapsibleBody>
      ))}
    </RACDisclosure>
  );
});

/** Props for the persistent content panel associated with a Collapsible trigger. */
export interface CollapsiblePanelProps extends RACDisclosurePanelProps, Omit<BoxOwnProps, 'as'> {}

/**
 * Shows arbitrary content and preserves its state while the section is collapsed.
 * Use role="region" only when the panel warrants a named landmark.
 *
 * @param props - Panel content, optional landmark role, and surface customization.
 * @example
 * <CollapsiblePanel><Text as="p">Additional information.</Text></CollapsiblePanel>
 */
export const CollapsiblePanel = forwardRef<HTMLDivElement, CollapsiblePanelProps>(function CollapsiblePanel(
  { children, className, ...rest },
  ref
) {
  return (
    <Box {...rest} as={RACDisclosurePanel} ref={ref} className={composeClassName(className, styles.panel)}>
      <RACProvider
        values={[
          [HeadingContext, null],
          [IconContext, null],
          [TextContext, null],
          [RACDisclosureGroupStateContext, null]
        ]}
      >
        {children}
      </RACProvider>
    </Box>
  );
});
