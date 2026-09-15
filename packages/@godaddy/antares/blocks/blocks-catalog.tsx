import React, { type ReactNode } from 'react';
import { Box, Flex, Grid, Heading, Text, TextLockup } from '@godaddy/antares';

/** Properties for the shared landing page used by Site and Storybook. */
export interface BlocksCatalogProps {
  /** Host-specific block explorers rendered in the catalog grid. */
  readonly children?: ReactNode;
}

export interface BlockCatalogEntryProps {
  /** Explorer rendered for the block. */
  readonly children: ReactNode;
}

/**
 * Renders the Antares Blocks landing page.
 *
 * The layout is intentionally host-neutral so Site and Storybook can present
 * the same catalog while choosing the explorer implementation for each host.
 */
export function BlocksCatalog({ children }: BlocksCatalogProps) {
  return (
    <Box as="main" blockPadding="2xl" inlinePadding="xl">
      <Flex as="section" direction="column" alignItems="center" gap="2xl">
        <TextLockup align="center" size="xl">
          <Text slot="eyebrow">Antares blocks</Text>
          <Heading slot="title" level={1}>
            Build product experiences with Antares.
          </Heading>
          <Text slot="body">
            Discover complete UI patterns, inspect how they are built, and use them as a foundation for your product.
          </Text>
        </TextLockup>

        {React.Children.count(children) > 0 ? (
          <Grid
            as="section"
            alignSelf="stretch"
            columns="repeat(auto-fit, minmax(min(100%, 24rem), 1fr))"
            gap="xl"
            inlinePadding="md"
          >
            {children}
          </Grid>
        ) : (
          <Text as="p">No blocks are available yet.</Text>
        )}
      </Flex>
    </Box>
  );
}

/** Groups a host-specific block explorer in the catalog layout. */
export function BlockCatalogEntry({ children }: BlockCatalogEntryProps) {
  return (
    <Box as="article" elevation="base" rounding="md">
      {children}
    </Box>
  );
}
