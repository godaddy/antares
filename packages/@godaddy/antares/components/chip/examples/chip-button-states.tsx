import { ChipButton, Flex, Icon, Text, type ChipButtonProps } from '@godaddy/antares';

/** Props used to exercise ChipButton interaction in browser tests. */
export interface ChipButtonStatesExampleProps {
  onPress?: ChipButtonProps['onPress'];
}

/** @ignore */
export function ChipButtonStatesExample({ onPress }: ChipButtonStatesExampleProps) {
  return (
    <Flex direction="column" gap="md" alignItems="start">
      <ChipButton size="sm" aria-label="Small with icon" onPress={onPress}>
        <Icon icon="star" />
        <Text>Small</Text>
      </ChipButton>
      <ChipButton className="consumer-chip-button">Medium</ChipButton>
      <ChipButton size="lg" isDisabled>
        Large disabled
      </ChipButton>
    </Flex>
  );
}
