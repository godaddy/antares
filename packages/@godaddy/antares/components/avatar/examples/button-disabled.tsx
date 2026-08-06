import { Avatar, Box, Button, Text } from '@godaddy/antares';

export interface ButtonDisabledExampleProps {
  onPress?: () => void;
}

/**
 * Use isDisabled when the avatar action is unavailable.
 * @title Disabled avatar button
 * @order 9
 */
export function ButtonDisabledExample({ onPress }: ButtonDisabledExampleProps) {
  return (
    <Box as={Button} variant="ghost" aria-label="Unavailable account" isDisabled onPress={onPress} rounding="full">
      <Avatar>
        <Text>UT</Text>
      </Avatar>
    </Box>
  );
}
