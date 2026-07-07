import { forwardRef } from 'react';
import { cx } from 'cva';
import {
  DropZone as RACDropZone,
  type DropZoneProps as RACDropZoneProps,
  type DropZoneRenderProps as RACDropZoneRenderProps,
  isFileDropItem,
  isTextDropItem,
  isDirectoryDropItem
} from 'react-aria-components';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import styles from './index.module.css';

export { isFileDropItem, isTextDropItem, isDirectoryDropItem };

/**
 * Render props received by a function child of {@link DropZone}.
 * Branch on these to change content or styling based on the zone's current state.
 */
export interface DropZoneRenderProps extends RACDropZoneRenderProps {}

/**
 * Props for the {@link DropZone} component.
 */
export interface DropZoneProps extends Omit<RACDropZoneProps, 'className'>, Omit<FlexOwnProps, 'as'> {
  className?: string;
}

/**
 * A standalone region that accepts drag-and-drop file interactions.
 *
 * @example
 * ```tsx
 * <DropZone onDrop={(e) => {
 *   const files = e.items.filter(isFileDropItem);
 *   // handle files
 * }}>
 *   <Text slot="label">Drop files to upload.</Text>
 * </DropZone>
 * ```
 *
 * @param props - {@link DropZoneProps}
 */
export const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(function DropZone(props, ref) {
  const { children, className, ...rest } = props;

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      padding="lg"
      {...rest}
      ref={ref}
      className={cx(styles.dropZone, className)}
      as={RACDropZone}
    >
      {children}
    </Flex>
  );
});
