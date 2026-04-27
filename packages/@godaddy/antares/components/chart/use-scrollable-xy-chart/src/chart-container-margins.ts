/**
 * DOM measurement helpers for scrollable visx XY chart margins (axis tick structure).
 */

/**
 * Returns whether an element is rendered (computed `display` is not `none`).
 *
 * @param element - Element to check, or null/undefined
 * @returns True when the element exists and is displayed
 */
export function isElementDisplayed(element: Element | null | undefined): boolean {
  if (!element) {
    return false;
  }

  return getComputedStyle(element).display !== 'none';
}

/**
 * Returns the first or last `.visx-axis-tick` group inside a visx axis.
 *
 * @param axisElement - Axis SVG group element, or null
 * @param end - Which end of the axis to read
 * @returns The matching tick group, or null when there are no ticks
 */
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

/**
 * Returns the `<text>` label inside a tick group.
 *
 * @param tick - Tick group element, or null
 * @returns The tick's `SVGTextElement`, or null when missing
 */
export function getTickLabelText(tick: SVGGraphicsElement | null): SVGTextElement | null {
  const node = tick?.querySelector('text');

  return node instanceof SVGTextElement ? node : null;
}

/**
 * Returns half the visual width of the first X-axis tick label.
 *
 * @param xAxisElement - X-axis SVG group element, or null
 * @returns Half the first tick label width in pixels, or 0 when missing or hidden
 */
export function getHalfFirstXAxisTickLabelWidth(xAxisElement: SVGGraphicsElement | null): number {
  const labelText = getTickLabelText(getAxisTickAt(xAxisElement, 'first'));

  if (!labelText || !isElementDisplayed(labelText)) {
    return 0;
  }

  return Math.ceil(labelText.getBoundingClientRect().width / 2);
}

/**
 * Returns half the visual height of the first (bottom-most) Y-axis tick label.
 *
 * @param yAxisElement - Y-axis SVG group element, or null
 * @returns Half the first tick label height in pixels, or 0 when missing or hidden
 */
export function getHalfFirstYAxisTickLabelHeight(yAxisElement: SVGGraphicsElement | null): number {
  const labelText = getTickLabelText(getAxisTickAt(yAxisElement, 'first'));

  if (!labelText || !isElementDisplayed(labelText)) {
    return 0;
  }

  return Math.ceil(labelText.getBoundingClientRect().height / 2);
}

/**
 * Computes the chart's left margin: the greater of the Y-axis width and half the first
 * X-axis tick label width.
 *
 * @param yAxisElement - Y-axis SVG group element, or null
 * @param xAxisElement - X-axis SVG group element, or null
 * @returns Left margin in pixels
 */
export function getLeftMargin(
  yAxisElement: SVGGraphicsElement | null,
  xAxisElement: SVGGraphicsElement | null = null
): number {
  const yAxisWidth = yAxisElement?.getBBox().width ?? 0;

  return Math.max(yAxisWidth, getHalfFirstXAxisTickLabelWidth(xAxisElement));
}

/**
 * Computes the chart's bottom margin: the greater of the X-axis height and half the first
 * (bottom-most) Y-axis tick label height.
 *
 * @param xAxisElement - X-axis SVG group element, or null
 * @param yAxisElement - Y-axis SVG group element, or null
 * @returns Bottom margin in pixels
 */
export function getBottomMargin(
  xAxisElement: SVGGraphicsElement | null,
  yAxisElement: SVGGraphicsElement | null = null
): number {
  const xAxisHeight = xAxisElement?.getBBox().height ?? 0;

  return Math.max(xAxisHeight, getHalfFirstYAxisTickLabelHeight(yAxisElement));
}

/**
 * Computes the chart's right margin so the last X-axis tick label is not clipped.
 * Returns half the label's visual width when it overflows the SVG, 0 otherwise.
 *
 * @param xAxisElement - X-axis SVG group element
 * @param prevRightMargin - Right margin currently applied (px); kept when removing it would re-introduce overflow
 * @returns Right margin in pixels
 */
export function getRightMargin(xAxisElement: SVGGraphicsElement, prevRightMargin = 0): number {
  const lastTickText = getTickLabelText(getAxisTickAt(xAxisElement, 'last'));

  if (!lastTickText || !isElementDisplayed(lastTickText)) {
    return 0;
  }

  const svgRight = xAxisElement.closest('svg')?.getBoundingClientRect().right ?? 0;
  const lastTickTextRect = lastTickText.getBoundingClientRect();

  if (lastTickTextRect.right > svgRight) {
    return Math.ceil(lastTickTextRect.width / 2);
  }

  // The label fits, but the existing margin may be exactly what's keeping it inside the SVG.
  // Removing it would shift the last tick rightward by `prevRightMargin` (visx anchors the
  // last tick at `chartWidth - margin.right`); if that shift would push the label past the
  // edge, keep the current margin so the layout does not oscillate.
  if (prevRightMargin > 0 && lastTickTextRect.right + prevRightMargin > svgRight) {
    return prevRightMargin;
  }

  return 0;
}

/**
 * Computes the chart's top margin so the topmost Y-axis tick label is not clipped.
 * Returns half the label's visual height when it overflows the SVG, 0 otherwise.
 *
 * @param yAxisElement - Y-axis SVG group element
 * @param prevTopMargin - Top margin currently applied (px); kept when removing it would re-introduce overflow
 * @returns Top margin in pixels
 */
export function getTopMargin(yAxisElement: SVGGraphicsElement, prevTopMargin = 0): number {
  const lastTickText = getTickLabelText(getAxisTickAt(yAxisElement, 'last'));

  if (!lastTickText || !isElementDisplayed(lastTickText)) {
    return 0;
  }

  const svgTop = yAxisElement.closest('svg')?.getBoundingClientRect().top ?? 0;
  const lastTickTextRect = lastTickText.getBoundingClientRect();

  if (lastTickTextRect.top < svgTop) {
    return Math.ceil(lastTickTextRect.height / 2);
  }

  // The label fits, but the existing margin may be exactly what's keeping it inside the SVG.
  // Removing it would shift the topmost tick upward by `prevTopMargin` (visx anchors the
  // topmost tick at `margin.top`); if that shift would push the label past the edge, keep
  // the current margin so the layout does not oscillate.
  if (prevTopMargin > 0 && lastTickTextRect.top - prevTopMargin < svgTop) {
    return prevTopMargin;
  }

  return 0;
}
