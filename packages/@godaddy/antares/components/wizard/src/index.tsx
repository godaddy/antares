import { createContext, forwardRef, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Collection,
  CollectionBuilder,
  type CollectionProps,
  createBranchComponent,
  createLeafComponent,
  DEFAULT_SLOT,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  type DialogProps as RACDialogProps,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
  Provider as RACProvider,
  type Key
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { ButtonContext } from '#components/button';
import { Content } from '#components/structure';
import { OverlayDialog } from '#components/_internal/overlay-dialog';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';
import { useWizardState, type WizardState, type WizardStateOptions } from './use-wizard-state.ts';
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
      <CollectionBuilder
        content={
          <RACProvider values={[[ButtonContext, { slots: { [DEFAULT_SLOT]: {}, close: {} } }]]}>
            <WizardProvider state={discoveryState}>
              <CollectionDiscoveryContext.Provider value>
                <Collection>{children}</Collection>
              </CollectionDiscoveryContext.Provider>
            </WizardProvider>
          </RACProvider>
        }
      >
        {function renderCollection(collection) {
          return (
            <Flex
              as={RACModal}
              {...containerProps}
              className={composeClassName(containerProps?.className, styles.modal)}
            >
              <WizardCollectionView
                collection={collection}
                options={{ activeStep, defaultActiveStep, onStepChange }}
                renderLayout={(content) => (
                  <OverlayDialog
                    elevation="base"
                    {...dialogProps}
                    ref={ref}
                    className={composeClassName(className, styles.dialog)}
                  >
                    {content}
                  </OverlayDialog>
                )}
              >
                {children}
              </WizardCollectionView>
            </Flex>
          );
        }}
      </CollectionBuilder>
    </Flex>
  );
});

const ActiveStepContext = createContext<{ key: Key; isActive: boolean } | null>(null);
const StepFocusContext = createContext<((key: Key, node: HTMLDivElement | null) => void) | null>(null);
const CollectionDiscoveryContext = createContext(false);
const StepContentContext = createContext<ReactNode>(null);
const noAction = () => undefined;
// The collection builder shallow-renders the layout. Give composed controls inert context in that hidden tree.
const discoveryState: WizardState = {
  activeStep: null,
  collection: [],
  activePosition: -1,
  visitedSteps: new Set(),
  canPrevious: false,
  canNext: false,
  previous: noAction,
  next: noAction,
  goToStep: noAction
};

function WizardCollectionView({
  collection,
  options,
  renderLayout,
  children
}: {
  collection: Parameters<Parameters<typeof CollectionBuilder>[0]['children']>[0];
  options: Omit<WizardStateOptions, 'collection'>;
  renderLayout: (content: ReactNode) => ReactNode;
  children: ReactNode;
}) {
  // On the client the hidden collection portal publishes its first snapshot after mounting.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const nodes = [...collection.getKeys()].map((key) => collection.getItem(key));
  const regions = nodes.filter((node): node is NonNullable<typeof node> => node?.type === 'wizard-steps');
  if (regions.length === 0 && !ready) return null;
  if (regions.length !== 1) throw new Error('Wizard requires exactly one WizardSteps collection.');
  const steps = [...collection.getChildren(regions[0].key)];
  return renderLayout(
    <WizardStepContent
      collection={steps.map((step) => step.key)}
      labels={steps.map((step) => ({ key: step.key, label: (step.props as WizardStepProps).label }))}
      options={options}
      renderSteps={(activeKey) =>
        steps.map((step) => (
          <ActiveStepContext.Provider key={step.key} value={{ key: step.key, isActive: step.key === activeKey }}>
            {step.render?.(step)}
          </ActiveStepContext.Provider>
        ))
      }
    >
      {children}
    </WizardStepContent>
  );
}

export interface WizardStepsProps<T> extends Pick<CollectionProps<T>, 'items' | 'children' | 'dependencies'> {}

const StepsCollection = createBranchComponent<unknown, WizardStepsProps<unknown>, HTMLElement>(
  'wizard-steps',
  function StepsCollection() {
    return null;
  },
  function buildStepChildren({ items, children, dependencies }) {
    return (
      <Collection items={items} dependencies={dependencies}>
        {children}
      </Collection>
    );
  }
);

/** Builds the ordered collection of steps. */
export function WizardSteps<T>(props: WizardStepsProps<T>) {
  const discovering = useContext(CollectionDiscoveryContext);
  const content = useContext(StepContentContext);
  return discovering ? <StepsCollection {...(props as WizardStepsProps<unknown>)} /> : <Content>{content}</Content>;
}

function WizardStepContent({
  collection,
  labels,
  options,
  renderSteps,
  children
}: {
  collection: Key[];
  labels: { key: Key; label: string }[];
  options: Omit<WizardStateOptions, 'collection'>;
  renderSteps: (activeStep: Key | null) => ReactNode;
  children: ReactNode;
}) {
  const state = useWizardState({ ...options, collection });
  const stepElements = useRef(new Map<Key, HTMLDivElement>());
  const previousActiveStep = useRef(state.activeStep);
  useEffect(
    function focusActivatedStep() {
      if (previousActiveStep.current !== state.activeStep) {
        previousActiveStep.current = state.activeStep;
        if (state.activeStep !== null) stepElements.current.get(state.activeStep)?.focus();
      }
    },
    [state.activeStep]
  );

  function registerStep(key: Key, node: HTMLDivElement | null) {
    if (node) stepElements.current.set(key, node);
    else stepElements.current.delete(key);
  }
  return (
    <WizardProvider state={state}>
      <WizardStepLabelsContext.Provider value={labels}>
        <StepFocusContext.Provider value={registerStep}>
          <StepContentContext.Provider value={renderSteps(state.activeStep)}>{children}</StepContentContext.Provider>
        </StepFocusContext.Provider>
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
    const step = useContext(ActiveStepContext);
    const isActive = step?.isActive ?? false;
    const registerStep = useContext(StepFocusContext);
    return (
      <div
        ref={function registerStepElement(node) {
          if (step) registerStep?.(step.key, node);
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role="region"
        aria-label={props.label}
        tabIndex={-1}
        hidden={!isActive}
        inert={!isActive}
      >
        {props.children}
      </div>
    );
  }
);
