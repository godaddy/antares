import { Group, Input, Label, TextField, type LabelProps } from '@godaddy/antares';

export function PlaygroundExample(props: Pick<LabelProps, 'as' | 'children'>) {
  const { as = 'label', children = 'Email' } = props;

  return (
    <TextField>
      <Label as={as}>{children}</Label>
      <Group>
        <Input placeholder="you@example.com" />
      </Group>
    </TextField>
  );
}
