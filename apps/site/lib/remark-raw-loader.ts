import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { MdxjsEsm } from 'mdast-util-mdxjs-esm';
import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { addMdxDependency } from './remark-mdx-utils';

/**
 * Remark plugin that inlines `?raw` imports as string literals at build time.
 *
 * `*.stories.tsx` imports are left untouched — Turbopack resolves the static
 * import chain through the stories file (which re-exports `'use client'` example
 * components), creating proper RSC client references so the live component
 * previews work correctly in the docs site.
 */
export const remarkRawLoader: Plugin<[], Root> = function remarkRawLoader() {
  return async function transform(tree, file) {
    for (const node of tree.children) {
      if (node.type !== 'mdxjsEsm') continue;

      const esmNode = node as MdxjsEsm;
      if (!esmNode.data?.estree) continue;

      const { body } = esmNode.data.estree;
      const toRemove = new Set<number>();

      for (let i = 0; i < body.length; i++) {
        const statement = body[i];
        if (statement.type !== 'ImportDeclaration') continue;

        const source = statement.source.value as string;
        if (!source.endsWith('?raw')) continue;

        const absolutePath = join(dirname(file.path), source.replace('?raw', ''));
        try {
          const content = (await readFile(absolutePath, 'utf8')).trim();
          addMdxDependency(file, absolutePath);
          for (const specifier of statement.specifiers) {
            if (specifier.type === 'ImportDefaultSpecifier') {
              body.push({
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: specifier.local.name },
                    init: { type: 'Literal', value: content, raw: JSON.stringify(content) }
                  }
                ]
              });
            }
          }
          toRemove.add(i);
        } catch (error) {
          console.warn('Failed to load raw file:', absolutePath, error);
        }
      }

      esmNode.data.estree.body = body.filter((_, i) => !toRemove.has(i));
    }
  };
};
