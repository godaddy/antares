// External props file to test import resolution

export interface ExternalProps {
  /** External property */
  externalProp: string;

  /** Optional external property */
  optionalProp?: number;

  /** External callback */
  onExternalEvent?: (data: any) => void;
}

export interface NestedExternalProps {
  /** Nested configuration */
  config: {
    enabled: boolean;
    settings: {
      timeout: number;
      retries?: number;
    };
  };
}
