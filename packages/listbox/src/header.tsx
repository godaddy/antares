import React, { createContext, useContext } from 'react';
import { createLeafComponent } from '@react-aria/collections';
import { useProps } from '@bento/use-props';
import { withSlots, type Slots } from '@bento/slots';

/**
 * Props for the Header component.
 * @interface HeaderProps
 */
export interface HeaderProps extends Slots, React.ComponentProps<'header'> {
  /**
   * The children of the header.
   */
  readonly children?: React.ReactNode;
}

/**
 * Context value structure for Header components.
 * Extends HTML attributes to support all standard header element properties.
 * @interface HeaderContextValue
 */
interface HeaderContextValue extends React.HTMLAttributes<HTMLElement> {
  /**
   * Reference to the header element for forwarding.
   */
  readonly ref?: React.RefObject<HTMLDivElement>;
}

/**
 * Combined props type for the internal BentoHeader implementation.
 * Merges Header-specific props with standard HTML attributes to provide
 * a comprehensive interface for the internal header component.
 *
 * @type BentoHeaderProps
 * @internal
 */
type BentoHeaderProps = HeaderProps & React.HTMLAttributes<HTMLElement>;

/**
 * React context for providing header-related attributes and refs to Header components.
 * Used internally by ListBoxSection to pass heading props to Header elements.
 * @public
 */
export const HeaderContext = createContext<HeaderContextValue>({});

/**
 * Internal implementation of the BentoHeader component with slots support.
 * This component handles prop processing and context integration.
 * It merges props from useProps and HeaderContext while preserving styling props.
 *
 * @internal
 */
const BentoHeaderImpl = withSlots(
  'BentoHeader',
  function BentoHeader(props: BentoHeaderProps, ref: React.ForwardedRef<HTMLElement>) {
    const { props: processedProps, apply } = useProps(props);
    const contextProps = useContext(HeaderContext);

    // Apply user props directly (preserves className, style, etc.)
    const appliedUserProps = apply(processedProps);

    const composed = {
      ...contextProps,
      ...appliedUserProps // User props take precedence over context
    };

    return (
      <header {...composed} ref={contextProps.ref || ref}>
        {processedProps.children}
      </header>
    );
  }
);

/**
 * Wrapper component that connects the BentoHeaderImpl to React Aria's collection system.
 * This function serves as an adapter between the createLeafComponent system and
 * the internal BentoHeaderImpl component, ensuring proper prop forwarding and ref handling.
 *
 * @param {HeaderProps} props - Header component props
 * @param {React.ReactNode} [props.children] - React children to render inside the header
 * @param {React.ForwardedRef<HTMLElement>} ref - Forwarded ref to the header element
 * @returns {React.ReactElement} The BentoHeaderImpl component with forwarded props and ref
 * @internal
 */
function HeaderWrapper(props: HeaderProps, ref: React.ForwardedRef<HTMLElement>) {
  return <BentoHeaderImpl {...props} ref={ref} />;
}

/**
 * A Header represents a heading for a section within a ListBox.
 * Uses React Aria's createLeafComponent for automatic collection handling.
 *
 * @component
 * @param {HeaderProps} props - The props for the Header component
 * @param {React.ForwardedRef<HTMLElement>} ref - Forwarded ref to the header element
 * @returns {JSX.Element} A header element with proper accessibility attributes
 *
 * @example
 * ```tsx
 * <Header>My Section Title</Header>
 * ```
 * @public
 */
/**
 * Base Header component created through React Aria's collection system.
 * This handles the connection to the parent ListBox's collection state and
 * integrates with the collection rendering system.
 * @internal
 */
const HeaderBase = createLeafComponent('header', HeaderWrapper);

/**
 * A Header component for section headings within a ListBox.
 * Provides semantic header structure with proper accessibility attributes
 * and integrates with React Aria's collection system for automatic handling.
 *
 * This is the main public interface for creating headers in ListBox sections.
 * It automatically receives heading props from the parent ListBoxSection via HeaderContext.
 *
 * @component
 * @example
 * ```tsx
 * <ListBoxSection>
 *   <Header>Fruits</Header>
 *   <ListBoxItem>Apple</ListBoxItem>
 *   <ListBoxItem>Banana</ListBoxItem>
 * </ListBoxSection>
 * ```
 * @public
 */
export const Header = HeaderBase as React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<HTMLElement>>;
