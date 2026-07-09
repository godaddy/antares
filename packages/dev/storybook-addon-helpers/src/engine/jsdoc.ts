import ts from 'typescript';

export function getPropJSDoc(node: ts.Node): { description?: string; defaultValue: string | null; deprecated: boolean } {
  const docs = ts.getJSDocCommentsAndTags(node);
  const jsDoc = docs.find(ts.isJSDoc);
  const description = normalizeComment(jsDoc?.comment);
  const defaultTag = jsDoc?.tags?.find((tag) => tag.tagName.text === 'default');
  const deprecated = jsDoc?.tags?.some((tag) => tag.tagName.text === 'deprecated') ?? false;

  return {
    description,
    defaultValue: normalizeComment(defaultTag?.comment) ?? null,
    deprecated
  };
}

function normalizeComment(comment: string | ts.NodeArray<ts.JSDocComment> | undefined): string | undefined {
  if (typeof comment === 'string') {
    const trimmed = comment.trim();
    return trimmed || undefined;
  }

  if (comment) {
    const text = comment
      .map((part) => part.getText())
      .join('')
      .trim();
    return text || undefined;
  }

  return undefined;
}
