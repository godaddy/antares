import type { ImportedProps, RenamedProps as AliasProps } from './imported.ts';

export interface LocalProps {
  local: boolean;
}

export interface UsesImportedProps extends ImportedProps {
  own: string;
}

export type UsesAliasProps = AliasProps & {
  ownAlias: boolean;
};
