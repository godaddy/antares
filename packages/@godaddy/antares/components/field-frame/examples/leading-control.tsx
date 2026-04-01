import { FieldFrame, Button, FieldFrameProps, Box } from '@godaddy/antares';

export function FieldFrameLeadingControl(props: FieldFrameProps) {
  return (
    <FieldFrame label="Phone" description="Enter your phone number" isDisabled={true} {...props}>
      <Button aria-label="Country code" variant="minimal" size="sm">
        Click Me
      </Button>
      <Box />
    </FieldFrame>
  );
}
