import { Button, Card, Content, Text } from '@godaddy/antares';

/** A Card with a native background link and an independent action inside shared Content. */
export function NavigationExample() {
  return (
    <Card href="/about" aria-label="About this product">
      <Content>
        <Text>About this product</Text>
        <Button>Save</Button>
      </Content>
    </Card>
  );
}
