/**
 * Shared structural containers for composing a component's interior. Each is a semantic,
 * layout-only container built on `Flex`, so it accepts the same layout props (`direction`,
 * `gap`, `alignItems`, ...), and lives in its own file:
 *
 * - `Content` -> `./content.tsx`
 * - `Header` -> `./header.tsx`
 * - `Footer` -> `./footer.tsx`
 * - `ButtonGroup` -> `./button-group.tsx`
 *
 * Each owns an optional context: used standalone the container renders with its own
 * structural defaults; placed inside a parent that provides the context (e.g. `Modal`)
 * it adopts that parent's styling. Merge precedence is defaults < parent context <
 * consumer props, via RAC's `useContextProps`.
 */

export { Content, ContentContext, type ContentProps } from './content.tsx';
export { Header, HeaderContext, type HeaderProps } from './header.tsx';
export { Footer, FooterContext, type FooterProps } from './footer.tsx';
export { ButtonGroup, ButtonGroupContext, type ButtonGroupProps } from './button-group.tsx';
