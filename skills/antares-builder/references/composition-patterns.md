# Antares composition patterns

Read only the sections relevant to the task. These shapes are verified against the package's component READMEs and examples. Use the consumer's installed types for detailed props and adapt data and handlers to the product. RAC conventions explain behavior but do not replace Antares's explicit children and slots.

Most composed parts also publish a matching `*Context` (for example `ButtonContext`, `InputContext`, `AccordionContext`, `ChipContext`) that lets an advanced consumer set subtree-wide defaults; ordinary composition through explicit children and props never needs these.

## Actions, slots and state

`Button` uses RAC button behavior; `LinkButton` uses link behavior. `Pressable` adds press/focus/hover behavior to exactly one child that forwards its ref and DOM/ARIA props, without rendering a wrapper. Prefer the semantic Button/LinkButton when they fit. Name icon-only controls on the control itself.

Parents publish behavior and presentation through slots. Keep field triggers as `Button slot="trigger"`, steppers as `slot="decrement"`/`slot="increment"`, and dismissal as `slot="close"`. Slot names are parent-specific. Button omits RAC's `isPending` prop; use application-owned pending state and supported disabled/content props.

Match the actual state model: field `value`/`onChange`, collection `selectedKeys`/`onSelectionChange`, boolean `isSelected`/`onChange`, and disclosure `isExpanded`/`onExpandedChange` are not interchangeable. Use defaults for uncontrolled state, or update state from the controlled callback; do not combine both modes accidentally.

## Fields and validation

`TextField` and `NumberField` provide the field relationship, while children provide visible parts. The field's `isInvalid` state controls whether `FieldError` renders. Use `Text slot="description"` for persistent help.

Set `name` for native form submission and use supported root props such as `isRequired`, `isDisabled` and `isInvalid`. Keep the application's form/validation library and connect its state to the exact Antares value/change API. Place controls in a semantic form and choose submit/reset button types deliberately. On a failed submission, move focus to the first invalid field so assistive technology announces its error immediately; do not leave focus on the submit control. The following field fragments assume `emailError` comes from that validation state.

```tsx
import { Button, FieldError, Group, Input, Label, NumberField, Text, TextArea, TextField } from '@godaddy/antares';

<TextField name="email" type="email" isRequired isInvalid={Boolean(emailError)}>
  <Label>Email</Label>
  <Input placeholder="you@example.com" />
  <Text slot="description">We'll send receipts here.</Text>
  <FieldError>{emailError}</FieldError>
</TextField>;

<TextField name="message">
  <Label>Message</Label>
  <TextArea />
</TextField>;

<NumberField defaultValue={1} minValue={1} maxValue={10}>
  <Label>Quantity</Label>
  <Group>
    <Button slot="decrement" />
    <Input />
    <Button slot="increment" />
  </Group>
</NumberField>;
```

An `Input` inside NumberField is numeric because the field supplies its context. Do not switch it to a plain TextField for exact numeric behavior. A `Button slot="control"` inside a TextField `Group` is an interactive affix. For a required group of independent options, use `CheckboxGroup`; for one exclusive answer, `RadioGroup`. Their composed structure is `Label`, `Group` with items, optional description and `FieldError`.

`CheckboxIndicator` supplies the visual check in custom Checkbox compositions. A standalone Checkbox or Switch needs visible children or an accessible name. `RangeField` uses RAC Slider behavior and supports multiple thumb values; supply corresponding `thumbLabels` for a range. The matching field-part contexts are `InputContext`, `TextAreaContext`, `LabelContext` and `FieldErrorContext`.

```tsx
import { Checkbox, CheckboxGroup, Group, Label, Radio, RadioGroup } from '@godaddy/antares';

<CheckboxGroup name="interests">
  <Label>Interests</Label>
  <Group>
    <Checkbox value="design">Design</Checkbox>
    <Checkbox value="code">Code</Checkbox>
  </Group>
</CheckboxGroup>;

<RadioGroup name="plan">
  <Label>Plan</Label>
  <Group>
    <Radio value="basic">Basic</Radio>
    <Radio value="pro">Pro</Radio>
  </Group>
</RadioGroup>;
```

## Collections and actions

`Select` explicitly composes a Label, trigger and `SelectOptions` containing `SelectItem` children. An empty trigger receives the value/chevron; use `SelectValue` when writing custom trigger content. `ListBox` contains `ListBoxItem` children. Both use RAC collection behavior.

