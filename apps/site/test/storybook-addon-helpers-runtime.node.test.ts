import { describe, it } from 'vitest';
import assume from 'assume';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers/runtime';
import type { ComponentType } from 'react';

describe('site', function siteTests() {
  describe('@bento/storybook-addon-helpers/runtime', function runtimeTests() {
    it('returns meta unchanged', function returnsMeta() {
      const meta = { title: 'Button', component: {} as ComponentType };
      assume(getMeta(meta)).equals(meta);
    });

    it('returns the story component unchanged', function returnsComponent() {
      const component = (() => null) as ComponentType;
      assume(getStory(component, { name: 'Default' })).equals(component);
    });

    it('returns empty docs', function returnsEmptyDocs() {
      assume(getComponentDocs({} as ComponentType)).deep.equals({});
    });
  });
});
