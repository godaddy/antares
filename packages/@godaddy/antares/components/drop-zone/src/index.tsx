import type React from 'react';
import { forwardRef } from 'react';
import { cx } from 'cva';
import {
  DropZone as RACDropZone,
  type DropZoneProps as RACDropZoneProps,
  isFileDropItem,
  isTextDropItem,
  isDirectoryDropItem
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { Text } from '#components/text';
import styles from './index.module.css';

export { isFileDropItem, isTextDropItem, isDirectoryDropItem };

/**
 * Props for the {@link DropZone} component.
 */
export interface DropZoneProps extends Omit<RACDropZoneProps, 'className' | 'children'> {
  /** Content displayed inside the drop zone. @default "Drop files to upload." */
  children?: React.ReactNode;

  /** Additional CSS class names applied to the root element. */
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
 * }} />
 * ```
 *
 * @param props - {@link DropZoneProps}
 */
export const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(function DropZone(props, ref) {
  const { children, className, ...rest } = props;

  return (
    <Flex
      {...rest}
      ref={ref}
      direction="column"
      alignItems="center"
      justifyContent="center"
      padding="lg"
      className={cx(styles.dropZone, className)}
      as={RACDropZone}
    >
      {children ?? <Text className={styles.text}>Drop files to upload.</Text>}
    </Flex>
  );
});
