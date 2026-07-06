import ts from 'typescript';
import type { PropDoc } from '../types.ts';

export function applyUtilityType(
  name: string,
  props: PropDoc[],
  typeArgs: readonly ts.TypeNode[]
): PropDoc[] | undefined {
  if (name === 'Pick' && typeArgs.length >= 2) {
    const keys = extractStringKeys(typeArgs[1]);
    return props.filter((prop) => keys.has(prop.name));
  }

  if (name === 'Omit' && typeArgs.length >= 2) {
    const keys = extractStringKeys(typeArgs[1]);
    return props.filter((prop) => !keys.has(prop.name));
  }

  if (name === 'Partial') {
    return props.map((prop) => ({ ...prop, required: false }));
  }

  if (name === 'Required') {
    return props.map((prop) => ({ ...prop, required: true }));
  }

  return undefined;
}

export function getUtilityInnerType(name: string, typeArgs: readonly ts.TypeNode[]): ts.TypeNode | undefined {
  if (['Pick', 'Omit', 'Partial', 'Required'].includes(name)) return typeArgs[0];
  return undefined;
}

function extractStringKeys(typeNode: ts.TypeNode): Set<string> {
  const keys = new Set<string>();

  if (ts.isUnionTypeNode(typeNode)) {
    for (const type of typeNode.types) addStringKey(type, keys);
    return keys;
  }

  addStringKey(typeNode, keys);
  return keys;
}

function addStringKey(typeNode: ts.TypeNode, keys: Set<string>): void {
  if (ts.isLiteralTypeNode(typeNode) && ts.isStringLiteral(typeNode.literal)) {
    keys.add(typeNode.literal.text);
  }
}
