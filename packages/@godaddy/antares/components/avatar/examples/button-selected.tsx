import { Avatar, AvatarButton, Flex, Text } from '@godaddy/antares';
import { useState } from 'react';

const accounts = [
  { id: 'uma', initials: 'UT', label: 'Uma Thurman' },
  { id: 'acme', initials: 'AC', label: 'Acme' },
  { id: 'jamie', initials: 'JR', label: 'Jamie Rivera' }
];

export function ButtonSelectedExample() {
  const [selectedAccount, setSelectedAccount] = useState('uma');

  return (
    <Flex gap="md">
      {accounts.map(function renderAccount(account) {
        return (
          <AvatarButton
            key={account.id}
            aria-label={`Switch to ${account.label}`}
            isSelected={selectedAccount === account.id}
            onPress={function selectAccount() {
              setSelectedAccount(account.id);
            }}
          >
            <Avatar shape={account.id === 'acme' ? 'square' : 'circle'}>
              <Text>{account.initials}</Text>
            </Avatar>
          </AvatarButton>
        );
      })}
    </Flex>
  );
}
