import type { Ref } from 'react';
import {
  Accordion,
  AccordionContext,
  Collapsible,
  CollapsibleContext,
  CollapsiblePanel,
  Heading,
  Text,
  Button,
  Icon,
  type ButtonProps
} from '@godaddy/antares';

/**
 * Exercises context defaults, refs, render props, and local overrides.
 * @ignore
 */
export function CompositionExample({
  customSurface = false,
  groupRef,
  itemRef,
  triggerRef,
  panelRef,
  isDisabled = false,
  onPress,
  triggerProps,
  onAuxiliaryPress
}: {
  customSurface?: boolean;
  groupRef?: Ref<HTMLDivElement>;
  itemRef?: Ref<HTMLDivElement>;
  triggerRef?: Ref<HTMLButtonElement>;
  panelRef?: Ref<HTMLDivElement>;
  isDisabled?: boolean;
  onPress?: () => void;
  triggerProps?: Pick<ButtonProps, 'className' | 'style' | 'variant' | 'size' | 'isDisabled'>;
  onAuxiliaryPress?: () => void;
} = {}) {
  return (
    <AccordionContext.Provider value={{ defaultExpandedKeys: ['first'], isDisabled: true, className: 'from-context' }}>
      <Accordion
        render={customSurface ? (surfaceProps) => <div {...surfaceProps} data-custom-surface="" /> : undefined}
        ref={groupRef}
        role="group"
        aria-label="Composition"
        isDisabled={isDisabled}
        className="custom-group"
      >
        {() => (
          <CollapsibleContext.Provider value={{ className: 'item-context' }}>
            <Collapsible
              id="first"
              ref={itemRef}
              className={({ isExpanded }) => (isExpanded ? 'custom-open' : 'custom-closed')}
            >
              {({ isExpanded }) => (
                <>
                  <Heading level={2} className="custom-heading">
                    <Button
                      slot="trigger"
                      ref={triggerRef}
                      {...triggerProps}
                      className={triggerProps?.className ?? 'custom-trigger'}
                      onPress={onPress}
                      style={triggerProps?.style ?? { textDecoration: 'underline' }}
                    >
                      <Text>Composed heading</Text>
                      <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
                    </Button>
                  </Heading>
                  <Button onPress={onAuxiliaryPress}>Independent action</Button>
                  <CollapsiblePanel ref={panelRef} className="custom-panel" role="region">
                    <Heading level={4}>Panel heading</Heading>
                    <Button>Panel action</Button>
                    <Icon slot="panel-status" icon="checkmark" aria-hidden="true" />
                    <Text>{isExpanded ? 'Expanded content' : 'Collapsed content'}</Text>
                  </CollapsiblePanel>
                </>
              )}
            </Collapsible>
          </CollapsibleContext.Provider>
        )}
      </Accordion>
    </AccordionContext.Provider>
  );
}
