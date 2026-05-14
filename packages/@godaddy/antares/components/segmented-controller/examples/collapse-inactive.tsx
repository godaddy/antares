import { Icon, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

export function CollapseInactiveExample() {
  return (
    <SegmentedController aria-label="Channel" defaultValue="messages" collapseInactive>
      <SegmentedControllerItem value="inbox" icon={<Icon icon="inbox" width={24} height={24} />}>
        Inbox
      </SegmentedControllerItem>
      <SegmentedControllerItem value="messages" icon={<Icon icon="email" width={24} height={24} />}>
        Messages
      </SegmentedControllerItem>
      <SegmentedControllerItem value="notifications" icon={<Icon icon="bell" width={24} height={24} />}>
        Notifications
      </SegmentedControllerItem>
    </SegmentedController>
  );
}
