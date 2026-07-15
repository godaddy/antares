import{i as e}from"./preload-helper-B9XvdTIV.js";import{y as t}from"./iframe-DrFKOylz.js";import{S as n,s as r,u as i}from"./blocks-CtaUFTYg.js";import{t as a}from"./mdx-react-shim-6uPwA2Hc.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/Dismiss`}),`
`,(0,c.jsx)(t.h1,{id:`dismiss-button`,children:`Dismiss Button`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsx)(t.p,{children:`Provide a visually hidden, focusable dismissal control that ensures users
(including screen reader users) can reliably dismiss modal or popup content via
linear navigation. This control complements ESC and outside‑click behavior, and
is intended to be placed at the start and end of the focus boundary of
dismissible overlays.`}),`
`,(0,c.jsx)(t.h2,{id:`rationale`,children:`Rationale`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Accessibility`}),`: Screen reader users navigating linearly need a guaranteed,
focusable “escape” inside modal focus traps (in addition to ESC/outside-click).`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Composition-first`}),`: We can achieve this with `,(0,c.jsx)(t.code,{children:`VisuallyHidden`}),` + `,(0,c.jsx)(t.code,{children:`Container`}),`
(rendered as a native `,(0,c.jsx)(t.code,{children:`button`}),`), keeping the implementation simple and
transparent.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Consistency`}),`: By standardizing the recipe, MFEs and versions can implement
a11y dismissal consistently without introducing extra context or state.`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`unique-attributes`,children:`Unique Attributes`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Visually hidden, focusable control that triggers dismissal`}),`
`,(0,c.jsx)(t.li,{children:`Works alongside ESC and outside-click behaviors from React Aria’s overlay hooks`}),`
`,(0,c.jsx)(t.li,{children:`Slot-friendly, no custom context, compatible across MFEs/versions`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`composition`,children:`Composition`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import * as React from 'react';
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
`,(0,c.jsx)(t.h2,{id:`primitive-composition`,children:`Primitive Composition`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`@bento/visually-hidden`}),` — visually hides content while keeping it operable by assistive tech`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`@bento/container`}),` — polymorphic element used to render the native `,(0,c.jsx)(t.code,{children:`button`}),` affordance`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`@bento/slots`}),` + `,(0,c.jsx)(t.code,{children:`@bento/use-props`}),` — slot-based composition`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`slot-map`,children:`Slot Map`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Slot Name`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Required`}),(0,c.jsx)(t.th,{children:`Default Fallback`})]})}),(0,c.jsx)(t.tbody,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`hidden`})}),(0,c.jsx)(t.td,{children:`Customize/replace VisuallyHidden wrapper`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`Yes`})]})})]}),`
`,(0,c.jsx)(t.p,{children:`Notes:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Use `,(0,c.jsx)(t.code,{children:`hidden`}),` as an object slot to merge props (e.g., className, as) into the default wrapper, or as a function slot to fully replace the wrapper.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Placement of this primitive remains controlled by the parent composite (e.g., first/last in Overlay `,(0,c.jsx)(t.code,{children:`content`}),`).`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,c.jsx)(t.h3,{id:`dismissprops`,children:`DismissProps`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Prop`}),(0,c.jsx)(t.th,{children:`Type`}),(0,c.jsx)(t.th,{children:`Default`}),(0,c.jsx)(t.th,{children:`Description`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`onDismiss`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`() => void`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`undefined`})}),(0,c.jsx)(t.td,{children:`Called when the dismiss button is activated`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`ariaLabel`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`string`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`"Dismiss"`})}),(0,c.jsx)(t.td,{children:`Accessible label, should be localized`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`...rest`})}),(0,c.jsxs)(t.td,{children:[`All other props supported by `,(0,c.jsx)(t.code,{children:`@bento/container`}),` when `,(0,c.jsx)(t.code,{children:`as="button"`}),` (via `,(0,c.jsx)(t.code,{children:`apply`}),`)`]}),(0,c.jsx)(t.td,{children:`—`}),(0,c.jsx)(t.td,{children:`ClassName/style as render props, data attributes, etc.`})]})]})]}),`
`,(0,c.jsx)(t.p,{children:`Behavioral requirements:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Renders as a native button with `,(0,c.jsx)(t.code,{children:`type="button"`}),` and `,(0,c.jsx)(t.code,{children:`tabIndex={-1}`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Wrapped in `,(0,c.jsx)(t.code,{children:`VisuallyHidden`}),` for SR visibility without visual chrome.`]}),`
`,(0,c.jsx)(t.li,{children:`Keeps the control visually hidden while remaining screen-reader operable.`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`usage`,children:`Usage`}),`
`,(0,c.jsxs)(t.p,{children:[`Place at the very start and end of the overlay `,(0,c.jsx)(t.code,{children:`content`}),` slot so
forward/backward navigation always encounters a dismiss target:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<Container slot="content" className="dialog">
  <Dismiss onDismiss={() => onOpenChange(false)} />

  <Text as="h2">Title</Text>
  <Text>Description</Text>
  <Container as="button" onClick={() => onOpenChange(false)}><Text>Close</Text></Container>

  <Dismiss onDismiss={() => onOpenChange(false)} />
  {/* Both SR-only dismiss controls complement ESC/outside-click and a visible close */}
</Container>
`})}),`
`,(0,c.jsx)(t.h2,{id:`behavior-and-a11y`,children:`Behavior and a11y`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Focusable and operable by SR users (linear navigation) and keyboard users.`}),`
`,(0,c.jsxs)(t.li,{children:[`Complements ESC/outside-click handling from `,(0,c.jsx)(t.code,{children:`useModalOverlay`}),` + Focus containment from `,(0,c.jsx)(t.code,{children:`FocusLock`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Works with `,(0,c.jsx)(t.code,{children:`Portal`}),` and `,(0,c.jsx)(t.code,{children:`Stack`}),`—these controls render inside the same container as the overlay content.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`react-aria-or-external-hook-integration`,children:`React Aria or External Hook Integration`}),`
`,(0,c.jsxs)(t.p,{children:[`Equivalent in purpose to React Aria’s DismissButton: a visually hidden button
that calls `,(0,c.jsx)(t.code,{children:`onDismiss`}),` and is intended to be placed at the start and end of
modal content for linear navigation dismissal.`]}),`
`,(0,c.jsxs)(t.p,{children:[`Reference source: React Aria DismissButton — `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/DismissButton.tsx`,rel:`nofollow`,children:`github.com/adobe/react-spectrum/.../DismissButton.tsx`})]}),`
`,(0,c.jsx)(t.h3,{id:`internal-requirements-aligned-with-react-arias-intent`,children:`Internal requirements (aligned with React Aria’s intent)`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Element: render a native `,(0,c.jsx)(t.code,{children:`button`}),` via `,(0,c.jsx)(t.code,{children:`Container as="button"`})]}),`
`,(0,c.jsxs)(t.li,{children:[`Labeling: `,(0,c.jsx)(t.code,{children:`aria-label`}),` default “Dismiss” (localizable by consumers)`]}),`
`,(0,c.jsxs)(t.li,{children:[`Focus: `,(0,c.jsx)(t.code,{children:`tabIndex={-1}`}),` to avoid tab order while remaining SR-operable`]}),`
`,(0,c.jsxs)(t.li,{children:[`Visual hiding: wrap in `,(0,c.jsx)(t.code,{children:`VisuallyHidden`}),`; add `,(0,c.jsx)(t.code,{children:`style={{ width: 1, height: 1 }}`}),` as a defensive fallback`]}),`
`,(0,c.jsxs)(t.li,{children:[`Handler: `,(0,c.jsx)(t.code,{children:`onClick`}),` → `,(0,c.jsx)(t.code,{children:`onDismiss`}),` (if provided)`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`integration-tips`,children:`Integration tips`}),`
`,(0,c.jsxs)(t.p,{children:[`Keep inside the focus boundary (`,(0,c.jsx)(t.code,{children:`FocusLock`}),`) and in the same container as overlay content.`]}),`
`,(0,c.jsx)(t.h2,{id:`nonmodal-surfaces`,children:`Non‑modal surfaces`}),`
`,(0,c.jsx)(t.p,{children:`Skip dismiss controls for surfaces that aren’t focus-trapped (e.g., simple
tooltips). Use them when dismissal is required and linear navigation must always
find an exit.`}),`
`,(0,c.jsx)(t.h2,{id:`expected-usage-and-placement`,children:`Expected usage and placement`}),`
`,(0,c.jsx)(t.h3,{id:`where-it-should-be-used`,children:`Where it SHOULD be used`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Modal dialogs/overlays (required): place one at the start and one at the end of the `,(0,c.jsx)(t.code,{children:`content`}),` slot. Complements visible close, ESC, and outside‑click.`]}),`
`,(0,c.jsx)(t.li,{children:`Drawers/Sheets (modal variants) (required): same placement as modals.`}),`
`,(0,c.jsx)(t.li,{children:`Popovers/Menus (recommended when dismissible without a visible close): include start/end dismiss controls to ensure screen reader users can exit via linear navigation.`}),`
`,(0,c.jsx)(t.li,{children:`Coachmarks/Tour steps (recommended when dismissible): include when the step can be dismissed; otherwise provide explicit action buttons.`}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`where-it-may-be-used`,children:`Where it MAY be used`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Combobox/Select popovers (recommended): helps screen reader users exit the popup even when focus is managed on the field/trigger.`}),`
`,(0,c.jsx)(t.li,{children:`Non‑modal anchored popovers (optional): omit if ESC/outside‑click and return‑to‑trigger are sufficient; include only if testing shows SR users struggle to dismiss.`}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`where-it-should-not-be-used`,children:`Where it should NOT be used`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Tooltips: non‑interactive, no focus trap.`}),`
`,(0,c.jsx)(t.li,{children:`Toasts/Growls: not focus‑trapped; use a visible close if needed.`}),`
`,(0,c.jsx)(t.li,{children:`Non‑dismissible/legal consent: provide explicit action buttons instead of a generic dismiss.`}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`placement-rules`,children:`Placement rules`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Put a dismiss control immediately inside the `,(0,c.jsx)(t.code,{children:`content`}),` slot at the first and last focusable positions.`]}),`
`,(0,c.jsx)(t.li,{children:`Maintain a visible close button for sighted users, dismiss buttons are SR‑only safeguards.`}),`
`,(0,c.jsxs)(t.li,{children:[`Provide a localizable `,(0,c.jsx)(t.code,{children:`aria-label`}),` (default “Dismiss”).`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};