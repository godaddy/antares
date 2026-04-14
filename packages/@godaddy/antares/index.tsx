/**
 * @godaddy/antares — Antares component library public API.
 *
 * Import this package to access all components, layout primitives, and design tokens.
 * CSS custom properties are automatically side-effect imported when this module loads.
 */
import './variables.css';

export { Icon, set, ondemand, parser, type IconProps } from '#components/icon';

export { Button, type ButtonProps, LinkButton, type LinkButtonProps } from '#components/button';

export { Text, type TextProps } from '#components/text';

export { Box, type BoxProps, type BoxOwnProps } from '#components/layout/box';
export { Flex, type FlexProps, type FlexOwnProps } from '#components/layout/flex';
export { Grid, type GridProps, type GridOwnProps } from '#components/layout/grid';

export {
  Select,
  SelectItem,
  SelectSection,
  SelectHeader,
  type SelectProps,
  type SelectItemProps,
  type SelectSectionProps,
  type SelectHeaderProps
} from '#components/select';

export {
  Menu,
  MenuHeader,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
  SubmenuTrigger,
  type MenuHeaderProps,
  type MenuItemProps,
  type MenuProps,
  type MenuSectionProps,
  type MenuSeparatorProps,
  type MenuTriggerProps,
  type SubmenuTriggerProps
} from '#components/menu';

export { FieldFrame, type FieldFrameProps } from '#components/field-frame';

export type { DataPoint, SeriesConfig } from '#components/chart/types';

export { BarChart, type BarChartProps } from '#components/chart/bar-chart';

export { Checkbox, CheckboxGroup, type CheckboxProps, type CheckboxGroupProps } from '#components/checkbox';

export { Radio, RadioGroup, type RadioProps, type RadioGroupProps } from '#components/radio';

export { Popover, PopoverTrigger, type PopoverProps, type PopoverTriggerProps } from '#components/popover';

export { Tooltip, TooltipTrigger, type TooltipProps, type TooltipTriggerProps } from '#components/tooltip';

export { TextField, type TextFieldProps } from '#components/text-field';

export { NumberField, type NumberFieldProps } from '#components/number-field';

export { Carousel, type CarouselProps, type CarouselRef } from '#components/carousel';

export { Pagination, type PaginationProps } from '#components/pagination';

export { LineChart, type LineChartProps } from '#components/chart/line-chart';

export { GaugeChart, type GaugeChartProps } from '#components/chart/gauge-chart';

export {
  SegmentedController,
  SegmentedControllerItem,
  type SegmentedControllerProps,
  type SegmentedControllerItemProps
} from '#components/segmented-controller';

export { MetricsLockup, type MetricsLockupProps } from '#components/metrics-lockup';

export {
  Modal,
  ModalTrigger,
  ModalHeading,
  ModalFooter,
  type ModalProps,
  type ModalTriggerProps,
  type ModalHeadingProps,
  type ModalFooterProps
} from '#components/modal';
