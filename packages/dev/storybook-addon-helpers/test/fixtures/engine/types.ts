import type { ImportedProps, RenamedProps as AliasProps } from './imported.ts';
import type { ImportedProps as ReExportedImportedProps, ExportedAliasProps } from './re-export.ts';
import type { RenamedProps as StarExportedRenamedProps } from './re-export-all.ts';

export interface LocalProps {
  local: boolean;
}

export interface UsesImportedProps extends ImportedProps {
  own: string;
}

export type UsesAliasProps = AliasProps & {
  ownAlias: boolean;
};

export interface UsesReExportedImportedProps extends ReExportedImportedProps {
  ownReExported: string;
}

export type UsesExportedAliasProps = ExportedAliasProps & {
  ownExportedAlias: boolean;
};

export type UsesStarExportedProps = StarExportedRenamedProps & {
  ownStarExported: string;
};
