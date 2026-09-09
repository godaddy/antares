import { ChipButton } from '@godaddy/antares';

/** @ignore */
export function ChipButtonChildrenRenderPropExample() {
  return (
    <ChipButton isDisabled>
      {function renderChildren({ isDisabled }) {
        return isDisabled ? 'Disabled' : 'Enabled';
      }}
    </ChipButton>
  );
}
