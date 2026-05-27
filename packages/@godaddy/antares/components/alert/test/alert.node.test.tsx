import { describe, expect, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Button, LinkButton } from '@godaddy/antares';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/alert-playground.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { DismissibleExample } from '../examples/dismissible.tsx';
import { WithActionExample } from '../examples/with-action.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Alert', function alertTests() {
    it('renders the default alert', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders the playground defaults', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });

    it('renders the alert with no body (title only)', function noBody() {
      expect(renderToString(<PlaygroundExample children={''} />)).toMatchSnapshot();
    });

    it('renders all emphasis variants', function emphasesExample() {
      expect(renderToString(<EmphasesExample />)).toMatchSnapshot();
    });

    it('renders the dismissible variant', function dismissibleExample() {
      expect(renderToString(<DismissibleExample />)).toMatchSnapshot();
    });

    it('renders the alert with an action', function withActionExample() {
      expect(renderToString(<WithActionExample />)).toMatchSnapshot();
    });

    it('renders the alert without a title (children only)', function childrenOnly() {
      expect(renderToString(<DefaultExample title={undefined} />)).toMatchSnapshot();
    });

    it('renders the alert with a title and an action', function titleAndAction() {
      expect(
        renderToString(
          <DefaultExample
            actions={
              <Button variant="secondary" size="sm">
                Update
              </Button>
            }
          />
        )
      ).toMatchSnapshot();
    });

    it('renders the alert with children and actions only', function childrenAndAction() {
      expect(
        renderToString(
          <DefaultExample
            title={undefined}
            actions={
              <Button variant="secondary" size="sm">
                Update
              </Button>
            }
          />
        )
      ).toMatchSnapshot();
    });

    it('renders the alert with a custom close aria-label', function customCloseLabel() {
      expect(
        renderToString(<DefaultExample onClose={vi.fn()} ariaLabels={{ close: 'Cerrar alerta' }} />)
      ).toMatchSnapshot();
    });

    it('renders the dismissible alert without a title', function dismissibleNoTitle() {
      expect(renderToString(<DefaultExample title={undefined} onClose={vi.fn()} />)).toMatchSnapshot();
    });

    it('falls back to default close aria-label when ariaLabels has no close key', function ariaLabelsFallback() {
      expect(renderToString(<DefaultExample onClose={vi.fn()} ariaLabels={{}} />)).toMatchSnapshot();
    });

    it('renders the alert with a link action (LinkButton)', function linkAction() {
      expect(
        renderToString(
          <DefaultExample
            actions={
              <LinkButton variant="secondary" size="sm" href="https://example.com">
                Learn more
              </LinkButton>
            }
          />
        )
      ).toMatchSnapshot();
    });
  });
});
