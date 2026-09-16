import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Block, BlockLink } from '../src/runtime.tsx';

describe('block explorer markers', function markerTests() {
  it('renders Block as a build-time no-op', function rendersBlockMarker() {
    expect(renderToString(<Block id="fixture-block" description="Fixture description." />)).toBe('');
  });

  it('renders BlockLink as a build-time no-op', function rendersBlockLinkMarker() {
    expect(renderToString(<BlockLink id="fixture-block" />)).toBe('');
  });
});
