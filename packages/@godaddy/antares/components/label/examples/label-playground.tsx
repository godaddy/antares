import { Group, Input, Label, TextField, type LabelProps } from '@godaddy/antares';

export function PlaygroundExample(props: Pick<LabelProps, 'children'>) {
  const { children = 'Email' } = props;

  return (
    <TextField>
      <Label>{children}</Label>
      <Group>
        <Input placeholder="you@example.com" />
      </Group>
    </TextField>
  );
}
