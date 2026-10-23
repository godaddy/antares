import * as ts from 'typescript/unstable/ast';

export function getPropJSDoc(node: ts.Node): {
  description?: string;
  defaultValue: string | null;
  deprecated: boolean;
} {
  const docs = node.jsDoc ?? [];
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

export function normalizeComment(comment: string | ts.NodeArray<ts.JSDocComment> | undefined): string | undefined {
  const text = ts.getTextOfJSDocComment(comment)?.trim();
  return text || undefined;
}
