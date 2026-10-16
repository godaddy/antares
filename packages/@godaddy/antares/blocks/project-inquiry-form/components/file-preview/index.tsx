'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, Flex, Text } from '@godaddy/antares';
import { filePreviewKind } from '../../data/files';
import styles from './index.module.css';

interface FilePreviewProps {
  /** Selected file to preview. */
  file: File;
}

/** Creates local image previews and gives non-image files a readable fallback. */
export function FilePreview({ file }: FilePreviewProps) {
  const [url, setUrl] = useState<string>();
  const [failed, setFailed] = useState(false);
  const previewKind = filePreviewKind(file);

  useEffect(
    function createPreview() {
      if (previewKind !== 'image') return;

      const next = URL.createObjectURL(file);
      setUrl(next);
      setFailed(false);

      return function releasePreview() {
        URL.revokeObjectURL(next);
      };
    },
    [file, previewKind]
  );

  const handlePreviewError = useCallback(function handlePreviewError() {
    setFailed(true);
  }, []);

  if (url && !failed) {
    return (
      <Box
        as="img"
        src={url}
        alt=""
        loading="lazy"
        decoding="async"
        width={56}
        height={56}
        rounding="lg"
        className={styles.preview}
        onError={handlePreviewError}
      />
    );
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      rounding="lg"
      elevation="card"
      aria-hidden="true"
      className={styles.preview}
    >
      <Text>{previewKind === 'pdf' ? 'PDF' : 'IMG'}</Text>
    </Flex>
  );
}
