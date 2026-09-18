import { useState, type FormEvent } from 'react';
import {
  Box,
  Button,
  Card,
  CardSelectionIndicator,
  CornerActions,
  Menu,
  MenuItem,
  MenuTrigger,
  LinkButton,
  RadioGroup,
  Text
} from '@godaddy/antares';

/**
 * Hidden fixture for primary action, selection, nested controls, and form behavior.
 * @ignore
 */
export function InteractionsExample({
  kind = 'checkbox',
  primary,
  isDisabled,
  isPrimaryDisabled,
  isReadOnly,
  isIndeterminate,
  isRequired,
  isInvalid,
  defaultSelected = false,
  focusable
}: {
  kind?: 'checkbox' | 'radio';
  primary?: 'action' | 'navigation';
  isDisabled?: boolean;
  isPrimaryDisabled?: boolean;
  isReadOnly?: boolean;
  isIndeterminate?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  defaultSelected?: boolean;
  focusable?: 'card' | 'ancestor';
}) {
  const [presses, setPresses] = useState(0);
  const [actions, setActions] = useState(0);
  const [submission, setSubmission] = useState('none');

  function activate() {
    setPresses((count) => count + 1);
  }

  function act() {
    setActions((count) => count + 1);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmission(new FormData(event.currentTarget).getAll('choice').join(',') || 'empty');
  }

  const interior = (
    <>
      <Text>One: copy this text without changing selection.</Text>
      <Button onPress={act}>Body One</Button>
      <label>
        Remember One
        <input type="checkbox" tabIndex={-1} data-testid="form-One" />
      </label>
      <Button onPress={act}>Independent One</Button>
      <LinkButton href="#independent-destination" onPress={act}>
        Independent link One
      </LinkButton>
      <MenuTrigger>
        <Button>Menu One</Button>
        <Menu aria-label="Menu One" onAction={act}>
          <MenuItem id="nested">Menu action One</MenuItem>
        </Menu>
      </MenuTrigger>
      <CornerActions data-testid="corner-One" padding="sm">
        <CardSelectionIndicator data-testid="indicator-One" />
      </CornerActions>
      <Box contentEditable suppressContentEditableWarning data-testid="editor-One">
        Editable One
      </Box>
    </>
  );

  if (primary === 'navigation') {
    return (
      <>
        <Card href="#card-review-target" onPress={activate} isDisabled={isPrimaryDisabled} aria-label="Option one">
          <Text>One: copy this text without changing selection.</Text>
        </Card>
        <Text>Primary activations: {presses}</Text>
      </>
    );
  }

  const primaryProps = {
    isDisabled: isPrimaryDisabled,
    onPress: primary ? activate : undefined,
    tabIndex: focusable === 'card' ? 0 : undefined
  };

  return (
    <Box as="form" onSubmit={submit} tabIndex={focusable === 'ancestor' ? 0 : undefined}>
      {kind === 'radio' ? (
        <RadioGroup
          aria-label="Choose an option"
          name="choice"
          defaultValue={defaultSelected ? 'one' : undefined}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
        >
          <Card selection="radio" value="one" aria-label="Option one" {...primaryProps}>
            {interior}
          </Card>
          <Card selection="radio" value="two" aria-label="Option two">
            Two
            <CornerActions>
              <CardSelectionIndicator data-testid="indicator-Two" />
            </CornerActions>
          </Card>
        </RadioGroup>
      ) : (
        <Card
          selection="checkbox"
          name="choice"
          value="one"
          aria-label="Option one"
          defaultSelected={defaultSelected}
          isSelectionDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isIndeterminate={isIndeterminate}
          isRequired={isRequired}
          isInvalid={isInvalid}
          {...primaryProps}
        >
          {interior}
        </Card>
      )}
      <Button type="submit">Submit choices</Button>
      <Button type="reset">Reset choices</Button>
      <Text>Primary activations: {presses}</Text>
      <Text>Independent activations: {actions}</Text>
      <Text>Submitted: {submission}</Text>
    </Box>
  );
}
