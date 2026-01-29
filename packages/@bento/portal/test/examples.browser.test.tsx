import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
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

      // DOM snapshot - shows data attributes on Container with Text child
      assume(portalContent?.outerHTML).equals(
        '<div data-testid="basic-portal" data-portal="true" data-mounted="true"><span class="_text_vfk41_1" data-override="className">Portal content</span></div>'
      );
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

      // DOM snapshot - shows data attributes on Container rendered to custom container
      assume(content?.outerHTML).equals(
        '<div data-testid="custom-content" data-portal="true" data-mounted="true"><span class="_text_vfk41_1" data-override="className">Custom container content</span></div>'
      );
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

      // DOM snapshot - shows data attributes on Container with Text children
      assume(portalContent?.outerHTML).equals(
        '<div data-testid="portal-provider-portal" data-portal="true" data-mounted="true"><span class="_text_vfk41_1" data-override="className">Portal content using PortalProvider</span><span class="_text_vfk41_1" data-override="className">Container: Custom via PortalProvider</span></div>'
      );
    });
  });
});
