import { useRef, useState } from 'react';
import {
  Accordion,
  Button,
  Collapsible,
  CollapsiblePanel,
  Flex,
  Heading,
  Input,
  Label,
  TextField,
  Icon,
  Text
} from '@godaddy/antares';

/**
 * Break a single-page form into steps while keeping entered values mounted.
 * @order 7
 */
export function FormStepsExample() {
  const [keys, setKeys] = useState<Set<string | number>>(new Set(['contact']));
  const paymentTrigger = useRef<HTMLButtonElement>(null);
  return (
    <Accordion allowsMultipleExpanded={false} expandedKeys={keys} onExpandedChange={setKeys}>
      <Collapsible id="contact">
        <Heading>
          <Button slot="trigger">
            <Text>Contact details</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>
          <Flex direction="column" gap="md">
            <TextField>
              <Label>Name</Label>
              <Input />
            </TextField>
            <Button
              onPress={function continueToPayment() {
                paymentTrigger.current?.focus();
                setKeys(new Set(['payment']));
              }}
            >
              Continue to payment
            </Button>
          </Flex>
        </CollapsiblePanel>
      </Collapsible>
      <Collapsible id="payment">
        <Heading>
          <Button slot="trigger" ref={paymentTrigger}>
            <Text>Payment details</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Review your payment details before submitting.</CollapsiblePanel>
      </Collapsible>
      <Collapsible id="review">
        <Heading>
          <Button slot="trigger">
            <Text>Review and submit</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Check your contact and payment details before submitting.</CollapsiblePanel>
      </Collapsible>
    </Accordion>
  );
}
