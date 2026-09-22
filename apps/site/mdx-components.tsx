import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { PropTable } from '@/components/prop-table';
import { ComponentCards } from '@/components/component-cards';
import { SiteBlockExplorer } from '@/lib/antares-blocks/block-explorer';
import { BlockLinks } from '@bento/block-explorer/runtime';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

/**
 * Supplies shared MDX renderers, allowing individual pages to override them.
 *
 * @param components - Page-specific renderers that override shared defaults.
 * @returns The merged MDX component mapping.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    TypeTable,
    Accordion,
    Accordions,
    ComponentCards,
    PropTable,
    SiteBlockExplorer,
    BlockLinks,
    ...components
  };
}
