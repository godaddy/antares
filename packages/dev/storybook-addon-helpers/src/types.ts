import type { ComponentProps, ComponentType } from 'react';

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

export interface StorybookArgType {
  name: string;
  description?: string;
  required: boolean;
  type: {
    name: string;
    required: boolean;
  };
  table: {
    defaultValue: { summary: string | null };
    category?: string;
  };
}

export interface StorybookDocs {
  tags: string[];
  argTypes: Record<string, StorybookArgType>;
}
