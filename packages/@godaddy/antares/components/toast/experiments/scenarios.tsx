import { type ReactNode, useState } from 'react';
import { Button, Flex, Text, type ToastOptions, ToastQueue, ToastRegion } from '@godaddy/antares';
import { createGrowl } from './growl-sim/growl.tsx';
import { Localized, LocaleProvider } from './context.tsx';
import { createGrowlShim, forwardToGrowl, LeadingAntares, useAvoidGrowl } from './strategies.tsx';

/**
 * Each team wraps its own app in its own provider, like react-intl. A message keeps its context only
 * if it renders inside the tree that sent it.
 */
function Team({ name, locale, children }: { name: string; locale: string; children: ReactNode }) {
  return (
    <LocaleProvider locale={locale}>
      <Flex direction="column" gap="sm" padding="md" style={{ border: '1px solid #ccc', borderRadius: 8 }}>
        <Text emphasis="passive">
          {name} — provider: {locale}
        </Text>
        <Flex gap="sm" wrap="wrap">
          {children}
        </Flex>
      </Flex>
    </LocaleProvider>
  );
}

function Trigger({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Button variant="secondary" size="sm" onPress={onPress}>
      {label}
    </Button>
  );
}

function Scenario({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  return (
    <Flex direction="column" gap="md" style={{ maxInlineSize: '36rem' }}>
      <Text>{summary}</Text>
      {children}
    </Flex>
  );
}

const sample = (who: string, locale: string): Pick<ToastOptions, 'title' | 'message'> => ({
  title: `Saved by ${who}`,
  message: <Localized from={locale}>Your changes are live.</Localized>
});

// Two bundles that each ship a different @ux/growl major, as on real pages.
const growl2400 = createGrowl('2400');
const growl2500 = createGrowl('2500');

function GrowlTeams() {
  return (
    <>
      <Team name="Team A (Growl 2400)" locale="en-US">
        <growl2400.Growl />
        <Trigger
          label="Growl 2400"
          onPress={() => growl2400.addGrowlMessage({ ...toGrowl(sample('Growl 2400', 'en-US')), lifetime: 5000 })}
        />
      </Team>
      <Team name="Team B (Growl 2500)" locale="es-MX">
        <growl2500.Growl />
        <Trigger
          label="Growl 2500"
          onPress={() => growl2500.addGrowlMessage({ ...toGrowl(sample('Growl 2500', 'es-MX')), lifetime: 5000 })}
        />
      </Team>
    </>
  );
}

function toGrowl({ title, message }: Pick<ToastOptions, 'title' | 'message'>) {
  return { title, children: message };
}

/** 1. Antares ignores Growl entirely. */
export function CoexistScenario() {
  const [queue] = useState(() => new ToastQueue());

  return (
    <Scenario summary="Antares ignores Growl. Each keeps its own stack in the top-right corner, so they overlap. Antares toasts keep their context; Growl 2400's don't, because the 2500 leader draws them (today's bug).">
      <GrowlTeams />
      <Team name="Team C (Antares)" locale="fr-CA">
        <ToastRegion queue={queue} />
        <Trigger label="Antares toast" onPress={() => queue.add(sample('Antares', 'fr-CA'))} />
      </Team>
    </Scenario>
  );
}

/** 2. Antares ignores Growl's protocol, but moves its stack below Growl's. */
export function AvoidScenario() {
  const [queue] = useState(() => new ToastQueue());
  useAvoidGrowl(true);

  return (
    <Scenario summary="Antares stays independent, but moves its stack below any visible Growl. No overlap and no shared protocol. Antares toasts keep their context.">
      <GrowlTeams />
      <Team name="Team C (Antares)" locale="fr-CA">
        <ToastRegion queue={queue} />
        <Trigger label="Antares toast" onPress={() => queue.add(sample('Antares', 'fr-CA'))} />
      </Team>
    </Scenario>
  );
}

/** 3. Antares sends its toasts to whichever Growl leads. */
export function ForwardScenario() {
  return (
    <Scenario summary="Antares hands its toasts to the Growl leader (2500). One stack, but Growl draws them: Growl's look, and Team C's messages get Team B's context.">
      <GrowlTeams />
      <Team name="Team C (Antares, forwarding)" locale="fr-CA">
        <Trigger label="Antares toast" onPress={() => forwardToGrowl(sample('Antares', 'fr-CA'))} />
      </Team>
    </Scenario>
  );
}

/** 4. Antares wins Growl's election and draws everyone's messages. */
export function LeadScenario() {
  const [queue] = useState(() => new ToastQueue());

  return (
    <Scenario summary="Antares joins Growl's election with a higher version and draws every Growl message. One stack in Antares' look, but Team A's and B's messages get Team C's context: this is the SPIKE's react-intl bug.">
      <GrowlTeams />
      <Team name="Team C (Antares, leading)" locale="fr-CA">
        <LeadingAntares queue={queue} />
      </Team>
    </Scenario>
  );
}

/** 5. Two copies of Antares on one page. */
export function MultipleCopiesScenario() {
  const [header] = useState(() => new ToastQueue());
  const [app] = useState(() => new ToastQueue());

  return (
    <Scenario summary="A shared header and the app each bundle their own Antares (simulated with two queues). Both render into one shared host: one stack, no overlap, and each message keeps its own context.">
      <Team name="Header (Antares copy 1)" locale="en-US">
        <ToastRegion queue={header} ariaLabels={{ region: 'Header notifications' }} />
        <Trigger label="Header toast" onPress={() => header.add(sample('the header', 'en-US'))} />
      </Team>
      <Team name="App (Antares copy 2)" locale="es-MX">
        <ToastRegion queue={app} ariaLabels={{ region: 'App notifications' }} />
        <Trigger label="App toast" onPress={() => app.add(sample('the app', 'es-MX'))} />
      </Team>
    </Scenario>
  );
}

/** 6. The Growl API on top of Antares, for migration. */
export function MigrationShimScenario() {
  const [queue] = useState(() => new ToastQueue());
  const [growl] = useState(() => createGrowlShim(queue));

  return (
    <Scenario summary="A team keeps its Growl.addGrowlMessage() calls but swaps the import to a shim backed by Antares. Growl's missing lifetime means persistent, so it maps to timeout: null.">
      <Team name="Team D (Growl API → Antares)" locale="de-DE">
        <ToastRegion queue={queue} />
        <Trigger
          label="addGrowlMessage (5s)"
          onPress={() =>
            growl.addGrowlMessage({ ...toGrowl(sample('the shim', 'de-DE')), emphasis: 'success', lifetime: 5000 })
          }
        />
        <Trigger
          label="addGrowlMessage (no lifetime)"
          onPress={() =>
            growl.addGrowlMessage({
              id: 'persistent',
              title: 'Persistent',
              children: <Localized from="de-DE">Stays.</Localized>
            })
          }
        />
        <Trigger label="removeGrowlMessage" onPress={() => growl.removeGrowlMessage('persistent')} />
      </Team>
    </Scenario>
  );
}

/** 7. Two micro front-ends sharing one copy of Antares, so both regions render the default queue. */
export function SharedCopyScenario() {
  const [queue] = useState(() => new ToastQueue());
  const [headerMounted, setHeaderMounted] = useState(true);

  return (
    <Scenario summary="Both micro front-ends share one copy of Antares, so both mount a region for the same queue. Only the first region shows toasts, so nothing appears twice; unmount it and the second takes over. Toasts render in the active region's app, so the app's toast gets the header's context: use your own ToastQueue if you need yours.">
      <Team name="Header (shared Antares)" locale="en-US">
        {headerMounted ? <ToastRegion queue={queue} ariaLabels={{ region: 'Header notifications' }} /> : null}
        <Trigger label="Header toast" onPress={() => queue.add(sample('the header', 'en-US'))} />
        <Trigger
          label={headerMounted ? 'Unmount header region' : 'Mount header region'}
          onPress={() => setHeaderMounted(!headerMounted)}
        />
      </Team>
      <Team name="App (shared Antares)" locale="es-MX">
        <ToastRegion queue={queue} ariaLabels={{ region: 'App notifications' }} />
        <Trigger label="App toast" onPress={() => queue.add(sample('the app', 'es-MX'))} />
      </Team>
    </Scenario>
  );
}
