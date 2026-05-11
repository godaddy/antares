# site

The Antares design library documentation site — a Next.js app built with [Fumadocs](https://fumadocs.dev).

Run the development server:

```bash
npx nx run site:dev
```

Open <http://localhost:3000> with your browser to see the result.

## Content sources

Content is pulled from two places, merged into a single Fumadocs source:

- `content/docs/` — hand-authored documentation pages
- `packages/@godaddy/antares/components/**/README.mdx` — per-component docs, served at `/docs/components/*`

See `source.config.ts` for the full MDX pipeline configuration.

## Project structure

| Route | Description |
| --- | --- |
| `app/(home)` | Landing page |
| `app/docs` | Documentation layout and pages |
| `app/og/docs` | Open Graph image generation |
| `app/api/search` | Full-text search route handler |

Notable files in `lib/`:

| File | Description |
| --- | --- |
| `source.ts` | Content source adapter; merges docs and component collections |
| `layout.shared.tsx` | Shared layout options reused across route layouts |
| `filtered-generator.ts` | Wraps `fumadocs-typescript` to strip DOM/CSS/ARIA props from auto-generated prop tables and group remaining props by category |
| `remark-strip-leading-heading.ts` | Remark plugin that removes the leading `#` heading from MDX files |
| `remark-arg-types.ts` | Remark plugin that injects Storybook arg type metadata into component docs |
| `remark-raw-loader.ts` | Remark plugin that inlines raw source file content |
| `github-path.ts` | Resolves GitHub source URLs for component files |
| `storybook-bridge/` | Helpers for sharing Storybook metadata with the docs site |

## Learn more

- [Fumadocs](https://fumadocs.dev) — documentation framework
- [Next.js Documentation](https://nextjs.org/docs) — Next.js features and API
