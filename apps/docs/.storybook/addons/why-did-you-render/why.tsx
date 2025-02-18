import { Reason, type Event } from './reason.tsx';
import React, { useMemo, type JSX } from 'react';
import { ListWrapper } from './list.tsx';

/**
 * A component that renders a list of reasons based on the provided events.
 *
 * @param {Object} props - The component props.
 * @param {Event[]} props.events - An array of event objects to be rendered.
 * @returns {JSX.Element} A div containing the rendered Reason components.
 */
export function Why({ events }: { events: Event[] }): JSX.Element {
  /**
   * Renders a Reason component for a given event.
   *
   * @param {Event} event - The event object containing the details to be rendered.
   * @param {number} index - The index of the event in the list.
   * @returns {JSX.Element} A Reason component with the event details.
   */
  function renderReason(event: Event, index: number): JSX.Element {
    return <Reason key={index} {...event} />;
  }

  const rows: JSX.Element[] = useMemo(() => events.map(renderReason), [events]);
  return <ListWrapper>{rows}</ListWrapper>;
}
