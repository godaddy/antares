#!/usr/bin/env node
import { access, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const [mdxPath = 'README.mdx', outPath = 'README.md'] = process.argv.slice(2);

/**
 * Check if a file exists.
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extract raw imports from content and map variable names to file paths.
 */
function extractRawImports(content: string, sourceDir: string): Map<string, string> {
  const matches = [...content.matchAll(/^import\s+(\w+)\s+from\s+['"](.+?)\?raw['"];?$/gm)];
  return new Map(matches.map((match) => [match[1]!, resolve(sourceDir, match[2]!)]));
}

/**
 * Collect all Source component matches from content.
 * Parses various Source component patterns to extract code references and language settings.
 */
function collectSourceMatches(
  content: string
): Map<number, { match: string; varName: string; lang: string | null; index: number }> {
  const sourceMatches = new Map<number, { match: string; varName: string; lang: string | null; index: number }>();
  const patterns = [
    /<Source\s+language=['"]([^'"]+)['"][^>]*code=\{(\w+)\}[^>]*\/>/g,
    /<Source\s+[^>]*code=\{(\w+)\}[^>]*language=['"]([^'"]+)['"][^>]*\/>/g,
    /<Source\s+[^>]*code=\{(\w+)\}[^>]*\/>/g
  ];

  patterns.forEach(function processPattern(pattern) {
    [...content.matchAll(pattern)].forEach(function processMatch(m) {
      const idx = m.index!;

      if (!sourceMatches.has(idx)) {
        sourceMatches.set(idx, {
          match: m[0],
          varName: m[2] || m[1],
          lang: m[1] || m[2] || null,
          index: idx
        });
      }
    });
  });

  return sourceMatches;
}

/**
 * Determine language from file path or provided language.
 */
function determineLanguage(lang: string | null, filePath: string): string {
  if (lang) return lang;
  if (filePath.endsWith('.tsx')) return 'tsx';
  if (filePath.endsWith('.ts')) return 'ts';

  return 'tsx';
}

/**
 * Replace Source components with code blocks.
 * Reads source files and inserts their content as markdown code blocks.
 */
async function replaceSourceComponents(
  content: string,
  sourceMatches: Map<number, { match: string; varName: string; lang: string | null; index: number }>,
  rawImportMap: Map<string, string>
): Promise<string> {
  const sortedMatches = [...sourceMatches.values()].sort((a, b) => b.index - a.index);

  /**
   * Replace a single Source component match with its code block.
   */
  async function replaceSourceMatch(
    accPromise: Promise<string>,
    { match, varName, lang }: { match: string; varName: string; lang: string | null }
  ): Promise<string> {
    const acc = await accPromise;
    const filePath = rawImportMap.get(varName);

    if (filePath && (await fileExists(filePath))) {
      try {
        const code = await readFile(filePath, 'utf-8');
        const resolvedLang = determineLanguage(lang, filePath);

        return acc.replace(match, `\n\`\`\`${resolvedLang}\n${code.trim()}\n\`\`\`\n`);
      } catch {
        return acc.replace(match, '');
      }
    }

    return acc.replace(match, '');
  }

  return sortedMatches.reduce(replaceSourceMatch, Promise.resolve(content));
}

/**
 * Find component source files.
 */
function findComponentSourceFiles(sourceDir: string, componentName: string): string[] {
  const kebabCase = componentName
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
  const lowerName = componentName.toLowerCase();

  return [
    resolve(sourceDir, 'src/index.tsx'),
    resolve(sourceDir, 'src/index.ts'),
    resolve(sourceDir, `src/${lowerName}.tsx`),
    resolve(sourceDir, `src/${lowerName}.ts`),
    resolve(sourceDir, `src/${kebabCase}.tsx`),
    resolve(sourceDir, `src/${kebabCase}.ts`)
  ];
}

/**
 * Extract props from source content.
 * Parses TypeScript interface properties with JSDoc comments to extract prop metadata.
 */
function extractProps(propsContent: string): Array<{
  name: string;
  type: string;
  description: string;
  required: boolean;
}> {
  const propRegex = /\/\*\*([^*]*(?:\*(?!\/)[^*]*)*)\*\/\s*(\w+)(\??):\s*([^;]+);/g;
  const props: Array<{
    name: string;
    type: string;
    description: string;
    required: boolean;
  }> = [];

  for (const propMatch of propsContent.matchAll(propRegex)) {
    const [, jsDoc, propNameInner, optional, propType] = propMatch;
    const description = jsDoc
      .replace(/\*/g, '')
      .replace(/^[\s\n]+|[\s\n]+$/g, '')
      .trim();

    props.push({
      name: propNameInner,
      type: propType.trim(),
      description,
      required: !optional
    });
  }

  return props;
}

/**
 * Generate prop table markdown.
 * Creates a markdown table from extracted props with columns for name, type, required flag, and description.
 */
function generatePropTable(
  props: Array<{
    name: string;
    type: string;
    description: string;
    required: boolean;
  }>
): string {
  if (props.length === 0) return '';
  const header = '\n| Prop | Type | Required | Description |\n|------|------|----------|------------|\n';

  /**
   * Format a single prop as a markdown table row.
   */
  function formatPropRow(prop: { name: string; type: string; description: string; required: boolean }): string {
    const type = prop.type.replace(/\|/g, '\\|').replace(/\n/g, ' ');
    const req = prop.required ? 'Yes' : 'No';

    return `| \`${prop.name}\` | \`${type}\` | ${req} | ${prop.description} |\n`;
  }

  const rows = props.map(formatPropRow);

  return header + rows.join('');
}

/**
 * Find props in source file.
 */
async function findPropsInSourceFile(sourceFile: string, propsInterfaceName: string): Promise<string | null> {
  if (!(await fileExists(sourceFile))) return null;

  try {
    const sourceContent = await readFile(sourceFile, 'utf-8');
    const propsPattern = new RegExp(
      `(?:export\\s+)?(?:interface|type)\\s+${propsInterfaceName}[^=]*(?:extends[^\\{]*)?\\{([^}]+)\\}`,
      's'
    );
    const propsMatch = sourceContent.match(propsPattern);

    return propsMatch?.[1] ?? null;
  } catch {
    return null;
  }
}

/**
 * Extract prop table for a component.
 */
async function extractPropTable(propName: string, storyFilePath: string, sourceDir: string): Promise<string> {
  if (!(await fileExists(storyFilePath))) return '';

  try {
    const storyContent = await readFile(storyFilePath, 'utf-8');
    const componentDocRegex = new RegExp(`export\\s+const\\s+${propName}\\s*=\\s*getComponentDocs\\(([^)]+)\\)`, 's');
    const componentDocMatch = storyContent.match(componentDocRegex);

    if (!componentDocMatch) return '';

    const componentName = componentDocMatch[1].trim();
    const propsInterfaceName = `${componentName}Props`;
    const sourceFiles = findComponentSourceFiles(sourceDir, componentName);

    for (const sourceFile of sourceFiles) {
      const propsContent = await findPropsInSourceFile(sourceFile, propsInterfaceName);

      if (propsContent) {
        const props = extractProps(propsContent);

        return generatePropTable(props);
      }
    }
  } catch {
    // Failed to process
  }

  return '';
}

/**
 * Replace ArgTypes components with prop tables.
 * Extracts component prop interfaces and generates markdown tables.
 */
async function replaceArgTypes(content: string, storyFilePath: string | null, sourceDir: string): Promise<string> {
  if (!storyFilePath) return content;

  const argTypesMatches = [...content.matchAll(/<ArgTypes\s+of=\{\w+\.(\w+)\}[^>]*\/>/g)];

  /**
   * Replace a single ArgTypes component match with its prop table.
   */
  async function replaceArgTypeMatch(accPromise: Promise<string>, m: RegExpMatchArray): Promise<string> {
    const acc = await accPromise;
    const propName = m[1]!;
    const propTable = await extractPropTable(propName, storyFilePath!, sourceDir);

    return acc.replace(m[0], propTable);
  }

  return argTypesMatches.reduce(replaceArgTypeMatch, Promise.resolve(content));
}

/**
 * Remove Storybook imports and components.
 */
function removeStorybookComponents(content: string): string {
  return content
    .replace(/^import\s+.*from\s+['"]@storybook.*$/gm, '')
    .replace(/^import\s+.*from\s+['"].*\.stories\.tsx['"].*$/gm, '')
    .replace(/^import\s+(\w+)\s+from\s+['"].*\?raw['"];?$/gm, '')
    .replace(/<Meta[^>]*\/>/g, '')
    .replace(/<Meta[^>]*>[\s\S]*?<\/Meta>/g, '')
    .replace(/<Story[^>]*\/>/g, '')
    .replace(/<Story[^>]*>[\s\S]*?<\/Story>/g, '')
    .replace(/<Controls[^>]*\/>/g, '')
    .replace(/<Controls[^>]*>[\s\S]*?<\/Controls>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Process content transformations.
 */
export async function processContent(content: string, sourceDir: string): Promise<string> {
  const rawImportMap = extractRawImports(content, sourceDir);
  const sourceMatches = collectSourceMatches(content);
  const withSourceReplaced = await replaceSourceComponents(content, sourceMatches, rawImportMap);

  const storyFileMatch = withSourceReplaced.match(/^import\s+\*\s+as\s+\w+\s+from\s+['"](.+?\.stories\.tsx)['"]/m);
  const storyFilePath = storyFileMatch ? resolve(sourceDir, storyFileMatch[1]!) : null;

  const withArgTypesReplaced = await replaceArgTypes(withSourceReplaced, storyFilePath, sourceDir);

  return removeStorybookComponents(withArgTypesReplaced);
}

/**
 * Compile MDX README to Markdown README.
 */
async function compileReadme(): Promise<void> {
  const sourcePath = resolve(process.cwd(), mdxPath);
  const outputPath = resolve(process.cwd(), outPath);
  const sourceDir = dirname(sourcePath);

  try {
    const content = await readFile(sourcePath, 'utf-8');
    const processed = await processContent(content, sourceDir);

    await writeFile(outputPath, processed, 'utf-8');
    console.log(`✓ Converted ${mdxPath} -> ${outPath}`);
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      console.error(`Error: ${mdxPath} not found`);
      process.exit(1);
    } else {
      const message = error instanceof Error ? error.message : String(error);

      console.error(`Error converting ${mdxPath}:`, message);
      process.exit(1);
    }
  }
}

// Only run CLI if executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  compileReadme();
}
