import { useRef } from 'react';
import { Box, Flex, type BoxProps } from '@godaddy/antares';

export function AsExample() {
  return (
    <Flex direction="column" gap="md">
      <AsSemanticElements />
      <AsInteractiveElements />
      <AsWithTypedRefs />
      <AsCustomComponent />
    </Flex>
  );
}

function AsSemanticElements() {
  return (
    <Flex direction="column" gap="sm">
      <Box padding="sm" elevation="base">
        Default (div)
      </Box>
      <Box as="section" padding="sm" elevation="base">
        As section
      </Box>
      <Box as="article" padding="sm" elevation="base">
        As article
      </Box>
      <Box as="span" padding="sm" elevation="base">
        As span
      </Box>
    </Flex>
  );
}

/** Interactive elements with their specific props. */
function AsInteractiveElements() {
  return (
    <Flex direction="column" gap="sm">
      <Box as="button" padding="sm" elevation="base" type="button">
        As button (click me)
      </Box>

      {/* Anchor with href - TypeScript enforces anchor-specific props */}
      <Box as="a" padding="sm" elevation="base" href="https://example.com" target="_blank" rel="noopener noreferrer">
        As anchor (link)
      </Box>

      {/* Input element */}
      <Box as="input" padding="sm" elevation="base" type="text" placeholder="As input element" />
    </Flex>
  );
}

/** Demonstrating typed refs for different elements. */
function AsWithTypedRefs() {
  // Each ref is typed to match the "as" element
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <Flex direction="column" gap="sm">
      <Box as="button" ref={buttonRef} padding="sm" elevation="base">
        Button with typed ref
      </Box>

      <Box as="a" ref={anchorRef} href="#" padding="sm" elevation="base">
        Anchor with typed ref
      </Box>

      <Box ref={divRef} padding="sm" elevation="base">
        Div with typed ref (default)
      </Box>
    </Flex>
  );
}

/** Using Box with a custom component. */
function AsCustomComponent() {
  return (
    <Flex direction="column" gap="sm">
      <Box as={Card} type="A">
        Custom Card
      </Box>

      <Box as={Card} type="B">
        Custom Card
      </Box>
    </Flex>
  );
}

/** Custom component to demonstrate polymorphism with custom components. */
function Card(props: BoxProps & { type?: 'A' | 'B' }) {
  return (
    <Box {...props}>
      {props.type === 'A' ? 'type A! ' : 'type B! '}
      {props.children}
    </Box>
  );
}
