import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-DhrwFsZn.js";import{a as l,c as u,d,i as f,l as p,n as m,o as h,r as g,s as _,t as v,u as y}from"./toast.stories-DDPjNKYi.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(s,{of:d,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`toast`,children:`Toast`}),`
`,(0,S.jsx)(t.p,{children:`Toasts are short, non-modal notifications in the top-right corner of the page that tell the user a system event has happened.`}),`
`,(0,S.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Call `,(0,S.jsx)(t.code,{children:`toast.add()`}),` from anywhere; mount one `,(0,S.jsx)(t.code,{children:`<ToastRegion />`}),` per app`]}),`
`,(0,S.jsx)(t.li,{children:`Emphasis variants with status icons: none, success, critical, warning`}),`
`,(0,S.jsx)(t.li,{children:`Closes on its own after 5 seconds by default, or stays until dismissed`}),`
`,(0,S.jsx)(t.li,{children:`Timers pause while the pointer or keyboard focus is on the toasts`}),`
`,(0,S.jsx)(t.li,{children:`Safe with several copies of Antares on one page: they share one stack in the corner`}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`usage`,children:`Usage`}),`
`,(0,S.jsx)(t.p,{children:`Mount one region inside your app's providers, so toast content keeps your context (i18n, theme, and so on):`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`import { ToastRegion, toast } from '@godaddy/antares';

function App() {
  return (
    <IntlProvider>
      <ToastRegion />
      {/* ... */}
    </IntlProvider>
  );
}

const key = toast.add({ title: 'Domain connected', message: 'Your site is now live.', emphasis: 'success' });
toast.close(key);
`})}),`
`,(0,S.jsx)(t.p,{children:`Toasts added before the region mounts wait in the queue and show once it does.`}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsxs)(t.p,{children:[`Mount one `,(0,S.jsx)(t.code,{children:`ToastRegion`}),` per app, then call `,(0,S.jsx)(t.code,{children:`toast.add()`}),` from anywhere. Toasts close on their
own after 5 seconds, and the timer pauses while the pointer or focus is on them.`]}),`
`,(0,S.jsx)(a,{of:m,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Button, ToastRegion, toast } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <>
      <ToastRegion />
      <Button
        variant="secondary"
        onPress={function showToast() {
          toast.add({ title: 'Domain connected', message: 'Your site is now live.', emphasis: 'success' });
        }}
      >
        Show toast
      </Button>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`emphasis-variants`,children:`Emphasis Variants`}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`emphasis`}),` picks the status icon: none, a checkmark for success, and an alert icon for critical and
warning, told apart by color.`]}),`
`,(0,S.jsx)(a,{of:g,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Button, Flex, ToastQueue, ToastRegion, type ToastEmphasis } from '@godaddy/antares';

const queue = new ToastQueue();

const emphases: ReadonlyArray<readonly [ToastEmphasis, string, string]> = [
  ['none', 'Settings saved', 'Your changes will apply on the next page load.'],
  ['success', 'Domain connected', 'Your site is now live.'],
  ['critical', 'Payment failed', 'Update your card to keep your plan active.'],
  ['warning', 'Storage almost full', 'You have used 90% of your plan.']
];

export function EmphasesExample() {
  return (
    <>
      <ToastRegion queue={queue} />
      <Flex gap="sm" wrap="wrap">
        {emphases.map(([emphasis, title, message]) => (
          <Button
            key={emphasis}
            variant="secondary"
            onPress={function showToast() {
              queue.add({ title, message, emphasis });
            }}
          >
            Show {emphasis}
          </Button>
        ))}
      </Flex>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`persistent`,children:`Persistent`}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`timeout: null`}),` keeps a toast until the user closes it, or until you call `,(0,S.jsx)(t.code,{children:`close()`}),` with the key
`,(0,S.jsx)(t.code,{children:`add()`}),` returned. A persistent toast always shows its close button.`]}),`
`,(0,S.jsx)(a,{of:l,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { useState } from 'react';
import { Button, Flex, ToastQueue, ToastRegion } from '@godaddy/antares';

const queue = new ToastQueue();

export function PersistentExample() {
  const [key, setKey] = useState<string | null>(null);

  return (
    <>
      <ToastRegion queue={queue} />
      <Flex gap="sm" wrap="wrap">
        <Button
          variant="secondary"
          isDisabled={key !== null}
          onPress={function showToast() {
            setKey(
              queue.add({
                message: 'Uploading 3 files…',
                timeout: null,
                onClose: function forget() {
                  setKey(null);
                }
              })
            );
          }}
        >
          Start upload
        </Button>
        <Button
          variant="secondary"
          isDisabled={key === null}
          onPress={function closeToast() {
            if (key) queue.close(key);
          }}
        >
          Finish upload
        </Button>
      </Flex>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`translated-labels`,children:`Translated Labels`}),`
`,(0,S.jsxs)(t.p,{children:[`Pass translated labels once on the region, through `,(0,S.jsx)(t.code,{children:`ariaLabels`}),`. Toast content is rendered inside
your app, so it can use your own i18n context directly.`]}),`
`,(0,S.jsx)(a,{of:v,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Button, ToastQueue, ToastRegion } from '@godaddy/antares';

const queue = new ToastQueue();

export function AriaLabelsExample() {
  return (
    <>
      <ToastRegion queue={queue} ariaLabels={{ region: 'Notificaciones', close: 'Cerrar' }} />
      <Button
        variant="secondary"
        onPress={function showToast() {
          queue.add({ title: 'Dominio conectado', message: 'Tu sitio ya está en línea.', emphasis: 'success' });
        }}
      >
        Mostrar aviso
      </Button>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`rich-content`,children:`Rich Content`}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`title`}),` and `,(0,S.jsx)(t.code,{children:`message`}),` take any React node, such as formatted text or a translated
`,(0,S.jsx)(t.code,{children:`<FormattedMessage />`}),`. The content renders inside your app, so it keeps your context. Avoid
links or buttons in a toast that times out; use `,(0,S.jsx)(t.code,{children:`timeout: null`}),` when the user needs to act.`]}),`
`,(0,S.jsx)(a,{of:_,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Button, ToastQueue, ToastRegion } from '@godaddy/antares';

const queue = new ToastQueue();

export function RichContentExample() {
  return (
    <>
      <ToastRegion queue={queue} />
      <Button
        variant="secondary"
        onPress={function showToast() {
          queue.add({
            title: <span data-rich-title="">example.com</span>,
            message: (
              <>
                Renewed for <strong>1 year</strong>. Your next payment is on{' '}
                <time dateTime="2027-11-17">Nov 17, 2027</time>.
              </>
            ),
            emphasis: 'success'
          });
        }}
      >
        Show rich toast
      </Button>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`multiple-regions`,children:`Multiple Regions`}),`
`,(0,S.jsx)(t.p,{children:`Each queue stands in for a separate copy of Antares, such as a shared header and the app it wraps.
Both regions render into one page-wide host, so their toasts stack instead of overlapping.
Titles and messages read each region's own provider.`}),`
`,(0,S.jsx)(a,{of:f,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { createContext, useContext } from 'react';
import { Button, Flex, ToastQueue, ToastRegion } from '@godaddy/antares';

const header = new ToastQueue();
const app = new ToastQueue();
const SenderContext = createContext('Unknown sender');

function SenderName() {
  return useContext(SenderContext);
}

export function MultipleRegionsExample() {
  return (
    <>
      <SenderContext.Provider value="Header">
        <ToastRegion queue={header} ariaLabels={{ region: 'Header notifications' }} />
      </SenderContext.Provider>
      <SenderContext.Provider value="App">
        <ToastRegion queue={app} ariaLabels={{ region: 'App notifications' }} />
      </SenderContext.Provider>
      <Flex gap="sm" wrap="wrap">
        <Button
          variant="secondary"
          onPress={function showHeaderToast() {
            header.add({
              title: <SenderName />,
              message: (
                <>
                  <SenderName />: You have 2 new messages.
                </>
              )
            });
          }}
        >
          Header toast
        </Button>
        <Button
          variant="secondary"
          onPress={function showAppToast() {
            app.add({
              title: <SenderName />,
              message: (
                <>
                  <SenderName />: Settings saved.
                </>
              ),
              emphasis: 'success'
            });
          }}
        >
          App toast
        </Button>
      </Flex>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`several-copies-of-antares-on-one-page`,children:`Several copies of Antares on one page`}),`
`,(0,S.jsxs)(t.p,{children:[`A page can load more than one copy of Antares, such as a shared header and the app it wraps, possibly at
different versions. Each copy renders its own toasts, with its own components and React context, into one
page-wide element (`,(0,S.jsx)(t.code,{children:`[data-antares-toast-host="1"]`}),`) that the first copy creates. So toasts stack instead of
overlapping, and nothing has to be shared between versions.`]}),`
`,(0,S.jsx)(t.p,{children:`Toasts are grouped by copy: the header's toasts stay together, and the app's stay together.`}),`
`,(0,S.jsxs)(t.p,{children:[`If micro front-ends share `,(0,S.jsx)(t.strong,{children:`one`}),` copy of Antares, their `,(0,S.jsx)(t.code,{children:`<ToastRegion />`}),`s all render the same default
queue. Only the first one mounted shows the toasts, so none appear twice; if it unmounts, the next one
takes over. Those toasts render inside the active region's app, so a micro front-end that needs its own
context (such as its own i18n) should use its own `,(0,S.jsx)(t.code,{children:`new ToastQueue()`}),` and `,(0,S.jsx)(t.code,{children:`<ToastRegion queue={queue} />`}),`.`]}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,S.jsxs)(t.table,{children:[(0,S.jsx)(t.thead,{children:(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.th,{children:`Key`}),(0,S.jsx)(t.th,{children:`Description`})]})}),(0,S.jsxs)(t.tbody,{children:[(0,S.jsxs)(t.tr,{children:[(0,S.jsxs)(t.td,{children:[(0,S.jsx)(t.code,{children:`F6`}),` / `,(0,S.jsx)(t.code,{children:`Shift+F6`})]}),(0,S.jsx)(t.td,{children:`Moves focus into and out of the notifications region`})]}),(0,S.jsxs)(t.tr,{children:[(0,S.jsxs)(t.td,{children:[(0,S.jsx)(t.code,{children:`Tab`}),` / `,(0,S.jsx)(t.code,{children:`Shift+Tab`})]}),(0,S.jsx)(t.td,{children:`Moves between toasts and their close buttons`})]}),(0,S.jsxs)(t.tr,{children:[(0,S.jsxs)(t.td,{children:[(0,S.jsx)(t.code,{children:`Space`}),` / `,(0,S.jsx)(t.code,{children:`Enter`})]}),(0,S.jsx)(t.td,{children:`Closes the toast when its close button is focused`})]})]})]}),`
`,(0,S.jsx)(t.p,{children:`When the focused toast closes, focus moves to the next toast, or back to where it was before entering the region.`}),`
`,(0,S.jsx)(t.h3,{id:`screen-readers`,children:`Screen readers`}),`
`,(0,S.jsxs)(t.p,{children:[`The region is a landmark labelled with the number of notifications. Each toast is announced when it appears,
and is labelled by its title (or its message when there is no title). Translate the labels with
`,(0,S.jsx)(t.code,{children:`ariaLabels={{ region, close }}`}),` on `,(0,S.jsx)(t.code,{children:`ToastRegion`}),`.`]}),`
`,(0,S.jsx)(t.h3,{id:`timing`,children:`Timing`}),`
`,(0,S.jsx)(t.p,{children:`Timeouts pause while the user hovers or focuses the toasts. The default of 5 seconds follows WCAG's guidance
on adjustable timing; avoid shorter timeouts.`}),`
`,(0,S.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsx)(t.li,{children:`Keep the title to one or two words and the message to one sentence.`}),`
`,(0,S.jsx)(t.li,{children:`Don't put links or actions in a toast that times out; the user may not reach them in time.`}),`
`,(0,S.jsxs)(t.li,{children:[`Use `,(0,S.jsx)(t.code,{children:`timeout: null`}),` for messages the user must see, and close them from code when the work finishes.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Only hide the close button (`,(0,S.jsx)(t.code,{children:`dismissible: false`}),`) on short, timed toasts. Persistent toasts always show it.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Use `,(0,S.jsx)(t.code,{children:`critical`}),` for failures the user can fix, and `,(0,S.jsx)(t.code,{children:`warning`}),` for things that matter but don't need action now.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(t.h3,{id:`toastregion`,children:`ToastRegion`}),`
`,(0,S.jsx)(o,{of:h}),`
`,(0,S.jsx)(t.h3,{id:`toastaddoptions`,children:`toast.add(options)`}),`
`,(0,S.jsxs)(t.p,{children:[`Returns the key to pass to `,(0,S.jsx)(t.code,{children:`toast.close(key)`}),`.`]}),`
`,(0,S.jsx)(o,{of:u}),`
`,(0,S.jsx)(t.h3,{id:`new-toastqueueoptions`,children:`new ToastQueue(options)`}),`
`,(0,S.jsxs)(t.p,{children:[`A separate queue with the same `,(0,S.jsx)(t.code,{children:`add`}),` and `,(0,S.jsx)(t.code,{children:`close`}),` methods. Render it with `,(0,S.jsx)(t.code,{children:`<ToastRegion queue={queue} />`}),`.`]}),`
`,(0,S.jsx)(o,{of:p})]})}function x(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;function C(){return(C=e((()=>{S=t(),n(),c(),y()})))()}C();export{x as default};