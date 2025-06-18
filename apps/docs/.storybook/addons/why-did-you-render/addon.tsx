import { AddonPanel, Badge, Spaced } from 'storybook/internal/components';
import { addons, types } from 'storybook/manager-api';
import React, { useEffect, useState } from 'react';
import { EmptyState } from './empty-state.tsx';
import { Why } from './why.tsx';
import type { Event } from './reason.tsx';

const eventname = 'whyDidYouRender:notifier';
const name = 'why-did-you-render';
let controlsCount = 0;

addons.register(name, function register() {
  addons.add(`${name}/panel`, {
    type: types.PANEL,
    title: function Title() {
      const suffix = controlsCount === 0 ? '' : <Badge status="neutral">{controlsCount}</Badge>;

      return (
        <div>
          <Spaced col={1}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>Re-renders</span>
            {suffix}
          </Spaced>
        </div>
      );
    },
    render: function render({ active }) {
      const [events, setEvents] = useState<Event[]>([]);

      useEffect(function addonListener(): () => void {
        /**
         * Event listener for 'why-did-you-render' events that is emitted by
         * the `why-did-you-render.ts` that we have added to the preview.ts.
         *
         * We cannot depend on the why-did-you-render package in our addon
         * because it needs to be first import of the file in order to correctly
         * patch the React internals.
         *
         * @param {Object} data - The why-did-you-render data.
         * @private
         */
        function listener(data: any): void {
          setEvents(function update(prev) {
            const state = [...prev, data].filter(Boolean);

            //
            // If you are reading the source, looking to learn, don't do this
            // I'm too lazy to properly implement the sharing of this state
            // between the Title and the Panel components.
            //
            controlsCount = state.length;

            return state;
          });
        }

        addons.getChannel().on(eventname, listener);

        /**
         * Cleanup the event listener.
         *
         * @returns {void}
         * @private
         */
        return function cleanup(): void {
          addons.getChannel().removeListener(eventname, listener);
        };
      }, []);

      const contents = events.length ? <Why events={events} /> : <EmptyState />;
      return <AddonPanel active={!!active}>{contents}</AddonPanel>;
    }
  });
});
