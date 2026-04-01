'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'fumadocs-core/link';
import { twMerge } from 'tailwind-merge';

/** A single prop entry to display in the table. */
interface PropTableEntry {
  /** Prop name. */
  name: string;
  /** Short type string. */
  type: string;
  /** Optional URL linking the type to its definition. */
  typeHref?: string;
  /** Default value string. */
  default?: string;
  /** Prose description of the prop. */
  description?: string;
  /** Whether the prop is required (no ? suffix if true). */
  required?: boolean;
  /** Whether the prop is deprecated. */
  deprecated?: boolean;
}

interface PropTableProps {
  /** All prop entries to display. */
  entries: PropTableEntry[];
  /**
   * Category name -> list of prop names belonging to that category.
   * Props not in any category are shown at the top level (uncategorized).
   */
  categories: Record<string, string[]>;
}

/** Renders a single prop row: name | type | default, with description below. */
function PropRow({ entry }: { entry: PropTableEntry }) {
  return (
    <div className="grid grid-cols-[30%_1fr_auto] items-baseline gap-x-4 px-3 py-2 not-prose border-t first:border-t-0 text-sm">
      <code className={twMerge('font-mono font-medium text-fd-primary', entry.deprecated && 'line-through opacity-50')}>
        {entry.name}
        {!entry.required && '?'}
      </code>

      <span className="text-fd-muted-foreground">
        {entry.typeHref ? (
          <Link href={entry.typeHref} className="underline underline-offset-2">
            <code className="font-mono">{entry.type}</code>
          </Link>
        ) : (
          <code className="font-mono">{entry.type}</code>
        )}
      </span>

      <span className="text-fd-muted-foreground text-xs">
        {entry.default ? <code className="font-mono">{entry.default}</code> : <span>—</span>}
      </span>

      {entry.description && (
        <p className="col-span-3 mt-1 text-fd-muted-foreground text-xs leading-relaxed">{entry.description}</p>
      )}
    </div>
  );
}

/** Collapsible category section rendered as a disclosure. Starts collapsed. */
function CategorySection({ label, entries }: { label: string; entries: PropTableEntry[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2 text-sm font-semibold hover:bg-fd-accent transition-colors not-prose"
        aria-expanded={open}
      >
        <ChevronDown
          className={twMerge('size-4 text-fd-muted-foreground transition-transform', open && 'rotate-180')}
        />
        {label}
      </button>

      {open && (
        <div>
          {entries.map((entry) => (
            <PropRow key={entry.name} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Renders a categorized prop table matching the React Spectrum style:
 * uncategorized props appear flat at the top, followed by collapsible
 * category sections (Events, Selection, Validation, etc.).
 *
 * Rows are always visible (not individually collapsible) — description
 * appears below each prop name/type/default row.
 *
 * @param entries - All prop entries
 * @param categories - Category name -> list of prop names in that category
 * @returns The rendered prop table
 */
export function PropTable({ entries, categories }: PropTableProps) {
  const categorizedNames = new Set(Object.values(categories).flat());
  const uncategorized = entries.filter((e) => !categorizedNames.has(e.name));
  const entryByName = new Map(entries.map((e) => [e.name, e]));

  const sortedCategories = Object.entries(categories).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="flex flex-col bg-fd-card text-fd-card-foreground rounded-2xl border my-6 text-sm overflow-hidden not-prose">
      <div className="grid grid-cols-[30%_1fr_auto] gap-x-4 px-3 py-1.5 text-xs font-semibold text-fd-muted-foreground">
        <span>Name</span>
        <span>Type</span>
        <span>Default</span>
      </div>

      {uncategorized.map((entry) => (
        <PropRow key={entry.name} entry={entry} />
      ))}

      {sortedCategories.map(function renderCategory([label, propNames]) {
        const sectionEntries = propNames
          .map(function lookupEntry(name) {
            return entryByName.get(name);
          })
          .filter((e): e is PropTableEntry => e !== undefined);
        if (sectionEntries.length === 0) return null;
        return <CategorySection key={label} label={label} entries={sectionEntries} />;
      })}
    </div>
  );
}
