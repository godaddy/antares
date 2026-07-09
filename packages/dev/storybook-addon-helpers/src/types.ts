import type { ComponentProps, ComponentType } from 'react';
import type { StrictArgTypes } from 'storybook/internal/types';

type DocsOptionsBase<P> = {
  order?: readonly (keyof P)[];
  groups?: Record<string, readonly (keyof P)[]>;
};

type IncludeDocsOptions<P> = DocsOptionsBase<P> & {
  include?: readonly (keyof P)[];
  exclude?: never;
};

type ExcludeDocsOptions<P> = DocsOptionsBase<P> & {
  include?: never;
  exclude?: readonly (keyof P)[];
};

export type DocsOptions<P> = IncludeDocsOptions<P> | ExcludeDocsOptions<P>;

export type ComponentDocsOptions<C extends ComponentType<any>> = DocsOptions<ComponentProps<C>>;

export interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  defaultValue?: string | null;
  group?: string;
  sourceFile?: string;
  declaringType?: string;
}

export interface PropsDoc {
  name: string;
  props: PropDoc[];
}

export interface StorybookDocs {
  tags: string[];
  argTypes: StrictArgTypes;
}
