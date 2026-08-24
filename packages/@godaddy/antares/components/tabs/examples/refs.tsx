import type { Ref } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@godaddy/antares';

interface RefsExampleProps {
  tabsRef?: Ref<HTMLDivElement>;
  tabListRef?: Ref<HTMLDivElement>;
  tabRef?: Ref<HTMLDivElement>;
  tabPanelsRef?: Ref<HTMLDivElement>;
  tabPanelRef?: Ref<HTMLDivElement>;
}

/**
 * Provides refs for each public Tabs component to verify their forwarded targets.
 * @ignore
 */
export function RefsExample({ tabsRef, tabListRef, tabRef, tabPanelsRef, tabPanelRef }: RefsExampleProps) {
  return (
    <Tabs ref={tabsRef}>
      <TabList ref={tabListRef} aria-label="Account settings">
        <Tab ref={tabRef} id="account">
          Account
        </Tab>
        <Tab id="billing">Billing</Tab>
      </TabList>
      <TabPanels ref={tabPanelsRef}>
        <TabPanel ref={tabPanelRef} id="account">
          Account settings
        </TabPanel>
        <TabPanel id="billing">Billing settings</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
