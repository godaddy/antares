import { describe, it } from 'vitest';
import assume from 'assume';
import { getMeta, getStory, getComponentDocs } from '../lib/storybook-addon-helpers-shim';
import type { ComponentType } from 'react';

describe('site', function siteTests() {
  describe('#getMeta', function getMetaTests() {
    it('returns its argument unchanged', function returnsIdentity() {
      const meta = { title: 'Button', component: {} as ComponentType };
      assume(getMeta(meta)).equals(meta);
    });
  });

  describe('#getStory', function getStoryTests() {
    it('returns the component argument unchanged', function returnsComponent() {
      const component = (() => null) as ComponentType;
      assume(getStory(component, { name: 'Default' })).equals(component);
    });
  });

  describe('#getComponentDocs', function getComponentDocsTests() {
    it('returns an empty object', function returnsEmpty() {
      assume(getComponentDocs({} as ComponentType)).deep.equals({});
    });
  });
});
