import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { HighContrastExample } from '../examples/high-contrast.tsx';
import { IconsExample } from '../examples/icons.tsx';
import { IndicatorExample } from '../examples/indicator.tsx';
import { PlaygroundExample } from '../examples/tag-playground.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Tag', function tagTests() {
    it('renders the default tag', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders the playground defaults', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });

    it('renders all emphasis variants', function emphasesExample() {
      expect(renderToString(<EmphasesExample />)).toMatchSnapshot();
    });

    it('renders all sizes', function sizesExample() {
      expect(renderToString(<SizesExample />)).toMatchSnapshot();
    });

    it('renders the high-contrast variant', function highContrastExample() {
      expect(renderToString(<HighContrastExample />)).toMatchSnapshot();
    });

    it('renders tags with leading icons', function iconsExample() {
      expect(renderToString(<IconsExample />)).toMatchSnapshot();
    });

    it('renders the indicator variant', function indicatorExample() {
      expect(renderToString(<IndicatorExample />)).toMatchSnapshot();
    });

    it('renders the inline design', function inlineDesign() {
      expect(renderToString(<DefaultExample design="inline" />)).toMatchSnapshot();
    });
  });
});
