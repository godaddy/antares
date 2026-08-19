import { createMarkdownRenderer } from 'fumadocs-core/content/md';
import { remarkGfm } from 'fumadocs-core/mdx-plugins/remark-gfm';
import { PropTableClient } from './prop-table-client';

/** A single prop entry to display in the table. */
export interface PropTableEntry {
  /** Prop name. */
  name: string;
  /** Short type string. */
  type: string;
  /** Optional URL linking the type to its definition. */
  typeHref?: string;
  /** Default value string. */
  default?: string;
  /** Prose description of the prop, as markdown. */
  description?: string;
  /** Whether the prop is required (no ? suffix if true). */
  required?: boolean;
  /** Whether the prop is deprecated. */
  deprecated?: boolean;
}

export interface PropTableProps {
  /** All prop entries to display. */
  entries: PropTableEntry[];
  /**
   * Category name -> list of prop names belonging to that category.
   * Props not in any category are shown at the top level (uncategorized).
   */
  categories: Record<string, string[]>;
}

const { MarkdownServer } = createMarkdownRenderer({ remarkPlugins: [remarkGfm] });

// The table sits inside `not-prose`, and Fumadocs' typography selectors exclude
// that subtree, so every element the description renders needs its own styling.
const DESCRIPTION_COMPONENTS = {
  p: (props: { children?: React.ReactNode }) => <p className="mb-1 last:mb-0" {...props} />,
  code: (props: { children?: React.ReactNode }) => <code className="font-mono" {...props} />,
  ul: (props: { children?: React.ReactNode }) => <ul className="my-1 list-disc ps-4" {...props} />,
  ol: (props: { children?: React.ReactNode }) => <ol className="my-1 list-decimal ps-4" {...props} />,
  li: (props: { children?: React.ReactNode }) => <li className="mt-0.5" {...props} />,
  a: (props: { children?: React.ReactNode; href?: string }) => (
    <a className="underline underline-offset-2" {...props} />
  ),
  pre: (props: { children?: React.ReactNode }) => (
    <pre className="my-1 overflow-x-auto rounded bg-fd-muted p-2" {...props} />
  )
};

/** Renders descriptions as markdown on the server, then defers to the client table. */
export function PropTable({ entries, categories }: PropTableProps) {
  const rendered = entries.map(function renderDescription(entry) {
    if (!entry.description) return entry;
    return {
      ...entry,
      description: <MarkdownServer components={DESCRIPTION_COMPONENTS}>{entry.description}</MarkdownServer>
    };
  });

  return <PropTableClient entries={rendered} categories={categories} />;
}
