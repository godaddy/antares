/**
 * Local implementation of a DTCG 2025.10 resolver parser.
 *
 * @see https://www.designtokens.org/schemas/2025.10/resolver.json
 *
 * The @tokens-studio/resolver-parser package (0.0.1) implements a different
 * spec variant (modifier permutations) and does not handle our resolver format
 * ($schema, sets with $ref sources, resolutionOrder). This module fills that
 * gap and is intended to be replaced once the upstream package supports the
 * DTCG resolver spec natively.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

interface Token {
  $type?: string;
  $value?: any;
  [key: string]: any;
}

interface SetDefinition {
  description?: string;
  sources: Array<{ $ref?: string } & Record<string, any>>;
}

interface ResolverDocument {
  $schema?: string;
  sets?: Record<string, SetDefinition>;
  resolutionOrder?: string[];
}

/**
 * Checks whether parsed JSON conforms to the DTCG resolver document shape.
 * @param {any} data - Parsed JSON content to inspect.
 * @returns {boolean} True if the data has `sets` and `resolutionOrder` keys.
 */
function isResolverDocument(data: any): data is ResolverDocument {
  return data && typeof data === 'object' && 'sets' in data && 'resolutionOrder' in data;
}

/**
 * Checks whether a value is a DTCG token (has a $value property).
 * @param {any} value - Object to inspect.
 * @returns {boolean} True if the value contains a `$value` property.
 */
function isToken(value: any): value is Token {
  return value && typeof value === 'object' && '$value' in value;
}

/**
 * Reads and parses a JSON file from disk.
 * @param {string} filePath - Absolute path to the JSON file.
 * @returns {any} Parsed JSON content.
 */
function loadFile(filePath: string): any {
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

/**
 * Resolves a JSON file into a flat token map. Delegates to resolveDocument
 * for resolver files or extractTokens for plain token files.
 * @param {string} filePath - Absolute path to the JSON file.
 * @returns {Record<string, Token>} Flat map of token name to token object.
 */
function resolveFile(filePath: string): Record<string, Token> {
  const data = loadFile(filePath);

  if (isResolverDocument(data)) {
    return resolveDocument(data, filePath);
  }

  return extractTokens(data);
}

/**
 * Extracts token entries from a flat DTCG token file.
 * @param {Record<string, any>} data - Parsed JSON object containing token definitions.
 * @returns {Record<string, Token>} Map of token name to token object.
 */
function extractTokens(data: Record<string, any>): Record<string, Token> {
  const tokens: Record<string, Token> = {};
  for (const [key, value] of Object.entries(data)) {
    if (isToken(value)) {
      tokens[key] = value;
    }
  }
  return tokens;
}

/**
 * Processes a DTCG resolver document by walking resolutionOrder,
 * following $ref sources and merging inline tokens.
 * @param {ResolverDocument} doc - Parsed resolver document.
 * @param {string} filePath - Absolute path of the resolver file (used for relative $ref resolution).
 * @returns {Record<string, Token>} Merged flat map of all tokens from resolved sources.
 */
function resolveDocument(doc: ResolverDocument, filePath: string): Record<string, Token> {
  const fileDir = dirname(filePath);
  const merged: Record<string, Token> = {};

  for (const setRef of doc.resolutionOrder ?? []) {
    const setName = setRef.replace(/^sets\//, '');
    const set = doc.sets?.[setName];
    if (!set) continue;

    for (const source of set.sources) {
      if (source.$ref) {
        const refPath = resolve(fileDir, source.$ref);
        const refTokens = resolveFile(refPath);
        Object.assign(merged, refTokens);
      } else {
        const inlineTokens = extractTokens(source);
        Object.assign(merged, inlineTokens);
      }
    }
  }

  return merged;
}

/**
 * Parses a DTCG resolver file and returns a flat map of all resolved tokens.
 * Drop-in replacement for @tokens-studio/resolver-parser.
 * @param {string} resolverPathOrData - Absolute path to a resolver or plain token JSON file.
 * @returns {Promise<{ sets: Record<string, Token> }>} Resolved token map.
 */
export async function parser(resolverPathOrData: string): Promise<{ sets: Record<string, Token> }> {
  const tokens = resolveFile(resolverPathOrData);
  return { sets: tokens };
}
