import type { ImportedProps, PublicImportedProps } from './import-export-list';
import type { BarrelPublicImportedProps } from './import-export-list-barrel';

export interface UsesImportedPropsFromExportList extends ImportedProps {
  ownImported: string;
}

export interface UsesPublicImportedProps extends PublicImportedProps {
  ownPublic: string;
}

export interface UsesBarrelPublicImportedProps extends BarrelPublicImportedProps {
  ownBarrel: string;
}