```tsx
import { Button, Label, ListBox, ListBoxItem, Select, SelectItem, SelectOptions } from '@godaddy/antares';

<Select name="region" placeholder="Choose a region">
  <Label>Region</Label>
  <Button slot="trigger" />
  <SelectOptions>
    <SelectItem id="na">North America</SelectItem>
    <SelectItem id="eu">Europe</SelectItem>
  </SelectOptions>
</Select>;

<ListBox aria-label="Available regions" selectionMode="single">
  <ListBoxItem id="na">North America</ListBoxItem>
  <ListBoxItem id="eu">Europe</ListBoxItem>
</ListBox>;
```

Use stable IDs/keys for collections. Give composed items `textValue` when visible content is not straightforward text, so typeahead and accessible naming work. Controlled collection APIs often use `selectedKeys`/`onSelectionChange`, while `Select` uses `value`/`onChange`; check the exact component.

- `MenuTrigger` wraps a trigger and `Menu`; commands are `MenuItem` children. `MenuGroup` groups commands, `MenuSeparator` divides them, and `SubmenuTrigger` connects a submenu. Preserve the menu's keyboard model; arbitrary form controls belong in a Popover.
- `SegmentedController` contains `SegmentedControllerItem value="..."` children. Its single string `value`/`defaultValue` pairs with `onSelectionChange(value)`. `ToggleButtonGroup` instead uses selection keys and `ToggleButton id="..."` children. Both build on RAC toggle behavior.
- `ChipGroup` + `ChipList` + `Chip` wrap RAC TagGroup/TagList/Tag behavior. When removal is enabled, the group's `onRemove` must update the consumer's item collection. `ChipButton` is a standalone action, with its own `ChipContext`.
- `CardGroup` + `Card` wrap RAC GridList behavior. Name the group and give composed cards stable IDs and `textValue`; `CardSelectionIndicator` optionally displays selection. A standalone Card can be static or use `href`; keep nested controls out of a standalone card link.

## Dates and locale

`Calendar` and `RangeCalendar` are inline; date pickers show a field and open one in a popover. `CalendarDate` helpers come from the public `date` subpath. The date picker trigger is an explicitly written `Button slot="trigger"`; the matching calendar component is also explicit.

```tsx
import { Button, Calendar, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

<Calendar aria-label="Delivery date" defaultValue={parseDate('2026-10-16')} />;

<DatePicker defaultValue={parseDate('2026-10-16')}>
  <Label>Delivery date</Label>
  <Button slot="trigger" />
  <DatePickerCalendar />
</DatePicker>;
```

`DatePickerValue` customizes the single-date trigger. For a range, change to `DateRangePicker`, `DateRangePickerCalendar`, and optionally `DateRangePickerValue`; the inline equivalent is `RangeCalendar`. These build on the corresponding RAC date/calendar primitives. Use `minValue`/`maxValue` for continuous bounds and `isDateUnavailable` for scattered blocked days. Preserve date-only versus time/zoned values rather than converting everything to JavaScript Date. Localize through the consuming application's locale context.

## Disclosure and tabs

One revealable section uses `Collapsible`; related sections use an `Accordion` group. The trigger must have `slot="trigger"`, and each grouped section needs a stable ID. The Accordion controls `expandedKeys`/`onExpandedChange`; a standalone Collapsible controls `isExpanded`/`onExpandedChange`.

These wrap RAC DisclosureGroup/Disclosure/DisclosurePanel. `InlineDrawer` + `InlineDrawerPanel` use disclosure behavior while occupying page flow. Their contexts are `AccordionContext` and `CollapsibleContext`.

```tsx
import { Accordion, Button, Collapsible, CollapsiblePanel, Heading, Text } from '@godaddy/antares';

<Accordion defaultExpandedKeys={['billing']}>
  <Collapsible id="billing">
    <Heading level={2}>
      <Button slot="trigger">Billing</Button>
    </Heading>
    <CollapsiblePanel>
      <Text>Manage invoices and payment methods.</Text>
    </CollapsiblePanel>
  </Collapsible>
</Accordion>;
```

For peer panels that replace each other, use `Tabs` rather than disclosures. `TabList` needs an accessible name. Match each Tab's `id` with its panel's `id`.

```tsx
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@godaddy/antares';

<Tabs>
  <TabList aria-label="Account settings">
    <Tab id="profile">Profile</Tab>
    <Tab id="security">Security</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="profile">Profile settings</TabPanel>
    <TabPanel id="security">Security settings</TabPanel>
  </TabPanels>
</Tabs>;
```

## Modal layers

`ModalTrigger`, `DrawerTrigger`, `PopoverTrigger` and `TooltipTrigger` connect their triggers to the corresponding content and open state. Modal and Drawer use RAC DialogTrigger/ModalOverlay/Modal/Dialog; Popover is an anchored RAC dialog, and Tooltip uses description semantics. Use non-interactive content in Tooltip.

