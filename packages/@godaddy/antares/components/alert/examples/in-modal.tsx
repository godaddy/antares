import { useRef, useState } from 'react';
import {
  Alert,
  Icon,
  Button,
  ButtonGroup,
  CloseButton,
  Content,
  Heading,
  Modal,
  ModalTrigger,
  Text
} from '@godaddy/antares';

/**
 * Dismissing a composed Alert preserves the enclosing dialog and its accessible title.
 * @title Inside a Modal
 * @order 6
 */
export function InModalExample() {
  const [visible, setVisible] = useState(true);
  const continueRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalTrigger>
      <Button>Open alert dialog</Button>
      <Modal>
        <Heading slot="title">Account settings</Heading>
        <CloseButton aria-label="Close dialog" />
        <Content>
          {visible ? (
            <Alert emphasis="warning">
              <Icon slot="indicator" icon="alert" />
              <Content>
                <Heading slot="title">Payment method expiring</Heading>
                <Text>Review your payment method.</Text>
              </Content>
              <CloseButton
                aria-label="Dismiss warning"
                onPress={function dismissWarning() {
                  continueRef.current?.focus({ preventScroll: true });
                  setVisible(false);
                }}
              />
            </Alert>
          ) : (
            <Text>Alert dismissed.</Text>
          )}
        </Content>
        <ButtonGroup>
          <Button ref={continueRef}>Continue</Button>
          <Button slot="close">Done</Button>
        </ButtonGroup>
      </Modal>
    </ModalTrigger>
  );
}
