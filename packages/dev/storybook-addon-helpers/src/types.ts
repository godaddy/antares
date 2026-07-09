import type { ComponentProps, ComponentType } from 'react';
import type { StrictArgTypes } from 'storybook/internal/types';

/** A prop name (type-checked against `P`) or a `RegExp` matched against prop names via `.test()`. */
type PropMatcher<P> = keyof P | RegExp;

type DocsOptionsBase<P> = {
  primary?: readonly PropMatcher<P>[];
  categories?: Record<string, readonly PropMatcher<P>[]>;
};

type IncludeDocsOptions<P> = DocsOptionsBase<P> & {
  include?: readonly PropMatcher<P>[];
  exclude?: never;
};

type ExcludeDocsOptions<P> = DocsOptionsBase<P> & {
  include?: never;
  exclude?: readonly PropMatcher<P>[];
};

export type DocsOptions<P> = IncludeDocsOptions<P> | ExcludeDocsOptions<P>;

export type ComponentDocsOptions<C extends ComponentType<any>> = DocsOptions<ComponentProps<C>>;

export interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  defaultValue?: string | null;
  category?: string;
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
