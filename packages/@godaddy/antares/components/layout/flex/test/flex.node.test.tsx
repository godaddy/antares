import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { DirectionExample } from '../examples/direction.tsx';
import { AlignmentExample } from '../examples/alignment.tsx';
import { GapExample } from '../examples/gap.tsx';
import { WrapExample } from '../examples/wrap.tsx';
import { NavbarExample } from '../examples/navbar.tsx';
import { SidebarExample } from '../examples/sidebar.tsx';

describe('@godaddy/uxcore', function uxcore() {
  describe('#Flex', function flexTests() {
    it('renders the default flex', function rendersDefault() {
      const result = renderToString(<DefaultExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders flex with direction variations', function rendersDirection() {
      const result = renderToString(<DirectionExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders flex with alignment variations', function rendersAlignment() {
      const result = renderToString(<AlignmentExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders flex with gap variations', function rendersGap() {
      const result = renderToString(<GapExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders flex with wrap variations', function rendersWrap() {
      const result = renderToString(<WrapExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders navbar example', function rendersNavbar() {
      const result = renderToString(<NavbarExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders sidebar example', function rendersSidebar() {
      const result = renderToString(<SidebarExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the flex with custom className', function customClassName() {
      const result = renderToString(<DefaultExample className="custom-class" />);
      expect(result).toMatchSnapshot();
    });
  });
});
