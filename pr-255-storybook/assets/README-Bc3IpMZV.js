import{i as e}from"./preload-helper-C4CHD4He.js";import{y as t}from"./iframe-bNecAKq-.js";import{S as n,c as r,i,l as a,n as o,s,u as c}from"./blocks-BW7SWIem.js";import{t as l}from"./mdx-react-shim-CAnnfOBh.js";import{Basic as u,CustomLabel as d,Props as f,SlotCustomization as p,n as m,t as h}from"./dismiss.stories-D8-Ubiow.js";var g,_=e((()=>{g=`/* v8 ignore next */
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
`})),v,y=e((()=>{v=`/* v8 ignore next */
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
`})),b,x=e((()=>{b=`/* v8 ignore next */
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
`}));function S(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(s,{of:h,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`dismiss`,children:`Dismiss`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`@bento/dismiss`}),` package provides an accessible, visually hidden dismissal
control for overlays and popup content. It ensures users, especially those using
screen readers, can reliably dismiss modal dialogs, drawers, and popovers
through linear keyboard navigation. This component complements ESC key handling
and outside-click behaviors, filling a critical accessibility gap when sighted
users have a visible close button but screen reader users navigating linearly
encounter no dismissal affordance.`]}),`
`,(0,w.jsx)(t.p,{children:`This primitive aligns with React Aria's DismissButton pattern and should be
positioned at both the start and end of dismissible overlay content. When a
screen reader user navigates forward or backward through an overlay, they will
encounter these controls, giving them a clear way to exit the overlay without
relying solely on the ESC key or outside-click patterns that may not be
discoverable through linear navigation.`}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/dismiss
`})}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`@bento/dismiss`}),` package exports the `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component:`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-jsx`,children:`import { Dismiss } from '@bento/dismiss';

<Dismiss onDismiss={() => setOpen(false)} />
`})}),`
`,(0,w.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component:`]}),`
`,(0,w.jsx)(o,{of:f}),`
`,(0,w.jsxs)(t.p,{children:[`For all other properties specified on the `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component, the component
will pass them down to the underlying button element. This includes properties
such as `,(0,w.jsx)(t.code,{children:`id`}),`, `,(0,w.jsx)(t.code,{children:`data-*`}),` attributes, or additional ARIA attributes that you might
need for specialized use cases.`]}),`
`,(0,w.jsx)(t.h3,{id:`example`,children:`Example`}),`
`,(0,w.jsx)(r,{language:`tsx`,code:g}),`
`,(0,w.jsx)(a,{of:u,inline:!0}),`
`,(0,w.jsx)(i,{of:u}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,w.jsxs)(t.p,{children:[`The most common pattern for the `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component is to place it at both the
start and end of dismissible overlay content. This ensures screen reader users
navigating forward encounter a dismissal control at the beginning, and users
navigating backward from content below the overlay encounter a dismissal control
at the end.`]}),`
`,(0,w.jsx)(r,{language:`tsx`,code:g}),`
`,(0,w.jsx)(a,{of:u,inline:!0}),`
`,(0,w.jsx)(i,{of:u}),`
`,(0,w.jsxs)(t.p,{children:[`In this example, when a screen reader user navigates into the dialog, they
immediately encounter the first dismiss button. If they navigate through all the
content and continue forward, they encounter the second dismiss button before
exiting the overlay's focus boundary. Both buttons invoke the same `,(0,w.jsx)(t.code,{children:`onDismiss`}),`
callback to close the dialog.`]}),`
`,(0,w.jsx)(t.h3,{id:`custom-label`,children:`Custom Label`}),`
`,(0,w.jsxs)(t.p,{children:[`The default accessible label is "Dismiss". For localization or context-specific
labeling, use the `,(0,w.jsx)(t.code,{children:`ariaLabel`}),` prop to provide a custom label that makes sense in
your application's language and terminology.`]}),`
`,(0,w.jsx)(r,{language:`tsx`,code:v}),`
`,(0,w.jsx)(a,{of:d,inline:!0}),`
`,(0,w.jsx)(i,{of:d}),`
`,(0,w.jsx)(t.p,{children:`Providing clear, localized labels helps screen reader users understand what will
happen when they activate the dismiss button. Use labels that match the
terminology of your application, such as "Close dialog", "Exit menu", or
"Dismiss notification".`}),`
`,(0,w.jsx)(t.h2,{id:`usage-guidelines`,children:`Usage Guidelines`}),`
`,(0,w.jsxs)(t.p,{children:[`Understanding when and where to use the `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component is critical for
creating accessible overlay patterns. The following guidance is based on React
Aria patterns and WCAG accessibility standards.`]}),`
`,(0,w.jsx)(t.h3,{id:`required-usage`,children:`Required Usage`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component is required in the following contexts:`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Modal Dialogs and Overlays`})}),`
`,(0,w.jsxs)(t.p,{children:[`When creating modal dialogs that block interaction with the rest of the page,
place a `,(0,w.jsx)(t.code,{children:`Dismiss`}),` control at the start and end of the dialog content. This
provides screen reader users with a reliable dismissal mechanism regardless of
whether they navigate forward or backward through the content. While sighted
users can click a visible close button, screen reader users navigating linearly
need an equivalent affordance at both boundaries.`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Modal Drawers and Sheets`})}),`
`,(0,w.jsx)(t.p,{children:`Side panels and bottom sheets that use modal behavior should follow the same
pattern as modal dialogs. Position dismiss controls at the boundaries of the
drawer content to ensure users can exit through linear navigation.`}),`
`,(0,w.jsx)(t.h3,{id:`recommended-usage`,children:`Recommended Usage`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component is recommended but not strictly required in these
contexts:`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Dismissible Popovers and Menus`})}),`
`,(0,w.jsx)(t.p,{children:`When popovers or dropdown menus can be dismissed but lack a visible close
button, include start and end dismiss controls. This ensures screen reader users
can exit the popup even when ESC key handling might not be discoverable.`}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Coachmarks and Tour Steps`})}),`
`,(0,w.jsx)(t.p,{children:`Product tours and onboarding flows that can be dismissed should include dismiss
controls. If the tour requires explicit action buttons to proceed, consider
whether a generic dismiss is appropriate or whether users should be guided
through specific actions.`}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Combobox and Select Popovers`})}),`
`,(0,w.jsx)(t.p,{children:`While combobox popovers typically manage focus automatically, adding dismiss
controls can help screen reader users who want to exit the popup without making
a selection.`}),`
`,(0,w.jsx)(t.h3,{id:`not-recommended`,children:`Not Recommended`}),`
`,(0,w.jsxs)(t.p,{children:[`Do not use the `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component in these contexts:`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Tooltips`})}),`
`,(0,w.jsx)(t.p,{children:`Tooltips are non-interactive content that appear on hover or focus and do not
trap focus. They do not need dismiss controls as users can simply navigate away
from the trigger element.`}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Toasts and Notifications`})}),`
`,(0,w.jsxs)(t.p,{children:[`Toast notifications and growl-style messages typically do not trap focus and
should not use the `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component. If dismissal is needed, provide a
visible close button instead.`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Non-Dismissible Content`})}),`
`,(0,w.jsx)(t.p,{children:`Legal consent dialogs, age gates, or other content that requires explicit user
action should use specific action buttons rather than a generic dismiss control.`}),`
`,(0,w.jsx)(t.h3,{id:`placement-rules`,children:`Placement Rules`}),`
`,(0,w.jsx)(t.p,{children:`Follow these guidelines for correct placement:`}),`
`,(0,w.jsx)(t.p,{children:`Position the first dismiss control immediately after the opening tag of your
overlay content container, before any other focusable elements. Position the
second dismiss control immediately before the closing tag of your overlay
content container, after all other focusable elements. This ensures linear
navigation always encounters a dismiss affordance at the boundaries.`}),`
`,(0,w.jsxs)(t.p,{children:[`Always maintain a visible close button for sighted users. The `,(0,w.jsx)(t.code,{children:`Dismiss`}),`
component is a screen reader affordance, not a replacement for visible UI
controls. Sighted keyboard users and mouse users need their own clear way to
close overlays.`]}),`
`,(0,w.jsxs)(t.p,{children:[`Use meaningful, localized labels through the `,(0,w.jsx)(t.code,{children:`ariaLabel`}),` prop. The default
"Dismiss" may not be appropriate for all contexts or languages. Consider labels
like "Close dialog", "Exit menu", or region-specific translations that match
your application's terminology.`]}),`
`,(0,w.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component is designed with accessibility as its primary purpose.
It fills a specific gap in overlay accessibility by providing a dismissal
affordance for users navigating with screen readers using linear navigation
patterns.`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Screen Reader Compatibility`})}),`
`,(0,w.jsxs)(t.p,{children:[`The component uses the `,(0,w.jsx)(t.code,{children:`@bento/visually-hidden`}),` primitive to ensure the button
remains completely accessible to assistive technologies while being visually
hidden from sighted users. This technique uses CSS to position content
off-screen rather than using `,(0,w.jsx)(t.code,{children:`display: none`}),` or `,(0,w.jsx)(t.code,{children:`visibility: hidden`}),`, which
would make the content unavailable to screen readers.`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Keyboard Navigation`})}),`
`,(0,w.jsxs)(t.p,{children:[`The dismiss button is fully keyboard accessible. Screen reader users can
activate it using Enter or Space when focused on the element. The component uses
`,(0,w.jsx)(t.code,{children:`tabIndex={-1}`}),` which removes the button from the standard tab order but allows
screen readers to navigate to it through virtual cursor navigation. This is the
standard pattern for this type of control and aligns with React Aria's
DismissButton implementation.`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`ARIA Labeling`})}),`
`,(0,w.jsxs)(t.p,{children:[`The component applies `,(0,w.jsx)(t.code,{children:`aria-label`}),` to provide context about what the button
does. The default label is "Dismiss", but you should customize this through the
`,(0,w.jsx)(t.code,{children:`ariaLabel`}),` prop to match your application's terminology and language. Clear,
descriptive labels help screen reader users understand the button's purpose
without requiring additional context.`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Semantic HTML`})}),`
`,(0,w.jsxs)(t.p,{children:[`The component renders as a native HTML `,(0,w.jsx)(t.code,{children:`button`}),` element with `,(0,w.jsx)(t.code,{children:`type="button"`}),` to
prevent accidental form submission. Using semantic HTML ensures compatibility
with assistive technologies and provides the expected button semantics and
keyboard behavior automatically.`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Integration with Overlay Patterns`})}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component is designed to work alongside other accessibility
features in overlay patterns. It complements ESC key handling from React Aria's
overlay hooks, outside-click dismissal through `,(0,w.jsx)(t.code,{children:`OverlayTrigger`}),`, and focus
containment from focus management utilities. While these features provide
dismissal mechanisms for some users, the `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component specifically
addresses the needs of screen reader users navigating linearly through content.`]}),`
`,(0,w.jsx)(t.p,{children:`Position the component inside your overlay's focus boundary, within the same
container as your overlay content. It should be rendered before and after your
overlay's main content to ensure users encounter it when navigating in either
direction.`}),`
`,(0,w.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Dismiss`}),` component is built using the `,(0,w.jsx)(t.code,{children:`@bento/slots`}),` package, allowing you
to customize specific parts of the component through slot-based composition.
While the component is intentionally visually hidden, understanding its
customization options can be useful for specialized use cases or debugging.`]}),`
`,(0,w.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,w.jsxs)(t.p,{children:[`The component is registered as `,(0,w.jsx)(t.code,{children:`BentoDismiss`}),` and introduces the following slots:`]}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`hidden`}),`: Assigned to the `,(0,w.jsx)(t.code,{children:`@bento/visually-hidden`}),` component that wraps the dismiss button.`]}),`
`]}),`
`,(0,w.jsxs)(t.p,{children:[`You can use the `,(0,w.jsx)(t.code,{children:`slots`}),` prop to override the default behavior of the visually hidden wrapper:`]}),`
`,(0,w.jsx)(r,{language:`tsx`,code:b}),`
`,(0,w.jsx)(a,{of:p,inline:!0}),`
`,(0,w.jsx)(i,{of:p}),`
`,(0,w.jsxs)(t.p,{children:[`In this example, we override the `,(0,w.jsx)(t.code,{children:`hidden`}),` slot to provide custom styling to the
visually hidden wrapper. While this is possible, it is rarely necessary in
practice since the component is designed to be visually hidden by default.`]}),`
`,(0,w.jsxs)(t.p,{children:[`See the `,(0,w.jsx)(t.code,{children:`@bento/slots`}),` package for more information on how to use the `,(0,w.jsx)(t.code,{children:`slot`}),` and
`,(0,w.jsx)(t.code,{children:`slots`}),` properties.`]}),`
`,(0,w.jsx)(t.h3,{id:`styling`,children:`Styling`}),`
`,(0,w.jsxs)(t.p,{children:[`While the dismiss button is visually hidden by default and styling is typically
not necessary, you can customize the underlying button element using `,(0,w.jsx)(t.code,{children:`className`}),`
or `,(0,w.jsx)(t.code,{children:`style`}),` props. These props will be applied to the button element itself, not
the visually hidden wrapper.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-jsx`,children:`import { Dismiss } from '@bento/dismiss';

<Dismiss onDismiss={handleDismiss} className="my-dismiss-button" />
`})}),`
`,(0,w.jsxs)(t.p,{children:[`When you assign a `,(0,w.jsx)(t.code,{children:`className`}),` to the component, you take full responsibility for
styling. The component will pass this className to the button element, allowing
you to target it with CSS selectors. However, keep in mind that because the
button is wrapped in a visually hidden container, visual styles will not be
visible to sighted users.`]}),`
`,(0,w.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,w.jsx)(t.p,{children:`The following data attributes are automatically applied to the component:`}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:`Attribute`}),(0,w.jsx)(t.th,{children:`Description`}),(0,w.jsx)(t.th,{children:`Example Values`})]})}),(0,w.jsx)(t.tbody,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-hidden`})}),(0,w.jsx)(t.td,{children:`Applied to the visually hidden wrapper, indicating content is accessible to screen readers`}),(0,w.jsx)(t.td,{children:`"true"`})]})})]}),`
`,(0,w.jsxs)(t.p,{children:[`These attributes are provided by the underlying `,(0,w.jsx)(t.code,{children:`@bento/visually-hidden`}),`
component and can be used for debugging or specialized styling scenarios:`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-css`,children:`[data-hidden="true"] button[type="button"] {
  /* Target all visually hidden buttons */
}
`})}),`
`,(0,w.jsx)(t.h3,{id:`default-attributes`,children:`Default Attributes`}),`
`,(0,w.jsxs)(t.p,{children:[`The component renders a native `,(0,w.jsx)(t.code,{children:`button`}),` element with the following attributes:`]}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`type="button"`}),`: Prevents the button from submitting forms when used inside
form elements.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`tabIndex={-1}`}),`: Removes the button from the standard tab order while keeping
it accessible to screen readers through virtual cursor navigation.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`aria-label`}),`: Provides an accessible label for screen readers. Defaults to
"Dismiss" but can be customized via the `,(0,w.jsx)(t.code,{children:`ariaLabel`}),` prop.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`style={{ width: 1, height: 1 }}`}),`: A defensive fallback that ensures the button
has minimal dimensions even when visually hidden, which can help with screen
reader detection in certain scenarios.`]}),`
`]})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),l(),c(),m(),_(),y(),x()}))();export{C as default};