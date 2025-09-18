import ts from 'typescript';
import { type ItemDoc, resolveImport, findSymbolInFile } from './ats-utils.ts';

/**
 * Extracts interface documentation from the source file.
 *
 * @param interfaceName - The name of the interface to extract documentation for.
 * @param sourceFile - The source file to extract documentation from.
 * @param options - Options for extraction including property filtering.
 * @returns The interface documentation.
 */
export function extractInterfaceDoc(
  interfaceName: string,
  sourceFile: ts.SourceFile,
  options: {
    propFilter?: (prop: { name: string; parent: { fileName: string } }) => boolean;
  } = {}
): { argTypes: ItemDoc } {
  try {
    const resolved = resolveImport(interfaceName, sourceFile);

    if (!resolved) {
      console.warn(`Interface ${interfaceName} not found`);
      return { argTypes: {} };
    }

    // Find the interface declaration
    const interfaceDecl = findSymbolInFile(resolved.actualName, resolved.targetSourceFile);
    if (!interfaceDecl || !ts.isInterfaceDeclaration(interfaceDecl)) {
      console.warn(`Interface ${interfaceName} is not an interface declaration`);
      return { argTypes: {} };
    }

    // Extract properties including inherited ones
    const argTypes = extractInterfaceProperties(interfaceDecl, resolved.targetSourceFile, options.propFilter);

    return { argTypes };
  } catch (error) {
    console.error('Error extracting interface documentation:', error);
    return { argTypes: {} };
  }
}

/**
 * Extracts properties from an interface, including inherited properties
 */
function extractInterfaceProperties(
  interfaceDecl: ts.InterfaceDeclaration,
  sourceFile: ts.SourceFile,
  propFilter?: (prop: { name: string; parent: { fileName: string } }) => boolean,
  visited = new Set<string>()
): ItemDoc {
  const argTypes: ItemDoc = {};
  const interfaceKey = `${sourceFile.fileName}:${interfaceDecl.name.text}`;

  // Prevent infinite recursion
  if (visited.has(interfaceKey)) {
    return argTypes;
  }
  visited.add(interfaceKey);

  // Extract properties from extended interfaces first
  if (interfaceDecl.heritageClauses) {
    for (const heritageClause of interfaceDecl.heritageClauses) {
      if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
        for (const typeExpr of heritageClause.types) {
          const extendedProps = extractPropertiesFromTypeExpression(typeExpr, sourceFile, propFilter, visited);
          Object.assign(argTypes, extendedProps);
        }
      }
    }
  }

  // Extract properties from the interface itself
  for (const member of interfaceDecl.members) {
    if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
      const propName = member.name.text;

      // Apply property filter if provided
      if (propFilter && !propFilter({ name: propName, parent: { fileName: sourceFile.fileName } })) {
        continue;
      }

      const isOptional = !!member.questionToken;
      const required = !isOptional;

      // Extract JSDoc comments and tags
      let description = '';
      let defaultValue: string | null = null;
      const jsDocComments = ts.getJSDocCommentsAndTags(member);

      if (jsDocComments.length > 0) {
        const firstComment = jsDocComments[0];
        if (ts.isJSDoc(firstComment)) {
          description = firstComment.comment?.toString() || '';

          // Extract @default tag value
          const defaultTag = firstComment.tags?.find((tag) => tag.tagName.text === 'default');
          if (defaultTag && defaultTag.comment) {
            defaultValue = defaultTag.comment.toString();
          }
        }
      }

      argTypes[propName] = {
        description,
        name: propName,
        required,
        type: {
          name: member.type?.getText?.() || 'any',
          required
        },
        table: {
          defaultValue: { summary: defaultValue }
        }
      };
    }
  }

  return argTypes;
}

/**
 * Extracts properties from a type expression (used for heritage clauses)
 */
function extractPropertiesFromTypeExpression(
  typeExpr: ts.ExpressionWithTypeArguments,
  sourceFile: ts.SourceFile,
  propFilter?: (prop: { name: string; parent: { fileName: string } }) => boolean,
  visited = new Set<string>()
): ItemDoc {
  const argTypes: ItemDoc = {};

  if (ts.isIdentifier(typeExpr.expression)) {
    const typeName = typeExpr.expression.text;

    // Resolve the extended interface
    const resolved = resolveImport(typeName, sourceFile);
    if (resolved) {
      const extendedSymbol = findSymbolInFile(resolved.actualName, resolved.targetSourceFile);
      if (extendedSymbol && ts.isInterfaceDeclaration(extendedSymbol)) {
        const extendedProps = extractInterfaceProperties(
          extendedSymbol,
          resolved.targetSourceFile,
          propFilter,
          visited
        );
        Object.assign(argTypes, extendedProps);
      }
    }
  }

  return argTypes;
}
