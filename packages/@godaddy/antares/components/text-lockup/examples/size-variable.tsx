import type { CSSProperties } from 'react';
import { Flex, Heading, SizeProvider, Text, TextLockup } from '@godaddy/antares';

function sizeVariable(value: string) {
  return { '--antares-size': value } as CSSProperties;
}

/**
 * Fixture for a lockup without `size` following `--antares-size`. Each title names its case so a test
 * can target it.
 * @ignore
 */
export function SizeVariableExample() {
  return (
    <Flex direction="column" gap="lg">
      {['sm', 'lg', '2xl'].map(function renderSize(size) {
        return (
          <div key={size} style={sizeVariable(size)}>
            <TextLockup>
              <Heading slot="title">{`Variable ${size}`}</Heading>
              <Text slot="body">{`Body ${size}`}</Text>
            </TextLockup>
          </div>
        );
      })}

      <div style={sizeVariable('xl')}>
        <TextLockup size="sm">
          <Heading slot="title">Explicit size wins</Heading>
        </TextLockup>
      </div>

      <div style={sizeVariable('xl')}>
        <div style={sizeVariable('sm')}>
          <TextLockup>
            <Heading slot="title">Nearest wins</Heading>
          </TextLockup>
        </div>
      </div>

      <SizeProvider size="lg">
        <TextLockup>
          <Heading slot="title">Unset follows the scope</Heading>
        </TextLockup>
      </SizeProvider>
    </Flex>
  );
}
