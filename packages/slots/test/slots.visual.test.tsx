import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from '../examples/button';

// TODO: Make these proper screenshot tests
test('renders the app', async ({ mount }) => {
  const component = await mount(<Button>Click Me</Button>);
  await expect(component).toHaveScreenshot('button.png');
});
