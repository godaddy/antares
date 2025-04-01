import { Icon, ondemand } from '@bento/icon';
import React, { type JSX } from 'react';

/**
 * Creates a promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to wait before the promise resolves.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

ondemand(async function fetchIcons(icon: string) {
  if (icon !== 'name-to-be-intercepted-by-ondemand') return;

  //
  // Delay the loading of the dragon icon for 10 seconds to simulate a slow
  // network connection.
  //
  await timeout(10000);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
      <path d="m352 124.5-51.9-13c-6.5-1.6-11.3-7.1-12-13.8s2.8-13.1 8.7-16.1l40.8-20.4-43.2-32.4c-5.5-4.1-7.8-11.3-5.6-17.9S297.1 0 304 0h160c30.2 0 58.7 14.2 76.8 38.4l57.6 76.8c6.2 8.3 9.6 18.4 9.6 28.8 0 26.5-21.5 48-48 48h-21.5c-17 0-33.3-6.7-45.3-18.7L480 160h-32v21.5c0 24.8 12.8 47.9 33.8 61.1l106.6 66.6c32.1 20.1 51.6 55.2 51.6 93.1 0 60.6-49.1 109.7-109.8 109.7H32.3c-3.3 0-6.6-.4-9.6-1.4-9.2-2.8-16.7-9.6-20.3-18.5C1 488.7.2 485.2 0 481.4c-.2-3.7.3-7.3 1.3-10.7 2.8-9.2 9.6-16.7 18.6-20.4 3-1.2 6.2-2 9.5-2.2L433.3 412c8.3-.7 14.7-7.7 14.7-16.1 0-4.3-1.7-8.4-4.7-11.4l-44.4-44.4c-30-30-46.9-70.7-46.9-113.1V124.5zm160-52.2v-.6.6zm-1.3 7.4-46.4-11.6c-.2 1.3-.3 2.6-.3 3.9 0 13.3 10.7 24 24 24 10.6 0 19.5-6.8 22.7-16.3zm-379.8 36.8c16.3-14.5 40.4-16.2 58.5-4.1l130.6 87v27.5c0 32.8 8.4 64.8 24 93H112c-6.7 0-12.7-4.2-15-10.4s-.5-13.3 4.6-17.7l69.4-59.5-152.6 23.5c-7 1.1-13.9-2.6-16.9-9S0 232.7 5.3 228l125.6-111.5z" />
    </svg>
  );
});

export function Loader(args: any): JSX.Element {
  //
  // spinner and dragon icon used by the loader delayed loader above are fromt:
  // Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.
  //
  return (
    <>
      <Icon icon="name-to-be-intercepted-by-ondemand" {...args}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
        </svg>
      </Icon>
      <p>Displays the children of the icon as placeholder while our dragon icon is delayed for 10 seconds.</p>
    </>
  );
}
