import { createContext, useContext } from 'react';
import { Button, Flex, ToastQueue, ToastRegion } from '@godaddy/antares';

const ToastContext = createContext('Missing provider');
const header = new ToastQueue();
const app = new ToastQueue();

function ContextText({ part }: { part: 'title' | 'message' }) {
  return `${useContext(ToastContext)} ${part}`;
}

/** @ignore */
export function IndependentContextsExample() {
  return (
    <>
      <ToastContext.Provider value="Header">
        <ToastRegion queue={header} ariaLabels={{ region: 'Header notifications' }} />
      </ToastContext.Provider>
      <ToastContext.Provider value="App">
        <ToastRegion queue={app} ariaLabels={{ region: 'App notifications' }} />
      </ToastContext.Provider>
      <Flex gap="sm">
        <Button
          onPress={function showHeaderToast() {
            header.add({ title: <ContextText part="title" />, message: <ContextText part="message" />, timeout: null });
          }}
        >
          Header toast
        </Button>
        <Button
          onPress={function showAppToast() {
            app.add({ title: <ContextText part="title" />, message: <ContextText part="message" />, timeout: null });
          }}
        >
          App toast
        </Button>
      </Flex>
    </>
  );
}
