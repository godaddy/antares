import ts from 'typescript';
import { parse } from 'react-docgen-typescript';
import { type ItemDoc, resolveImport, findSymbolInFile } from './ats-utils.ts';

/**
 * Extracts the component or function documentation from the source file.
 *
 * @param componentName - The name of the component/function to extract documentation for.
 * @param sourceFile - The source file to extract documentation from.
 * @returns The component/function documentation.
 */
export function extractComponentDoc(componentName: string, sourceFile: ts.SourceFile): { argTypes: ItemDoc } {
  const resolvedImport = resolveImport(componentName, sourceFile);

  // limitation of react-docgen-typescript which requires files to exist
  // so it can't generate docs from a code string
  if (!resolvedImport || resolvedImport.sameFile) {
    return { argTypes: {} };
  }

  const componentDocs = parse(resolvedImport.targetSourceFile.fileName, {
    propFilter: function _propFilter(prop) {
      if (prop.name.startsWith('slot')) {
        return true;
      }

      if (prop.parent) {
        return !prop.parent.fileName.includes('node_modules');
      }

      return true;
    }
  });

  const componentDoc = componentDocs.find((doc) => doc.displayName === resolvedImport.actualName);

  if (!componentDoc) {
    return { argTypes: {} };
  }

  const argTypes: ItemDoc = {};

  for (const propName in componentDoc.props) {
    const propInfo = componentDoc.props[propName];
    const required = propInfo?.required;
    const defaultValue = propInfo?.defaultValue?.value || null;

    argTypes[propName] = {
      description: propInfo?.description,
      name: propName,
      required,
      type: { ...propInfo?.type, required },
      table: {
        defaultValue: { summary: defaultValue }
      }
    };
  }

  return { argTypes };
}
