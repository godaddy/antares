/**
 * DOM measurement helpers for scrollable visx XY chart margins (axis tick structure).
 * Kept in a separate module for unit testing in the browser project.
 */

/** Whether the element uses a non-`none` display. Uses getComputedStyle (Firefox-safe); Typed OM `computedStyleMap` is not available in Firefox. */
export function isElementDisplayed(element: Element | null | undefined): boolean {
  if (!element) {
    return false;
  }
  return getComputedStyle(element).display !== 'none';
}

/** First or last `.visx-axis-tick` on a visx axis group (linear scales: first ≈ min domain, last ≈ max). */
export function getAxisTickAt(
  axisElement: SVGGraphicsElement | null,
  end: 'first' | 'last'
): SVGGraphicsElement | null {
  if (!axisElement) {
    return null;
  }
  const tickNodes = axisElement.querySelectorAll<SVGGraphicsElement>('.visx-axis-tick');
  if (tickNodes.length === 0) {
    return null;
  }
  const index = end === 'first' ? 0 : tickNodes.length - 1;
  return tickNodes[index] ?? null;
}

/** `text` node inside a tick group, if it is an `SVGTextElement`. */
export function getTickLabelText(tick: SVGGraphicsElement | null): SVGTextElement | null {
  const node = tick?.querySelector('text');
  return node instanceof SVGTextElement ? node : null;
}

/**
 * Half the first X-axis tick label width (px) for left inset when the bottom-left label extends past the plot; 0 if no axis, no ticks, or label hidden.
 *
 * @param xAxisElement - X-axis SVG group element, or null
 */
export function getHalfFirstXAxisTickLabelWidth(xAxisElement: SVGGraphicsElement | null): number {
  const labelText = getTickLabelText(getAxisTickAt(xAxisElement, 'first'));
  if (!labelText || !isElementDisplayed(labelText)) {
    return 0;
  }
  return Math.ceil(labelText.getBBox().width / 2);
}

/**
 * Left margin: greater of Y-axis group width and half the first X-axis tick label width (corner clearance).
 *
 * @param yAxisElement - Y-axis SVG group element, or null
 * @param xAxisElement - X-axis SVG group element, or null
 * @returns Left margin in px
 */
export function getLeftMargin(
  yAxisElement: SVGGraphicsElement | null,
  xAxisElement: SVGGraphicsElement | null = null
): number {
  const yAxisWidth = yAxisElement?.getBBox().width ?? 0;

  return Math.max(yAxisWidth, getHalfFirstXAxisTickLabelWidth(xAxisElement));
}

/**
 * Bottom margin height from X-axis bbox plus padding, or default if axis not measured.
 *
 * @param xAxisElement - X-axis SVG group element, or null
 * @returns Bottom margin in px
 */
export function getBottomMargin(xAxisElement: SVGGraphicsElement | null): number {
  return xAxisElement?.getBBox().height ?? 0;
}

/**
 * Right margin when the last X-axis tick label overflows the SVG (half label width), zero when labels are hidden,
 * or the previous right margin when labels fit inside the chart.
 *
 * @param xAxisElement - X-axis SVG group element
 * @param prevRightMargin - Previous right margin when the axis fits inside the SVG
 * @returns Right margin in px
 */
export function getRightMargin(xAxisElement: SVGGraphicsElement, prevRightMargin: number): number {
  const lastTick = getAxisTickAt(xAxisElement, 'last');
  const lastTickText = getTickLabelText(lastTick);
  const svgRight = xAxisElement.closest('svg')?.getBoundingClientRect().right ?? 0;
  const lastTickRight = lastTick?.getBoundingClientRect().right ?? 0;

  if (!lastTickText || !isElementDisplayed(lastTickText)) {
    return 0;
  }

  if (lastTickRight > svgRight) {
    return Math.ceil(lastTickText.getBBox().width / 2);
  }

  return prevRightMargin;
}

/**
 * Top margin when the topmost Y-axis tick label overflows above the SVG (half label height), zero when labels are hidden,
 * or the previous top margin when labels fit inside the chart.
 *
 * @param yAxisElement - Y-axis SVG group element
 * @param prevTopMargin - Previous top margin when the axis fits inside the SVG
 * @returns Top margin in px
 */
export function getTopMargin(yAxisElement: SVGGraphicsElement, prevTopMargin: number): number {
  const lastTick = getAxisTickAt(yAxisElement, 'last');
  const lastTickText = getTickLabelText(lastTick);
  const svgTop = yAxisElement.closest('svg')?.getBoundingClientRect().top ?? 0;
  const lastTickTop = lastTick?.getBoundingClientRect().top ?? 0;

  if (!lastTickText || !isElementDisplayed(lastTickText)) {
    return 0;
  }

  if (lastTickTop < svgTop) {
    return Math.ceil(lastTickText.getBBox().height / 2);
  }

  return prevTopMargin;
}
