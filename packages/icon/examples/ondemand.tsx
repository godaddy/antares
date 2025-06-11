import React, { createElement, type JSX } from 'react';
import { Icon, ondemand } from '@bento/icon';
import { parser } from '@bento/svg-parser';

//
// The Font Awesome SVG files are hosted on a CDN and we can fetch them on demand
//
const FONT_AWESOME_URL = 'https://site-assets.fontawesome.com/releases/v6.7.2/svgs/solid';

/**
 * Fetches and parses Font Awesome icons on demand.
 * @param {string} icon - The name of the icon to fetch.
 * @returns {Promise<JSX.Element>} A promise that resolves to the parsed SVG element.
 */
ondemand(async function fetchIcons(icon: string) {
  const response = await fetch(`${FONT_AWESOME_URL}/${icon}.svg`);
  const text = await response.text();
  const parsed = parser(text);

  return parsed;
});

/**
 * Awesome component demonstrating on-demand icon loading from Font Awesome.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered icon component with documentation.
 * @public
 */
export function Awesome(args: any): JSX.Element {
  const url = 'https://fontawesome.com/search?o=r&ic=free&s=solid&ip=classic';

  return (
    <>
      <Icon {...args} />
      <p>
        This example fetches icons dynamically using the <code>ondemand</code>
        functionality from the <code>@bento/icon</code> package. It's wired to fetch icons from the Font Awesome CDN and
        render them as React elements. Try any of their <a href={url}>Free, Solid, Icon</a> names such as{' '}
        <code>house</code>, <code>hippo</code>, or <code>image</code>.
      </p>
    </>
  );
}
