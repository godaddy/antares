import { describe, it, vi, beforeEach } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import { VFile } from 'vfile';
import assume from 'assume';
import { remarkRawLoader } from '../lib/remark-raw-loader';

vi.mock('node:fs/promises', () => ({
  readFile: vi.fn()
}));

import { readFile } from 'node:fs/promises';

async function run(mdx: string, filePath: string, compilerData?: Record<string, unknown>) {
  const processor = unified().use(remarkParse).use(remarkMdx).use(remarkRawLoader);
  const file = new VFile({ path: filePath, value: mdx });
  if (compilerData) Object.assign(file.data, compilerData);
  return processor.run(processor.parse(file), file);
}

function esmBody(tree: any): any[] {
  const esm = tree.children.find((n: any) => n.type === 'mdxjsEsm');
  return esm?.data?.estree?.body ?? [];
}

describe('site', function siteTests() {
  describe('#remarkRawLoader', function remarkRawLoaderTests() {
    beforeEach(function reset() {
      vi.clearAllMocks();
    });

    it('skips mdxjsEsm nodes that have no estree data', async function skipsNoEstree() {
      const tree = {
        type: 'root',
        children: [{ type: 'mdxjsEsm', value: "import x from './foo?raw'", data: {} }]
      };
      await unified()
        .use(remarkRawLoader)
        .run(tree as any, new VFile({ path: '/fake/dir/file.mdx' }));
      assume(vi.mocked(readFile).mock.calls.length).equals(0);
    });

    it('skips non-ESM nodes', async function skipsNonEsm() {
      const tree = await run('Hello world', '/fake/dir/file.mdx');
      const hasEsm = tree.children.some((n: any) => n.type === 'mdxjsEsm');
      assume(hasEsm).equals(false);
      assume(vi.mocked(readFile).mock.calls.length).equals(0);
    });

    it('skips non-import ESM statements', async function skipsNonImport() {
      const tree = await run("export const foo = 'bar'", '/fake/dir/file.mdx');
      const body = esmBody(tree);
      assume(body.length).equals(1);
      assume(body[0].type).equals('ExportNamedDeclaration');
      assume(vi.mocked(readFile).mock.calls.length).equals(0);
    });

    it('skips imports without ?raw suffix', async function skipsNonRaw() {
      const tree = await run("import x from './foo'", '/fake/dir/file.mdx');
      const body = esmBody(tree);
      assume(body.length).equals(1);
      assume(body[0].type).equals('ImportDeclaration');
      assume(vi.mocked(readFile).mock.calls.length).equals(0);
    });

    it('replaces a raw import with a const declaration', async function replacesRawImport() {
      vi.mocked(readFile).mockResolvedValue('file content' as never);

      const tree = await run("import code from './example?raw'", '/fake/dir/file.mdx');
      const body = esmBody(tree);

      const imports = body.filter((s: any) => s.type === 'ImportDeclaration');
      const consts = body.filter((s: any) => s.type === 'VariableDeclaration');
      assume(imports.length).equals(0);
      assume(consts.length).equals(1);
      assume(consts[0].declarations[0].id.name).equals('code');
      assume(consts[0].declarations[0].init.value).equals('file content');
    });

    it('replaces multiple raw imports in the same ESM node', async function replacesMultiple() {
      vi.mocked(readFile).mockResolvedValue('content' as never);

      const mdx = ["import a from './a?raw'", "import b from './b?raw'"].join('\n');
      const tree = await run(mdx, '/fake/dir/file.mdx');
      const body = esmBody(tree);

      const imports = body.filter((s: any) => s.type === 'ImportDeclaration');
      const consts = body.filter((s: any) => s.type === 'VariableDeclaration');
      assume(imports.length).equals(0);
      assume(consts.length).equals(2);
      assume(
        consts.map((c: { declarations: [{ id: { name: string } }] }) => c.declarations[0].id.name).sort()
      ).deep.equals(['a', 'b']);
    });

    it('leaves import in place and warns when readFile fails', async function warnsOnFailure() {
      vi.mocked(readFile).mockRejectedValue(new Error('ENOENT') as never);
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(function noWarn() {
        return;
      });

      const tree = await run("import code from './missing?raw'", '/fake/dir/file.mdx');
      const body = esmBody(tree);

      const imports = body.filter((s: any) => s.type === 'ImportDeclaration');
      assume(imports.length).equals(1);
      assume(warnSpy.mock.calls.length).equals(1);
      assume(warnSpy.mock.calls[0][0]).includes('Failed to load raw file');

      warnSpy.mockRestore();
    });

    it('removes a raw import with named specifier but adds no const', async function namedSpecifierNoConst() {
      vi.mocked(readFile).mockResolvedValue('content' as never);

      const tree = await run("import { code } from './example?raw'", '/fake/dir/file.mdx');
      const body = esmBody(tree);

      const imports = body.filter((s: any) => s.type === 'ImportDeclaration');
      const consts = body.filter((s: any) => s.type === 'VariableDeclaration');
      assume(imports.length).equals(0);
      assume(consts.length).equals(0);
    });

    it('calls addMdxDependency with the resolved absolute path', async function callsDependency() {
      vi.mocked(readFile).mockResolvedValue('content' as never);
      const addDependency = vi.fn();

      await run("import code from './example?raw'", '/fake/dir/file.mdx', {
        _compiler: { addDependency }
      });

      assume(addDependency.mock.calls.length).equals(1);
      assume(addDependency.mock.calls[0][0]).equals('/fake/dir/example');
    });
  });
});
