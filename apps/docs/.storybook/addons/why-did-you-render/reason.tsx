import React, { type JSX } from 'react';
import { Diff } from './diff.tsx';

export interface Event {
  Component: React.ComponentType;
  displayName: string;
  hookName: string;
  prevProps: any;
  prevState: any;
  prevHook: any;
  nextProps: any;
  nextState: any;
  nextHook: any;
  reason: any;
  wdyrStore: any;
  ownerData: any;
}

/**
 * Component to display the reasons why a component re-rendered.
 *
 * @param {Object} props - The props for the Reason component.
 * @param {Object} props.reason - The reason object containing differences.
 * @param {Object} props.prevProps - The previous props of the component.
 * @param {Object} props.nextProps - The next props of the component.
 * @param {string} props.displayName - The display name of the component.
 * @param {Object} props.prevState - The previous state of the component.
 * @param {Object} props.nextState - The next state of the component.
 * @param {Object} props.prevHook - The previous hook values of the component.
 * @param {Object} props.nextHook - The next hook values of the component.
 * @param {string} props.hookName - The name of the hook.
 * @param {Object} props.ownerData - The owner data containing previous and next owner data.
 * @param {Object} props.ownerData.prevOwnerData - The previous owner data.
 * @param {Object} props.ownerData.nextOwnerData - The next owner data.
 * @returns {JSX.Element} A JSX element displaying the differences that caused the re-render.
 */
export function Reason({
  reason,
  prevProps,
  nextProps,
  displayName,
  prevState,
  nextState,
  prevHook,
  nextHook,
  hookName,
  ownerData
}: Event): JSX.Element {
  const reasons: JSX.Element[] = [];

  if (reason.propsDifferences) {
    let parent: JSX.Element | null = null;

    if (reason.ownerDifferences && ownerData) {
      const { prevOwnerData, nextOwnerData } = ownerData;

      if (reason.ownerDifferences.propsDifferences) {
        parent = (
          <Diff
            who={nextOwnerData.displayName}
            summary={`Different props`}
            key="parent-props"
            prev={prevOwnerData.props}
            next={nextOwnerData.props}
          >
            {parent}
          </Diff>
        );
      }

      if (reason.ownerDifferences.stateDifferences) {
        parent = (
          <Diff
            who={nextOwnerData.displayName}
            summary={`Different state`}
            key="parent-state"
            prev={prevOwnerData.state}
            next={nextOwnerData.state}
          >
            {parent}
          </Diff>
        );
      }

      if (reason.ownerDifferences.hookDifferences) {
        parent = reason.ownerDifferences.hookDifferences.reduce((acc: JSX.Element | null, _: any, i: number) => {
          return (
            <Diff
              who={nextOwnerData.displayName}
              summary={`Different hook values`}
              key={'parent-hooks' + i}
              prev={prevOwnerData.hooks[i].result}
              next={nextOwnerData.hooks[i].result}
            >
              {acc}
            </Diff>
          );
        }, parent);
      }
    }

    reasons.push(
      <Diff who={displayName} summary={`Different props`} key="props" prev={prevProps} next={nextProps}>
        {parent}
      </Diff>
    );
  }

  if (reason.stateDifferences) {
    reasons.push(<Diff who={displayName} summary={`Different state`} key="state" prev={prevState} next={nextState} />);
  }

  if (reasons.hookDifferences) {
    reasons.push(<Diff who={hookName} summary={`Different hook values`} key="hooks" prev={prevHook} next={nextHook} />);
  }

  return <>{reasons}</>;
}
