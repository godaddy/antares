import{j as e}from"./iframe-B2rswUNA.js";import{u as h,M as u,A as p,S as i,a as t,C as o}from"./blocks-QrW9PPQu.js";import{S as m,P as x,B as r,C as a,a as l}from"./dismiss.stories-DqyoI3BZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CUxjJQ4C.js";import"./index-D9q0_Ikz.js";import"./index-CLa44HDQ.js";import"./index-C4oLT4lB.js";import"./index-1Wd8D1lN.js";import"./slots-DSqAbleQ.js";import"./index-QSEzv4mT.js";import"./index-CLj43KZG.js";import"./index-CoYxMz83.js";import"./mergeProps-B0ruHaBt.js";import"./SSRProvider-WgX1OZpL.js";import"./clsx-B-dksMZM.js";import"./index-DNkdm6iH.js";import"./VisuallyHidden-M4IaGOfd.js";import"./useFocusWithin-liTmbOsT.js";import"./utils-MOEt33io.js";import"./DOMFunctions-BADGQOBX.js";import"./index-DpHhNP0u.js";import"./index-Cc8sBhDy.js";const d=`/* v8 ignore next */
import React, { useState } from 'react';
import { Dismiss } from '@bento/dismiss';
import { Container } from '@bento/container';
import { Text } from '@bento/text';

export function Basic() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <Container as="button" onClick={() => setIsOpen(true)}>
          Open Dialog
        </Container>
      )}
      {isOpen && (
        <Container className="dialog" style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <Dismiss onDismiss={() => setIsOpen(false)} />
          <Text as="h2">Dialog Title</Text>
          <Text>This is a dialog with dismiss controls at the start and end.</Text>
          <Container as="button" onClick={() => setIsOpen(false)}>
            Close
          </Container>
          <Dismiss onDismiss={() => setIsOpen(false)} />
        </Container>
      )}
    </>
  );
}
`,g=`/* v8 ignore next */
import React, { useState } from 'react';
import { Dismiss } from '@bento/dismiss';
import { Container } from '@bento/container';
import { Text } from '@bento/text';

export function CustomLabel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <Container as="button" onClick={() => setIsOpen(true)}>
          Open Dialog
        </Container>
      )}
      {isOpen && (
        <Container className="dialog" style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <Dismiss onDismiss={() => setIsOpen(false)} ariaLabel="Close dialog" />
          <Text as="h2">Dialog with Custom Label</Text>
          <Text>This dialog uses a custom aria-label for the dismiss button.</Text>
          <Dismiss onDismiss={() => setIsOpen(false)} ariaLabel="Close dialog" />
        </Container>
      )}
    </>
  );
}
`,b=`/* v8 ignore next */
import React, { useState } from 'react';
import { Dismiss } from '@bento/dismiss';
import { Container } from '@bento/container';
import { Text } from '@bento/text';

export function SlotCustomization() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <Container as="button" onClick={() => setIsOpen(true)}>
          Open Dialog
        </Container>
      )}
      {isOpen && (
        <Container className="dialog" style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <Dismiss
            onDismiss={() => setIsOpen(false)}
            slots={{
              hidden: {
                className: 'custom-visually-hidden'
              }
            }}
          />
          <Text as="h2">Dialog with Slot Customization</Text>
          <Text>This dialog customizes the VisuallyHidden wrapper using slots.</Text>
          <Dismiss
            onDismiss={() => setIsOpen(false)}
            slots={{
              hidden: {
                className: 'custom-visually-hidden'
              }
            }}
          />
        </Container>
      )}
    </>
  );
}
`;function c(n){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...h(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(u,{of:m,name:"Overview"}),`
`,e.jsx(s.h1,{id:"dismiss",children:"Dismiss"}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"@bento/dismiss"}),` package provides an accessible, visually hidden dismissal
control for overlays and popup content. It ensures users, especially those using
screen readers, can reliably dismiss modal dialogs, drawers, and popovers
through linear keyboard navigation. This component complements ESC key handling
and outside-click behaviors, filling a critical accessibility gap when sighted
users have a visible close button but screen reader users navigating linearly
encounter no dismissal affordance.`]}),`
`,e.jsx(s.p,{children:`This primitive aligns with React Aria's DismissButton pattern and should be
positioned at both the start and end of dismissible overlay content. When a
screen reader user navigates forward or backward through an overlay, they will
encounter these controls, giving them a clear way to exit the overlay without
relying solely on the ESC key or outside-click patterns that may not be
discoverable through linear navigation.`}),`
`,e.jsx(s.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-shell",children:`npm install --save @bento/dismiss
`})}),`
`,e.jsx(s.h2,{id:"props",children:"Props"}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"@bento/dismiss"})," package exports the ",e.jsx(s.code,{children:"Dismiss"})," component:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`import { Dismiss } from '@bento/dismiss';

<Dismiss onDismiss={() => setOpen(false)} />
`})}),`
`,e.jsxs(s.p,{children:["The following properties are available to be used on the ",e.jsx(s.code,{children:"Dismiss"})," component:"]}),`
`,e.jsx(p,{of:x}),`
`,e.jsxs(s.p,{children:["For all other properties specified on the ",e.jsx(s.code,{children:"Dismiss"}),` component, the component
will pass them down to the underlying button element. This includes properties
such as `,e.jsx(s.code,{children:"id"}),", ",e.jsx(s.code,{children:"data-*"}),` attributes, or additional ARIA attributes that you might
need for specialized use cases.`]}),`
`,e.jsx(s.h3,{id:"example",children:"Example"}),`
`,e.jsx(i,{language:"tsx",code:d}),`
`,e.jsx(t,{of:r,inline:!0}),`
`,e.jsx(o,{of:r}),`
`,e.jsx(s.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(s.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsxs(s.p,{children:["The most common pattern for the ",e.jsx(s.code,{children:"Dismiss"}),` component is to place it at both the
start and end of dismissible overlay content. This ensures screen reader users
navigating forward encounter a dismissal control at the beginning, and users
navigating backward from content below the overlay encounter a dismissal control
at the end.`]}),`
`,e.jsx(i,{language:"tsx",code:d}),`
`,e.jsx(t,{of:r,inline:!0}),`
`,e.jsx(o,{of:r}),`
`,e.jsxs(s.p,{children:[`In this example, when a screen reader user navigates into the dialog, they
immediately encounter the first dismiss button. If they navigate through all the
content and continue forward, they encounter the second dismiss button before
exiting the overlay's focus boundary. Both buttons invoke the same `,e.jsx(s.code,{children:"onDismiss"}),`
callback to close the dialog.`]}),`
`,e.jsx(s.h3,{id:"custom-label",children:"Custom Label"}),`
`,e.jsxs(s.p,{children:[`The default accessible label is "Dismiss". For localization or context-specific
labeling, use the `,e.jsx(s.code,{children:"ariaLabel"}),` prop to provide a custom label that makes sense in
your application's language and terminology.`]}),`
`,e.jsx(i,{language:"tsx",code:g}),`
`,e.jsx(t,{of:a,inline:!0}),`
`,e.jsx(o,{of:a}),`
`,e.jsx(s.p,{children:`Providing clear, localized labels helps screen reader users understand what will
happen when they activate the dismiss button. Use labels that match the
terminology of your application, such as "Close dialog", "Exit menu", or
"Dismiss notification".`}),`
`,e.jsx(s.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsxs(s.p,{children:["Understanding when and where to use the ",e.jsx(s.code,{children:"Dismiss"}),` component is critical for
creating accessible overlay patterns. The following guidance is based on React
Aria patterns and WCAG accessibility standards.`]}),`
`,e.jsx(s.h3,{id:"required-usage",children:"Required Usage"}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"Dismiss"})," component is required in the following contexts:"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Modal Dialogs and Overlays"})}),`
`,e.jsxs(s.p,{children:[`When creating modal dialogs that block interaction with the rest of the page,
place a `,e.jsx(s.code,{children:"Dismiss"}),` control at the start and end of the dialog content. This
provides screen reader users with a reliable dismissal mechanism regardless of
whether they navigate forward or backward through the content. While sighted
users can click a visible close button, screen reader users navigating linearly
need an equivalent affordance at both boundaries.`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Modal Drawers and Sheets"})}),`
`,e.jsx(s.p,{children:`Side panels and bottom sheets that use modal behavior should follow the same
pattern as modal dialogs. Position dismiss controls at the boundaries of the
drawer content to ensure users can exit through linear navigation.`}),`
`,e.jsx(s.h3,{id:"recommended-usage",children:"Recommended Usage"}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"Dismiss"}),` component is recommended but not strictly required in these
contexts:`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Dismissible Popovers and Menus"})}),`
`,e.jsx(s.p,{children:`When popovers or dropdown menus can be dismissed but lack a visible close
button, include start and end dismiss controls. This ensures screen reader users
can exit the popup even when ESC key handling might not be discoverable.`}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Coachmarks and Tour Steps"})}),`
`,e.jsx(s.p,{children:`Product tours and onboarding flows that can be dismissed should include dismiss
controls. If the tour requires explicit action buttons to proceed, consider
whether a generic dismiss is appropriate or whether users should be guided
through specific actions.`}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Combobox and Select Popovers"})}),`
`,e.jsx(s.p,{children:`While combobox popovers typically manage focus automatically, adding dismiss
controls can help screen reader users who want to exit the popup without making
a selection.`}),`
`,e.jsx(s.h3,{id:"not-recommended",children:"Not Recommended"}),`
`,e.jsxs(s.p,{children:["Do not use the ",e.jsx(s.code,{children:"Dismiss"})," component in these contexts:"]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Tooltips"})}),`
`,e.jsx(s.p,{children:`Tooltips are non-interactive content that appear on hover or focus and do not
trap focus. They do not need dismiss controls as users can simply navigate away
from the trigger element.`}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Toasts and Notifications"})}),`
`,e.jsxs(s.p,{children:[`Toast notifications and growl-style messages typically do not trap focus and
should not use the `,e.jsx(s.code,{children:"Dismiss"}),` component. If dismissal is needed, provide a
visible close button instead.`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Non-Dismissible Content"})}),`
`,e.jsx(s.p,{children:`Legal consent dialogs, age gates, or other content that requires explicit user
action should use specific action buttons rather than a generic dismiss control.`}),`
`,e.jsx(s.h3,{id:"placement-rules",children:"Placement Rules"}),`
`,e.jsx(s.p,{children:"Follow these guidelines for correct placement:"}),`
`,e.jsx(s.p,{children:`Position the first dismiss control immediately after the opening tag of your
overlay content container, before any other focusable elements. Position the
second dismiss control immediately before the closing tag of your overlay
content container, after all other focusable elements. This ensures linear
navigation always encounters a dismiss affordance at the boundaries.`}),`
`,e.jsxs(s.p,{children:["Always maintain a visible close button for sighted users. The ",e.jsx(s.code,{children:"Dismiss"}),`
component is a screen reader affordance, not a replacement for visible UI
controls. Sighted keyboard users and mouse users need their own clear way to
close overlays.`]}),`
`,e.jsxs(s.p,{children:["Use meaningful, localized labels through the ",e.jsx(s.code,{children:"ariaLabel"}),` prop. The default
"Dismiss" may not be appropriate for all contexts or languages. Consider labels
like "Close dialog", "Exit menu", or region-specific translations that match
your application's terminology.`]}),`
`,e.jsx(s.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"Dismiss"}),` component is designed with accessibility as its primary purpose.
It fills a specific gap in overlay accessibility by providing a dismissal
affordance for users navigating with screen readers using linear navigation
patterns.`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Screen Reader Compatibility"})}),`
`,e.jsxs(s.p,{children:["The component uses the ",e.jsx(s.code,{children:"@bento/visually-hidden"}),` primitive to ensure the button
remains completely accessible to assistive technologies while being visually
hidden from sighted users. This technique uses CSS to position content
off-screen rather than using `,e.jsx(s.code,{children:"display: none"})," or ",e.jsx(s.code,{children:"visibility: hidden"}),`, which
would make the content unavailable to screen readers.`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Keyboard Navigation"})}),`
`,e.jsxs(s.p,{children:[`The dismiss button is fully keyboard accessible. Screen reader users can
activate it using Enter or Space when focused on the element. The component uses
`,e.jsx(s.code,{children:"tabIndex={-1}"}),` which removes the button from the standard tab order but allows
screen readers to navigate to it through virtual cursor navigation. This is the
standard pattern for this type of control and aligns with React Aria's
DismissButton implementation.`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"ARIA Labeling"})}),`
`,e.jsxs(s.p,{children:["The component applies ",e.jsx(s.code,{children:"aria-label"}),` to provide context about what the button
does. The default label is "Dismiss", but you should customize this through the
`,e.jsx(s.code,{children:"ariaLabel"}),` prop to match your application's terminology and language. Clear,
descriptive labels help screen reader users understand the button's purpose
without requiring additional context.`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Semantic HTML"})}),`
`,e.jsxs(s.p,{children:["The component renders as a native HTML ",e.jsx(s.code,{children:"button"})," element with ",e.jsx(s.code,{children:'type="button"'}),` to
prevent accidental form submission. Using semantic HTML ensures compatibility
with assistive technologies and provides the expected button semantics and
keyboard behavior automatically.`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Integration with Overlay Patterns"})}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"Dismiss"}),` component is designed to work alongside other accessibility
features in overlay patterns. It complements ESC key handling from React Aria's
overlay hooks, outside-click dismissal through `,e.jsx(s.code,{children:"OverlayTrigger"}),`, and focus
containment from focus management utilities. While these features provide
dismissal mechanisms for some users, the `,e.jsx(s.code,{children:"Dismiss"}),` component specifically
addresses the needs of screen reader users navigating linearly through content.`]}),`
`,e.jsx(s.p,{children:`Position the component inside your overlay's focus boundary, within the same
container as your overlay content. It should be rendered before and after your
overlay's main content to ensure users encounter it when navigating in either
direction.`}),`
`,e.jsx(s.h2,{id:"customization",children:"Customization"}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"Dismiss"})," component is built using the ",e.jsx(s.code,{children:"@bento/slots"}),` package, allowing you
to customize specific parts of the component through slot-based composition.
While the component is intentionally visually hidden, understanding its
customization options can be useful for specialized use cases or debugging.`]}),`
`,e.jsx(s.h3,{id:"slots",children:"Slots"}),`
`,e.jsxs(s.p,{children:["The component is registered as ",e.jsx(s.code,{children:"BentoDismiss"})," and introduces the following slots:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"hidden"}),": Assigned to the ",e.jsx(s.code,{children:"@bento/visually-hidden"})," component that wraps the dismiss button."]}),`
`]}),`
`,e.jsxs(s.p,{children:["You can use the ",e.jsx(s.code,{children:"slots"})," prop to override the default behavior of the visually hidden wrapper:"]}),`
`,e.jsx(i,{language:"tsx",code:b}),`
`,e.jsx(t,{of:l,inline:!0}),`
`,e.jsx(o,{of:l}),`
`,e.jsxs(s.p,{children:["In this example, we override the ",e.jsx(s.code,{children:"hidden"}),` slot to provide custom styling to the
visually hidden wrapper. While this is possible, it is rarely necessary in
practice since the component is designed to be visually hidden by default.`]}),`
`,e.jsxs(s.p,{children:["See the ",e.jsx(s.code,{children:"@bento/slots"})," package for more information on how to use the ",e.jsx(s.code,{children:"slot"}),` and
`,e.jsx(s.code,{children:"slots"})," properties."]}),`
`,e.jsx(s.h3,{id:"styling",children:"Styling"}),`
`,e.jsxs(s.p,{children:[`While the dismiss button is visually hidden by default and styling is typically
not necessary, you can customize the underlying button element using `,e.jsx(s.code,{children:"className"}),`
or `,e.jsx(s.code,{children:"style"}),` props. These props will be applied to the button element itself, not
the visually hidden wrapper.`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`import { Dismiss } from '@bento/dismiss';

<Dismiss onDismiss={handleDismiss} className="my-dismiss-button" />
`})}),`
`,e.jsxs(s.p,{children:["When you assign a ",e.jsx(s.code,{children:"className"}),` to the component, you take full responsibility for
styling. The component will pass this className to the button element, allowing
you to target it with CSS selectors. However, keep in mind that because the
button is wrapped in a visually hidden container, visual styles will not be
visible to sighted users.`]}),`
`,e.jsx(s.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsx(s.p,{children:"The following data attributes are automatically applied to the component:"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Attribute"}),e.jsx(s.th,{children:"Description"}),e.jsx(s.th,{children:"Example Values"})]})}),e.jsx(s.tbody,{children:e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"data-hidden"})}),e.jsx(s.td,{children:"Applied to the visually hidden wrapper, indicating content is accessible to screen readers"}),e.jsx(s.td,{children:'"true"'})]})})]}),`
`,e.jsxs(s.p,{children:["These attributes are provided by the underlying ",e.jsx(s.code,{children:"@bento/visually-hidden"}),`
component and can be used for debugging or specialized styling scenarios:`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-css",children:`[data-hidden="true"] button[type="button"] {
  /* Target all visually hidden buttons */
}
`})}),`
`,e.jsx(s.h3,{id:"default-attributes",children:"Default Attributes"}),`
`,e.jsxs(s.p,{children:["The component renders a native ",e.jsx(s.code,{children:"button"})," element with the following attributes:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:'type="button"'}),`: Prevents the button from submitting forms when used inside
form elements.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"tabIndex={-1}"}),`: Removes the button from the standard tab order while keeping
it accessible to screen readers through virtual cursor navigation.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"aria-label"}),`: Provides an accessible label for screen readers. Defaults to
"Dismiss" but can be customized via the `,e.jsx(s.code,{children:"ariaLabel"})," prop."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"style={{ width: 1, height: 1 }}"}),`: A defensive fallback that ensures the button
has minimal dimensions even when visually hidden, which can help with screen
reader detection in certain scenarios.`]}),`
`]})]})}function U(n={}){const{wrapper:s}={...h(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(c,{...n})}):c(n)}export{U as default};
