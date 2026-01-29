import { stringify } from '@bento/to-attribute-value';
import React, { type ReactElement } from 'react';

/**
 * Interface representing the properties for transforming an illustration.
 *
 * @interface TransformProps
 * @property {90 | 180 | 270} [rotate] - Optional rotation angle in degrees. Can be 90, 180, or 270.
 * @property {'horizontal' | 'vertical'} [flip] - Optional flip direction. Can be 'horizontal' or 'vertical'.
 * @property {string} viewBox - The viewBox attribute defines the position and dimension, in user space, of an SVG viewport.
 */
interface TransformProps {
  rotate?: 90 | 180 | 270;
  flip?: 'horizontal' | 'vertical';
  viewBox: string;
}

/**
 * Represents the viewBox dimensions and position.
 *
 * @typedef {Object} viewBox
 * @property {number} left - The left position of the viewBox.
 * @property {number} top - The top position of the viewBox.
 * @property {number} width - The width of the viewBox.
 * @property {number} height - The height of the viewBox.
 */
type viewBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/**
 * Parses a viewBox string and returns an object with the properties left, top, width, and height.
 *
 * @param {string} box - The viewBox string to parse, expected to be in the format "left top width height".
 * @returns {{ left: number, top: number, width: number, height: number }} An object containing the parsed values.
 * @public
 */
export function parseViewBox(box: string): viewBox {
  const [left, top, width, height] = box.split(' ').map(Number);
  return { left, top, width, height };
}

/**
 * Converts an object containing left, top, width, and height properties into a string formatted as a viewBox.
 *
 * @param {Object} param - The object containing the viewBox properties.
 * @param {number} param.left - The left coordinate of the viewBox.
 * @param {number} param.top - The top coordinate of the viewBox.
 * @param {number} param.width - The width of the viewBox.
 * @param {number} param.height - The height of the viewBox.
 * @returns {string} A string formatted as "left top width height" for use in an SVG viewBox attribute.
 */
export function toViewBox({ left, top, width, height }: viewBox): string {
  return `${left} ${top} ${width} ${height}`;
}

/**
 * Applies transformations to the contents of an SVG. These transformations are
 * introduced by wrapping the contents in a `<g>` element with the appropriate
 * `transform` attribute.
 *
 * @param {Object} props - Transformations to apply.
 * @param {string} [props.flip] - The flip transformation to apply.
 * @param {string} [props.rotate] - The rotation transformation to apply.
 * @param {string} props.viewBox - The viewBox of the SVG.
 * @param {ReactElement} drawings - The contents of the SVG.
 * @returns {ReactElement} The transformed SVG contents.
 * @public
 */
export function transformers(
  { flip, rotate, viewBox }: TransformProps,
  drawings: ReactElement
): {
  viewBox: viewBox;
  drawings: ReactElement;
} {
  let { left, top, width, height } = parseViewBox(viewBox);
  //
  // No transformations are requested so return the children unmodified with
  // an unmodified viewBox.
  //
  if (!flip && !rotate)
    return {
      viewBox: { left, top, width, height },
      drawings
    };

  const targetmasters: object[] = [];

  switch (flip) {
    case 'horizontal': {
      targetmasters.push({
        translate: [width + left, 0 - top],
        scale: [-1, 1]
      });

      top = left = 0;
      break;
    }

    case 'vertical': {
      targetmasters.push({
        translate: [0 - left, height + top],
        scale: [1, -1]
      });

      top = left = 0;
      break;
    }
  }

  switch (+(rotate || 0)) {
    case 90: {
      const position = height / 2 + top;
      targetmasters.push({ rotate: [90, position, position] });

      [width, height] = [height, width];
      [left, top] = [top, left];
      break;
    }

    case 180: {
      targetmasters.push({ rotate: [180, width / 2 + left, height / 2 + top] });
      break;
    }

    case 270: {
      const position = width / 2 + left;
      targetmasters.push({ rotate: [-90, position, position] });
      [width, height] = [height, width];
      [left, top] = [top, left];
      break;
    }
  }

  return {
    viewBox: { left, top, width, height },
    drawings: <g transform={stringify(targetmasters)}>{drawings}</g>
  };
}
