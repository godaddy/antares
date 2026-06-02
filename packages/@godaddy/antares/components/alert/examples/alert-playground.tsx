import { Alert, Button, type AlertProps } from '@godaddy/antares';

export interface PlaygroundExampleProps extends Pick<Partial<AlertProps>, 'emphasis' | 'title'> {
  /** Optional body text. */
  children?: string;
  /** Show the dismiss button. */
  dismissible?: boolean;
  /** Show an action button. */
  showAction?: boolean;
}

export function PlaygroundExample({
  emphasis = 'info',
  title = 'Alert title',
  children = 'Optional description text providing additional context.',
  dismissible = false,
  showAction = false
}: PlaygroundExampleProps) {
  return (
    <Alert
      emphasis={emphasis}
      title={title}
      onClose={
        dismissible
          ? function noop() {
              /* dismiss */
            }
          : undefined
      }
      actions={
        showAction ? (
          <Button variant="secondary" size="sm">
            Action
          </Button>
        ) : undefined
      }
    >
      {children}
    </Alert>
  );
}
