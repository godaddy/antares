import { describe, it, expect } from 'vitest';
import { getFileHeader } from '../src/formats/file-header';

describe('getFileHeader', function getFileHeaderSuite() {
  it('returns a function that produces a header string for file + commentStyle', async function returnsHeaderFn() {
    const fileHeader = await getFileHeader();
    expect(typeof fileHeader).toBe('function');

    const header = await fileHeader({
      file: { destination: 'test-output.txt' },
      commentStyle: 'short'
    });
    expect(typeof header).toBe('string');
    expect(header).toMatch(/Do not edit|auto-generated/i);
  });
});
