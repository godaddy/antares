import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';

interface ArgType {
  name: string;
  description?: string;
  required?: boolean;
  type?: {
    name: string;
    required?: boolean;
  };
  table?: {
    defaultValue?: { summary: string | null };
  };
}

/**
 * The shape of the item documentation.
 */
export interface ItemDoc {
  [key: string]: ArgType | undefined;
}

/**
 * Converts a literal value (JSON-like) to a TypeScript expression
 */
export function toTsExpression(value: unknown): ts.Expression {
  const factory = ts.factory;

  if (value === null || value === undefined) return factory.createNull();
  if (typeof value === 'string') return factory.createStringLiteral(value);
  if (typeof value === 'number') return factory.createNumericLiteral(value);
  if (typeof value === 'boolean') return value ? factory.createTrue() : factory.createFalse();

  if (Array.isArray(value))
    return factory.createArrayLiteralExpression(
      value.map((v) => toTsExpression(v)),
      true
    );

  if (typeof value === 'object') {
    return factory.createObjectLiteralExpression(
      Object.entries(value as Record<string, unknown>).map(function map([k, v]) {
        const name = !isNaN(Number(k)) ? factory.createNumericLiteral(Number(k)) : factory.createStringLiteral(k);

        return factory.createPropertyAssignment(name, toTsExpression(v));
      }),
      true
    );
  }

  return factory.createNull();
}

/**
 * Converts a TypeScript expression back to a literal value (JSON-like)
 */
export function toLiteralValue(node: ts.Expression): unknown {
  if (ts.isStringLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;

  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((el) => toLiteralValue(el as ts.Expression));
  }

  if (ts.isObjectLiteralExpression(node)) {
    const obj: Record<string, unknown> = {};
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        const key = (prop.name as ts.Identifier).text;
        obj[key] = toLiteralValue(prop.initializer as ts.Expression);
      }
    }
    return obj;
  }

  return null;
}

/**
 * Resolves import path and finds the target symbol in the source file
 * @returns The target file where the symbol is defined and actual name of the symbol
 */
export function resolveImport(
  symbolName: string,
  sourceFile: ts.SourceFile
): { targetSourceFile: ts.SourceFile; actualName: string; sameFile?: boolean } | null {
  // Check if the symbol exists locally in the current file
  if (findSymbolInFile(symbolName, sourceFile)) {
    return { targetSourceFile: sourceFile, actualName: symbolName, sameFile: true };
  }

  // Look for the symbol in imports
  for (const statement of sourceFile.statements) {
    // Skip non-import statements
    if (!ts.isImportDeclaration(statement)) continue;
    if (!statement.moduleSpecifier || !ts.isStringLiteral(statement.moduleSpecifier)) continue;

    const importClause = statement.importClause;
    if (!importClause?.namedBindings || !ts.isNamedImports(importClause.namedBindings)) continue;

    // Look for the symbol in named imports
    for (const element of importClause.namedBindings.elements) {
      if (element.name.text !== symbolName) continue;

      const importPath = statement.moduleSpecifier.text;
      const actualName = element.propertyName ? element.propertyName.text : element.name.text;

      try {
        const resolvedPath = resolveImportPath(importPath, sourceFile.fileName);
        const targetFile = createTargetSourceFile(resolvedPath);
        return { targetSourceFile: targetFile, actualName };
      } catch {
        console.warn(`Could not resolve import: ${importPath}`);
        return null;
      }
    }
  }

  return null;
}

/**
 * Finds any symbol (interface, type, function, class, variable, etc.) in the given source file
 * @returns The node if found, otherwise null
 */
export function findSymbolInFile(symbolName: string, sourceFile: ts.SourceFile): ts.Node | null {
  let foundNode: ts.Node | null = null;

  function visit(node: ts.Node): void {
    let nodeName: string | undefined;
    const isDeclarationNode =
      ts.isInterfaceDeclaration(node) ||
      ts.isTypeAliasDeclaration(node) ||
      ts.isFunctionDeclaration(node) ||
      ts.isClassDeclaration(node) ||
      ts.isEnumDeclaration(node);

    if (isDeclarationNode) {
      nodeName = node.name?.text;
    } else if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && decl.name.text === symbolName) {
          foundNode = node;
          return;
        }
      }
    }

    if (nodeName === symbolName) {
      foundNode = node;
      return;
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return foundNode;
}

/**
 * Resolves the import path to an absolute file path
 */
function resolveImportPath(importPath: string, sourceFileName: string): string {
  let resolvedPath: string;

  // Handle absolute imports
  if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
    const resolved = ts.resolveModuleName(
      importPath,
      sourceFileName,
      {
        target: ts.ScriptTarget.Latest,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true
      },
      ts.sys
    );

    if (resolved.resolvedModule?.resolvedFileName) {
      resolvedPath = resolved.resolvedModule.resolvedFileName;
    } else {
      // Fallback: try to resolve as if it were a relative path
      console.warn(`Could not resolve absolute import: ${importPath}, trying fallback`);
      resolvedPath = path.resolve(path.dirname(sourceFileName), importPath);
    }
  } else {
    // Handle relative imports
    resolvedPath = path.resolve(path.dirname(sourceFileName), importPath);
  }

  return resolveFileWithExtensions(resolvedPath);
}

/**
 * Resolves a file path by trying different extensions if the file doesn't exist
 */
function resolveFileWithExtensions(filePath: string): string {
  if (fs.existsSync(filePath)) {
    return filePath;
  }

  const extensions = ['.ts', '.tsx', '.js', '.jsx'];
  for (const ext of extensions) {
    const pathWithExt = filePath + ext;
    if (fs.existsSync(pathWithExt)) {
      return pathWithExt;
    }
  }

  return filePath; // Return original path if no extensions work
}

/**
 * Creates a TypeScript source file from the resolved path
 */
function createTargetSourceFile(resolvedPath: string): ts.SourceFile {
  const code = fs.readFileSync(resolvedPath, 'utf8');
  return ts.createSourceFile(resolvedPath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}
