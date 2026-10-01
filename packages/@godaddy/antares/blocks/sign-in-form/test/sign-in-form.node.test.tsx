import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SignInForm } from '../index.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#SignInForm', function signInFormTests() {
    it('renders the accessible sign-in composition', function rendersSignInForm() {
      expect(renderToString(<SignInForm />)).toMatchSnapshot();
    });
  });
});
