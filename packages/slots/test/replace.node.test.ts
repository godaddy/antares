import { replace } from '@bento/slots/modifiers/replace';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@bento/modifiers/replace', function bento() {
  it('exposes the function', function exposes() {
    assume(replace).is.a('function');
  });
});
