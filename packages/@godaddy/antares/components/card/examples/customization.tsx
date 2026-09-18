import { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardSelectionIndicator,
  CheckboxGroup,
  CornerActions,
  Group,
  LinkButton,
  RadioGroup,
  Text
} from '@godaddy/antares';

/**
 * Internal review coverage for Card refs, layout props, render props, controlled groups, and an
 * indicator on a Card without selection.
 * @ignore
 */
export function CustomizationExample() {
  const checkboxCardRef = useRef<HTMLDivElement>(null);
  const radioCardRef = useRef<HTMLDivElement>(null);
  const customLinkRef = useRef<HTMLAnchorElement>(null);
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
    setRefsReady(
      checkboxCardRef.current?.hasAttribute('data-card') === true &&
        radioCardRef.current?.hasAttribute('data-card') === true &&
        customLinkRef.current?.tagName === 'A'
    );
  }, []);

  return (
    <>
      <CheckboxGroup value={selectedCheckboxes} onChange={handleCheckboxChange} aria-label="Review checkbox cards">
        <Group>
          <Card
            selection="checkbox"
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
            direction="row"
          >
            <Text>Checkbox props card</Text>
            <CornerActions>
              <CardSelectionIndicator data-testid="props-checkbox-indicator" />
            </CornerActions>
          </Card>
        </Group>
      </CheckboxGroup>
      <Text>Checkbox changes: {checkboxChanges}</Text>

      <RadioGroup value={selectedRadio} onChange={handleRadioChange} aria-label="Review radio cards">
        <Group>
          <Card
            selection="radio"
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
              <CardSelectionIndicator data-testid="props-radio-indicator" />
            </CornerActions>
          </Card>
        </Group>
      </RadioGroup>

      <Card href="/props-review-linked" aria-label="Linked content ref">
        Linked content ref
      </Card>
      <Text data-testid="props-ref-status">{refsReady ? 'Refs ready' : 'Refs pending'}</Text>

      <Card>
        <LinkButton href="#custom-content-link" ref={customLinkRef}>
          Custom content link
        </LinkButton>
      </Card>

      <Card>
        <Text>Card without selection</Text>
        <CornerActions>
          <CardSelectionIndicator data-testid="props-static-indicator" />
        </CornerActions>
      </Card>
    </>
  );
}
