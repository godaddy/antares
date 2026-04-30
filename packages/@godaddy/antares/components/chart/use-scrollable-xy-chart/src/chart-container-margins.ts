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
 * Computes the chart's inline-start margin: the greater of the Y-axis width and half the first
 * X-axis tick label width.
 *
 * "Inline start" is the side where the Y-axis lives — visual left in LTR, visual right in RTL.
 *
 * @param yAxisElement - Y-axis SVG group element, or null
 * @param xAxisElement - X-axis SVG group element, or null
 * @returns Inline-start margin in pixels
 */
export function getInlineStartMargin(
  yAxisElement: SVGGraphicsElement | null,
  xAxisElement: SVGGraphicsElement | null = null
): number {
  const yAxisWidth = yAxisElement?.getBBox().width ?? 0;

  return Math.max(yAxisWidth, getHalfFirstXAxisTickLabelWidth(xAxisElement));
}

/**
 * Computes the chart's block-end margin: the greater of the X-axis height and half the first
 * (bottom-most) Y-axis tick label height.
 *
 * "Block end" is the bottom of the chart in horizontal writing modes (the X-axis side).
 *
 * @param xAxisElement - X-axis SVG group element, or null
 * @param yAxisElement - Y-axis SVG group element, or null
 * @returns Block-end margin in pixels
 */
export function getBlockEndMargin(
  xAxisElement: SVGGraphicsElement | null,
  yAxisElement: SVGGraphicsElement | null = null
): number {
  const xAxisHeight = xAxisElement?.getBBox().height ?? 0;

  return Math.max(xAxisHeight, getHalfFirstYAxisTickLabelHeight(yAxisElement));
}

/**
 * Computes the chart's inline-end margin so the last X-axis tick label is not clipped.
 *
 * "Inline end" is the side opposite the Y-axis — visual right in LTR, visual left in RTL.
 * In RTL the last (largest-domain) tick is positioned on the visual left of the chart, so the
 * label can overflow the SVG's left edge instead of its right; pass `isRtl: true` so the
 * overflow check uses the correct edge.
 *
 * @param xAxisElement - X-axis SVG group element
 * @param prevInlineEndMargin - Inline-end margin currently applied (px); kept when removing it would re-introduce overflow
 * @param isRtl - Whether the chart is in RTL writing direction
 * @returns Inline-end margin in pixels
 */
export function getInlineEndMargin(xAxisElement: SVGGraphicsElement, prevInlineEndMargin = 0, isRtl = false): number {
  const lastTickText = getTickLabelText(getAxisTickAt(xAxisElement, 'last'));

  if (!lastTickText || !isElementDisplayed(lastTickText)) {
    return 0;
  }

  const svgRect = xAxisElement.closest('svg')?.getBoundingClientRect();
  const lastTickTextRect = lastTickText.getBoundingClientRect();

  if (isRtl) {
    const svgLeft = svgRect?.left ?? 0;

    if (lastTickTextRect.left < svgLeft) {
      return Math.ceil(lastTickTextRect.width / 2);
    }

    // The label fits, but the existing margin may be exactly what's keeping it inside the SVG.
    // Removing it would shift the last tick leftward by `prevInlineEndMargin` (mapped onto
    // `margin.left` in RTL); if that shift would push the label past the edge, keep the
    // current margin so the layout does not oscillate.
    if (prevInlineEndMargin > 0 && lastTickTextRect.left - prevInlineEndMargin < svgLeft) {
      return prevInlineEndMargin;
    }

    return 0;
  }

  const svgRight = svgRect?.right ?? 0;

  if (lastTickTextRect.right > svgRight) {
    return Math.ceil(lastTickTextRect.width / 2);
  }

  // The label fits, but the existing margin may be exactly what's keeping it inside the SVG.
  // Removing it would shift the last tick rightward by `prevInlineEndMargin` (visx anchors the
  // last tick at `chartWidth - margin.right` in LTR); if that shift would push the label past
  // the edge, keep the current margin so the layout does not oscillate.
  if (prevInlineEndMargin > 0 && lastTickTextRect.right + prevInlineEndMargin > svgRight) {
    return prevInlineEndMargin;
  }

  return 0;
}

/**
 * Computes the chart's block-start margin so the topmost Y-axis tick label is not clipped.
 *
 * "Block start" is the top of the chart in horizontal writing modes.
 *
 * @param yAxisElement - Y-axis SVG group element
 * @param prevBlockStartMargin - Block-start margin currently applied (px); kept when removing it would re-introduce overflow
 * @returns Block-start margin in pixels
 */
export function getBlockStartMargin(yAxisElement: SVGGraphicsElement, prevBlockStartMargin = 0): number {
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
  // Removing it would shift the topmost tick upward by `prevBlockStartMargin` (visx anchors the
  // topmost tick at `margin.top`); if that shift would push the label past the edge, keep the
  // current margin so the layout does not oscillate.
  if (prevBlockStartMargin > 0 && lastTickTextRect.top - prevBlockStartMargin < svgTop) {
    return prevBlockStartMargin;
  }

  return 0;
}
