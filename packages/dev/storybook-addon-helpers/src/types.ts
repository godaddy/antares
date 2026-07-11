import type { ComponentProps, ComponentType } from 'react';

/** A prop name (autocompleted from `P`), any other string, or a `RegExp` tested against prop names. */
type PropMatcher<P> = keyof P | (string & {}) | RegExp;

/** Matches a prop's declaring `sourceFile` path: a `string` (substring) or a `RegExp` (tested). */
export type SourceFileMatcher = string | RegExp;

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
  /** Drops props whose `sourceFile` matches. `string` = substring, `RegExp` = tested. */
  ignoreSourceFiles?: SourceFileMatcher | readonly SourceFileMatcher[];
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

/** Global docs defaults merged under each `getComponentDocs`/`getTypeDocs` call's own options. */
export type DocsDefaults = DocsOptions<Record<string, unknown>>;

/** Options accepted by the `@bento/storybook-addon-helpers` preset in `.storybook/main.ts`. */
export interface StorybookHelpersOptions {
  docsDefaults?: DocsDefaults;
}

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
