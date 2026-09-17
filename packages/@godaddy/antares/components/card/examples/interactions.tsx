import { useState, type FormEvent } from 'react';
import {
  Box,
  Button,
  Card,
  Content,
  CardSelectionIndicator,
  CornerActions,
  Menu,
  MenuItem,
  MenuTrigger,
  LinkButton,
  RadioGroup,
  Text
} from '@godaddy/antares';

interface InteractionReviewProps {
  kind?: 'checkbox' | 'radio';
  primary?: 'action' | 'navigation';
  isDisabled?: boolean;
  isPrimaryDisabled?: boolean;
  isReadOnly?: boolean;
  isIndeterminate?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  visibility?: 'auto' | 'always';
  defaultSelected?: boolean;
}

/** @ignore */
export function InteractionsExample({
  kind = 'checkbox',
  primary,
  isDisabled,
  isPrimaryDisabled,
  isReadOnly,
  isIndeterminate,
  isRequired,
  isInvalid,
  visibility = 'always',
  defaultSelected = false
}: InteractionReviewProps) {
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

  function contents(title: string) {
    const text = <Text>{title}: copy this text without changing selection.</Text>;
    return (
      <Content>
        {text}
        <CornerActions data-testid={`corner-${title}`} padding="sm">
          <Button onPress={act}>Independent {title}</Button>
          <CardSelectionIndicator visibility={visibility} data-testid={`indicator-${title}`} />
        </CornerActions>
        <Button isDisabled onPress={act}>
          Unavailable {title}
        </Button>
        <LinkButton href="#independent-destination" onPress={act}>
          Independent link {title}
        </LinkButton>
        <MenuTrigger>
          <Button>Menu {title}</Button>
          <Menu aria-label={`Menu ${title}`} onAction={act}>
            <MenuItem id="nested">Menu action {title}</MenuItem>
          </Menu>
        </MenuTrigger>
        <Box contentEditable suppressContentEditableWarning data-testid={`editor-${title}`}>
          Editable {title}
        </Box>
      </Content>
    );
  }

  const primaryProps = {
    isDisabled: isPrimaryDisabled,
    href: primary === 'navigation' ? '#card-review-target' : undefined,
    onPress: primary ? activate : undefined
  };

  return (
    <Box as="form" onSubmit={submit}>
      {kind === 'radio' ? (
        <RadioGroup
          aria-label="Choose an option"
          name="choice"
          defaultValue={defaultSelected ? 'one' : undefined}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
        >
          <Card selection="radio" value="one" aria-label="Option one" {...primaryProps}>
            {contents('One')}
          </Card>
          <Card selection="radio" value="two" aria-label="Option two">
            {contents('Two')}
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
          {contents('One')}
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
