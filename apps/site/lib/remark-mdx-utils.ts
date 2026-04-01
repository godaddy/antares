/** Registers a webpack dependency on the file, if the compiler supports it. */
export function addMdxDependency(file: { data: Record<string, unknown> }, path: string) {
  (file.data as { _compiler?: { addDependency(p: string): void } })._compiler?.addDependency(path);
}
