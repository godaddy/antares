import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { PropTable } from '@/components/prop-table';
import { ComponentCards } from '@/components/component-cards';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    TypeTable,
    Accordion,
    Accordions,
    ComponentCards,
    PropTable,
    ...components
  };
}
