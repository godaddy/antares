/**
 * Returns the path to the source MDX file in the repository for a given docs page.
 *
 * Component pages live in the antares package; all other pages live under the
 * site content directory.
 *
 * @param page - Docs page with slugs and path
 * @param page.slugs - URL slug segments (first segment determines the category)
 * @param page.path - Relative file path of the page
 * @returns Repository-relative path to the MDX source file
 */
export function getGithubPath(page: { slugs: string[]; path: string }): string {
  if (page.slugs[0] === 'components') {
    return `packages/@godaddy/antares/components/${page.slugs.slice(1).join('/')}/README.mdx`;
  }
  return `apps/site/content/docs/${page.path}`;
}
