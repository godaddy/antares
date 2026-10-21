import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode
} from 'react';
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
import { useWizardState, WizardStateContext, type WizardStateOptions } from './use-wizard-state.ts';
import { WizardProvider, WizardStepLabelsContext } from './wizard-provider.tsx';
import {
  createWizardCollectionStore,
  WizardCollectionContext,
  type StepCollection
} from './wizard-collection-store.ts';

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
    onFinish,
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
        <WizardRun
          options={{ activeStep, defaultActiveStep, onStepChange, onFinish }}
          renderDialog={(content) => (
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
        </WizardRun>
      </Flex>
    </Flex>
  );
});

const ActiveStepContext = createContext<{ key: Key; isActive: boolean } | null>(null);
const StepFocusContext = createContext<((key: Key, node: HTMLDivElement | null) => void) | null>(null);

function WizardRun({
  options,
  renderDialog,
  children
}: {
  options: Omit<WizardStateOptions, 'collection'>;
  renderDialog: (content: ReactNode) => ReactNode;
  children: ReactNode;
}) {
  const [store] = useState(createWizardCollectionStore);
  const collections = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const collection = collections.length === 1 ? collections[0] : null;
  const steps = collection ? [...collection] : [];
  const state = useWizardState({ ...options, collection: steps.map((step) => step.key) });
  const stepElements = useRef(new Map<Key, HTMLDivElement>());
  const previousActiveStep = useRef(state.activeStep);
  const hadCollection = useRef(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  useEffect(
    function focusChangedStep() {
      if (previousActiveStep.current !== state.activeStep) {
        if (hadCollection.current && state.activeStep !== null) stepElements.current.get(state.activeStep)?.focus();
        previousActiveStep.current = state.activeStep;
      }
      if (collection) hadCollection.current = true;
    },
    [collection, state.activeStep]
  );

  function registerStep(key: Key, node: HTMLDivElement | null) {
    if (node) stepElements.current.set(key, node);
    else stepElements.current.delete(key);
  }

  if (ready && collections.length !== 1) throw new Error('Wizard requires exactly one WizardSteps collection.');
  return renderDialog(
    <WizardCollectionContext.Provider value={store}>
      <WizardProvider state={state}>
        <WizardStepLabelsContext.Provider
          value={steps.map((step) => ({ key: step.key, label: (step.props as WizardStepProps).label }))}
        >
          <StepFocusContext.Provider value={registerStep}>{children}</StepFocusContext.Provider>
        </WizardStepLabelsContext.Provider>
      </WizardProvider>
    </WizardCollectionContext.Provider>
  );
}

export interface WizardStepsProps<T> extends Pick<CollectionProps<T>, 'items' | 'children' | 'dependencies'> {}

/** Builds the ordered collection of steps. */
export function WizardSteps<T>(props: WizardStepsProps<T>) {
  return (
    <CollectionBuilder content={<Collection {...props} />}>
      {function renderCollection(collection) {
        return <WizardStepsContent collection={collection} />;
      }}
    </CollectionBuilder>
  );
}

function WizardStepsContent({ collection }: { collection: StepCollection }) {
  const store = useContext(WizardCollectionContext);
  const state = useContext(WizardStateContext);
  const [source] = useState(() => ({}));
  // Transfer the RAC collection snapshot as a unit; item identity and order stay with CollectionBuilder.
  useLayoutEffect(
    function publishCollection() {
      store?.publish(source, collection);
    },
    [store, source, collection]
  );
  useLayoutEffect(() => () => store?.remove(source), [store, source]);

  return (
    <Content>
      {[...collection].map((step) => (
        <ActiveStepContext.Provider key={step.key} value={{ key: step.key, isActive: step.key === state?.activeStep }}>
          {step.render?.(step)}
        </ActiveStepContext.Provider>
      ))}
    </Content>
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
