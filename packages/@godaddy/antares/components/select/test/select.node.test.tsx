import { SelectStaticExample } from '../examples/select-static.tsx';
import { SelectDynamicExample } from '../examples/select-dynamic.tsx';
import { SelectControlledExample } from '../examples/select-controlled.tsx';
import { SelectMultipleExample } from '../examples/select-multiple.tsx';
import { SelectSizesExample } from '../examples/select-sizes.tsx';
import { SelectLabelStylesExample } from '../examples/select-label-styles.tsx';
import { SelectValidationExample } from '../examples/select-validation.tsx';
import { SelectSectionsExample } from '../examples/select-sections.tsx';
import { SelectRenderPropsExample } from '../examples/select-render-props.tsx';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';

describe('@godaddy/uxcore', function uxcore() {
  describe('#examples', function examplesTests() {
    it('renders SelectStaticExample', function staticExample() {
      const result = renderToString(<SelectStaticExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SelectDynamicExample with items prop', function dynamicExample() {
      const result = renderToString(<SelectDynamicExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SelectControlledExample', function controlledExample() {
      const result = renderToString(<SelectControlledExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SelectMultipleExample', function multipleExample() {
      const result = renderToString(<SelectMultipleExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SelectSizesExample', function sizesExample() {
      const result = renderToString(<SelectSizesExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SelectLabelStylesExample', function labelStylesExample() {
      const result = renderToString(<SelectLabelStylesExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SelectValidationExample', function validationExample() {
      const result = renderToString(<SelectValidationExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SelectSectionsExample', function sectionsExample() {
      const result = renderToString(<SelectSectionsExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SelectRenderPropsExample', function renderPropsExample() {
      const result = renderToString(<SelectRenderPropsExample />);
      expect(result).toMatchSnapshot();
    });
  });
});
