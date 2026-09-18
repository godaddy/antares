import type { CSSProperties } from 'react';
import { Avatar, Button, Detail, Flex, Heading, Label, SizeProvider, Text } from '@godaddy/antares';

/** Token and legacy themes keep their font settings through composed labels. */
export function ThemesExample() {
  const themes = {
    tokens: {
      '--font-body-family': 'monospace',
      '--font-body-size-sm': '17px',
      '--font-body-variation': '"wght" 450',
      '--ux-j40yyd': '600',
      '--ux-jw5s9j': '1.75',
      '--font-size-020': '15px',
      '--color-feedback-critical-text': 'rgb(100, 20, 30)'
    },
    legacy: {
      '--ux-117cu43': 'monospace',
      '--ux-gfnupv': 'monospace',
      '--ux-ndnsbo': '"wght" 475',
      '--ux-j40yyd': '600',
      '--ux-jw5s9j': '1.75',
      '--ux-1fhc073': 'rgb(110, 20, 30)'
    }
  };
  return (
    <Flex direction="column" gap="lg">
      {Object.entries(themes).map(([name, style]) => (
        <section key={name} data-theme={name} style={style as CSSProperties}>
          <SizeProvider size="sm">
            <Heading>{name} theme</Heading>
            <Text>Body {name}</Text>
            <Detail>Supporting {name}</Detail>
            <Label>Label {name}</Label>
            <Button>
              <Text emphasis="critical">Themed {name}</Text>
            </Button>
            <Avatar size="lg">
              <Text>JR</Text>
            </Avatar>
          </SizeProvider>
        </section>
      ))}
    </Flex>
  );
}
