import { useEffect, useRef, useState, type ComponentType } from 'react';
import { Box, Button, Flex, Icon, Text } from '@godaddy/antares';
import type { BlockCodeRendererProps, BlockFile } from './types.ts';
import styles from './runtime.module.css';

/** Props for the {@link BlockSourcePanel} component. */
export interface BlockSourcePanelProps {
  /** Active source file. */
  file: BlockFile;

  /** Host-specific syntax highlighter. */
  codeRenderer?: ComponentType<BlockCodeRendererProps>;
}

/**
 * Displays the selected source file and delegates syntax highlighting to the host.
 *
 * @param props - Selected file and optional host-specific code renderer.
 */
export function BlockSourcePanel({ file, codeRenderer: CodeRenderer = PlainCode }: BlockSourcePanelProps) {
  const [copied, setCopied] = useState(false);
  const resetCopiedTimeout = useRef<number | undefined>(undefined);

  useEffect(
    function resetCopiedWhenFileChanges() {
      setCopied(false);
      if (resetCopiedTimeout.current !== undefined) window.clearTimeout(resetCopiedTimeout.current);

      return function clearCopiedTimeout() {
        if (resetCopiedTimeout.current !== undefined) window.clearTimeout(resetCopiedTimeout.current);
      };
    },
    [file.path]
  );

  return (
    <Flex direction="column" className={styles.sourcePanel} flex="1 1 auto">
      <Flex
        className={styles.sourceHeader}
        alignItems="center"
        justifyContent="space-between"
        gap="md"
        blockPadding="sm"
        inlinePadding="md"
      >
        <Text maxLines={1} wrap="nowrap">
          {file.path}
        </Text>
        <Button
          variant="minimal"
          size="sm"
          aria-label={`${copied ? 'Copied' : 'Copy'} ${file.path}`}
          onPress={async function copySource() {
            try {
              await navigator.clipboard.writeText(file.source);
              setCopied(true);
              if (resetCopiedTimeout.current !== undefined) window.clearTimeout(resetCopiedTimeout.current);
              resetCopiedTimeout.current = window.setTimeout(function resetCopied() {
                setCopied(false);
                resetCopiedTimeout.current = undefined;
              }, 1500);
            } catch {
              setCopied(false);
            }
          }}
        >
          <Icon icon={copied ? 'checkmark' : 'copy'} width={16} height={16} />
          <Text>{copied ? 'Copied' : 'Copy'}</Text>
        </Button>
      </Flex>
      <Box className={styles.sourceContent} flex="1 1 auto" padding="md" elevation="base">
        <CodeRenderer code={file.source} language={file.language} filePath={file.path} />
      </Box>
    </Flex>
  );
}

/** Minimal code renderer used when the host does not provide syntax highlighting. */
function PlainCode({ code }: BlockCodeRendererProps) {
  return (
    <Box as="pre">
      <code>{code}</code>
    </Box>
  );
}