Give Modal/Drawer a `Heading slot="title"` or another accessible name. A standalone Popover anchored with `triggerRef` needs its own name. Structural regions such as Content and ButtonGroup receive the overlay's presentation through context.

```tsx
import { Button, ButtonGroup, CloseButton, Content, Heading, Modal, ModalTrigger } from '@godaddy/antares';

<ModalTrigger>
  <Button>Review order</Button>
  <Modal>
    <Heading slot="title">Review order</Heading>
    <CloseButton />
    <Content>Confirm the items before placing the order.</Content>
    <ButtonGroup>
      <Button slot="close">Back</Button>
      <Button variant="primary">Place order</Button>
    </ButtonGroup>
  </Modal>
</ModalTrigger>;
```

Wire a confirming action to application logic and close only after the action succeeds. `slot="close"` dismisses, so avoid applying it to a button that must wait for an async operation. `CloseButton` is already named and slotted. React Aria's modal stack supplies focus containment and return; do not build a second focus trap.

`FocusScope` is an advanced root-only export from `@react-aria/focus` for custom focus containment/restoration. Existing overlay behavior is the default. The structural contexts are `ContentContext`, `HeaderContext`, `FooterContext`, `ButtonGroupContext`, `GroupContext` and `CornerActionsContext`.

## File input

For file selection, `FileTrigger` wraps one pressable child. `DropZone` receives dropped items; use the exported `isFileDropItem` guard, then call `getFile()` on each narrowed item. The application validates type/size and handles upload. Pair a visible browse button with drag/drop when useful; do not rely on drag as the only path.

```tsx
import { Button, DropZone, FileTrigger, isFileDropItem, Text } from '@godaddy/antares';

<DropZone
  onDrop={async (event) => {
    const files = await Promise.all(event.items.filter(isFileDropItem).map((item) => item.getFile()));
    handleFiles(files);
  }}
>
  <Text slot="label">Drop files here or browse.</Text>
  <FileTrigger onSelect={(files) => files && handleFiles(Array.from(files))}>
    <Button>Browse files</Button>
  </FileTrigger>
</DropZone>;
```

Here `handleFiles` is the consumer application's validation/upload callback. `acceptedFileTypes` is only a picker filter; validate again before upload. Handle directory and text items separately only when the product accepts them.

`isTextDropItem` and `isDirectoryDropItem` narrow those other item types. The public `useDrop` hook is a lower-level React Aria export for a custom drop surface. FileTrigger is an Antares hidden-input/press composition; DropZone uses RAC drop behavior. Keep a keyboard-accessible browse path available.

## Progress, pagination and feedback

`ProgressBar` is composable: the label, value display, track and description are explicit children. `CircularProgress` is a compact alternative. Both represent an operation; `RangeField` accepts input and `GaugeChart` displays a measured score.

```tsx
import { Box, Label, ProgressBar, Text } from '@godaddy/antares';

<ProgressBar value={60}>
  <Label>Uploading</Label>
  <Box slot="value" />
  <Box slot="track" />
  <Text slot="description">Please keep this page open.</Text>
</ProgressBar>;
```

`Pagination` has one-based state and intentionally leaves page count, separator and page-size selector to the consumer. Give the region, previous/next buttons and single page input accessible names. `PaginationDots` does not replace page controls. For cursor-based data, omit `pageCount` and disable Next when there is no next page.

`ProgressSteps` contains `ProgressStep` children and uses zero-based `currentStep`; a step's `onPress` enables navigation. `Carousel` uses Embla rather than a RAC collection; check its installed API for slide content and controls. Keep a finite panel gallery's labels and keyboard navigation meaningful.

When a step or panel holds its own state (a Carousel's position, a form draft), keep it mounted and toggle its visibility rather than conditionally rendering it away and back in — unmounting resets that state.

`Alert` supplies a persistent in-page live alert; avoid using it for ordinary static copy. `Tag` is a static status/category span (`TagContext` provides advanced defaults). `MetricsLockup` composes a KPI label, value, trend and optional contextual tooltip.

`Skeleton` previews a loading layout; compose several to sketch text, media or cards, matching `size`/`width`/`aspectRatio`/`rounding` to the real content's shape. Each `Skeleton` is hidden from assistive technology, so mark the region it fills with `role="status"`, `aria-busy="true"` and a describing `aria-label`, then set `aria-busy` to `false` (or remove it) once real content replaces the placeholders. Its shimmer already respects reduced motion and `dir="rtl"`; no extra handling needed for those.
