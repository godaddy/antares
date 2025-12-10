import React, { useRef, useContext } from 'react';
import { useMenuSection, mergeProps } from 'react-aria';
import { createBranchComponent } from '@react-aria/collections';
import { CollectionRendererContext } from 'react-aria-components';
import type { Node } from '@react-types/shared';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { MenuStateContext } from './context';

/**
 * Props for the MenuSection component.
 * @interface MenuSectionProps
 */
export interface MenuSectionProps extends Omit<React.ComponentProps<'section'>, 'title'> {
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
 * Internal props interface for BentoMenuSectionImpl component.
 * @internal
 */
interface BentoMenuSectionImplProps<T = unknown> extends MenuSectionProps {
  readonly __node?: Node<T>;
  readonly [key: string]: unknown;
}

/**
 * Props interface for the MenuSectionInner component.
 * @internal
 */
interface MenuSectionInnerProps {
  readonly section: Node<unknown>;
}

/**
 * Internal implementation of the BentoMenuSection component with slots support.
 * This component handles the core logic for rendering a section within a Menu,
 * including title rendering, accessibility attributes, and child content management.
 *
 * @internal
 */
const BentoMenuSectionImpl = withSlots('BentoMenuSection', function BentoMenuSectionImpl<
  T
>({ __node, children, title: titleProp, ...rest }: BentoMenuSectionImplProps<T>, ref: React.ForwardedRef<HTMLElement>) {
  const { props, apply } = useProps(rest);
  const data = useDataAttributes({ level: __node?.level });
  const headingRef = useRef<HTMLDivElement>(null);

  const title = titleProp ?? props.title ?? __node?.rendered;
  const { groupProps, headingProps } = useMenuSection({
    heading: title,
    'aria-label': props['aria-label']
  });

  const composed = mergeProps(apply({ ...data, ...props }, ['children', 'title', 'slot']), groupProps);

  const sectionContent = children || props.children;

  return (
    <section {...composed} ref={ref}>
      {title && (
        <div {...headingProps} ref={headingRef}>
          {title}
        </div>
      )}
      {sectionContent}
    </section>
  );
});

/**
 * Wrapper component that connects BentoMenuSectionImpl to React Aria's collection system.
 * @internal
 */
function MenuSectionWrapper<T extends object>(
  props: MenuSectionProps,
  ref: React.ForwardedRef<HTMLElement>,
  section: Node<T>
) {
  return <BentoMenuSectionImpl {...props} __node={section} ref={ref} />;
}

/**
 * Base MenuSection component created through React Aria's collection system.
 * @internal
 */
const MenuSectionBase = createBranchComponent('section', MenuSectionWrapper);

/**
 * Internal component for rendering dynamic collection sections.
 * @internal
 */
export const MenuSectionInner: React.FC<MenuSectionInnerProps> = function MenuSectionInner({ section }) {
  const state = useContext(MenuStateContext);
  const { CollectionBranch } = useContext(CollectionRendererContext);

  return (
    <BentoMenuSectionImpl {...section.props} __node={section}>
      {CollectionBranch && state?.collection ? (
        <CollectionBranch collection={state.collection} parent={section} />
      ) : null}
    </BentoMenuSectionImpl>
  );
};

/**
 * A section component for organizing related items within a Menu.
 *
 * @component
 * @example
 * ```tsx
 * <MenuSection title="File">
 *   <MenuItem>New</MenuItem>
 *   <MenuItem>Open</MenuItem>
 * </MenuSection>
 * ```
 * @public
 */
export const MenuSection = MenuSectionBase as <_T extends object>(
  props: MenuSectionProps & { children?: React.ReactNode }
) => React.ReactElement;
