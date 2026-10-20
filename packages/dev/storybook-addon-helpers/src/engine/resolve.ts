import fs from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript/unstable/ast';
import { openTypeScriptSession, type TypeScriptSession } from './typescript-session.ts';

export interface ResolvedSymbol {
  name: string;
  declaration: ts.Declaration;
  sourceFile: ts.SourceFile;
}

export interface Resolver {
  close(): void;
  printNode(node: ts.Node): string;
  getSourceFile(fileName: string): ts.SourceFile;
  resolveModule(moduleName: string, containingFile: string): string | undefined;
  resolveSymbol(symbolName: string, sourceFile: ts.SourceFile): ResolvedSymbol | undefined;
}

type LookupMode = 'local' | 'exported';

export function createResolver(entryFileName: string, code?: string, options: { isolated?: boolean } = {}): Resolver {
  const parsedFiles = new Map<string, ts.SourceFile>();
  const sessions = new Map<string, TypeScriptSession>();
  const sourceSessions = new Map<string, TypeScriptSession>();
  let closed = false;

  function getSourceFile(fileName: string): ts.SourceFile {
    if (closed) throw new Error('TypeScript resolver is closed');
    const absolutePath = path.resolve(fileName);
    const cached = parsedFiles.get(absolutePath);
    if (cached) return cached;

    for (const session of sessions.values()) {
      const source = session.project.program.getSourceFile(absolutePath);
      if (source) {
        parsedFiles.set(absolutePath, source);
        sourceSessions.set(absolutePath, session);
        return source;
      }
    }
    const session = openTypeScriptSession({
      fileName: absolutePath,
      code:
        absolutePath === path.resolve(entryFileName) && code !== undefined
          ? code
          : fs.readFileSync(absolutePath, 'utf8'),
      extendsConfig: findConfig(absolutePath),
      isolated: options.isolated
    });
    sessions.set(absolutePath, session);
    sourceSessions.set(absolutePath, session);
    parsedFiles.set(absolutePath, session.sourceFile);
    return session.sourceFile;
  }

  function resolveModule(moduleName: string, containingFile: string): string | undefined {
    const source = getSourceFile(containingFile);
    const session = sourceSessions.get(path.resolve(containingFile));
    if (!session) return undefined;
    for (const statement of source.statements) {
      if (!ts.isImportDeclaration(statement) && !ts.isExportDeclaration(statement)) continue;
      const specifier = statement.moduleSpecifier;
      if (!specifier || !ts.isStringLiteral(specifier) || specifier.text !== moduleName) continue;
      const symbol = session.project.checker.getSymbolAtLocation(specifier);
      for (const handle of symbol?.declarations ?? []) {
        const declaration = handle.resolve(session.project);
        if (declaration && ts.isSourceFile(declaration)) return path.resolve(declaration.fileName);
      }
    }
    return undefined;
  }

  function resolveSymbol(symbolName: string, sourceFile: ts.SourceFile): ResolvedSymbol | undefined {
    return resolveSymbolInternal(symbolName, sourceFile, new Set<string>(), 'local');
  }

  function resolveSymbolInternal(
    symbolName: string,
    sourceFile: ts.SourceFile,
    visited: Set<string>,
    lookupMode: LookupMode
  ): ResolvedSymbol | undefined {
    const visitKey = `${lookupMode}:${sourceFile.fileName}:${symbolName}`;
    if (visited.has(visitKey)) return undefined;
    visited.add(visitKey);

    const local =
      lookupMode === 'exported'
        ? findDeclaration(symbolName, sourceFile, true)
        : findDeclaration(symbolName, sourceFile);
    if (local) return { name: symbolName, declaration: local, sourceFile };

    if (lookupMode === 'local') {
      const imported = resolveImportedSymbol(symbolName, sourceFile, visited);
      if (imported) return imported;
    }

    return resolveExportedSymbol(symbolName, sourceFile, visited);
  }

  function resolveImportedSymbol(
    symbolName: string,
    sourceFile: ts.SourceFile,
    visited: Set<string>
  ): ResolvedSymbol | undefined {
    for (const statement of sourceFile.statements) {
      if (!ts.isImportDeclaration(statement)) continue;
      if (!statement.importClause || !ts.isStringLiteral(statement.moduleSpecifier)) continue;

      const namedBindings = statement.importClause.namedBindings;
      if (!namedBindings || !ts.isNamedImports(namedBindings)) continue;

      for (const element of namedBindings.elements) {
        if (element.name.text !== symbolName) continue;

        const resolvedFileName = resolveModule(statement.moduleSpecifier.text, sourceFile.fileName);
        if (!resolvedFileName) return undefined;

        const importedFile = getSourceFile(resolvedFileName);
        const actualName = element.propertyName?.text ?? element.name.text;
        return resolveSymbolInternal(actualName, importedFile, visited, 'exported');
      }
    }

    return undefined;
  }

  function resolveExportedSymbol(
    symbolName: string,
    sourceFile: ts.SourceFile,
    visited: Set<string>
  ): ResolvedSymbol | undefined {
    for (const statement of sourceFile.statements) {
      if (!ts.isExportDeclaration(statement)) continue;

      const exportClause = statement.exportClause;

      if (!statement.moduleSpecifier) {
        if (!exportClause || !ts.isNamedExports(exportClause)) continue;

        for (const element of exportClause.elements) {
          if (element.name.text !== symbolName) continue;

          const actualName = element.propertyName?.text ?? element.name.text;
          return resolveSymbolInternal(actualName, sourceFile, visited, 'local');
        }

        continue;
      }

      if (!ts.isStringLiteral(statement.moduleSpecifier)) continue;

      const resolvedFileName = resolveModule(statement.moduleSpecifier.text, sourceFile.fileName);
      if (!resolvedFileName) continue;

      const exportedFile = getSourceFile(resolvedFileName);

      if (!exportClause) {
        const resolved = resolveSymbolInternal(symbolName, exportedFile, visited, 'exported');
        if (resolved) return resolved;
        continue;
      }

      if (!ts.isNamedExports(exportClause)) continue;

      for (const element of exportClause.elements) {
        if (element.name.text !== symbolName) continue;

        const actualName = element.propertyName?.text ?? element.name.text;
        return resolveSymbolInternal(actualName, exportedFile, visited, 'exported');
      }
    }

    return undefined;
  }

  return {
    printNode(node) {
      getSourceFile(entryFileName);
      const session = sourceSessions.get(path.resolve(entryFileName));
      if (!session) throw new Error('No active TypeScript session');
      return session.project.emitter.printNode(node);
    },
    close() {
      if (closed) return;
      closed = true;
      try {
        for (const session of sessions.values()) session.close();
      } finally {
        sessions.clear();
        sourceSessions.clear();
        parsedFiles.clear();
      }
    },
    getSourceFile,
    resolveModule,
    resolveSymbol
  };
}

function findConfig(fileName: string): string | undefined {
  let directory = path.dirname(path.resolve(fileName));
  while (true) {
    const candidate = path.join(directory, 'tsconfig.json');
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(directory);
    if (parent === directory) return undefined;
    directory = parent;
  }
}

function findDeclaration(
  symbolName: string,
  sourceFile: ts.SourceFile,
  exportedOnly = false
): ts.Declaration | undefined {
  for (const statement of sourceFile.statements) {
    if (
      (ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement) ||
        ts.isFunctionDeclaration(statement) ||
        ts.isClassDeclaration(statement) ||
        ts.isEnumDeclaration(statement)) &&
      statement.name?.text === symbolName &&
      (!exportedOnly || hasExportModifier(statement))
    ) {
      return statement;
    }

    if (ts.isVariableStatement(statement)) {
      if (exportedOnly && !hasExportModifier(statement)) continue;

      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.name.text === symbolName) return declaration;
      }
    }
  }

  return undefined;
}

function hasExportModifier(node: ts.Node): boolean {
  return (
    'modifiers' in node &&
    Array.isArray(node.modifiers) &&
    node.modifiers.some((modifier: ts.ModifierLike) => modifier.kind === ts.SyntaxKind.ExportKeyword)
  );
}
