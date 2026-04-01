import { createRef, type ComponentProps } from 'react';
import { Box } from '@godaddy/antares';

/** Type tests for Box polymorphism. */
export function TypesExample() {
  const buttonRef = createRef<HTMLButtonElement>();
  const divRef = createRef<HTMLDivElement>();

  return (
    <>
      {/* Valid usage */}

      {/* Button-specific props are valid when as="button" */}
      <Box as="button" type="submit" disabled>
        Valid
      </Box>

      {/* Anchor-specific props are valid when as="a" */}
      <Box as="a" href="/link" target="_blank">
        Valid
      </Box>

      {/* Div ref is valid as default */}
      <Box ref={divRef}>Valid</Box>

      {/* Button ref is valid when as="button" */}
      <Box as="button" ref={buttonRef}>
        Valid
      </Box>

      {/* Box props take priority - padding accepts Spacing type */}
      <Box as={ConflictingProp} padding="sm">
        Valid
      </Box>

      {/* Invalid usage */}

      {/* @ts-expect-error - href is not valid on button */}
      <Box as="button" href="/link">
        Invalid
      </Box>

      {/* @ts-expect-error - disabled is not valid on div */}
      <Box disabled>Invalid</Box>

      {/* @ts-expect-error - formAction is button-specific, not valid on anchor */}
      <Box as="a" href="/link" formAction="/submit">
        Invalid
      </Box>

      {/* @ts-expect-error - buttonRef is not valid for div (default) */}
      <Box ref={buttonRef}>Invalid</Box>

      {/* @ts-expect-error - divRef is not valid for button */}
      <Box as="button" ref={divRef}>
        Invalid
      </Box>

      {/* @ts-expect-error - variant is required */}
      <Box as={RequiredProp}>Invalid</Box>

      {/* @ts-expect-error - invalid variant value */}
      <Box as={RequiredProp} variant="invalid">
        Invalid
      </Box>

      {/* @ts-expect-error - boolean is ConflictingProp's type, not Box's Spacing type */}
      <Box as={ConflictingProp} padding={true}>
        Invalid
      </Box>
    </>
  );
}

/** Custom component with required prop. */
function RequiredProp(props: ComponentProps<'div'> & { variant: 'outlined' | 'filled' }) {
  return <div {...props} />;
}

/** Custom component with a prop that conflicts with Box's padding prop (boolean vs Spacing). */
function ConflictingProp(props: ComponentProps<'div'> & { padding: boolean }) {
  return <div {...props} />;
}
