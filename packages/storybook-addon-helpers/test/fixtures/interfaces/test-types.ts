import React, { type ComponentProps } from 'react';

// Basic interface for testing
export interface BasicProps {
  /** A required string property */
  title: string;

  /**
   * An optional description
   * with multiple lines
   * support
   * @default 'No description provided'
   */
  description?: string;

  /** A callback function */
  onClick?: (event: MouseEvent) => void;
}

// Interface with inheritance
export interface ExtendedProps extends BasicProps {
  /** Additional property in extended interface */
  variant?: 'primary' | 'secondary';

  /** Override parent property with more specific type */
  onClick: (event: MouseEvent) => void; // Now required
}

// Interface extending React ComponentProps
export interface ButtonProps extends ComponentProps<'button'> {
  /** Custom button variant */
  variant?: 'solid' | 'outline' | 'ghost';

  /** Loading state */
  isLoading?: boolean;
}

// Complex inheritance chain
export interface BaseComponent {
  /** Component ID */
  id: string;

  /** CSS classes */
  className?: string;
}

export interface InteractiveComponent extends BaseComponent {
  /** Whether component is disabled */
  disabled?: boolean;

  /** Tab index for accessibility */
  tabIndex?: number;
}

export interface FormComponent extends InteractiveComponent {
  /** Form field name */
  name: string;

  /**
   * Field value
   * @default ''
   */
  value?: string;

  /** Change handler */
  onChange?: (value: string) => void;
}

// Interface with complex types
export interface ComplexProps {
  /** Union type property */
  size?: 'small' | 'medium' | 'large';

  /** Object type property */
  config?: {
    theme: 'light' | 'dark';
    animations: boolean;
  };

  /** Array type property */
  items?: Array<{ id: string; label: string }>;

  /** Generic function type */
  render?: <T>(item: T) => React.ReactNode;
}

export interface NoTypeProps {
  /** Property without explicit type annotation */
  implicitAny;
}
