import { Button, Card, CardContent, Text } from '@godaddy/antares';

/** A Card with a native linked content region and an independent action. */
export function NavigationExample() {
  return (
    <Card href="/about" aria-label="About this product">
      <CardContent>
        <Text>About this product</Text>
      </CardContent>
      <Button>Save</Button>
    </Card>
  );
}
