/**
 * Merges multiple objects into a single object, skipping undefined values.
 *
 * @param objects - Objects to merge
 * @returns Merged object with undefined values removed
 */
export function mergeObjects(...objects: (object | null | undefined)[]) {
  const result: Record<string, unknown> = {};

  for (const obj of objects) {
    if (!obj) continue;

    for (const key in obj) {
      const value = (obj as Record<string, unknown>)[key];
      if (value !== undefined) {
        result[key] = value;
      }
    }
  }

  return result;
}
