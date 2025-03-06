import { Slot } from '@bento/slots/context';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@bento/slots/context', function bento() {
  it('is a React context', function context() {
    assume(Slot).is.a('object');
    assume(Slot.Provider).is.a('object');
    assume(Slot.Consumer).is.a('object');
  });

  it('provides default values', function defaults() {
    assume(Slot._currentValue).is.a('object');
    assume(Slot._currentValue).deep.equals({
      override: false,
      components: {},
      namespace: [],
      slots: {}
    });
  });
});
