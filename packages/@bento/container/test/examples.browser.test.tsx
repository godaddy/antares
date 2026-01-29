import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import React from 'react';
import { BasicExample } from '../examples/basic.tsx';
import { AsExample } from '../examples/as.tsx';
import { BuildingBlockExample } from '../examples/building-block.tsx';
import { NestedExample } from '../examples/nested.tsx';
import { EmptyExample } from '../examples/empty.tsx';
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

  it('renders EmptyExample with backdrop', function rendersEmptyExampleBackdrop() {
    const { container } = render(<EmptyExample />);
    const backdrop = container.querySelector('[data-testid="backdrop"]') as HTMLElement;

    assume(backdrop).does.exist();
    assume(backdrop?.nodeName).equals('DIV');
    assume(backdrop?.childNodes.length).equals(0);
    assume(backdrop?.style.position).equals('fixed');
    assume(backdrop?.style.inset).equals('0px');
    assume(backdrop?.style.backgroundColor).equals('rgba(0, 0, 0, 0.5)');
  });

  it('renders EmptyExample with spacer', function rendersEmptyExampleSpacer() {
    const { container } = render(<EmptyExample />);
    const spacer = container.querySelector('[data-testid="spacer"]') as HTMLElement;

    assume(spacer).does.exist();
    assume(spacer?.nodeName).equals('DIV');
    assume(spacer?.childNodes.length).equals(0);
    assume(spacer?.style.height).equals('20px');
  });

  it('renders EmptyExample with divider', function rendersEmptyExampleDivider() {
    const { container } = render(<EmptyExample />);
    const divider = container.querySelector('[data-testid="divider"]') as HTMLElement;

    assume(divider).does.exist();
    assume(divider?.nodeName).equals('HR');
    assume(divider?.childNodes.length).equals(0);
    // Browser may not set border shorthand directly, check borderTop instead
    assume(divider?.style.borderTop).equals('1px solid rgb(204, 204, 204)');
    assume(divider?.style.margin).equals('1rem 0px');
  });
});
