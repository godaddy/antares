import { useState, type FormEvent } from 'react';
import {
  Box,
  Button,
  Card,
  CardSelectionIndicator,
  type CardSelectionIndicatorProps,
  CornerActions,
  Menu,
  MenuItem,
  MenuTrigger,
  LinkButton,
  RadioGroup,
  RangeField,
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
  isReadOnly,
  defaultSelected = false,
  focusable,
  media,
  slider,
  indicatorChildren
}: {
  kind?: 'checkbox' | 'radio';
  primary?: 'action' | 'navigation';
  isDisabled?: boolean;
  isReadOnly?: boolean;
  defaultSelected?: boolean;
  focusable?: 'card' | 'ancestor';
  media?: 'audio' | 'video';
  slider?: boolean;
  indicatorChildren?: CardSelectionIndicatorProps['children'];
}) {
  const [presses, setPresses] = useState(0);
  const [lastPress, setLastPress] = useState('none');
  const [actions, setActions] = useState(0);
  const [submission, setSubmission] = useState('none');

  function activate(event: { pointerType: string; shiftKey: boolean }) {
    setPresses((count) => count + 1);
    setLastPress(`${event.pointerType}${event.shiftKey ? '+shift' : ''}`);
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
      {primary ? null : (
        <CornerActions data-testid="corner-One" padding="sm">
          <CardSelectionIndicator data-testid="indicator-One">{indicatorChildren}</CardSelectionIndicator>
        </CornerActions>
      )}
      <Box contentEditable suppressContentEditableWarning data-testid="editor-One">
        Editable One
      </Box>
      {media === 'audio' ? <audio controls aria-label="Audio preview" /> : null}
      {media === 'video' ? (
        <video controls aria-label="Video preview" width={300} height={150}>
          <track kind="captions" />
        </video>
      ) : null}
      {slider ? <RangeField label="Volume" defaultValue={10} /> : null}
    </>
  );

  if (primary === 'navigation') {
    return (
      <>
        <Card href="#card-review-target" onPress={activate} isDisabled={isDisabled} aria-label="Option one">
          <Text>One: copy this text without changing selection.</Text>
        </Card>
        <Text>Primary activations: {presses}</Text>
      </>
    );
  }

  const tabIndex = focusable === 'card' ? 0 : undefined;

  return (
    <Box as="form" onSubmit={submit} tabIndex={focusable === 'ancestor' ? 0 : undefined}>
      {primary === 'action' ? (
        <Card aria-label="Option one" onPress={activate} isDisabled={isDisabled} tabIndex={tabIndex}>
          {interior}
        </Card>
      ) : kind === 'radio' ? (
        <RadioGroup
          aria-label="Choose an option"
          name="choice"
          defaultValue={defaultSelected ? 'one' : undefined}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
        >
          <Card selection="radio" value="one" aria-label="Option one" tabIndex={tabIndex}>
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
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          tabIndex={tabIndex}
        >
          {interior}
        </Card>
      )}
      <Button type="submit">Submit choices</Button>
      <Button type="reset">Reset choices</Button>
      <Text>Primary activations: {presses}</Text>
      <Text>Last primary press: {lastPress}</Text>
      <Text>Independent activations: {actions}</Text>
      <Text>Submitted: {submission}</Text>
    </Box>
  );
}
