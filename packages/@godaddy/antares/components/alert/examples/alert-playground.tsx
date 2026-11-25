import { useState } from 'react';
import {
  Alert,
  Icon,
  Button,
  ButtonGroup,
  CloseButton,
  Content,
  Heading,
  Text,
  type AlertProps
} from '@godaddy/antares';

const emphasisIcons = {
  critical: 'alert',
  warning: 'alert',
  success: 'checkmark',
  info: 'information',
  highlight: 'star',
  premium: 'diamond',
  internal: 'comment'
} as const;

export interface PlaygroundExampleProps extends Pick<Partial<AlertProps>, 'emphasis'> {
  /** Title content for the composed Heading. */
  title?: string;

  /** Body content for the composed Text. */
  children?: string;

  /** Include a composed Icon. */
  showIcon?: boolean;

  /** Include a CloseButton that hides the example. */
  dismissible?: boolean;

  /** Include the action region. */
  showAction?: boolean;

  /** Container content width, used by browser and CI screenshot cases. */
  width?: number;

  /** Writing direction for the example. */
  dir?: 'ltr' | 'rtl';
}

export function PlaygroundExample({
  emphasis = 'info',
  title = 'Alert title',
  children = 'Optional description text providing additional context.',
  showIcon = true,
  dismissible = false,
  showAction = false,
  width,
  dir
}: PlaygroundExampleProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return <Button onPress={() => setVisible(true)}>Show alert</Button>;

  const close = dismissible && <CloseButton onPress={() => setVisible(false)} />;

  return (
    <Alert
      emphasis={emphasis}
      dir={dir}
      style={{ width, maxWidth: width === undefined ? undefined : 'none', boxSizing: 'content-box' }}
    >
      {showIcon && <Icon slot="indicator" icon={emphasisIcons[emphasis]} />}
      {title && <Heading slot="title">{title}</Heading>}
      {title && close}
      {children && (
        <Content>
          <Text>{children}</Text>
        </Content>
      )}
      {!title && children && close}
      {showAction && (
        <ButtonGroup>
          <Button variant="secondary" size="sm">
            Action
          </Button>
        </ButtonGroup>
      )}
      {!title && !children && close}
    </Alert>
  );
}
