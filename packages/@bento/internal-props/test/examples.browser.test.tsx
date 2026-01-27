import { Example } from '../examples/override-classname.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/internal-props examples', function bento() {
  describe('ClassName Override Example', function classNameOverride() {
    it('should render buttons with correct classNames', function test() {
      const { container } = render(<Example />);
      const buttons = container.querySelectorAll('button');

      // Check default button
      assume(buttons[0].className).equals('bento-button-base');
      assume(buttons[0].textContent).equals('Default Button');

      // Check override trigger button
      assume(buttons[1].className).equals('trigger-override');
      assume(buttons[1].textContent).equals('Triggers data-override');

      // Check custom styled button
      assume(buttons[2].className).equals('custom-button-class bento-button-base');
      assume(buttons[2].textContent).equals('Custom Styled Button');

      // Check primary large button
      assume(buttons[3].className).equals('primary-button large-button');
      assume(buttons[3].textContent).equals('Primary Large Button');
    });
  });
});
