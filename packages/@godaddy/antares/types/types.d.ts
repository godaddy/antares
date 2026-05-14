declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// biome-ignore lint/correctness/noUnresolvedImports: intentionally added
declare module '@ux/deploy-assets' {
  export function getAssetUrl(options: { version: string | null; name: string; assetPath: string }): string;
}
