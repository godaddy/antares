import { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardSelectionIndicator,
  Checkbox,
  CheckboxGroup,
  CornerActions,
  Group,
  Radio,
  RadioGroup,
  Text
} from '@godaddy/antares';

/**
 * Internal review coverage for Card refs, layout props, render props, controlled groups, and
 * CardContent label precedence.
 * @ignore
 */
export function PropsReviewExample() {
  const checkboxCardRef = useRef<HTMLDivElement>(null);
  const radioCardRef = useRef<HTMLDivElement>(null);
  const staticContentRef = useRef<HTMLAnchorElement>(null);
  const linkedContentRef = useRef<HTMLAnchorElement>(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [checkboxChanges, setCheckboxChanges] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [refsReady, setRefsReady] = useState(false);

  function handleCheckboxChange(nextSelection: string[]) {
    setSelectedCheckboxes(nextSelection);
    setCheckboxChanges(function increment(count) {
      return count + 1;
    });
  }

  function handleRadioChange(nextSelection: string) {
    setSelectedRadio(nextSelection);
  }

  useEffect(function checkForwardedRefs() {
    setRefsReady(staticContentRef.current?.tagName === 'DIV' && linkedContentRef.current?.tagName === 'A');
  }, []);

  return (
    <>
      <CheckboxGroup value={selectedCheckboxes} onChange={handleCheckboxChange} aria-label="Review checkbox cards">
        <Group>
          <Checkbox
            as={Card}
            ref={checkboxCardRef}
            value="checkbox-card"
            aria-label="Checkbox props card"
            className={function checkboxCardClass({ isSelected }) {
              return isSelected ? 'review-checkbox-card selected' : 'review-checkbox-card unselected';
            }}
            style={function checkboxCardStyle({ isSelected }) {
              return { borderColor: isSelected ? 'rgb(1, 2, 3)' : 'rgb(4, 5, 6)' };
            }}
            padding="sm"
            gap="xs"
          >
            <Text>Checkbox props card</Text>
            <CornerActions>
              <CardSelectionIndicator data-testid="props-checkbox-indicator" visibility="always" />
            </CornerActions>
          </Checkbox>
        </Group>
      </CheckboxGroup>
      <Text>Checkbox changes: {checkboxChanges}</Text>

      <RadioGroup value={selectedRadio} onChange={handleRadioChange} aria-label="Review radio cards">
        <Group>
          <Radio
            as={Card}
            ref={radioCardRef}
            value="radio-card"
            aria-label="Radio props card"
            className={function radioCardClass({ isSelected }) {
              return isSelected ? 'review-radio-card selected' : 'review-radio-card unselected';
            }}
            style={function radioCardStyle({ isSelected }) {
              return { borderColor: isSelected ? 'rgb(7, 8, 9)' : 'rgb(10, 11, 12)' };
            }}
            padding="md"
            gap="lg"
          >
            <Text>Radio props card</Text>
            <CornerActions>
              <CardSelectionIndicator data-testid="props-radio-indicator" visibility="always" />
            </CornerActions>
          </Radio>
        </Group>
      </RadioGroup>

      <Card>
        <CardContent ref={staticContentRef} data-testid="props-static-content">
          Static content ref
        </CardContent>
      </Card>
      <Card href="/props-review-linked">
        <CardContent ref={linkedContentRef} data-testid="props-linked-content">
          Linked content ref
        </CardContent>
      </Card>
      <Text data-testid="props-ref-status">{refsReady ? 'Refs ready' : 'Refs pending'}</Text>

      <Card href="/props-review-default">
        <CardContent>Default label content</CardContent>
      </Card>
      <Card href="/props-review-context" aria-label="Context label">
        <CardContent>Context label content</CardContent>
      </Card>
      <Card href="/props-review-local" aria-label="Context fallback">
        <CardContent aria-label="Local label">Local label content</CardContent>
      </Card>
    </>
  );
}
