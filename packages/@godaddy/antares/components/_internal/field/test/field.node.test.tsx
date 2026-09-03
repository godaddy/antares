import { describe, expect, it } from 'vitest';
import { isValidElement, type ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { normalizeFieldChildren } from '#components/_internal/field';
import { Button } from '#components/button';
import { DatePicker } from '#components/date-picker';
import { FieldError } from '#components/field-error';
import { Input } from '#components/input';
import { Label } from '#components/label';
import { Popover } from '#components/popover';
import { Group } from '#components/structure';
import { Text } from '#components/text';

/** Stand-ins for a root's presets, so the test asserts placement rather than a component's markup. */
function Control() {
  return null;
}

function Overlay() {
  return null;
}

/** A collection item: it fills no field slot, so the field wraps it. */
function Item({ children }: { children?: ReactNode }) {
  return <span>{children}</span>;
}

const pickerSlots = { control: <Control />, overlay: <Overlay /> };
const collectionSlots = {
  control: <Control />,
  items: function wrapItems(items: ReactNode[]) {
    return <Group>{items}</Group>;
  }
};

/** The component of each normalized child, so expectations read as the resulting interior. */
function interiorOf(children: ReactNode) {
  return (children as ReactNode[]).map(function typeOf(child) {
    return isValidElement(child) ? child.type : child;
  });
}

describe('@godaddy/antares', function antares() {
  describe('#normalizeFieldChildren', function normalize() {
    it('leaves the interior alone when the root fills in nothing', function noSlots() {
      const children = <Label>Event date</Label>;

      expect(normalizeFieldChildren(children)).toBe(children);
    });

    it('inserts both presets after the label', function insertsPresets() {
      const children = <Label>Event date</Label>;

      expect(interiorOf(normalizeFieldChildren(children, pickerSlots))).toEqual([Label, Control, Overlay]);
    });

    it('inserts the control after the last label only', function afterLastLabel() {
      const children = (
        <>
          <Label>One</Label>
          <Label>Two</Label>
        </>
      );

      expect(interiorOf(normalizeFieldChildren(children, pickerSlots))).toEqual([Label, Label, Control, Overlay]);
    });

    it('inserts the control first when there is no label', function noLabel() {
      const children = <FieldError>Required</FieldError>;

      expect(interiorOf(normalizeFieldChildren(children, pickerSlots))).toEqual([Control, FieldError, Overlay]);
    });

    it('keeps the description and error where they were written', function keepsOrder() {
      const children = (
        <>
          <Label>Event date</Label>
          <FieldError>Required</FieldError>
          <Text slot="description">Pick a day</Text>
        </>
      );

      expect(interiorOf(normalizeFieldChildren(children, pickerSlots))).toEqual([
        Label,
        Control,
        FieldError,
        Text,
        Overlay
      ]);
    });

    it('recognizes a composed Group as the control', function composedGroup() {
      const children = (
        <>
          <Label>Event date</Label>
          <Group>
            <Button slot="trigger">Open</Button>
          </Group>
        </>
      );

      expect(interiorOf(normalizeFieldChildren(children, pickerSlots))).toEqual([Label, Group, Overlay]);
    });

    it('recognizes a bare trigger Button as the control', function bareTrigger() {
      const children = <Button slot="trigger">Open</Button>;

      expect(interiorOf(normalizeFieldChildren(children, pickerSlots))).toEqual([Button, Overlay]);
    });

    it('recognizes a bare Input as the control', function bareInput() {
      const children = <Input />;

      expect(interiorOf(normalizeFieldChildren(children, pickerSlots))).toEqual([Input, Overlay]);
    });

    it('recognizes a composed Popover as the overlay', function composedPopover() {
      const children = (
        <>
          <Label>Event date</Label>
          <Popover>Calendar</Popover>
        </>
      );

      expect(interiorOf(normalizeFieldChildren(children, pickerSlots))).toEqual([Label, Control, Popover]);
    });

    it('recognizes the root preset a consumer wrote themselves', function writtenPreset() {
      const children = (
        <>
          <Label>Event date</Label>
          <Control />
          <Overlay />
        </>
      );

      expect(normalizeFieldChildren(children, pickerSlots)).toBe(children);
    });

    it('wraps loose items where the first one was written', function wrapsItems() {
      const children = (
        <>
          <Label>Coffee</Label>
          <Text slot="description">Pick one</Text>
          <Item>Espresso</Item>
          <Item>Latte</Item>
        </>
      );
      const normalized = normalizeFieldChildren(children, {
        items: collectionSlots.items
      }) as ReactNode[];

      expect(interiorOf(normalized)).toEqual([Label, Text, Group]);
      expect(interiorOf((normalized[2] as { props: { children: ReactNode } }).props.children)).toEqual([Item, Item]);
    });

    it('inserts the control alongside wrapped items', function itemsAndControl() {
      const children = (
        <>
          <Label>Coffee</Label>
          <FieldError>Required</FieldError>
          <Item>Espresso</Item>
        </>
      );

      expect(interiorOf(normalizeFieldChildren(children, collectionSlots))).toEqual([
        Label,
        Control,
        FieldError,
        Group
      ]);
    });

    it('looks through a fragment for the children it holds', function throughFragments() {
      const children = (
        <>
          <Label>Event date</Label>
          <>
            <Group>
              <Button slot="trigger">Open</Button>
            </Group>
          </>
        </>
      );

      expect(interiorOf(normalizeFieldChildren(children, pickerSlots))).toEqual([Label, Group, Overlay]);
    });

    it('fills in the interior a render function returns', function renderFunction() {
      const html = renderToString(<DatePicker>{() => <Label>Event date</Label>}</DatePicker>);

      // The inserted DatePickerControl renders the trigger button and its placeholder.
      expect(html).toContain('slot="trigger"');
      expect(html).toContain('Select a date');
    });
  });
});
