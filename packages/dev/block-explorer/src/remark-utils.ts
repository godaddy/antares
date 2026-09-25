/**
 * Registers a dependency for MDX rebuilds when the active compiler supports it.
 *
 * @param file - MDX file carrying the compiler's dependency tracker.
 * @param path - Source path to watch for changes.
 */
export function addMdxDependency(file: { data: Record<string, unknown> }, path: string) {
  (file.data as { _compiler?: { addDependency(path: string): void } })._compiler?.addDependency(path);
}
