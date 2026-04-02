import{j as e}from"./iframe-BdDbKpSa.js";import{useMDXComponents as t}from"./index-D-sdQ1rQ.js";import{M as r}from"./blocks-pwUMJHnq.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BcAN-i6Q.js";import"./index-B5kS4cU8.js";import"./index-CpEq7wEi.js";import"./index-DrFu-skq.js";function i(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Architecture/PDRs/Dismiss"}),`
`,e.jsx(n.h1,{id:"dismiss-button",children:"Dismiss Button"}),`
`,e.jsx(n.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsx(n.p,{children:`Provide a visually hidden, focusable dismissal control that ensures users
(including screen reader users) can reliably dismiss modal or popup content via
linear navigation. This control complements ESC and outside‑click behavior, and
is intended to be placed at the start and end of the focus boundary of
dismissible overlays.`}),`
`,e.jsx(n.h2,{id:"rationale",children:"Rationale"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessibility"}),`: Screen reader users navigating linearly need a guaranteed,
focusable “escape” inside modal focus traps (in addition to ESC/outside-click).`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Composition-first"}),": We can achieve this with ",e.jsx(n.code,{children:"VisuallyHidden"})," + ",e.jsx(n.code,{children:"Container"}),`
(rendered as a native `,e.jsx(n.code,{children:"button"}),`), keeping the implementation simple and
transparent.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Consistency"}),`: By standardizing the recipe, MFEs and versions can implement
a11y dismissal consistently without introducing extra context or state.`]}),`
`]}),`
`,e.jsx(n.h3,{id:"unique-attributes",children:"Unique Attributes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Visually hidden, focusable control that triggers dismissal"}),`
`,e.jsx(n.li,{children:"Works alongside ESC and outside-click behaviors from React Aria’s overlay hooks"}),`
`,e.jsx(n.li,{children:"Slot-friendly, no custom context, compatible across MFEs/versions"}),`
`]}),`
`,e.jsx(n.h2,{id:"composition",children:"Composition"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import * as React from 'react';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { VisuallyHidden } from '@bento/visually-hidden';
import { Container } from '@bento/container';

export interface DismissProps {
  onDismiss?: () => void;
  ariaLabel?: string;
  className?: string | ((state: Record<string, unknown>) => string);
  style?: React.CSSProperties | ((state: Record<string, unknown>) => React.CSSProperties);

  // Optional slot to customize the VisuallyHidden wrapper
  slots?: {
    hidden?:
      | ((args: { props: Record<string, unknown>; children: React.ReactNode }) => React.ReactNode)
      | Record<string, unknown>;
  };
}

export const Dismiss = withSlots(
  'BentoDismiss',
  function Dismiss(args: DismissProps) {
    const { props, apply } = useProps(args, {});
    const { onDismiss, ariaLabel = 'Dismiss' } = props;

    function handleClick() {
      onDismiss?.();
    }

    return (
      <VisuallyHidden slot="hidden">
        <Container
          {...apply(
            {
              as: 'button',
              'aria-label': ariaLabel,
              tabIndex: -1,
              // Defensive fallback: width/height set for some SRs while inside VisuallyHidden
              style: { width: 1, height: 1 }
            },
            ['children', 'onDismiss']
          )}
          onClick={handleClick}
        />
      </VisuallyHidden>
    );
  }
);
`})}),`
`,e.jsx(n.h2,{id:"primitive-composition",children:"Primitive Composition"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"@bento/visually-hidden"})," — visually hides content while keeping it operable by assistive tech"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"@bento/container"})," — polymorphic element used to render the native ",e.jsx(n.code,{children:"button"})," affordance"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"@bento/slots"})," + ",e.jsx(n.code,{children:"@bento/use-props"})," — slot-based composition"]}),`
`]}),`
`,e.jsx(n.h2,{id:"slot-map",children:"Slot Map"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Slot Name"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Required"}),e.jsx(n.th,{children:"Default Fallback"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"hidden"})}),e.jsx(n.td,{children:"Customize/replace VisuallyHidden wrapper"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"Yes"})]})})]}),`
`,e.jsx(n.p,{children:"Notes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"hidden"})," as an object slot to merge props (e.g., className, as) into the default wrapper, or as a function slot to fully replace the wrapper."]}),`
`,e.jsxs(n.li,{children:["Placement of this primitive remains controlled by the parent composite (e.g., first/last in Overlay ",e.jsx(n.code,{children:"content"}),")."]}),`
`]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsx(n.h3,{id:"dismissprops",children:"DismissProps"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onDismiss"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"undefined"})}),e.jsx(n.td,{children:"Called when the dismiss button is activated"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ariaLabel"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:'"Dismiss"'})}),e.jsx(n.td,{children:"Accessible label, should be localized"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"...rest"})}),e.jsxs(n.td,{children:["All other props supported by ",e.jsx(n.code,{children:"@bento/container"})," when ",e.jsx(n.code,{children:'as="button"'})," (via ",e.jsx(n.code,{children:"apply"}),")"]}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"ClassName/style as render props, data attributes, etc."})]})]})]}),`
`,e.jsx(n.p,{children:"Behavioral requirements:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Renders as a native button with ",e.jsx(n.code,{children:'type="button"'})," and ",e.jsx(n.code,{children:"tabIndex={-1}"}),"."]}),`
`,e.jsxs(n.li,{children:["Wrapped in ",e.jsx(n.code,{children:"VisuallyHidden"})," for SR visibility without visual chrome."]}),`
`,e.jsx(n.li,{children:"Keeps the control visually hidden while remaining screen-reader operable."}),`
`]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.p,{children:["Place at the very start and end of the overlay ",e.jsx(n.code,{children:"content"}),` slot so
forward/backward navigation always encounters a dismiss target:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Container slot="content" className="dialog">
  <Dismiss onDismiss={() => onOpenChange(false)} />

  <Text as="h2">Title</Text>
  <Text>Description</Text>
  <Container as="button" onClick={() => onOpenChange(false)}><Text>Close</Text></Container>

  <Dismiss onDismiss={() => onOpenChange(false)} />
  {/* Both SR-only dismiss controls complement ESC/outside-click and a visible close */}
</Container>
`})}),`
`,e.jsx(n.h2,{id:"behavior-and-a11y",children:"Behavior and a11y"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Focusable and operable by SR users (linear navigation) and keyboard users."}),`
`,e.jsxs(n.li,{children:["Complements ESC/outside-click handling from ",e.jsx(n.code,{children:"useModalOverlay"})," + Focus containment from ",e.jsx(n.code,{children:"FocusLock"}),"."]}),`
`,e.jsxs(n.li,{children:["Works with ",e.jsx(n.code,{children:"Portal"})," and ",e.jsx(n.code,{children:"Stack"}),"—these controls render inside the same container as the overlay content."]}),`
`]}),`
`,e.jsx(n.h2,{id:"react-aria-or-external-hook-integration",children:"React Aria or External Hook Integration"}),`
`,e.jsxs(n.p,{children:[`Equivalent in purpose to React Aria’s DismissButton: a visually hidden button
that calls `,e.jsx(n.code,{children:"onDismiss"}),` and is intended to be placed at the start and end of
modal content for linear navigation dismissal.`]}),`
`,e.jsxs(n.p,{children:["Reference source: React Aria DismissButton — ",e.jsx(n.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/DismissButton.tsx",rel:"nofollow",children:"github.com/adobe/react-spectrum/.../DismissButton.tsx"})]}),`
`,e.jsx(n.h3,{id:"internal-requirements-aligned-with-react-arias-intent",children:"Internal requirements (aligned with React Aria’s intent)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Element: render a native ",e.jsx(n.code,{children:"button"})," via ",e.jsx(n.code,{children:'Container as="button"'})]}),`
`,e.jsxs(n.li,{children:["Labeling: ",e.jsx(n.code,{children:"aria-label"})," default “Dismiss” (localizable by consumers)"]}),`
`,e.jsxs(n.li,{children:["Focus: ",e.jsx(n.code,{children:"tabIndex={-1}"})," to avoid tab order while remaining SR-operable"]}),`
`,e.jsxs(n.li,{children:["Visual hiding: wrap in ",e.jsx(n.code,{children:"VisuallyHidden"}),"; add ",e.jsx(n.code,{children:"style={{ width: 1, height: 1 }}"})," as a defensive fallback"]}),`
`,e.jsxs(n.li,{children:["Handler: ",e.jsx(n.code,{children:"onClick"})," → ",e.jsx(n.code,{children:"onDismiss"})," (if provided)"]}),`
`]}),`
`,e.jsx(n.h2,{id:"integration-tips",children:"Integration tips"}),`
`,e.jsxs(n.p,{children:["Keep inside the focus boundary (",e.jsx(n.code,{children:"FocusLock"}),") and in the same container as overlay content."]}),`
`,e.jsx(n.h2,{id:"nonmodal-surfaces",children:"Non‑modal surfaces"}),`
`,e.jsx(n.p,{children:`Skip dismiss controls for surfaces that aren’t focus-trapped (e.g., simple
tooltips). Use them when dismissal is required and linear navigation must always
find an exit.`}),`
`,e.jsx(n.h2,{id:"expected-usage-and-placement",children:"Expected usage and placement"}),`
`,e.jsx(n.h3,{id:"where-it-should-be-used",children:"Where it SHOULD be used"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Modal dialogs/overlays (required): place one at the start and one at the end of the ",e.jsx(n.code,{children:"content"})," slot. Complements visible close, ESC, and outside‑click."]}),`
`,e.jsx(n.li,{children:"Drawers/Sheets (modal variants) (required): same placement as modals."}),`
`,e.jsx(n.li,{children:"Popovers/Menus (recommended when dismissible without a visible close): include start/end dismiss controls to ensure screen reader users can exit via linear navigation."}),`
`,e.jsx(n.li,{children:"Coachmarks/Tour steps (recommended when dismissible): include when the step can be dismissed; otherwise provide explicit action buttons."}),`
`]}),`
`,e.jsx(n.h3,{id:"where-it-may-be-used",children:"Where it MAY be used"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Combobox/Select popovers (recommended): helps screen reader users exit the popup even when focus is managed on the field/trigger."}),`
`,e.jsx(n.li,{children:"Non‑modal anchored popovers (optional): omit if ESC/outside‑click and return‑to‑trigger are sufficient; include only if testing shows SR users struggle to dismiss."}),`
`]}),`
`,e.jsx(n.h3,{id:"where-it-should-not-be-used",children:"Where it should NOT be used"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Tooltips: non‑interactive, no focus trap."}),`
`,e.jsx(n.li,{children:"Toasts/Growls: not focus‑trapped; use a visible close if needed."}),`
`,e.jsx(n.li,{children:"Non‑dismissible/legal consent: provide explicit action buttons instead of a generic dismiss."}),`
`]}),`
`,e.jsx(n.h3,{id:"placement-rules",children:"Placement rules"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Put a dismiss control immediately inside the ",e.jsx(n.code,{children:"content"})," slot at the first and last focusable positions."]}),`
`,e.jsx(n.li,{children:"Maintain a visible close button for sighted users, dismiss buttons are SR‑only safeguards."}),`
`,e.jsxs(n.li,{children:["Provide a localizable ",e.jsx(n.code,{children:"aria-label"})," (default “Dismiss”)."]}),`
`]})]})}function p(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{p as default};
