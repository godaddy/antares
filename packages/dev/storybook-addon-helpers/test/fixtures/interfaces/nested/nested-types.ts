// Types in a nested directory to test relative imports

export interface NestedInterface {
  /** Property from nested file */
  nestedProp: string;

  /**
   * Another nested property
   * @default 42
   */
  nestedNumber?: number;
}

export interface AnotherNestedInterface extends NestedInterface {
  /** Additional property in nested extended interface */
  additionalProp: boolean;
}
