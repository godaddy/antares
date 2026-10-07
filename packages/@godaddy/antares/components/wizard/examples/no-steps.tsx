import { Component, type ReactNode } from 'react';
import { Button, DialogTrigger, Wizard } from '@godaddy/antares';

class CollectionErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    return this.state.error ? <p role="alert">{this.state.error.message}</p> : this.props.children;
  }
}

/** A missing collection reports a composition error. @ignore */
export function NoStepsExample() {
  return (
    <CollectionErrorBoundary>
      <DialogTrigger>
        <Button>Open without steps</Button>
        <Wizard aria-label="No steps yet" />
      </DialogTrigger>
    </CollectionErrorBoundary>
  );
}
