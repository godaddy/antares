# Component decision tree

Use this when the user has not named a component, when alternatives overlap, or when replacing custom UI. Choose the interaction first. Follow the linked patterns for anatomy, state and required children.

## 1. Is the user entering or selecting a value?

For field composition, read [fields and validation](composition-patterns.md#fields-and-validation).

- Short text, email, search or password → `TextField` with `Input`.
- Multiline text → `TextField` with `TextArea`.
- Exact number, currency or stepper → `NumberField`; bounded continuous adjustment → `RangeField`.
- Independent boolean or agreement → `Checkbox`; related independent options → `CheckboxGroup`.
- Immediate on/off setting → `Switch`; one answer among visible form options → `RadioGroup` with `Radio`.
- Popup form selection → `Select`; an always-visible selectable collection → `ListBox`. For autocomplete/free-text filtering, see the API gaps below.
- Compact exclusive view/mode → `SegmentedController`; contextual pressed actions such as Bold/Italic → `ToggleButtonGroup` with `ToggleButton`.
- Selectable/removable pills → `ChipGroup`; a standalone pill action → `ChipButton`. See [collections](composition-patterns.md#collections-and-actions).
- Date grid always visible → `Calendar` or `RangeCalendar`; compact field opening a grid → `DatePicker` or `DateRangePicker`. See [dates](composition-patterns.md#dates-and-locale).
- Browse for files → `FileTrigger`; drag/drop target → `DropZone`. The app handles validation/upload. See [file input](composition-patterns.md#file-input).

## 2. Is this an action or navigation?

- Perform an action → `Button`; navigate with button styling → `LinkButton`.
- Dismiss an overlay → `CloseButton`; enhance an existing visual child with press behavior → `Pressable`.
- Choose a command from an action list → `MenuTrigger` with `Menu`; use a Popover for a general interactive form.
- Static/linked content surface → `Card`; selectable/action card collection → `CardGroup`.

Read [actions and slots](composition-patterns.md#actions-slots-and-state) or [collections](composition-patterns.md#collections-and-actions) for these structures. Ordinary inline links use semantic anchors or the application's router link.

## 3. Is content revealed, switched or layered?

- Reveal one section in place → `Collapsible`; coordinate related sections → `Accordion`.
- Expand a rail/panel within page flow → `InlineDrawer`.
- Replace peer panels in one view → `Tabs`.
- Communicate wizard stages → `ProgressSteps` with `ProgressStep`.
- Move through a dataset's pages → `Pagination`; a passive current-page dot indicator (one dot per page, no ellipsis or page-omission support) → `PaginationDots`.
- Browse sequential gallery/feature panels → `Carousel`.

See [disclosure and tabs](composition-patterns.md#disclosure-and-tabs) and [progress, pagination and feedback](composition-patterns.md#progress-pagination-and-feedback).

For layered content, read [modal layers](composition-patterns.md#modal-layers):

- Non-interactive hover/focus help → `TooltipTrigger` with `Tooltip`.
- Anchored interactive content → `PopoverTrigger` with `Popover`.
- Blocking centered task/confirmation → `ModalTrigger` with `Modal`.
- Modal edge panel or bottom sheet → `DrawerTrigger` with `Drawer`.

## 4. Is this information, feedback or data?

- In-page live message → `Alert`; field validation → `FieldError` inside its field.
- Static status/category → `Tag`; selection/removal belongs to Chip.
- Operation progress → `ProgressBar` or compact `CircularProgress`; a numeric input belongs to RangeField.
- Text-first KPI/trend → `MetricsLockup`.
- Category comparison → `BarChart`; continuous/time trend → `LineChart`; few parts of a whole → `DonutChart`; one measure against a scale → `GaugeChart`.
- Content still loading → `Skeleton`, composed into the shape of the content it previews.

Read [charts](charts.md) for chart data/accessors, dimensions, axes, legends and accessibility; read [progress, pagination and feedback](composition-patterns.md#progress-pagination-and-feedback) for feedback and navigation contracts.

For content presentation, read [layout and styling](layout-and-styling.md):

- Body/secondary copy → `Text`/`Detail`; semantic title → `Heading`; coordinated eyebrow/title/body → `TextLockup`.
- Person/entity identity → `Avatar`; image → `Image`; Antares SVG → `Icon`.

## 5. How should it be arranged?

Read [layout and styling](layout-and-styling.md) for composition and responsive rules.

- One-dimensional row/column → `Flex`; two-dimensional placement → `Grid`; surface/semantic wrapper → `Box`.
- Interior regions → `Header`, `Content`, `Footer`, `ButtonGroup`, `Group`, `CornerActions`.
- Consistent adopted component size → optional `SizeProvider`.

## API gaps

Do not infer Antares exports such as `Combobox`, `Table`, `Toast`, `EmptyState`, `NativeSelect`, `Link`, `Breadcrumb`, `Sidebar` or `FileUpload` from other libraries. Check the installed export map first. When a required component is unavailable, use semantic HTML or the application's established solution. A separate RAC dependency is an option when its API and styling fit the requirement; it does not create an Antares export. For empty states, Antares typography, media, actions and layout can form a suitable composition.
