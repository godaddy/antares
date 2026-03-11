/* v8 ignore next */
import React, { useSyncExternalStore, useState, useCallback, useEffect } from 'react';
import { Illustration, type IllustrationProps } from '@bento/illustration';
import { useDataAttributes } from '@bento/use-data-attributes';
import { createStore } from '@bento/create-external-store';
import { useSVGSprite } from '@bento/use-svg-sprite';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { BentoError } from '@bento/error';
import style from './icon.module.css';

export interface IconProps extends Omit<IllustrationProps, 'children'> {
  /**
   * The name or identifier of the icon to be displayed.
   */
  icon: string;

  /**
   * The rendering mode when outputting the icon.
   * Either `sprite` or `svg` where `svg` will return the full SVG element,
   * and the `sprite` mode will add the icon to the sprite sheet and reference it.
   *
   * @default 'svg'
   */
  mode?: 'sprite' | 'svg';

  //
  // The Illustration component requires children, but optional for the icon
  // component as we would only use the children as placeholder for when the
  // requested icon content isn't loaded yet.
  //
  // If the icon isn't loaded yet and we have no children we will render
  // nothing. This also means that users can only style a loading state the
  // icon component if there is a placeholder provided.
  //
  /**
   * Optional children elements to be rendered within the Icon component when the icon isn't loaded yet.
   */
  children?: React.ReactNode;
}

//
// Expose the relevant store methods to the public API so users can introduce
// the contents of the icons to the store.
//
export const { ondemand, set, pick, only } = createStore();

/**
 * Icon component that renders an icon based on the provided props.
 *
 * @component
 * @param args - The properties passed to the Icon component.
 * Additional properties to be passed to the Illustration component.
 * @throws {BentoError} Throws an error if no icon name is provided.
 * @returns The rendered icon or null if no drawing is available.
 * @example
 * ```tsx
 * <Icon icon="home" width={ 48 } height={ 48 } fill="red" flip="horizontal" />
 * ```
 * @public
 */
export const Icon = withSlots('BentoIcon', function Iconic(args: IconProps) {
  const [loading, setLoading] = useState(true);
  const { props, apply } = useProps(args, { loading });
  const { icon, mode, children } = props;
  const sprite = mode === 'sprite';

  //
  // Not supplying a valid icon name should throw an a hard error as we will
  // be unable to render, or request an icon. We don't want to call our
  // ondemand function with an invalid icon name either.
  //
  if (!icon) {
    throw new BentoError({
      name: 'icon',
      method: 'component',
      message: 'No icon name provided.'
    });
  }

  const picker = useCallback(pick(icon), [icon]);
  const subscriber = useCallback(only(icon), [icon]);
  const content = useSyncExternalStore(subscriber, picker, picker);

  const data = useDataAttributes({
    //
    // Solving the chicken and the egg problem. Our `useProps` hook wants
    // to know the state so this can be referenced by the renderProp functions.
    // We can't fetch the contents of the store, before interacting with the
    // returned props from the `useProps` hook. So we need to use state
    // to keep track of the loading state instead of simply checking if we have
    // content returned from the store. As we are using state to track the
    // loading state we don't want to introduce another re-render just to set
    // the state to false when we have content.
    //
    // We are going to pre-maturely set the `data-loading` attribute to `false`
    // when we have content returned from the store so this prop update can
    // happen at the same time as the content update, eliminating an additional
    // render.
    //
    loading: loading && !content,
    mode,
    icon
  });

  useEffect(
    function loaded() {
      if (content && loading) setLoading(false);
    },
    [content, loading]
  );

  const use = useSVGSprite(icon, sprite ? (content as React.ReactElement) : undefined);
  const graphic = sprite ? use : content;
  const drawing = graphic || children;
  if (!drawing) return null;

  const applied = apply({ className: style.icon }, ['icon', 'mode']);

  return (
    <Illustration {...applied} {...data} slot="content">
      {drawing}
    </Illustration>
  );
});
