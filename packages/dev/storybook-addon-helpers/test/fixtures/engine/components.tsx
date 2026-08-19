import React, { forwardRef, type ElementType, type FC } from 'react';

export interface FunctionProps {
  fnRequired: string;
  fnOptional?: boolean;
}

export function FunctionComponent(props: FunctionProps) {
  return <div>{props.fnRequired}</div>;
}

export interface ArrowProps {
  arrowRequired: string;
}

export const ArrowComponent = (props: ArrowProps) => <div>{props.arrowRequired}</div>;

export interface ForwardRefProps {
  forwarded: string;
}

export const ForwardRefComponent = forwardRef<HTMLDivElement, ForwardRefProps>(
  function ForwardRefComponent(props, ref) {
    return <div ref={ref}>{props.forwarded}</div>;
  }
);

export interface FCProps {
  fc: string;
}

export const FCComponent: FC<FCProps> = (props) => <div>{props.fc}</div>;

export interface QualifiedFCProps {
  qualifiedFc: string;
}

export const QualifiedFCComponent: React.FC<QualifiedFCProps> = (props) => <div>{props.qualifiedFc}</div>;

export interface ExoticProps {
  exotic: string;
}

declare namespace Registry {
  type ComponentType<T> = { entry: T };
}

// Shares a rightmost name with React's, but is not a component annotation.
export declare const RegistryEntry: Registry.ComponentType<FCProps>;

// Mirrors how a built `.d.ts` declares a forwardRef component (e.g. react-aria-components).
export declare const ForwardRefExoticComponent: React.ForwardRefExoticComponent<
  ExoticProps & React.RefAttributes<HTMLDivElement>
>;

type PolymorphicProps<C, Own> = Own & { as?: C };

interface PolymorphicComponent<Own> {
  <C extends ElementType = 'div'>(props: PolymorphicProps<C, Own>): React.ReactNode;
}

export interface PolymorphicOwnProps {
  polyProp: string;
}

type PolyProps<C extends ElementType = ElementType> = PolymorphicProps<C, PolymorphicOwnProps>;

export const PolymorphicForwardRefComponent = forwardRef(function PolymorphicForwardRefComponent(
  props: PolyProps<ElementType>,
  ref: React.Ref<HTMLDivElement>
) {
  const { as: Component = 'div', ...rest } = props;
  return <Component ref={ref} {...rest} />;
}) as PolymorphicComponent<PolymorphicOwnProps>;
