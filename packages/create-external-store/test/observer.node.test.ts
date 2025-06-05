import { callback, NextFunction } from './next.ts';
import { observer } from '../src/observer.ts';
import { describe, it } from 'vitest';
import assume from 'assume';
import { UnknownObject } from '@bento/types';

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

  it(
    'receives the dispatched data',
    callback(function test(next: NextFunction) {
      const { subscribe, dispatch } = observer();
      const unsubscribe = subscribe(function holla(data: UnknownObject) {
        assume(data).equals('hello');
        unsubscribe();
        next();
      });

      dispatch('hello');
    })
  );

  it('removes the listener after unsubscribing', function test() {
    const { subscribe, dispatch } = observer();
    const unsubscribe = subscribe(function holla() {
      throw new Error('Should not be called');
    });

    unsubscribe();
    dispatch('hello');
  });
});
