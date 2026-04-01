import { FieldFrame, Button, FieldFrameProps, Flex } from '@godaddy/antares';

export function FieldFrameTrailingControl(props: FieldFrameProps) {
  return (
    <FieldFrame label="Search" isRequired description="Search by keyword" {...props}>
      <Flex flex={1} />
      <Button aria-label="Search">Search</Button>
    </FieldFrame>
  );
}
