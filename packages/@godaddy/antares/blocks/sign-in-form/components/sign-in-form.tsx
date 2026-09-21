'use client';

import { Box, Button, Flex, Heading, Text } from '@godaddy/antares';
import { signInCopy } from '../data/copy.ts';
import { SignInFields } from './sign-in-fields.tsx';

/** Presents the shared sign-in form composition used in block documentation. */
export function SignInForm() {
  return (
    <Flex justifyContent="center">
      <Box flex="0 1 28rem" padding="xl" rounding="md" elevation="card">
        <Flex
          as="form"
          direction="column"
          gap="lg"
          onSubmit={function handleSubmit(event) {
            event.preventDefault();
          }}
        >
          <Heading level={2}>{signInCopy.title}</Heading>
          <Text>{signInCopy.description}</Text>
          <SignInFields />
          <Button type="submit" variant="primary">
            {signInCopy.submitLabel}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
