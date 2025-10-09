import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import React from 'react';
import { BasicExample } from '../examples/basic.tsx';
import { AsExample } from '../examples/as.tsx';
import { BuildingBlockExample } from '../examples/building-block.tsx';
import { NestedExample } from '../examples/nested.tsx';
import assume from 'assume';

describe('@bento/container examples', function examples() {
  it('renders BasicExample', function rendersBasicExample() {
    const { container } = render(<BasicExample />);
    assume(container.innerHTML).does.include('Hello from Container');
  });

  it('renders AsExample', function rendersAsExample() {
    const { container } = render(<AsExample />);
    const article = container.querySelector('article');
    assume(article).does.exist();
    assume(article?.textContent).equals('This is an article element');
  });

  it('renders BuildingBlockExample', function rendersBuildingBlockExample() {
    const { container } = render(<BuildingBlockExample />);
    const box = container.firstChild as HTMLElement;
    assume(box?.className).does.include('box');
    assume(box?.textContent).equals('This is a custom Box component built on Container');
  });

  it('covers all elevation branches in building-block', function coversElevationBranches() {
    const { container: lowContainer } = render(<BuildingBlockExample elevation="low" />);
    const lowBox = lowContainer.firstChild as HTMLElement;
    assume(lowBox?.style.boxShadow).includes('0px 1px 3px');

    const { container: highContainer } = render(<BuildingBlockExample elevation="high" />);
    const highBox = highContainer.firstChild as HTMLElement;
    assume(highBox?.style.boxShadow).includes('0px 10px 20px');
  });

  it('renders NestedExample', function rendersNestedExample() {
    const { container } = render(<NestedExample />);
    const main = container.querySelector('main');
    const header = container.querySelector('header');
    const section = container.querySelector('section');
    const footer = container.querySelector('footer');

    assume(main).does.exist();
    assume(header).does.exist();
    assume(section).does.exist();
    assume(footer).does.exist();
    assume(header?.textContent).equals('Header');
    assume(section?.textContent).equals('Main content');
    assume(footer?.textContent).equals('Footer');
  });
});
