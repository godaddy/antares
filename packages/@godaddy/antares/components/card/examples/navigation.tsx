import { Card, CardGroup, type CardProps } from '@godaddy/antares';

/**
 * Navigation options on standalone links and grouped rows.
 * @ignore
 */
export function NavigationExample({ routerOptions }: { routerOptions?: CardProps['routerOptions'] }) {
  return (
    <>
      <Card
        href="#standalone"
        target="_self"
        rel="help"
        hrefLang="en"
        referrerPolicy="no-referrer"
        routerOptions={routerOptions}
      >
        Standalone navigation
      </Card>
      <Card href="#standalone-download" download="standalone.txt">
        Standalone download
      </Card>
      <CardGroup aria-label="Navigation cards" selectionMode="none">
        <Card
          id="grouped"
          textValue="Grouped navigation"
          href="#grouped"
          target="_self"
          rel="help"
          hrefLang="en"
          referrerPolicy="no-referrer"
          routerOptions={routerOptions}
        >
          Grouped navigation
        </Card>
        <Card id="download" textValue="Grouped download" href="#grouped-download" download="grouped.txt">
          Grouped download
        </Card>
      </CardGroup>
    </>
  );
}
