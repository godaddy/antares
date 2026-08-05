import { Button } from '@godaddy/antares';

/**
 * Test-only class name render prop example.
 *
 * Drives the caller className from RAC interaction state so tests can verify
 * that the state-derived class and the Button base classes both survive
 * `composeClassName`.
 * @ignore
 */
export function ClassNameRenderPropExample() {
  return (
    <Button
      variant="primary"
      className={function getClassName({ isHovered }) {
        return isHovered ? 'hovered' : 'idle';
      }}
    >
      Render Prop Button
    </Button>
  );
}
