import { forwardRef } from 'react';
import { cx } from 'cva';
import {
  DropZone as RACDropZone,
  type DropZoneProps as RACDropZoneProps,
  type DropZoneRenderProps,
  isFileDropItem,
  isTextDropItem,
  isDirectoryDropItem
} from 'react-aria-components';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import styles from './index.module.css';

export { isFileDropItem, isTextDropItem, isDirectoryDropItem };
export type { DropZoneRenderProps };

/**
 * Props for the {@link DropZone} component.
 */
export interface DropZoneProps extends RACDropZoneProps, Omit<FlexOwnProps, 'as'> {}

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

  const resolvedClassName =
    typeof className === 'function'
      ? function resolveWithRenderProps(values: DropZoneRenderProps & { defaultClassName: string | undefined }) {
          return cx(styles.dropZone, className(values));
        }
      : cx(styles.dropZone, className);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      padding="lg"
      {...rest}
      ref={ref}
      className={resolvedClassName}
      as={RACDropZone}
    >
      {children}
    </Flex>
  );
});
