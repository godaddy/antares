import { describe, expect, it } from 'vitest';
import { useContext, type Context, type ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { ButtonContext, GroupContext, LabelContext, Provider as RACProvider } from 'react-aria-components';
import { Field, FieldSlots } from '#components/_internal/field';
import { Button } from '#components/button';
import { Group } from '#components/structure';
import { Input } from '#components/input';

/** Reads a button slot's resolved props out of context, so a test can assert what the field published. */
function SlotProbe({ slot }: { slot: string }) {
  const context = useContext(ButtonContext) as { slots?: Record<string, Record<string, unknown>> } | null;
  const props = context?.slots?.[slot] ?? {};

  return <i data-probe={JSON.stringify({ variant: props.variant, size: props.size, isDisabled: props.isDisabled })} />;
}

/** Reads the chrome a context carries, so a test can assert it reaches the part. */
function ChromeProbe({ name, context }: { name: string; context: Context<unknown> }) {
  const value = useContext(context) as { className?: string; isDisabled?: boolean } | null;

  return <i data-probe={name} data-class={value?.className ?? ''} data-disabled={String(value?.isDisabled)} />;
}

function probeOf(html: string, index = 0) {
  const matches = [...html.matchAll(/data-probe="([^"]*)"/g)];
  const raw = matches[index]?.[1] ?? '';

  return raw.replaceAll('&quot;', '"');
}

describe('@godaddy/antares', function antares() {
  describe('#Field', function field() {
    it('publishes control and trigger chrome to the button slots', function publishesChrome() {
      const html = renderToString(
        <Field interior="box" size="sm">
          <SlotProbe slot="control" />
          <SlotProbe slot="trigger" />
        </Field>
      );

      expect(JSON.parse(probeOf(html, 0))).toEqual({ variant: 'control', size: 'sm' });
      expect(JSON.parse(probeOf(html, 1))).toEqual({ variant: 'trigger', size: 'sm' });
    });

    it('publishes the disabled state on the box group', function boxGroupOwnsDisabled() {
      const html = renderToString(
        <Field interior="box" isDisabled>
          <SlotProbe slot="control" />
          <ChromeProbe name="group" context={GroupContext as Context<unknown>} />
        </Field>
      );

      expect(JSON.parse(probeOf(html))).toEqual({ variant: 'control', isDisabled: true });
      expect(html).toMatch(/data-probe="group"[^>]*data-disabled="true"/);
    });

    it('publishes class hooks for the label and the box group', function publishesClassHooks() {
      const html = renderToString(
        <Field interior="box">
          <ChromeProbe name="label" context={LabelContext as Context<unknown>} />
          <ChromeProbe name="group" context={GroupContext as Context<unknown>} />
        </Field>
      );

      expect(probeOf(html, 0)).toBe('label');
      expect(html).toMatch(/data-probe="label" data-class="[^"]+"/);
      expect(html).toMatch(/data-probe="group" data-class="[^"]+"/);
    });

    it('leaves a slot the root wires itself untouched', function keepsRootWiring() {
      const html = renderToString(
        <RACProvider values={[[ButtonContext, { slots: { decrement: { 'aria-label': 'Decrease' } } }]]}>
          <Field interior="box">
            <Group>
              <Button slot="decrement" />
            </Group>
          </Field>
        </RACProvider>
      );

      expect(html).toContain('aria-label="Decrease"');
    });
  });

  describe('#FieldSlots', function slots() {
    /** A root's own content default for a slot the field only publishes chrome for. */
    function stepper(children: ReactNode) {
      return { decrement: { children } };
    }

    it('puts a root content default under the field chrome', function rootContent() {
      const html = renderToString(
        <Field interior="box" size="sm" slotDefaults={{ buttons: stepper('minus') }}>
          <Group>
            <Button slot="decrement" />
          </Group>
        </Field>
      );

      // Chrome from the field, content from the root.
      expect(html).toContain('minus');
      expect(html).toContain('control');
      expect(html).toContain('sm');
    });

    it('lets a local prop beat both the chrome and the root default', function localWins() {
      const html = renderToString(
        <Field interior="box" slotDefaults={{ buttons: stepper('minus') }}>
          <Group>
            <Button slot="decrement" variant="primary">
              less
            </Button>
          </Group>
        </Field>
      );

      expect(html).toContain('less');
      expect(html).not.toContain('minus');
    });

    it('publishes a group default a composed Group picks up', function groupDefault() {
      const html = renderToString(
        <Field slotDefaults={{ group: { role: 'presentation' } }}>
          <Group>
            <Input />
          </Group>
        </Field>
      );

      expect(html).toContain('role="presentation"');
    });

    it('publishes without a Field, for a control composed in another field', function standalone() {
      const html = renderToString(
        <FieldSlots buttons={stepper('minus')}>
          <Group>
            <Button slot="decrement" />
          </Group>
        </FieldSlots>
      );

      expect(html).toContain('minus');
    });

    it('keeps an unslotted button working when a root publishes slots', function defaultSlotSurvives() {
      const html = renderToString(
        <Field interior="box" slotDefaults={{ buttons: stepper('minus') }}>
          <Button>Go</Button>
        </Field>
      );

      expect(html).toContain('Go');
    });
  });
});
