/**
 * @godaddy/antares — Antares component library public API.
 *
 * Import this package to access all components, layout primitives, and design tokens.
 * CSS custom properties are automatically side-effect imported when this module loads.
 *
 * Each line below re-exports a granular `exports/<Area>.ts` file, which is also the
 * package's public subpath (e.g. `@godaddy/antares/Button`). Edit only the
 * `exports/<Area>.ts` file when changing exports — this barrel re-exports it, so the
 * barrel and the subpath stay in sync automatically.
 */

export * from './exports/Icon';
export * from './exports/Button';
export * from './exports/Text';
export * from './exports/Layout';
export * from './exports/Select';
export * from './exports/Menu';
export * from './exports/Chart';
export * from './exports/Checkbox';
export * from './exports/Radio';
export * from './exports/Popover';
export * from './exports/Tooltip';
export * from './exports/TextField';
export * from './exports/NumberField';
export * from './exports/Carousel';
export * from './exports/Pagination';
export * from './exports/SegmentedController';
export * from './exports/MetricsLockup';
export * from './exports/Drawer';
export * from './exports/InlineDrawer';
export * from './exports/Modal';
export * from './exports/ProgressBar';
export * from './exports/ToggleButton';
export * from './exports/Alert';
export * from './exports/Tag';

// One-off re-export of a low-level React Aria utility with no dedicated subpath.
export { FocusScope, type FocusScopeProps } from '@react-aria/focus';
