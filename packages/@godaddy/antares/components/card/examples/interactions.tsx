import { useState, type FormEvent } from 'react';
import {
  Box,
  Button,
  Card,
  Content,
  CardSelectionIndicator,
  Checkbox,
  CornerActions,
  Menu,
  MenuItem,
  MenuTrigger,
  Link,
  Radio,
  RadioGroup,
  Text
} from '@godaddy/antares';

interface InteractionReviewProps {
  kind?: 'checkbox' | 'radio';
  primary?: 'action' | 'navigation';
  isDisabled?: boolean;
  isReadOnly?: boolean;
  visibility?: 'auto' | 'always';
  defaultSelected?: boolean;
}

/** @ignore */
export function InteractionsExample({
  kind = 'checkbox',
  primary,
  isDisabled,
  isReadOnly,
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
        <Link href="#independent-destination" onPress={act}>
          Independent link {title}
        </Link>
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
          <Radio as={Card} value="one" aria-label="Option one" {...primaryProps}>
            {contents('One')}
          </Radio>
          <Radio as={Card} value="two" aria-label="Option two">
            {contents('Two')}
          </Radio>
        </RadioGroup>
      ) : (
        <Checkbox
          as={Card}
          name="choice"
          value="one"
          aria-label="Option one"
          defaultSelected={defaultSelected}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          {...primaryProps}
        >
          {contents('One')}
        </Checkbox>
      )}
      <Button type="submit">Submit choices</Button>
      <Button type="reset">Reset choices</Button>
      <Text>Primary activations: {presses}</Text>
      <Text>Independent activations: {actions}</Text>
      <Text>Submitted: {submission}</Text>
    </Box>
  );
}
