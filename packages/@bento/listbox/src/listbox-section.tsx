import type React from 'react';
import { useRef, useContext } from 'react';
import { useListBoxSection, mergeProps } from 'react-aria';
import { createBranchComponent } from '@react-aria/collections';
import { CollectionRendererContext } from 'react-aria-components';
import type { Node } from '@react-types/shared';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { HeaderContext } from './header.tsx';
import { ListStateContext } from './listbox.tsx';

/**
 * Props for the ListBoxSection component.
 * @interface ListBoxSectionProps
 */
export interface ListBoxSectionProps extends Omit<React.ComponentProps<'section'>, 'title'> {
  /**
   * A slot name for the component. Used by Bento's slot system.
   */
  readonly slot?: string;
  /**
   * The title of the section.
   */
  readonly title?: React.ReactNode;
  /**
   * The children of the section.
   */
  readonly children?: React.ReactNode;
}

/**
 * Internal props interface for BentoListBoxSectionImpl component.
 * Extends ListBoxSectionProps with internal React Aria node data and allows
 * additional properties for flexibility in prop handling.
 *
 * @interface BentoListBoxSectionImplProps
 * @template T - The type of the section node data
 * @internal
 */
interface BentoListBoxSectionImplProps<T = unknown> extends ListBoxSectionProps {
  readonly __node?: Node<T>;
  readonly [key: string]: unknown;
}

/**
 * Props interface for the ListBoxSectionInner component.
 * Contains the React Aria section node that represents this section
 * in the collection hierarchy for dynamic rendering.
 *
 * @interface ListBoxSectionInnerProps
 * @internal
 */
interface ListBoxSectionInnerProps {
  readonly section: Node<unknown>;
}

/**
 * Internal implementation of the BentoListBoxSection component with slots support.
 * This component handles the core logic for rendering a section within a ListBox,
 * including title rendering, accessibility attributes, and child content management.
 * It integrates with React Aria's useListBoxSection hook for proper ARIA compliance.
 *
 * @internal
 */
const BentoListBoxSectionImpl = withSlots('BentoListBoxSection', function BentoListBoxSectionImpl<
  T
>(...restArgs: any[]) {
  const [{ __node, children, title: titleProp, ...rest }, ref] = restArgs as [
    BentoListBoxSectionImplProps<T>,
    React.ForwardedRef<HTMLElement>
  ];
  const { props, apply } = useProps(rest);
  const data = useDataAttributes({ level: __node?.level });
  const headingRef = useRef<HTMLDivElement>(null);

  const title = titleProp ?? props.title ?? __node?.rendered;
  const { groupProps, headingProps } = useListBoxSection({
    heading: title,
    'aria-label': props['aria-label']
  });

  const composed = mergeProps(apply({ ...data, ...props }, ['children', 'title', 'slot']), groupProps);

  const sectionContent = children || props.children;

  return (
    <section {...composed} ref={ref}>
      <HeaderContext.Provider value={{ ...headingProps, ref: headingRef }}>
        {title && <div {...headingProps}>{title}</div>}
        {sectionContent}
      </HeaderContext.Provider>
    </section>
  );
});

/**
 * Wrapper component that connects BentoListBoxSectionImpl to React Aria's collection system.
 * This function serves as an adapter between createBranchComponent and the internal
 * BentoListBoxSectionImpl, ensuring proper prop forwarding and node injection for sections.
 *
 * @template T - The type of the section node data
 * @param {ListBoxSectionProps} props - ListBoxSection component props
 * @param {string} [props.slot] - Slot name for Bento's slot system
 * @param {React.ReactNode} [props.title] - Title for the section
 * @param {React.ReactNode} [props.children] - Children to render in the section
 * @param {string} [props.aria-label] - ARIA label for accessibility
 * @param {React.ForwardedRef<HTMLElement>} ref - Ref forwarded from the collection system
 * @param {Node<T>} section - React Aria node containing section metadata and collection info
 * @returns {React.ReactElement} The BentoListBoxSectionImpl component with proper node and ref wiring
 * @internal
 */
/* v8 ignore start */
function ListBoxSectionWrapper<T extends object>(
  props: ListBoxSectionProps,
  ref: React.ForwardedRef<HTMLElement>,
  section: Node<T>
) {
  return <BentoListBoxSectionImpl {...props} __node={section} ref={ref} />;
}
/* v8 ignore stop */

/**
 * Base ListBoxSection component created through React Aria's collection system.
 * This handles the connection to the parent ListBox's collection state and
 * manages the branch structure for nested items.
 * @internal
 */
const ListBoxSectionBase = createBranchComponent('section', ListBoxSectionWrapper);

/**
 * Internal component for rendering dynamic collection sections.
 * This component is used specifically for sections that are part of a dynamic collection,
 * connecting to the ListStateContext and CollectionRendererContext to properly render
 * nested items through React Aria's collection system.
 *
 * @component
 * @param {object} props - The component props containing the section node
 * @param {Node<unknown>} props.section - The React Aria node representing this section in the collection
 * @throws {BentoError} Throws an error if used outside of a ListBox context
 * @returns {React.ReactElement} JSX element representing a dynamically rendered listbox section
 * @internal
 */
export const ListBoxSectionInner: React.FC<ListBoxSectionInnerProps> = function ListBoxSectionInner({ section }) {
  const state = useContext(ListStateContext);
  const { CollectionBranch } = useContext(CollectionRendererContext);

  return (
    <BentoListBoxSectionImpl {...section.props} __node={section}>
      {CollectionBranch && state?.collection ? (
        <CollectionBranch collection={state.collection} parent={section} />
      ) : null}
    </BentoListBoxSectionImpl>
  );
};

/**
 * A section component for organizing related items within a ListBox.
 *
 * @component
 * @example
 * ```tsx
 * <ListBoxSection title="Fruits">
 *   <ListBoxItem>Apple</ListBoxItem>
 *   <ListBoxItem>Banana</ListBoxItem>
 * </ListBoxSection>
 * ```
 * @public
 */
export const ListBoxSection = ListBoxSectionBase as <_T extends object>(
  props: ListBoxSectionProps & { children?: React.ReactNode }
) => React.ReactElement;
