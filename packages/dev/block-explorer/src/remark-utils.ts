/** Registers an MDX dependency when the active compiler supports it. */
export function addMdxDependency(file: { data: Record<string, unknown> }, path: string) {
  (file.data as { _compiler?: { addDependency(path: string): void } })._compiler?.addDependency(path);
}
