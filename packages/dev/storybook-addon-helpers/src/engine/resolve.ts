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

export function createResolver(entryFileName: string): Resolver {
  const parsedFiles = new Map<string, ts.SourceFile>();
  const compilerOptions: ts.CompilerOptions = {
    allowJs: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.Latest
  };

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
    const local = findDeclaration(symbolName, sourceFile);
    if (local) return { name: symbolName, declaration: local, sourceFile };

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
        const declaration = findDeclaration(actualName, importedFile);
        if (!declaration) return undefined;

        return { name: actualName, declaration, sourceFile: importedFile };
      }
    }

    return undefined;
  }

  getSourceFile(entryFileName);

  return {
    getSourceFile,
    resolveModule,
    resolveSymbol
  };
}

function getScriptKind(fileName: string): ts.ScriptKind {
  if (fileName.endsWith('.tsx')) return ts.ScriptKind.TSX;
  if (fileName.endsWith('.jsx')) return ts.ScriptKind.JSX;
  if (fileName.endsWith('.js')) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

function findDeclaration(symbolName: string, sourceFile: ts.SourceFile): ts.Declaration | undefined {
  for (const statement of sourceFile.statements) {
    if (
      (ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement) ||
        ts.isFunctionDeclaration(statement) ||
        ts.isClassDeclaration(statement) ||
        ts.isEnumDeclaration(statement)) &&
      statement.name?.text === symbolName
    ) {
      return statement;
    }

    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.name.text === symbolName) return declaration;
      }
    }
  }

  return undefined;
}
