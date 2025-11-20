/* v8 ignore next */
/**
 * This example requires Framer Motion to be installed:
 * npm install motion
 *
 * This example follows the React Aria pattern for gesture-driven modal sheets:
 * https://react-spectrum.adobe.com/react-aria/examples/framer-modal-sheet.html
 */
import React, { useState, useCallback } from 'react';
import { Drawer } from '@bento/drawer';
import { Button } from '@bento/button';
import { Portal } from '@bento/portal';
import { motion, useMotionValue, useDragControls } from 'motion/react';

/**
 * Wrap Drawer component to support motion values.
 * This allows Framer Motion to control the drawer's position during gestures.
 */
const MotionDrawer = motion.create(Drawer);

/**
 * Example component demonstrating bottom sheet Drawer usage with gestures.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered bottom sheet Drawer with gesture support.
 * @public
 */
export function GestureDrawerExample(args: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const drawerRef = React.useRef<HTMLDivElement>(null);

  // Motion value for vertical position (y transform)
  const y = useMotionValue(0);

  // Drag controls for programmatic drag initiation
  const dragControls = useDragControls();

  const handleDragEnd = useCallback(function handleDragEnd(
    _e: unknown,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) {
    const offset = info.offset.y;
    const velocity = info.velocity.y;
    const threshold = window.innerHeight * 0.3;

    // If dragged down past threshold or with sufficient downward velocity, close; otherwise open
    setIsExpanded(!(offset > threshold || velocity > 500));
  }, []);

  return (
    <div style={{ position: 'relative', height: '400px' }}>
      <div style={{ padding: '16px' }}>
        <Button onPress={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Close' : 'Open'} Bottom Sheet</Button>
        <p>Main content area</p>
      </div>
      <Portal mounted={true}>
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: isExpanded ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
            pointerEvents: isExpanded ? 'auto' : 'none',
            transition: 'background-color 0.3s ease-in-out'
          }}
          onClick={() => setIsExpanded(false)}
        />
        <MotionDrawer
          {...args}
          ref={drawerRef}
          placement="bottom"
          isExpanded={true}
          minHeight="0"
          maxHeight="50vh"
          animate={false}
          role="dialog"
          aria-expanded={isExpanded}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          drag="y"
          dragControls={dragControls}
          dragConstraints={{ top: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          y={y}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              padding: '24px'
            }}
          >
            {/* Drag handle */}
            <div
              style={{
                width: '40px',
                height: '4px',
                backgroundColor: '#ccc',
                borderRadius: '2px',
                margin: '0 auto 16px',
                cursor: 'grab'
              }}
              onPointerDown={(e: React.PointerEvent) => dragControls.start(e)}
              aria-label="Drag handle"
            />
            <h2>Bottom Sheet</h2>
            <p>This is a bottom sheet drawer example.</p>
            <p>You can add any content here.</p>
            <Button onPress={() => setIsExpanded(false)}>Close</Button>
          </div>
        </MotionDrawer>
      </Portal>
    </div>
  );
}
