import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { PrimaryExample } from '../examples/primary.tsx';
import { SecondaryExample } from '../examples/secondary.tsx';
import { TertiaryExample } from '../examples/tertiary.tsx';
import { CriticalExample } from '../examples/critical.tsx';
import { InlineExample } from '../examples/inline.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { IconExample } from '../examples/icon.tsx';
import { MinimalExample } from '../examples/minimal.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Button', function buttonTests() {
    it('renders the default button', function rendersDefault() {
      const result = renderToString(<DefaultExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the primary button', function rendersPrimary() {
      const result = renderToString(<PrimaryExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the secondary button', function rendersSecondary() {
      const result = renderToString(<SecondaryExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the tertiary button', function rendersTertiary() {
      const result = renderToString(<TertiaryExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the critical button', function rendersCritical() {
      const result = renderToString(<CriticalExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the inline button', function rendersInline() {
      const result = renderToString(<InlineExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the minimal button', function rendersMinimal() {
      const result = renderToString(<MinimalExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the icon button', function rendersIcon() {
      const result = renderToString(<IconExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the buttons in different sizes', function rendersSizes() {
      const result = renderToString(<SizesExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the buttons in disabled state', function rendersDisabled() {
      const result = renderToString(<DisabledExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the primary button with custom props', function customProps() {
      const result = renderToString(<PrimaryExample className="random-class" aria-label="Test Label" />);
      expect(result).toMatchSnapshot();
    });
  });
});
