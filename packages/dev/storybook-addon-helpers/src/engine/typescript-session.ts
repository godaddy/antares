import { API, type Project, type Snapshot } from 'typescript/unstable/sync';
import { createVirtualFileSystem } from 'typescript/unstable/fs';
import type { SourceFile } from 'typescript/unstable/ast';
import { dirname, join, resolve } from 'node:path';

export interface TypeScriptSession {
  api: API;
  project: Project;
  sourceFile: SourceFile;
  close(): void;
}

export function openTypeScriptSession(input: {
  fileName: string;
  code: string;
  extendsConfig?: string;
  isolated?: boolean;
}): TypeScriptSession {
  const fileName = resolve(input.fileName);
  const configFile = join(dirname(fileName), '.antares-ts7-session.json');
  const config = {
    ...(input.extendsConfig ? { extends: resolve(input.extendsConfig) } : {}),
    compilerOptions: {
      target: 'ESNext',
      module: 'ESNext',
      moduleResolution: 'bundler',
      jsx: 'preserve',
      allowJs: true,
      allowImportingTsExtensions: true,
      noEmit: true,
      // Extraction uses authored syntax and module symbols, not ambient types.
      // Keep dependency resolution without loading every installed @types package.
      noLib: true,
      types: [],
      ...(input.isolated ? { noResolve: true } : {})
    },
    files: [fileName],
    include: []
  };
  const files = { [configFile]: JSON.stringify(config), [fileName]: input.code };
  const virtual = createVirtualFileSystem(files);
  const api = new API({
    cwd: dirname(fileName),
    // Non-isolated sessions overlay authored files on the real filesystem so
    // extends, imports and workspace package exports use native resolution.
    fs: input.isolated
      ? virtual
      : {
          readFile: (name) => files[name],
          fileExists: (name) => (name in files ? true : undefined),
          directoryExists: (name) => virtual.directoryExists?.(name) || undefined
        }
  });
  let snapshot: Snapshot | undefined;
  try {
    snapshot = api.updateSnapshot({ openProjects: [configFile] });
    const project = snapshot.getProject(configFile);
    const sourceFile = project?.program.getSourceFile(fileName);
    if (!project || !sourceFile) throw new Error(`TypeScript 7 could not load ${fileName}`);
    const activeSnapshot = snapshot;
    let closed = false;
    return {
      api,
      project,
      sourceFile,
      close() {
        if (closed) return;
        closed = true;
        try {
          activeSnapshot.dispose();
        } finally {
          api.close();
        }
      }
    };
  } catch (error) {
    try {
      snapshot?.dispose();
    } finally {
      api.close();
    }
    throw error;
  }
}
