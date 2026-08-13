import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@godaddy/antares';

/**
 * Disable a section while keeping the remaining sections available.
 * @order 3
 */
export function DisabledExample() {
  return (
    <Tabs aria-label="Account settings" ariaLabels={{ previous: 'Previous tabs', next: 'Next tabs' }}>
      <TabList>
        <Tab id="account">Account</Tab>
        <Tab id="billing" isDisabled>
          Billing
        </Tab>
        <Tab id="security">Security</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="account">Account settings</TabPanel>
        <TabPanel id="billing">Billing settings</TabPanel>
        <TabPanel id="security">Security settings</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
