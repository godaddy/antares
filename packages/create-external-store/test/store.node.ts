import { createStore, type Store } from '../src/index.ts';
import { beforeEach, describe, it } from 'node:test';
import assume from 'assume';

describe('@bento/create-external-store', function store() {
  let store: Store;

  beforeEach(function each() {
    store = createStore();
  });

  it('creates a store with initial state', function initial() {
    const value = { foo: 'bar' };

    store = createStore(value);
    const snap = store.getSnapshot();

    assume(snap).deep.equals(value);
    assume(snap).does.not.equal(value);
  });

  it('returns an object', function returns() {
    assume(store).is.a('object');
    assume(store).is.length(7);

    assume(store.getSnapshot).is.a('function');
    assume(store.subscribe).is.a('function');
    assume(store.ondemand).is.a('function');
    assume(store.pick).is.a('function');
    assume(store.only).is.a('function');
    assume(store.set).is.a('function');
    assume(store.dispatch).is.a('function');
  });

  describe('#getSnapshot', function getSnapshot() {
    it('returns an identical object', function identical() {
      assume(store.getSnapshot()).equals(store.getSnapshot());
    });

    it('returns the current state', function state() {
      store.set({ foo: 'bar' });
      assume(store.getSnapshot()).deep.equals({ foo: 'bar' });
    });
  });

  describe('#subscribe', function subscribe() {
    it('triggers the callback on state changes', function triggers(_, next) {
      const unsub = store.subscribe(function cb(snapshot) {
        assume(snapshot).deep.equals({ foo: 'bar' });
        unsub();
        next();
      });

      store.set({ foo: 'bar' });
    });
  });

  describe('#only', function only() {
    it('triggers the callback on defined changes', function triggers(_, next) {
      const subscribe = store.only('foo');
      const unsub = subscribe(function cb(data) {
        assume(data).deep.equals({ foo: 'bar' });

        unsub();
        next();
      });

      store.set({ bar: 'foo' });
      store.set({ foo: 'bar' });
      store.set({ bar: 'foo' });
    });

    it('can listen to multiple keys', function multiple(_, next) {
      const keys = [];

      const subscribe = store.only(['foo', 'bar']);
      const unsub = subscribe(function cb(data) {
        keys.push(...Object.keys(data));

        if (keys.join(',') === 'foo,bar') {
          unsub();
          next();
        }
      });

      store.set({ foobar: 'bar' });
      store.set({ foo: 'baz' });
      store.set({ bar: 'foo' });
    });
  });

  describe('#set', function set() {
    it('adds the data to the state', function addsData() {
      store.set({ foo: 'bar' });
      assume(store.getSnapshot()).deep.equals({ foo: 'bar' });
    });

    it('updates the snapshot', function updatesSnapshot() {
      store.set({ foo: 'bar' });
      assume(store.getSnapshot()).deep.equals({ foo: 'bar' });

      store.set({ foo: 'foo' });
      assume(store.getSnapshot()).deep.equals({ foo: 'foo' });
    });

    it('updates even when the data is the same', function updatesData() {
      store.set({ foo: 'bar' });
      const previous = store.getSnapshot();

      assume(previous).deep.equals({ foo: 'bar' });

      store.set({ foo: 'bar' });
      const next = store.getSnapshot();

      assume(next).deep.equals({ foo: 'bar' });
      assume(next).does.not.equal(previous);
    });

    it('removes the data when set to undefined', function removesData() {
      store.set({ foo: 'bar' });
      assume(store.getSnapshot()).deep.equals({ foo: 'bar' });

      store.set({ foo: undefined });
      assume(store.getSnapshot()).deep.equals({});
    });

    it('removes the data when set to null', function removesData() {
      store.set({ foo: 'bar' });
      assume(store.getSnapshot()).deep.equals({ foo: 'bar' });

      store.set({ foo: null });
      assume(store.getSnapshot()).deep.equals({});
    });
  });

  describe('#(pick|ondemand)', function pick() {
    it('returns the value from the state', function returnsValue() {
      store.set({ foo: 'bar' });
      assume(store.pick('foo')()).equals('bar');
    });

    it('calls the loader when the key is not in the state', function callsLoader(_, next) {
      store.ondemand(async function ondemand(name) {
        assume(name).equals('foo');
        next();

        return 'another';
      });

      store.pick('foo')();
    });

    it('introduces the returned value into the state', function introduces(_, next) {
      store.ondemand(async function ondemand(name) {
        assume(name).equals('foo');
        return 'return value';
      });

      const unsub = store.subscribe(function subscribe(snapshot) {
        assume(snapshot).is.a('object');
        assume(snapshot).is.length(1);
        assume(snapshot).deep.equals({ foo: 'return value' });
        assume(store.pick('foo')()).equals('return value');

        unsub();
        next();
      });

      const res = store.pick('foo')();
      assume(res).is.a('undefined');
    });

    it('handles multiple loaders', function multiple(_, next) {
      store.ondemand(async function ondemand() {
        throw new Error('This should not break the test suite');
      });

      store.ondemand(async function works(name) {
        assume(name).equals('foo');
        next();

        return 'another';
      });

      const res = store.pick('foo')();
      assume(res).is.a('undefined');
    });
  });
});
