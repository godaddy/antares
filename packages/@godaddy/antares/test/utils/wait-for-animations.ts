function getActiveAnimations() {
  return document.getAnimations().filter(function active(animation) {
    const endTime = animation.effect?.getComputedTiming().endTime;
    if (animation.pending) {
      return endTime === undefined || Number.isFinite(endTime);
    }
    return animation.playState === 'running' && Number.isFinite(endTime);
  });
}

function hasTransitioningElements() {
  return document.querySelector('[data-entering], [data-exiting]') !== null;
}

async function waitForAnimationsToFinish(animations: Animation[]) {
  await Promise.all(
    animations.map(function animationFinished(animation) {
      return animation.finished.catch(function animationCancelled() {
        return undefined;
      });
    })
  );
}

/** Wait for finite active animations and entering or exiting elements to settle. */
export async function waitForAnimations() {
  let quietFrames = 0;
  while (quietFrames < 2) {
    const activeAnimations = getActiveAnimations();
    if (activeAnimations.length > 0) {
      quietFrames = 0;
      await waitForAnimationsToFinish(activeAnimations);
      continue;
    }

    await new Promise<void>(function nextFrame(resolve) {
      requestAnimationFrame(function painted() {
        resolve();
      });
    });

    const activeAnimationsAfterFrame = getActiveAnimations();
    if (activeAnimationsAfterFrame.length > 0) {
      quietFrames = 0;
      await waitForAnimationsToFinish(activeAnimationsAfterFrame);
    } else if (hasTransitioningElements()) {
      quietFrames = 0;
    } else {
      quietFrames += 1;
    }
  }
}
