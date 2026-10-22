import { API, Snapshot } from 'typescript/unstable/sync';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { openTypeScriptSession } from '../src/engine/typescript-session.ts';

afterEach(() => vi.restoreAllMocks());

describe('TypeScript sessions', function typeScriptSessionTests() {
  it.each(['session.tsx', 'session.jsx'])(
    'parses virtual %s and releases the native snapshot and process exactly once',
    function closesSession(fileName) {
      const close = vi.spyOn(API.prototype, 'close');
      const dispose = vi.spyOn(Snapshot.prototype, 'dispose');
      const session = openTypeScriptSession({
        fileName,
        code: 'export const Example = () => <button />;',
        isolated: true
      });
      try {
        expect(session.project.program.getSyntacticDiagnostics(session.sourceFile.fileName)).toEqual([]);
        expect(session.sourceFile.statements).toHaveLength(1);
      } finally {
        session.close();
        session.close();
      }
      expect(close).toHaveBeenCalledTimes(1);
      expect(dispose).toHaveBeenCalledTimes(1);
    }
  );

  it('closes the native process when opening the project fails', function closesFailedSession() {
    const close = vi.spyOn(API.prototype, 'close');
    vi.spyOn(API.prototype, 'updateSnapshot').mockImplementation(function failProjectLoad() {
      throw new Error('Cannot load project');
    });
    expect(() => openTypeScriptSession({ fileName: 'session.tsx', code: '', isolated: true })).toThrow(
      'Cannot load project'
    );
    expect(close).toHaveBeenCalledTimes(1);
  });
});
