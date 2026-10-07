import React, { createContext, forwardRef, isValidElement, useContext, type ReactElement, type ReactNode } from 'react';
import {
  Collection,
  CollectionBuilder,
  type CollectionProps,
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
import { useWizardState, type WizardStateOptions } from './use-wizard-state.ts';
import { WizardProvider, WizardStepLabelsContext } from './wizard-provider.tsx';

export { useWizardState, WizardStateContext } from './use-wizard-state.ts';
export { WizardStepsMenu } from './wizard-steps-menu.tsx';
export type { WizardStateOptions, WizardState, WizardStepChangeDetail } from './use-wizard-state.ts';

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

export interface WizardProps
  extends Omit<RACDialogProps, 'children'>,
    Pick<RACModalOverlayProps, WizardFlatKeys>,
    Omit<WizardStateOptions, 'collection'> {
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
    activeStep,
    defaultActiveStep,
    onStepChange,
    ...dialogProps
  } = props;

  // WizardSteps describes the one collection; its items are built by React Aria below.
  // Extract only this direct structural region, never inspect individual step elements.
  const regions = React.Children.toArray(children);
  const collectionRegion = regions.find(
    (region): region is ReactElement<WizardStepsProps<unknown>> => isValidElement(region) && region.type === WizardSteps
  );
  const dialogChildren = collectionRegion ? (
    <WizardCollection
      steps={collectionRegion.props}
      options={{ activeStep, defaultActiveStep, onStepChange }}
      renderLayout={(content) => regions.map((region) => (region === collectionRegion ? content : region))}
    />
  ) : (
    children
  );

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
          {dialogChildren}
        </OverlayDialog>
      </Flex>
    </Flex>
  );
});

const ActiveStepContext = createContext(false);

export interface WizardStepsProps<T> extends Pick<CollectionProps<T>, 'items' | 'children' | 'dependencies'> {}

/** Builds the ordered collection of steps. */
export function WizardSteps<T>(props: WizardStepsProps<T>) {
  return <WizardCollection steps={props} options={{}} renderLayout={(content) => content} />;
}

function WizardCollection<T>({
  steps: { items, children, dependencies },
  options,
  renderLayout
}: {
  steps: WizardStepsProps<T>;
  options: Omit<WizardStateOptions, 'collection'>;
  renderLayout: (content: ReactNode) => ReactNode;
}) {
  return (
    <CollectionBuilder
      content={
        <Collection items={items} dependencies={dependencies}>
          {children}
        </Collection>
      }
    >
      {function renderCollection(collection) {
        const steps = [...collection];
        return (
          <WizardStepContent
            collection={steps.map((step) => step.key)}
            labels={steps.map((step) => ({ key: step.key, label: (step.props as WizardStepProps).label }))}
            options={options}
            renderLayout={renderLayout}
            renderSteps={(activeStep) =>
              steps.map((step) => (
                <ActiveStepContext.Provider key={step.key} value={step.key === activeStep}>
                  {step.render?.(step)}
                </ActiveStepContext.Provider>
              ))
            }
          />
        );
      }}
    </CollectionBuilder>
  );
}

function WizardStepContent({
  collection,
  labels,
  options,
  renderLayout,
  renderSteps
}: {
  collection: Key[];
  labels: { key: Key; label: string }[];
  options: Omit<WizardStateOptions, 'collection'>;
  renderLayout: (content: ReactNode) => ReactNode;
  renderSteps: (activeStep: Key | null) => ReactNode;
}) {
  const state = useWizardState({ ...options, collection });
  return (
    <WizardProvider state={state}>
      <WizardStepLabelsContext.Provider value={labels}>
        {renderLayout(<Content>{renderSteps(state.activeStep)}</Content>)}
      </WizardStepLabelsContext.Provider>
    </WizardProvider>
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
