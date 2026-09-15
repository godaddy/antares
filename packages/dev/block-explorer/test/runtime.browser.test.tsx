import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { BlockExplorer, BlockLinks, type BlockCodeRendererProps, type BlockManifest } from '../src/runtime.tsx';

const fixtureManifest: BlockManifest = {
  id: 'fixture-block',
  title: 'Fixture block',
  description: 'A fixture used by the block explorer tests.',
  files: [
    { path: 'index.tsx', language: 'tsx', source: 'export function FixtureBlock() {\n  return null;\n}\n' },
    { path: 'styles/theme.css', language: 'css', source: ':root {\n  color: black;\n}\n' }
  ]
};

describe('block explorer runtime', function runtimeTests() {
  it('switches from preview to code and selects a nested source file', async function selectsSourceFile() {
    const { getByRole, getByTestId } = await render(
      <BlockExplorer block={fixtureManifest} codeRenderer={TestCodeRenderer}>
        <div>Preview content</div>
      </BlockExplorer>
    );

    await expect.element(getByRole('tab', { name: 'Preview' })).toBeVisible();
    await expect.element(getByRole('heading', { name: 'Fixture block' })).not.toBeInTheDocument();
    await expect.element(getByRole('tab', { name: 'Code' })).toBeVisible();

    await userEvent.click(getByRole('tab', { name: 'Code' }));
    await expect.element(getByTestId('source-file')).toHaveTextContent('index.tsx');
    const activeFileButton = getByRole('button', { name: 'index.tsx', exact: true });
    await expect.element(activeFileButton).toHaveAttribute('aria-current', 'page');
    await expect.element(activeFileButton).toHaveStyle('flex: 0 0 auto');

    await userEvent.click(getByRole('button', { name: 'theme.css', exact: true }));
    await expect.element(getByTestId('source-file')).toHaveTextContent('styles/theme.css');
    await expect.element(getByTestId('source-code')).toHaveTextContent(':root');
  });

  it('collapses and reopens folders without losing the selected source', async function togglesFolders() {
    const { getByRole, getByTestId } = await render(
      <BlockExplorer block={fixtureManifest} codeRenderer={TestCodeRenderer}>
        <div>Preview content</div>
      </BlockExplorer>
    );

    await userEvent.click(getByRole('tab', { name: 'Code' }));
    const folderButton = getByRole('button', { name: 'styles', exact: true });
    const fileButton = getByRole('button', { name: 'theme.css', exact: true });

    await userEvent.click(fileButton);
    await userEvent.click(folderButton);
    await expect.element(fileButton).not.toBeInTheDocument();
    await expect.element(getByTestId('source-file')).toHaveTextContent('styles/theme.css');

    await userEvent.click(folderButton);
    await expect.element(fileButton).toBeVisible();
  });

  it('announces successful and failed source copies', async function copiesSource() {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    });

    const { getByRole, rerender } = await render(
      <BlockExplorer block={fixtureManifest}>
        <div>Preview content</div>
      </BlockExplorer>
    );

    await userEvent.click(getByRole('tab', { name: 'Code' }));
    const copyButton = getByRole('button', { name: 'Copy index.tsx' });
    await userEvent.click(copyButton);
    expect(writeText).toHaveBeenCalledWith(fixtureManifest.files[0]?.source);
    const copiedButton = getByRole('button', { name: 'Copied index.tsx' });
    await expect.element(copiedButton).toHaveTextContent('Copied');

    writeText.mockRejectedValueOnce(new Error('Clipboard unavailable'));
    await rerender(
      <BlockExplorer block={fixtureManifest}>
        <div>Preview content</div>
      </BlockExplorer>
    );
    await userEvent.click(getByRole('tab', { name: 'Code' }));
    await userEvent.click(copyButton);
    await expect.element(copyButton).not.toHaveTextContent('Copied');
  });

  it('renders related blocks as host-provided links', async function rendersRelatedBlocks() {
    const { getByRole } = await render(
      <BlockLinks
        blocks={[{ id: 'fixture-block', title: 'Fixture block', href: '/docs/blocks/fixture-block', target: '_top' }]}
      />
    );
    const link = getByRole('option', { name: 'Fixture block' });

    await expect.element(link).toBeVisible();
    expect(link.element().getAttribute('href')).toBe('/docs/blocks/fixture-block');
    expect(link.element().getAttribute('target')).toBe('_top');
  });

  it('keeps the code view usable when a block has no source files', async function handlesEmptyManifest() {
    const { getByRole } = await render(
      <BlockExplorer block={{ ...fixtureManifest, files: [] }}>
        <div>Preview content</div>
      </BlockExplorer>
    );

    await userEvent.click(getByRole('tab', { name: 'Code' }));
    await expect.element(getByRole('navigation', { name: 'Block files' })).toBeVisible();
    await expect.element(getByRole('button', { name: /Copy/ })).not.toBeInTheDocument();
  });
});

function TestCodeRenderer({ code, filePath, language }: BlockCodeRendererProps) {
  return (
    <pre data-testid="source-file" data-language={language}>
      <code data-testid="source-code">
        {filePath}\n{code}
      </code>
    </pre>
  );
}
