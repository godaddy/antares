import React, { forwardRef, type FC } from 'react';

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
