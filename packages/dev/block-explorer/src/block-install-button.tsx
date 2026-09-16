import { useEffect, useRef, useState } from 'react';
import { Button, Icon, Text } from '@godaddy/antares';

/** Props for the block installation command action. */
export interface BlockInstallButtonProps {
  /** Block identifier used by the accessible label. */
  readonly blockId: string;

  /** Command copied to the consumer's clipboard. */
  readonly command: string;
}

/** Copies a block's shadcn installation command for the documentation consumer. */
export function BlockInstallButton({ blockId, command }: BlockInstallButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetCopiedTimeout = useRef<number | undefined>(undefined);

  useEffect(function clearCopiedTimeoutOnUnmount() {
    return function clearTimeoutOnUnmount() {
      if (resetCopiedTimeout.current !== undefined) window.clearTimeout(resetCopiedTimeout.current);
    };
  }, []);

  return (
    <Button
      variant="secondary"
      size="sm"
      aria-label={`${copied ? 'Copied' : 'Copy install command'} for ${blockId}`}
      onPress={async function copyInstallCommand() {
        try {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          if (resetCopiedTimeout.current !== undefined) window.clearTimeout(resetCopiedTimeout.current);
          resetCopiedTimeout.current = window.setTimeout(function resetCopiedState() {
            setCopied(false);
            resetCopiedTimeout.current = undefined;
          }, 1500);
        } catch {
          setCopied(false);
        }
      }}
    >
      <Icon icon={copied ? 'checkmark' : 'download'} width={16} height={16} />
      <Text>{copied ? 'Copied' : 'Install'}</Text>
    </Button>
  );
}
