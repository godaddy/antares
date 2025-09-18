import React from 'react';

// Basic Props interface
export interface BasicComponentProps {
  /** A required title property */
  title: string;

  /**
   * An optional description
   * with multiple lines
   * @default 'Default description'
   */
  description?: string;

  /** Click handler function */
  onClick?: (event: React.MouseEvent) => void;

  /** Loading state */
  isLoading?: boolean;
}

/**
 * A basic component for testing documentation extraction
 *
 * @param props - The component props
 * @returns The rendered component
 */
export function BasicComponent(props: BasicComponentProps) {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.description && <p>{props.description}</p>}
    </div>
  );
}

// Props with complex types
export interface ComplexComponentProps {
  /** Union type property */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /** Object configuration */
  config?: {
    theme: 'light' | 'dark';
    animations: boolean;
    timeout?: number;
  };

  /** Array of items */
  items?: Array<{ id: string; label: string; disabled?: boolean }>;

  /** Generic render function */
  renderItem?: <T>(item: T, index: number) => React.ReactNode;
}

/**
 * Complex component with advanced prop types
 *
 * This component demonstrates complex prop types including
 * unions, objects, arrays, and generic functions.
 */
export function ComplexComponent(props: ComplexComponentProps) {
  return (
    <div className={`component-${props.variant || 'primary'}`}>
      {props.items?.map((item, index) => (
        <div key={item.id}>{props.renderItem ? props.renderItem(item, index) : item.label}</div>
      ))}
    </div>
  );
}

// Component extending HTML props
export interface ButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'solid' | 'outline' | 'ghost';

  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';

  /** Loading state */
  isLoading?: boolean;
}

/**
 * Button component that extends HTML button attributes
 */
export function ButtonComponent(props: ButtonComponentProps) {
  const { variant = 'solid', size = 'md', isLoading, children, ...rest } = props;

  return (
    <button {...rest} className={`btn btn-${variant} btn-${size}`} disabled={isLoading || props.disabled}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

// Forward ref component
export interface ForwardRefComponentProps {
  /** Component label */
  label: string;

  /** Custom styling */
  className?: string;
}

/**
 * Component using forwardRef for ref forwarding
 */
export const ForwardRefComponent = React.forwardRef<HTMLDivElement, ForwardRefComponentProps>(
  function ForwardRefComponent(props, ref) {
    return (
      <div ref={ref} className={props.className}>
        {props.label}
      </div>
    );
  }
);

// Component with default props
export interface DefaultPropsComponentProps {
  /** Required title */
  title: string;

  /** Optional subtitle with default */
  subtitle?: string;

  /** Optional variant with default */
  variant?: 'default' | 'highlighted';
}

/**
 * Component with default values
 */
export function DefaultPropsComponent(props: DefaultPropsComponentProps) {
  const { title, subtitle = 'Default subtitle', variant = 'default' } = props;

  return (
    <div className={`component-${variant}`}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

/**
 * Component with inline props
 */
export function InlinePropsComponent(props: { message: string }) {
  return <span>{props.message}</span>;
}

/**
 * Component function with different name than export
 */
function InternalComponent(props: { data: string }) {
  return <div>{props.data}</div>;
}

// Export with different name to create displayName mismatch
export { InternalComponent as MismatchComponent };
