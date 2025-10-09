import { Container, type ContainerProps } from '@bento/container';
/* v8 ignore next */
import React, { type CSSProperties } from 'react';

// Example of building a custom Box component on top of Container
export interface BoxProps extends ContainerProps {
  padding?: string | number;
  elevation?: 'low' | 'medium' | 'high';
}

function Box({ padding = '16px', elevation = 'low', children, style, className = '', ...props }: BoxProps) {
  const boxStyle: CSSProperties = {
    padding,
    boxShadow:
      elevation === 'low'
        ? '0 1px 3px rgba(0,0,0,0.12)'
        : elevation === 'medium'
          ? '0 4px 6px rgba(0,0,0,0.16)'
          : '0 10px 20px rgba(0,0,0,0.19)',
    ...style
  };

  return (
    <Container {...props} className={`box ${className}`} style={boxStyle}>
      {children}
    </Container>
  );
}

export function BuildingBlockExample(args: BoxProps) {
  const elevation = args.elevation || 'medium';

  return (
    <Box {...args} padding="24px" elevation={elevation}>
      This is a custom Box component built on Container
    </Box>
  );
}
