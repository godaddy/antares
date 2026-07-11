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

export interface OverrideBaseProps {
  /** base description */
  override?: string;
}

export interface OverrideChildProps extends OverrideBaseProps {
  /** child description */
  override: string;
}

export type LiteralProps = {
  /** type literal description */
  literal?: 'a' | 'b';
};

export type IntersectedProps = ParentProps &
  LiteralProps & {
    intersected: boolean;
  };

export type IntersectionOverrideProps = { value?: string } & { value: string };

export type DocumentedIntersectionProps = {
  /** first description */
  dup?: string;
} & {
  /** second description */
  dup: number;
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

export interface GenericOwnProps {
  /** own description */
  own: boolean;
}

// A generic alias whose parameter is used directly inside an intersection.
export type GenericWrapper<T> = T & {
  wrapped: string;
};

export type UsesGenericWrapperProps = GenericWrapper<GenericOwnProps>;

export interface GenericLayoutOwnProps {
  /** layout own description */
  layout: string;
}

// Mirrors the polymorphic props pattern: an "own props" parameter threaded
// through a nested generic alias, plus an element-type parameter with a default.
export type GenericPolymorphic<E extends string, Own> = Own & {
  as?: E;
};

export type GenericLayoutProps<E extends string = 'div'> = GenericPolymorphic<E, GenericLayoutOwnProps>;

export interface UsesGenericHeritageProps extends Omit<GenericLayoutProps<'div'>, 'as'> {
  extra: number;
}

export interface DocumentedPolyOwnProps {
  /** Polymorphic element type. @default 'div' */
  as?: string;
  /** own layout thing */
  layout?: string;
}

// Documented `as` intersected with the structural `{ as?: E }` refinement.
export type DocumentedPolyProps<E extends string = 'div'> = GenericPolymorphic<E, DocumentedPolyOwnProps>;
