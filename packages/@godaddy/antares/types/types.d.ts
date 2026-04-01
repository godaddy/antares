declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '@ux/deploy-assets' {
  export function getAssetUrl(options: {
    version: string | null;
    name: string;
    assetPath: string;
  }): string;
}