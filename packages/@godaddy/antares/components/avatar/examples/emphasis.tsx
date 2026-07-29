import { Avatar, AvatarFallback, Flex, type AvatarEmphasis } from '@godaddy/antares';

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

export function EmphasisExample() {
  return (
    <Flex gap="sm" wrap="wrap">
      {emphases.map(function renderAvatar(emphasis, index) {
        return (
          <Avatar key={emphasis} aria-label={emphasis} emphasis={emphasis}>
            <AvatarFallback>{index < 2 ? emphasis.slice(0, 1).toUpperCase() : `${index - 2}`}</AvatarFallback>
          </Avatar>
        );
      })}
    </Flex>
  );
}
