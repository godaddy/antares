import type { CSSProperties, ReactNode, Ref } from 'react';
import { Box, BoxContext, Flex, type BoxProps } from '@godaddy/antares';

interface ContextExampleProps {
  /** Override the slot's default padding. */
  padding?: BoxProps['padding'];

  /** Override or extend the slot's styles. */
  style?: CSSProperties;

  /** Override the default content. */
  children?: ReactNode;

  /** Ref supplied through context. */
  contextRef?: Ref<HTMLElement>;

  /** Ref supplied directly to Box. */
  consumerRef?: Ref<HTMLDivElement>;
}

/**
 * BoxContext supplies named-slot defaults. Consumer props override them; `slot={null}` opts out.
 * @order 8
 */
export function ContextExample({ padding, style, children, contextRef, consumerRef }: ContextExampleProps) {
  return (
    <Flex direction="column" gap="md">
      <BoxContext.Provider
        value={{
          slots: {
            content: {
              children: 'Content from context',
              className: 'context-class',
              padding: 'md',
              style: { color: 'blue', opacity: 0.5 },
              'data-context': true,
              ref: contextRef
            }
          }
        }}
      >
        <Box slot="content" className="consumer-class" padding={padding} style={style} ref={consumerRef}>
          {children}
        </Box>
        <Box slot={null} data-testid="opt-out">
          Independent content
        </Box>
      </BoxContext.Provider>
    </Flex>
  );
}
