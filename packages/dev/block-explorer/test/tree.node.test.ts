import { describe, expect, it } from 'vitest';
import { createFileTree } from '../src/tree.ts';

describe('createFileTree', function createFileTreeTests() {
  it('returns an empty tree for a block with no curated files', function emptyTree() {
    expect(createFileTree([])).toEqual([]);
  });

  it('groups folders before files and preserves nested paths', function groupsFolders() {
    const tree = createFileTree([
      { path: 'styles/form.module.css', language: 'css', source: '' },
      { path: 'index.tsx', language: 'tsx', source: '' },
      { path: 'components/form.tsx', language: 'tsx', source: '' }
    ]);

    expect(tree).toEqual([
      {
        type: 'folder',
        name: 'components',
        path: 'components',
        children: [{ type: 'file', name: 'form.tsx', path: 'components/form.tsx' }]
      },
      {
        type: 'folder',
        name: 'styles',
        path: 'styles',
        children: [{ type: 'file', name: 'form.module.css', path: 'styles/form.module.css' }]
      },
      { type: 'file', name: 'index.tsx', path: 'index.tsx' }
    ]);
  });

  it('rejects a file and folder that collide at the same path', function rejectsCollisions() {
    /** Creates a file that conflicts with a parent folder. */
    function createCollidingTree() {
      return createFileTree([
        { path: 'components', language: 'ts', source: '' },
        { path: 'components/form.tsx', language: 'tsx', source: '' }
      ]);
    }

    expect(createCollidingTree).toThrow('collides with an existing file');
  });

  it('rejects duplicate file paths', function rejectsDuplicateFiles() {
    /** Supplies duplicate file paths to exercise collision handling. */
    function createDuplicateTree() {
      return createFileTree([
        { path: 'index.tsx', language: 'tsx', source: '' },
        { path: 'index.tsx', language: 'tsx', source: '' }
      ]);
    }

    expect(createDuplicateTree).toThrow('collides with an existing node');
  });

  it('rejects paths that contain no file name', function rejectsEmptyPath() {
    /** Supplies a path with no usable file name. */
    function createEmptyPathTree() {
      return createFileTree([{ path: '/', language: 'md', source: '' }]);
    }

    expect(createEmptyPathTree).toThrow('non-empty relative path');
  });
});
