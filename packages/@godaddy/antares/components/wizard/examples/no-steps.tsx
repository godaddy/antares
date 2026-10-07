import { Button, DialogTrigger, Wizard } from '@godaddy/antares';

/** A workflow can open without a step collection. @ignore */
export function NoStepsExample() {
  return (
    <DialogTrigger>
      <Button>Open without steps</Button>
      <Wizard aria-label="No steps yet" />
    </DialogTrigger>
  );
}
