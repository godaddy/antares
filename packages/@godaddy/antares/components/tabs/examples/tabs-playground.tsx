import { Tab, TabList, TabPanel, TabPanels, Tabs, type TabsProps } from '@godaddy/antares';

export interface TabsPlaygroundProps extends Pick<TabsProps, 'design' | 'keyboardActivation'> {}

export function PlaygroundExample({ design = 'underline', keyboardActivation = 'automatic' }: TabsPlaygroundProps) {
  return (
    <Tabs
      aria-label="Settings"
      ariaLabels={{ previous: 'Previous tabs', next: 'Next tabs' }}
      design={design}
      keyboardActivation={keyboardActivation}
    >
      <TabList>
        <Tab id="account">Account</Tab>
        <Tab id="billing">Billing</Tab>
        <Tab id="security">Security</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="account">Account</TabPanel>
        <TabPanel id="billing">Billing</TabPanel>
        <TabPanel id="security">Security</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
