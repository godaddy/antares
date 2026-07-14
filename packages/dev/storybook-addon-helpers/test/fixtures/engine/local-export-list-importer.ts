import type { PublicGeneratedProps as ImportedPublicGeneratedProps } from './local-export-list';
import type { BarrelPublicGeneratedProps } from './local-export-list-barrel';

export interface UsesImportedPublicGeneratedProps extends ImportedPublicGeneratedProps {
  ownImported: string;
}

export interface UsesBarrelPublicGeneratedProps extends BarrelPublicGeneratedProps {
  ownBarrel: string;
}
