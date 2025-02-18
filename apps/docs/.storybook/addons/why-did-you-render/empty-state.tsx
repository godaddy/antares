import { EmptyTabContent, Link } from '@storybook/components';
import { styled } from 'storybook/internal/theming';
import React, { type JSX } from 'react';

/**
 * Follows the styling of the Interactions addon.
 */
const Links = styled.div(({ theme }) => ({
  display: 'flex',
  fontSize: theme.typography.size.s2 - 1,
  gap: 25
}));

/**
 * Follows the styling of the Interactions addon.
 */
const Divider = styled.div(({ theme }) => ({
  width: 1,
  height: 16,
  backgroundColor: theme.appBorderColor
}));

/**
 * Renders an empty state message for the re-render panel.
 *
 * @returns {JSX.Element} The JSX element representing the empty state.
 * @public
 */
export function EmptyState(): JSX.Element {
  return (
    <EmptyTabContent
      title="Waiting for the component to cause a re-render"
      description={
        <>
          The re-render panel allows you to see potentially avoidable re-renders. Make a change to the component using
          the <strong>Controls </strong> tab to see what parts of your component re-rendered.
        </>
      }
      footer={
        <Links>
          <Link
            href="https://react.dev/learn/render-and-commit#re-renders-when-state-updates"
            target="_blank"
            withArrow
          >
            Understanding re-renders
          </Link>
          <Divider />
          <Link href="https://react.dev/learn/react-compiler#optimizing-re-renders" target="_blank" withArrow>
            Fix using the React Compiler
          </Link>
        </Links>
      }
    />
  );
}
