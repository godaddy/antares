import React from 'react';
import { type ExternalProps, type NestedExternalProps } from './external-props';

/**
 * Component that uses imported props
 */
export function ImportedPropsComponent(props: ExternalProps) {
  return (
    <div>
      <p>{props.externalProp}</p>
      {props.optionalProp && <span>{props.optionalProp}</span>}
    </div>
  );
}

/**
 * Component with nested external props
 */
export function NestedImportComponent(props: NestedExternalProps) {
  return (
    <div>
      <p>Enabled: {props.config.enabled.toString()}</p>
      <p>Timeout: {props.config.settings.timeout}</p>
    </div>
  );
}

// Local interface extending external
export interface LocalExtendedProps extends ExternalProps {
  /** Local additional property */
  localProp: boolean;
}

/**
 * Component extending external props with local props
 */
export function ExtendedPropsComponent(props: LocalExtendedProps) {
  return (
    <div>
      <p>{props.externalProp}</p>
      <p>Local: {props.localProp.toString()}</p>
    </div>
  );
}
