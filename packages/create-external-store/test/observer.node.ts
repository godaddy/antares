import { observer } from '../src/observer.ts';
import { describe, it } from 'node:test';
import assume from 'assume';

describe('@bento/observe', function bento() {
  it('returns an object', function test() {
    const { subscribe, dispatch } = observer();

    assume(subscribe).is.a('function');
    assume(dispatch).is.a('function');
  });

  it('returns an unsubscribe function', function test() {
    const { subscribe } = observer();
    const unsubscribe = subscribe(function callback() {
      throw new Error('Should not be called');
    });

    assume(unsubscribe).is.a('function');
    unsubscribe();
  });

  it('receives the dispatched data', function test(_, next) {
    const { subscribe, dispatch } = observer();
    const unsubscribe = subscribe(function callback(data: Record<string, unknown>) {
      assume(data).equals('hello');
      unsubscribe();
      next();
    });

    dispatch('hello');
  });

  it('removes the listener after unsubscribing', function test() {
    const { subscribe, dispatch } = observer();
    const unsubscribe = subscribe(function callback() {
      throw new Error('Should not be called');
    });

    unsubscribe();
    dispatch('hello');
  });
});
