import { Icon, Button, Flex } from '@godaddy/antares';
import { FieldFrame, type FieldFrameProps } from '../src';

export function FieldFrameIconAccessories(props: FieldFrameProps) {
  return (
    <FieldFrame label="Email" description="Enter your email address" {...props}>
      <Icon icon="star" aria-hidden />
      <Flex flex={1} />
      <Button aria-label="Verify email address" size="sm" variant="minimal">
        Verify
      </Button>
    </FieldFrame>
  );
}
