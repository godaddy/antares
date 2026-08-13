import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@godaddy/antares';

/**
 * Use the folder-style Manila treatment for document-oriented sections.
 * @order 4
 */
export function ManilaExample() {
  return (
    <Tabs overflowLabels={{ previous: 'Previous tabs', next: 'Next tabs' }} design="manila">
      <TabList aria-label="Documents">
        <Tab id="recent">Recent</Tab>
        <Tab id="shared">Shared</Tab>
        <Tab id="archived">Archived</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="recent">Recent documents</TabPanel>
        <TabPanel id="shared">Shared documents</TabPanel>
        <TabPanel id="archived">Archived documents</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
