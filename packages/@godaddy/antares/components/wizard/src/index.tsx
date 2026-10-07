import { createContext, forwardRef, useContext, type ReactNode } from 'react';
import {
  Collection,
  CollectionBuilder,
  createLeafComponent,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  type DialogProps as RACDialogProps,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
  type Key
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { Content } from '#components/structure';
import { OverlayDialog } from '#components/_internal/overlay-dialog';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export interface DialogTriggerProps extends RACDialogTriggerProps {}

/** React Aria dialog trigger, shared by all dialog overlays. */
export function DialogTrigger(props: DialogTriggerProps) {
  return <RACDialogTrigger {...props} />;
}

type WizardFlatKeys =
  | 'isOpen'
  | 'defaultOpen'
  | 'onOpenChange'
  | 'isDismissable'
  | 'isKeyboardDismissDisabled'
  | 'shouldCloseOnInteractOutside';
type WizardLayerProps = Omit<RACModalOverlayProps, 'children' | WizardFlatKeys>;

export interface WizardProps extends Omit<RACDialogProps, 'children'>, Pick<RACModalOverlayProps, WizardFlatKeys> {
  /** Props for the backdrop layer. */
  overlayProps?: WizardLayerProps;

  /** Props for the full-screen modal container. */
  containerProps?: WizardLayerProps;

  /** Consumer-composed title, step collection, and optional regions. */
  children?: ReactNode;
}

/** Full-screen dialog for a step workflow. */
export const Wizard = forwardRef<HTMLElement, WizardProps>(function Wizard(props, ref) {
  const {
    className,
    isOpen,
    defaultOpen,
    onOpenChange,
    isDismissable = false,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    overlayProps,
    containerProps,
    children,
    ...dialogProps
  } = props;

  return (
    <Flex
      as={RACModalOverlay}
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
      {...overlayProps}
      className={composeClassName(overlayProps?.className, styles.overlay)}
    >
      <Flex as={RACModal} {...containerProps} className={composeClassName(containerProps?.className, styles.modal)}>
        <OverlayDialog {...dialogProps} ref={ref} className={composeClassName(className, styles.dialog)}>
          {children}
        </OverlayDialog>
      </Flex>
    </Flex>
  );
});

const ActiveStepContext = createContext(false);

export interface WizardStepsProps {
  /** Static steps in their declared order. */
  children?: ReactNode;
}

/** Builds the ordered collection of steps. */
export function WizardSteps({ children }: WizardStepsProps) {
  return (
    <CollectionBuilder content={<Collection>{children}</Collection>}>
      {(collection) => (
        <Content>
          {[...collection].map((step) => (
            <ActiveStepContext.Provider key={step.key} value={step.key === collection.getFirstKey()}>
              {step.render?.(step)}
            </ActiveStepContext.Provider>
          ))}
        </Content>
      )}
    </CollectionBuilder>
  );
}

export interface WizardStepProps {
  /** Stable identity for this step. */
  id: Key;

  /** Accessible name of this step's content. */
  label: string;

  /** Consumer-owned step content. */
  children?: ReactNode;
}

/** A named, mounted step in the WizardSteps collection. */
export const WizardStep = createLeafComponent<unknown, WizardStepProps, HTMLDivElement>(
  'item',
  function WizardStep(props, ref) {
    const isActive = useContext(ActiveStepContext);
    return (
      <div ref={ref} role="region" aria-label={props.label} hidden={!isActive} inert={!isActive}>
        {props.children}
      </div>
    );
  }
);
