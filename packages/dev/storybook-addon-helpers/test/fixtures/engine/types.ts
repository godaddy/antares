import type { ImportedProps, RenamedProps as AliasProps } from './imported.ts';
import type { ImportedProps as ReExportedImportedProps, ExportedAliasProps } from './re-export.ts';
import type { RenamedProps as StarExportedRenamedProps } from './re-export-all.ts';

export interface LocalProps {
  /** local description */
  local: boolean;
}

export interface ParentProps {
  /** parent description */
  parent?: string;
}

export interface UsesImportedProps extends ImportedProps {
  own: string;
}

export interface ChildProps extends ParentProps {
  child: number;
}

export interface BaseProps {
  a: string;
  b: number;
}

export interface SiblingBaseProps {
  a: string;
  b: number;
}

export interface PickExtendsProps extends Pick<SiblingBaseProps, 'a'> {
  ownPick: string;
}

export interface OmitExtendsProps extends Omit<SiblingBaseProps, 'b'> {
  ownOmit: string;
}

export type LiteralProps = {
  /** type literal description */
  literal?: 'a' | 'b';
};

export type IntersectedProps = ParentProps &
  LiteralProps & {
    intersected: boolean;
  };

export type PickedProps = Pick<ChildProps, 'parent'>;

export type OmittedProps = Omit<ChildProps, 'parent'>;

export type PartialProps = Partial<ChildProps>;

export type RequiredProps = Required<ChildProps>;

export type SiblingUtilityProps = Pick<BaseProps, 'a'> & Pick<BaseProps, 'b'>;

export type UnsupportedKeyofPickProps = Pick<ChildProps, keyof ChildProps>;

export type UnsupportedKeyofOmitProps = Omit<ChildProps, keyof ParentProps>;

export type AliasCycleAProps = AliasCycleBProps & {
  a: string;
};

export type AliasCycleBProps = AliasCycleAProps & {
  b: string;
};

export interface MixedCycleInterfaceProps extends MixedCycleAliasProps {
  mixedInterface: boolean;
}

export type MixedCycleAliasProps = MixedCycleInterfaceProps & {
  mixedAlias: string;
};

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
