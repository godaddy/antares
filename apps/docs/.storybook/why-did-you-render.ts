import whyDidYouRender from '@welldone-software/why-did-you-render';
import { addons } from 'storybook/preview-api';
import React from 'react';

/**
 * The event name that is emitted by the `why-did-you-render.ts` file that we
 * have added to the preview.ts file. This event is used to listen for re-renders
 * in the Storybook addon.
 *
 * @type {string}
 * @private
 */
const eventname: string = 'whyDidYouRender:notifier';

//
// Note that package drastically impacts the performance of your application.
// Their recommendation is to only use it in development mode. Given that
// Storybook is a development tool, we're going to enable this by default.
//
whyDidYouRender(React, {
  trackAllPureComponents: false,
  logOnDifferentValues: true,

  /**
   * The notifier function that is called when a component re-renders. We want
   * to trigger a custom event so that we can listen for it in Storybook addons.
   * We also trigger the default notifier so that we can see the console output.
   *
   * @param {object} detail - The detail object that is passed to the event listener.
   * @private
   */
  notifier: function notifier(detail: any) {
    if (!detail) return;

    const wdyrStore = whyDidYouRender.wdyrStore;

    whyDidYouRender.defaultNotifier(detail);
    addons.getChannel().emit(eventname, {
      ...detail,

      //
      // Expose additional properties that are exposed on our whydidyourender
      // instance as we don't want to have duplicate invocations or imports of
      // of the why-did-you-render package.
      //
      wdyrStore,
      storeOwnerData: whyDidYouRender.storeOwnerData,
      getWDYRType: whyDidYouRender.getWDYRType,

      //
      // This is where it gets tricky, the wdryStore is a WeakMap that for some
      // reason is not being serialized correctly, the `get` method becomes
      // undefined once we receive it in the Storybook addon. We need to extract
      // the data from the WeakMap and send it as a plain object.
      //
      ownerData: {
        prevOwnerData: wdyrStore.ownerDataMap.get(detail.prevProps),
        nextOwnerData: wdyrStore.ownerDataMap.get(detail.nextProps)
      }
    });
  }
});
