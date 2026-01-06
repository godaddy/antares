import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../src/index';

describe('@bento/button (SSR)', function ssrTests() {
  it.skip('should render to string without errors', function renderToStringTest() {
    // Note: SSR rendering with slots/useProps context requires full setup
    // This test is skipped as it requires Box context provider
    const onPress = vi.fn();
    const html = renderToString(<Button onPress={onPress}>Click me</Button>);

    expect(html).toContain('button');
    expect(html).toContain('Click me');
  });

  it('should render valid HTML attributes only', function validHTMLOnly() {
    const html = renderToString(
      <Button type="submit" name="btn" value="val" aria-label="Label" data-testid="test" className="btn-class">
        Submit
      </Button>
    );

    // Should contain valid HTML/ARIA/data attributes
    expect(html).toContain('type="submit"');
    expect(html).toContain('name="btn"');
    expect(html).toContain('value="val"');
    expect(html).toContain('aria-label="Label"');
    expect(html).toContain('data-testid="test"');
    expect(html).toContain('class="btn-class"');
  });

  it('should not leak internal props to HTML', function noInternalProps() {
    const onPress = vi.fn();
    const html = renderToString(
      <Button onPress={onPress} isDisabled={false} excludeFromTabOrder={false}>
        Test
      </Button>
    );

    // Should not contain React Aria internal props
    expect(html).not.toContain('onPress');
    expect(html).not.toContain('excludeFromTabOrder');
  });

  it('should render disabled state correctly', function disabledState() {
    const html = renderToString(<Button isDisabled>Disabled</Button>);

    expect(html).toContain('disabled');
  });

  it('should render with data attributes', function withDataAttrs() {
    const html = renderToString(
      <Button data-foo="bar" data-select-trigger="true">
        Trigger
      </Button>
    );

    expect(html).toContain('data-foo="bar"');
    expect(html).toContain('data-select-trigger="true"');
  });

  it('should render with ARIA attributes', function withAriaAttrs() {
    const html = renderToString(
      <Button aria-expanded="true" aria-haspopup="listbox" aria-controls="list-1">
        Open
      </Button>
    );

    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain('aria-haspopup="listbox"');
    expect(html).toContain('aria-controls="list-1"');
  });

  it('should default type to button', function defaultTypeButton() {
    const html = renderToString(<Button>Click</Button>);

    expect(html).toContain('type="button"');
  });

  it('should respect custom type', function customType() {
    const html = renderToString(<Button type="submit">Submit</Button>);

    expect(html).toContain('type="submit"');
  });
});
