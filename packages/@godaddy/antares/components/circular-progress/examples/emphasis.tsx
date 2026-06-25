import { CircularProgress, Flex } from '@godaddy/antares';

export function EmphasisExample() {
  return (
    <Flex gap="lg" alignItems="flex-end">
      <CircularProgress value={60} label="Default" />
      <CircularProgress emphasis="success" value={100} label="Success" helperText="Complete" />
      <CircularProgress emphasis="warning" value={70} label="Warning" helperText="Storage almost full" />
      <CircularProgress emphasis="critical" value={30} label="Critical" helperText="Action required" />
    </Flex>
  );
}
