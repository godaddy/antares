import { Slider, type SliderProps } from '@godaddy/antares';

export function SliderDefaultExample(
  props: Pick<SliderProps, 'defaultValue' | 'maxValue' | 'minValue' | 'onChange' | 'onChangeEnd'> = {}
) {
  return <Slider label="Volume" defaultValue={50} {...props} />;
}
