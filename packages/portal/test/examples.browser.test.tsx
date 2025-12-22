import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import assume from 'assume';
import { BasicExample } from '../examples/basic.tsx';
import { CustomContainerExample } from '../examples/custom-container.tsx';
import { PortalProviderExample } from '../examples/portal-provider.tsx';

describe('@bento/portal examples', function bento() {
  describe('BasicExample', function basicExampleTests() {
    it('renders basic portal example', function rendersBasic() {
      render(<BasicExample />);

      const portalContent = document.body.querySelector('[data-testid="basic-portal"]');
      assume(portalContent).is.not.equal(null);
      assume(portalContent?.textContent).includes('Portal content');

      // Verify data attributes are applied to the Container element
      assume(portalContent?.getAttribute('data-portal')).equals('true');
      assume(portalContent?.getAttribute('data-mounted')).equals('true');

      expect(portalContent?.outerHTML).toMatchSnapshot();
    });
  });

  describe('CustomContainerExample', function customContainerExampleTests() {
    it('renders custom container example', function rendersCustomContainer() {
      render(<CustomContainerExample />);

      const customContainer = document.querySelector('#custom-portal-container');
      assume(customContainer).is.not.equal(null);
      const content = customContainer?.querySelector('[data-testid="custom-content"]');
      assume(content).is.not.equal(null);
      assume(content?.textContent).includes('Custom container');

      // Verify data attributes are applied to the Container element
      assume(content?.getAttribute('data-portal')).equals('true');
      assume(content?.getAttribute('data-mounted')).equals('true');

      expect(content?.outerHTML).toMatchSnapshot();
    });
  });

  describe('PortalProviderExample', function portalProviderExampleTests() {
    it('renders portal provider example', function rendersPortalProvider() {
      render(<PortalProviderExample />);

      const portalContent = document.querySelector('[data-testid="portal-provider-portal"]');
      assume(portalContent).is.not.equal(null);
      assume(portalContent?.textContent).includes('Portal content using PortalProvider');

      // Verify data attributes are applied to the Container element
      assume(portalContent?.getAttribute('data-portal')).equals('true');
      assume(portalContent?.getAttribute('data-mounted')).equals('true');

      expect(portalContent?.outerHTML).toMatchSnapshot();
    });
  });
});
