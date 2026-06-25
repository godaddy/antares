import { CircularProgress } from '@godaddy/antares';

export function DefaultExample() {
  return <CircularProgress value={60} label="Uploading…" helperText="3 of 5 files uploaded" />;
}
