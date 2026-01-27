import { describe, expectTypeOf, it } from 'vitest';
import type { AnyObject, UnknownObject } from '../src/utility-types.js';

describe('Utility types', function utilities() {
  it('should enforce type safety for UnknownObject', function unknown() {
    const unknownObj: UnknownObject = { key: 123 };

    expectTypeOf(unknownObj).toBeObject();
    expectTypeOf(unknownObj.key).toBeUnknown();
    expectTypeOf(unknownObj.key).not.toBeNumber();
    expectTypeOf(unknownObj.nonexistentKey).toBeUnknown();
    expectTypeOf(unknownObj.nonexistentKey).not.toBeNumber();
  });

  it('should not enforce type safety for AnyObject', function any() {
    const anyObj: AnyObject = { key: 123 };

    expectTypeOf(anyObj).toBeObject();
    expectTypeOf(anyObj.key).toBeAny();
    expectTypeOf(anyObj.nonexistentKey).toBeAny();
  });
});
