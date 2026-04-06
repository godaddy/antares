import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { BasicExample } from '../examples/basic.tsx';
import { AsExample } from '../examples/as.tsx';
import { BuildingBlockExample } from '../examples/building-block.tsx';
import { NestedExample } from '../examples/nested.tsx';
import { EmptyExample } from '../examples/empty.tsx';
import assume from 'assume';

describe('@bento/container examples', function examples() {
  it('renders BasicExample', async function rendersBasicExample() {
    const { container } = await render(<BasicExample />);
    assume(container.innerHTML).does.include('Hello from Container');
  });

  it('renders AsExample', async function rendersAsExample() {
    const { container } = await render(<AsExample />);
    const article = container.querySelector('article');
    assume(article).does.exist();
    assume(article?.textContent).equals('This is an article element');
  });

  it('renders BuildingBlockExample', async function rendersBuildingBlockExample() {
    const { container } = await render(<BuildingBlockExample />);
    const box = container.firstChild as HTMLElement;
    assume(box?.className).does.include('box');
    assume(box?.textContent).equals('This is a custom Box component built on Container');
  });

  it('covers all elevation branches in building-block', async function coversElevationBranches() {
    const { container: lowContainer } = await render(<BuildingBlockExample elevation="low" />);
    const lowBox = lowContainer.firstChild as HTMLElement;
    assume(lowBox?.style.boxShadow).includes('0px 1px 3px');

    const { container: highContainer } = await render(<BuildingBlockExample elevation="high" />);
    const highBox = highContainer.firstChild as HTMLElement;
    assume(highBox?.style.boxShadow).includes('0px 10px 20px');
  });

  it('renders NestedExample', async function rendersNestedExample() {
    const { container } = await render(<NestedExample />);
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

  it('renders EmptyExample with backdrop', async function rendersEmptyExampleBackdrop() {
    const { container } = await render(<EmptyExample />);
    const backdrop = container.querySelector('[data-testid="backdrop"]') as HTMLElement;

    assume(backdrop).does.exist();
    assume(backdrop?.nodeName).equals('DIV');
    assume(backdrop?.childNodes.length).equals(0);
    assume(backdrop?.style.position).equals('fixed');
    assume(backdrop?.style.inset).equals('0px');
    assume(backdrop?.style.backgroundColor).equals('rgba(0, 0, 0, 0.5)');
  });

  it('renders EmptyExample with spacer', async function rendersEmptyExampleSpacer() {
    const { container } = await render(<EmptyExample />);
    const spacer = container.querySelector('[data-testid="spacer"]') as HTMLElement;

    assume(spacer).does.exist();
    assume(spacer?.nodeName).equals('DIV');
    assume(spacer?.childNodes.length).equals(0);
    assume(spacer?.style.height).equals('20px');
  });

  it('renders EmptyExample with divider', async function rendersEmptyExampleDivider() {
    const { container } = await render(<EmptyExample />);
    const divider = container.querySelector('[data-testid="divider"]') as HTMLElement;

    assume(divider).does.exist();
    assume(divider?.nodeName).equals('HR');
    assume(divider?.childNodes.length).equals(0);
    // Browser may not set border shorthand directly, check borderTop instead
    assume(divider?.style.borderTop).equals('1px solid rgb(204, 204, 204)');
    assume(divider?.style.margin).equals('1rem 0px');
  });
});
