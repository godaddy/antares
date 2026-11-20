import type { ContextType, Ref } from 'react';
import {
  Alert,
  Icon,
  IconContext,
  Button,
  ButtonGroup,
  CloseButton,
  Content,
  Flex,
  Heading,
  LinkButton,
  Text
} from '@godaddy/antares';

interface InteriorExampleProps {
  /** Exercise inherited default and named icon customizations. */
  iconContext?: ContextType<typeof IconContext>;

  /** Include an icon using an inherited named slot. */
  supportIcon?: boolean;

  /** Reverse region source order to verify named placement. */
  reverse?: boolean;

  /** Include a nested Alert with its own emphasis. */
  nested?: boolean;

  /** Action callback. */
  onAction?: () => void;

  /** Close callback. */
  onClose?: () => void;

  /** Ref to the outer surface. */
  surfaceRef?: Ref<HTMLDivElement>;

  /** Ref to the content region. */
  contentRef?: Ref<HTMLElement>;

  /** Ref to the emphasis icon. */
  iconRef?: Ref<SVGSVGElement>;

  /** Ref to the close button. */
  closeRef?: Ref<HTMLButtonElement>;
}

/**
 * Exercise local overrides, ordinary controls, refs, nested ownership, and region source order.
 * @ignore
 */
export function InteriorExample({
  reverse = false,
  nested = false,
  iconContext,
  supportIcon = false,
  onAction,
  onClose,
  surfaceRef,
  contentRef,
  iconRef,
  closeRef
}: InteriorExampleProps = {}) {
  const icon = (
    <Icon
      slot="indicator"
      icon="star"
      className="caller-icon"
      style={{ width: 32, height: 32 }}
      data-testid="owned-icon"
      ref={iconRef}
    />
  );
  const content = (
    <Content
      inlinePadding="0"
      blockPadding="0"
      gap="lg"
      className="caller-content"
      data-testid="owned-content"
      ref={contentRef}
      style={{ color: 'rgb(10, 20, 30)' }}
    >
      <Heading slot="title" level={2} size="xl" className="caller-title">
        Custom title
      </Heading>
      <Text>Ordinary body copy.</Text>
      {iconContext && (
        <Heading level={4} data-testid="ordinary-heading">
          Next steps
        </Heading>
      )}
      {supportIcon && <Icon slot="support" icon="information" data-testid="support-icon" />}
      <Button onPress={onAction}>
        Plain action
        <Icon icon="checkmark" width={20} height={20} aria-hidden={false} data-testid="plain-icon" />
      </Button>
      {nested && (
        <Alert emphasis="success" aria-label="Nested notice">
          <Icon slot="indicator" icon="checkmark" />
          <Content>
            <Text>Nested confirmation.</Text>
          </Content>
        </Alert>
      )}
    </Content>
  );
  const actions = (
    <ButtonGroup gap="lg" padding="0" className="caller-actions" aria-label="Resolution options">
      <Button variant="secondary" size="lg" onPress={onAction}>
        Resolve
        <Icon icon="checkmark" data-testid="action-icon" />
      </Button>
      <LinkButton href="#help" variant="tertiary">
        Help
      </LinkButton>
    </ButtonGroup>
  );
  const close = (
    <CloseButton
      variant="tertiary"
      size="lg"
      aria-label="Dismiss composition"
      className="caller-close"
      onPress={onClose}
      ref={closeRef}
    />
  );

  return (
    <IconContext.Provider value={iconContext ?? null}>
      <Flex direction="column" gap="md">
        <Alert
          emphasis="warning"
          aria-label="Composition overrides"
          className="caller-surface"
          style={{ backgroundColor: 'rgb(240, 240, 240)' }}
          ref={surfaceRef}
        >
          {reverse ? (
            <>
              {close}
              {actions}
              {content}
              {icon}
            </>
          ) : (
            <>
              {icon}
              {content}
              {actions}
              {close}
            </>
          )}
        </Alert>
        <Icon icon="information" data-testid="standalone-icon" />
        <Heading size="xl" data-testid="reference-title">
          Reference title
        </Heading>
      </Flex>
    </IconContext.Provider>
  );
}
