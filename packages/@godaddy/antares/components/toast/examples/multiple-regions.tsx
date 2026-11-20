import { createContext, useContext } from 'react';
import { Button, Flex, ToastQueue, ToastRegion } from '@godaddy/antares';

const header = new ToastQueue();
const app = new ToastQueue();
const SenderContext = createContext('Unknown sender');

function SenderName() {
  return useContext(SenderContext);
}

/**
 * Each queue stands in for a separate copy of Antares, such as a shared header and the app it wraps.
 * Both regions render into one page-wide host, so their toasts stack instead of overlapping.
 * Titles and messages read each region's own provider.
 * @title Multiple Regions
 * @order 6
 */
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
}
