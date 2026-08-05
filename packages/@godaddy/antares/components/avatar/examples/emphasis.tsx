import { Avatar, Flex, Text, type AvatarEmphasis } from '@godaddy/antares';

const emphases: AvatarEmphasis[] = [
  'primary',
  'subtle',
  'figure0',
  'figure1',
  'figure2',
  'figure3',
  'figure4',
  'figure5',
  'figure6',
  'figure7',
  'figure8',
  'figure9',
  'figure10',
  'figure11',
  'figure12',
  'figure13',
  'figure14'
];

/**
 * Use primary or subtle for standard treatments, and a deterministic figure emphasis to categorize entities in a list.
 * @order 5
 */
export function EmphasisExample() {
  return (
    <Flex gap="sm" wrap="wrap">
      {emphases.map(function renderAvatar(emphasis, index) {
        return (
          <Avatar key={emphasis} emphasis={emphasis}>
            <Text>{index < 2 ? emphasis.slice(0, 1).toUpperCase() : `${index - 2}`}</Text>
          </Avatar>
        );
      })}
    </Flex>
  );
}
