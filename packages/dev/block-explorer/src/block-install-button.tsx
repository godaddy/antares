import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Flex, Icon, Text } from '@godaddy/antares';

type CopyStatus = 'idle' | 'copied' | 'error';

/** Props for the {@link BlockInstallButton} component. */
export interface BlockInstallButtonProps {
  /** Block identifier used by the accessible label. */
  readonly blockId: string;

  /** Command copied to the consumer's clipboard. */
  readonly command: string;
}

/**
 * Copies a block's installation command, with feedback and a retry action on failure.
 *
 * @param props - {@link BlockInstallButtonProps}
 */
export function BlockInstallButton({ blockId, command }: BlockInstallButtonProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const resetCopiedTimeout = useRef<number | undefined>(undefined);
  const copied = copyStatus === 'copied';
  const failed = copyStatus === 'error';

  useEffect(function clearCopiedTimeoutOnUnmount() {
    return function clearTimeoutOnUnmount() {
      if (resetCopiedTimeout.current !== undefined) window.clearTimeout(resetCopiedTimeout.current);
    };
  }, []);

  const copyInstallCommand = useCallback(
    async function copyInstallCommand() {
      if (resetCopiedTimeout.current !== undefined) {
        window.clearTimeout(resetCopiedTimeout.current);
        resetCopiedTimeout.current = undefined;
      }
      setCopyStatus('idle');

      try {
        await navigator.clipboard.writeText(command);
        setCopyStatus('copied');
        resetCopiedTimeout.current = window.setTimeout(function resetCopiedState() {
          setCopyStatus('idle');
          resetCopiedTimeout.current = undefined;
        }, 1500);
      } catch {
        setCopyStatus('error');
      }
    },
    [command]
  );

  return (
    <Flex alignItems="center" gap="sm">
      <Button
        variant="secondary"
        size="sm"
        aria-label={`${copied ? 'Copied' : failed ? 'Retry copying install command' : 'Copy install command'} for ${blockId}`}
        onPress={copyInstallCommand}
      >
        <Icon icon={copied ? 'checkmark' : 'download'} width={16} height={16} />
        <Text>{copied ? 'Copied' : failed ? 'Retry' : 'Install'}</Text>
      </Button>
      <Text role="status" aria-live="polite">
        {failed ? 'Could not copy install command.' : null}
      </Text>
    </Flex>
  );
}
