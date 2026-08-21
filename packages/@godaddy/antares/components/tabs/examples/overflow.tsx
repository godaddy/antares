import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@godaddy/antares';

/**
 * When the tab strip is narrower than its content, the group adds controls that move one tab at a time.
 * @order 5
 */
export function OverflowExample({ maxWidth = '320px' }: { maxWidth?: string }) {
  return (
    <Tabs
      overflowLabels={{ previous: 'Scroll previous tabs', next: 'Scroll next tabs' }}
      style={{ width: maxWidth, maxWidth }}
    >
      <TabList aria-label="Product settings">
        <Tab id="overview">Overview</Tab>
        <Tab id="availability">Availability</Tab>
        <Tab id="shipping">Shipping</Tab>
        <Tab id="returns">Returns</Tab>
        <Tab id="notifications">Notifications</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="overview">Overview</TabPanel>
        <TabPanel id="availability">Availability</TabPanel>
        <TabPanel id="shipping">Shipping</TabPanel>
        <TabPanel id="returns">Returns</TabPanel>
        <TabPanel id="notifications">Notifications</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
