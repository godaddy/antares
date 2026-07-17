/**
 * Date primitives from `@internationalized/date`, re-exported under the
 * `@godaddy/antares/date` subpath.
 *
 * `Calendar` / `DatePicker` accept `CalendarDate` values, so consumers need a way to
 * construct them (`parseDate`, `today`, `getLocalTimeZone`, `DateFormatter`, …). Re-exporting
 * here means consumers never install `@internationalized/date` directly and always use the
 * exact copy Antares builds against.
 *
 * Kept out of the top-level barrel (`index.ts`) on purpose: it would pollute the public
 * namespace and its `Calendar` type collides with the `Calendar` component export.
 */
export * from '@internationalized/date';
