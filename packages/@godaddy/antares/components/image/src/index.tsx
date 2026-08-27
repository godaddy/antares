import { createContext, forwardRef, type ImgHTMLAttributes } from 'react';
import { type ContextValue, type SlotProps, useContextProps } from 'react-aria-components';

/** Props for the Image component. */
export interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'slot' | 'children' | 'dangerouslySetInnerHTML'>,
    SlotProps {
  /** Alternative text for informative images, or an empty string for decorative images. */
  alt: string;
}

/**
 * Context used by Antares parents to pass presentation and behavior to a
 * composed Image without wrapping or cloning it.
 */
export const ImageContext = createContext<ContextValue<ImageProps, HTMLImageElement>>(null);

/**
 * A native image element that renders an `<img>` and inherits presentation from
 * its Antares parent.
 *
 * All standard `<img>` attributes are supported. Provide meaningful `alt` text when the
 * image conveys information, or use `alt=""` when it is decorative.
 *
 * @example
 * <Image src="/team/jamie.jpg" alt="Jamie Rivera" />
 *
 * @param props - {@link ImageProps}
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(props, ref) {
  [props, ref] = useContextProps(props, ref, ImageContext);
  const { slot, ...rest } = props;

  return <img {...rest} ref={ref} slot={slot || undefined} />;
});
