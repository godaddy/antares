/**
 * Waits until the markup inside the container stops changing.
 *
 * Charts converge over several passes: visx measures the axes, the measurement changes the
 * margins, and the new margins re-render the plot at a different origin. A pointer event
 * dispatched mid-convergence resolves to a different datum than the same coordinates would
 * once the layout settles, so hover-driven assertions and screenshots must wait for the
 * final geometry.
 *
 * The quiet window has to outlast the parent-size resize debounce, otherwise the markup can
 * look settled for a few frames and then shift again when the debounced measurement lands.
 *
 * @param container - DOM container to observe
 * @param options - Optional config
 * @param options.quiet - Time the markup must stay unchanged, in ms (default: 300)
 * @param options.timeout - Max wait in ms (default: 5000)
 * @returns Promise that resolves once the markup is stable
 * @throws {Error} If the markup is still changing when the timeout elapses
 */
export async function waitForStableRender(
  container: HTMLElement,
  options?: { quiet?: number; timeout?: number }
): Promise<void> {
  const quietMs = options?.quiet ?? 300;
  const timeoutMs = options?.timeout ?? 5000;
  const start = performance.now();

  let previous = container.innerHTML;
  let lastChange = start;

  while (performance.now() - lastChange < quietMs) {
    if (performance.now() - start > timeoutMs) {
      throw new Error(`Render not stable after ${timeoutMs}ms`);
    }

    await new Promise(requestAnimationFrame);

    const current = container.innerHTML;
    if (current !== previous) {
      previous = current;
      lastChange = performance.now();
    }
  }
}
