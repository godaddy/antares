import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ProjectInquiryForm } from '../index.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#ProjectInquiryForm', function projectInquiryFormTests() {
    it('renders the accessible inquiry form', function rendersForm() {
      expect(renderToString(<ProjectInquiryForm />)).toMatchSnapshot();
    });
  });
});
