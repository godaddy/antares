import { ProgressBar, Flex } from '@godaddy/antares';

export function StatusesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar label="Default" status="default" value={50} helperText="In progress" />
      <ProgressBar label="Success" status="success" value={100} helperText="Complete" />
      <ProgressBar label="Warning" status="warning" value={70} helperText="Storage almost full" />
      <ProgressBar label="Critical" status="critical" value={30} helperText="Action required" />
    </Flex>
  );
}
