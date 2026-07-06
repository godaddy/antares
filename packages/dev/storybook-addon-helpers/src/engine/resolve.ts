import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

export interface ResolvedSymbol {
  name: string;
  declaration: ts.Declaration;
  sourceFile: ts.SourceFile;
}

export interface Resolver {
  getSourceFile(fileName: string): ts.SourceFile;
  resolveModule(moduleName: string, containingFile: string): string | undefined;
  resolveSymbol(symbolName: string, sourceFile: ts.SourceFile): ResolvedSymbol | undefined;
}

type LookupMode = 'local' | 'exported';

export function createResolver(entryFileName: string): Resolver {
  const parsedFiles = new Map<string, ts.SourceFile>();
  const compilerOptions = loadCompilerOptions(entryFileName);

  function getSourceFile(fileName: string): ts.SourceFile {
    const absolutePath = path.resolve(fileName);
    const cached = parsedFiles.get(absolutePath);
    if (cached) return cached;

    const code = fs.readFileSync(absolutePath, 'utf8');
    const sourceFile = ts.createSourceFile(
      absolutePath,
      code,
      ts.ScriptTarget.Latest,
      true,
      getScriptKind(absolutePath)
    );
    parsedFiles.set(absolutePath, sourceFile);
    return sourceFile;
  }

  function resolveModule(moduleName: string, containingFile: string): string | undefined {
    const resolved = ts.resolveModuleName(moduleName, containingFile, compilerOptions, ts.sys);
    if (resolved.resolvedModule?.resolvedFileName) return path.resolve(resolved.resolvedModule.resolvedFileName);

    if (moduleName.startsWith('.')) {
      const basePath = path.resolve(path.dirname(containingFile), moduleName);
      for (const extension of ['.ts', '.tsx', '.d.ts', '.js', '.jsx']) {
        const candidate = basePath.endsWith(extension) ? basePath : `${basePath}${extension}`;
        if (fs.existsSync(candidate)) return candidate;
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
    getSourceFile,
    resolveModule,
    resolveSymbol
  };
}

function getScriptKind(fileName: string): ts.ScriptKind {
  const getScriptKindFromFileName = (
    ts as typeof ts & { getScriptKindFromFileName?: (fileName: string) => ts.ScriptKind }
  ).getScriptKindFromFileName;
  const scriptKind = getScriptKindFromFileName?.(fileName);
  if (scriptKind) return scriptKind;

  if (fileName.endsWith('.tsx')) return ts.ScriptKind.TSX;
  if (fileName.endsWith('.jsx')) return ts.ScriptKind.JSX;
  if (fileName.endsWith('.js')) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

function loadCompilerOptions(entryFileName: string): ts.CompilerOptions {
  const fallbackOptions = getFallbackCompilerOptions();
  const configSearchPath = getConfigSearchPath(entryFileName);
  const configFileName = ts.findConfigFile(configSearchPath, ts.sys.fileExists);
  if (!configFileName) return fallbackOptions;

  const configFile = ts.readConfigFile(configFileName, ts.sys.readFile);
  if (configFile.error) return fallbackOptions;

  const parsedConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(configFileName),
    fallbackOptions,
    configFileName
  );

  return parsedConfig.options;
}

function getConfigSearchPath(entryFileName: string): string {
  const entryPath = path.resolve(entryFileName);

  if (fs.existsSync(entryPath) && fs.statSync(entryPath).isDirectory()) return entryPath;
  return path.dirname(entryPath);
}

function getFallbackCompilerOptions(): ts.CompilerOptions {
  return {
    allowJs: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.Latest
  };
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
  if (!ts.canHaveModifiers(node)) return false;
  return Boolean(ts.getModifiers(node)?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword));
}
