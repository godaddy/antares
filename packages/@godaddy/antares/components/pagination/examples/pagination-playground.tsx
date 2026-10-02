import { useState } from 'react';
import { Button, Input, Pagination, PaginationDots, Text } from '@godaddy/antares';

type PaginationPlaygroundComposition = 'known' | 'unknown' | 'minimal' | 'dots';

export interface PlaygroundExampleProps {
  /** Anatomy rendered by the playground. */
  composition?: PaginationPlaygroundComposition;

  /** Number of pages used by known-count compositions. */
  pageCount?: number;

  /** Visual scale applied to Pagination and its composed controls. @default 'md' */
  size?: 'sm' | 'md';

  /** Disables the composed Pagination controls. */
  isDisabled?: boolean;
}

/**
 * Interactive playground for Pagination anatomies, including PaginationDots.
 *
 * @param props - Playground controls.
 */
export function PlaygroundExample({
  composition = 'known',
  pageCount = 5,
  size = 'md',
  isDisabled = false
}: PlaygroundExampleProps) {
  const [page, setPage] = useState(1);
  const knownPageCount = composition === 'unknown' ? undefined : pageCount;
  const showPageInput = composition !== 'minimal' && composition !== 'dots';
  const showPageCount = composition === 'known';

  return (
    <Pagination value={page} pageCount={knownPageCount} onChange={setPage} size={size} isDisabled={isDisabled}>
      <Button slot="previous" aria-label="Previous" />

      {composition === 'dots' ? <PaginationDots /> : null}

      {showPageInput ? (
        <>
          <Input aria-label="Current page" />
          {showPageCount ? (
            <>
              <Text size="sm" aria-hidden>
                /
              </Text>
              <Text size="sm">{pageCount}</Text>
            </>
          ) : null}
        </>
      ) : null}

      <Button slot="next" aria-label="Next" />
    </Pagination>
  );
}
