'use client';

import { useCallback } from 'react';
import { Button, Flex, Icon, Text } from '@godaddy/antares';

interface ViewBannerProps {
  /** Number of files currently rendered. */
  visibleCount: number;

  /** Number of files in the collection. */
  totalCount: number;

  /** Number of failed files. */
  errorCount: number;

  /** Reveals the remaining files. */
  onShowAll: () => void;
}

/** Counter and upload-error feedback used below the Figma list layouts. */
export function ViewBanner({ visibleCount, totalCount, errorCount, onShowAll }: ViewBannerProps) {
  const hasMore = visibleCount < totalCount;
  const handleShowAll = useCallback(
    function handleShowAll() {
      onShowAll();
    },
    [onShowAll]
  );

  if (!hasMore && errorCount === 0) return null;

  return (
    <Flex direction="column" gap="sm" blockPadding="sm" aria-label="Gallery file status">
      {hasMore || totalCount > 0 ? (
        <Flex justifyContent="space-between" alignItems="center" gap="sm">
          <Text role="status" aria-live="polite">
            {visibleCount} of {totalCount} files
          </Text>
          {hasMore ? (
            <Button variant="inline" onPress={handleShowAll}>
              Show all
            </Button>
          ) : null}
        </Flex>
      ) : null}

      {errorCount > 0 ? (
        <Flex justifyContent="center" alignItems="center" gap="xs" role="alert" aria-live="assertive">
          <Icon icon="alert" aria-hidden="true" />
          <Text emphasis="critical">{errorCount} file upload failed.</Text>
        </Flex>
      ) : null}
    </Flex>
  );
}
