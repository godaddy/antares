import type { ComponentProps, ComponentType } from 'react';
import type { StrictArgTypes } from 'storybook/internal/types';

/**
 * A prop name (type-checked against `P`), an arbitrary string, or a `RegExp`
 * matched against prop names via `.test()`. The `(string & {})` arm keeps
 * literal autocomplete for real keys while allowing names the extractor can't
 * see (e.g. add-missing-prop overrides) and component-agnostic global defaults.
 */
type PropMatcher<P> = keyof P | (string & {}) | RegExp;

/**
 * Patches the docs for matching props (or, for an exact name that matches nothing, adds a prop).
 * Only the fields you set are changed; `type`/`required` also seed a prop that is added.
 */
type PropOverride<P> = { name: PropMatcher<P> } & Partial<
  Pick<PropDoc, 'type' | 'required' | 'description' | 'defaultValue'>
>;

type DocsOptionsBase<P> = {
  overrides?: readonly PropOverride<P>[];
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

/**
 * Global docs defaults, merged UNDER each per-call `getComponentDocs`/`getTypeDocs`
 * options object. Not tied to a component, so matchers are plain strings or RegExps.
 */
export type DocsDefaults = DocsOptions<Record<string, unknown>>;

export interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  defaultValue?: string | null;
  deprecated?: boolean;
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
