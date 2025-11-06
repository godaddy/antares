import { SelectExample } from '../examples/select';
import { SelectControlledExample } from '../examples/select-controlled';
import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';

describe('@bento/select examples', function examples() {
  it('should render SelectExample', function test() {
    const { container } = render(<SelectExample />);
    const button = container.querySelector('button');

    expect(button).toBeTruthy();
  });

  it('should render SelectControlledExample', function test() {
    const { container } = render(<SelectControlledExample />);
    const button = container.querySelector('button');

    expect(button).toBeTruthy();
  });
});
