export type { PublicProps } from './private';
// @ts-expect-error PrivateProps is intentionally not exported by ./private.
export type { PrivateProps as ExplicitPrivateProps } from './private';
