export { PublicGeneratedProps, PublicGeneratedProps as BarrelPublicGeneratedProps } from './local-export-list';
// @ts-expect-error HiddenLocalProps is intentionally not exported by ./local-export-list.
export { HiddenLocalProps } from './local-export-list';
