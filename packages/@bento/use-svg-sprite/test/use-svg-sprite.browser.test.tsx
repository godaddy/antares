import { root, useSVGSprite } from '@bento/use-svg-sprite';
import { render, renderHook } from 'vitest-browser-react';
import { Environment } from '@bento/environment';
import { describe, it } from 'vitest';
import { Icon } from '@bento/icon';
import React, { act } from 'react';
import assume from 'assume';

describe('@bento/use-svg-sprite browser', function bento() {
  const play = (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M3 22v-20l18 10-18 10z"></path>
    </svg>
  );

  async function flushedHook(fn) {
    const res = renderHook(fn);
    await act(function flush() {
      /* delay returning until all dom changes have been made */
    });

    return res;
  }

  it('introduces the sprite container if it does not exist', async function sprite() {
    const sprite = document.getElementById(root);
    assume(sprite).does.not.exist();

    await flushedHook(() => useSVGSprite('name', <svg />));

    const container = document.getElementById(root);

    assume(container).exists();
    assume(container?.tagName).equals('svg');
  });

  it('introduces the supplied SVG as symbol into the sprite container', async function introduced() {
    assume(document.getElementById(`${root}-play`)).does.not.exist();

    await flushedHook(() => useSVGSprite('play', play));

    const symbol = document.getElementById(`${root}-play`);
    assume(symbol).exist();

    assume(symbol?.tagName).equals('symbol');
    assume(symbol?.getAttribute('data-symbol')).equals('play');
    assume(symbol?.getAttribute('viewBox')).equals('0 0 24 24');

    assume(symbol?.innerHTML).includes('<path d="M3 22v-20l18 10-18 10z"></path>');
  });

  it('does not override previously introduced symbols', async function override() {
    await flushedHook(() =>
      useSVGSprite(
        'play',
        <svg>
          <text>yolo</text>
        </svg>
      )
    );

    const symbol = document.getElementById(`${root}-play`);
    assume(symbol?.innerHTML).does.not.include('yolo');
    assume(symbol?.innerHTML).includes('<path d="M3 22v-20l18 10-18 10z"></path>');
  });

  it('returns an svg with a use element referencing the symbol', async function symbol() {
    const { result } = await flushedHook(() => useSVGSprite('reference', <svg />));
    const svg = result.current as React.ReactElement | null;
    assume(svg?.type).equals('svg');
    const use = Array.isArray(svg?.props.children) ? svg?.props.children[0] : svg?.props.children;
    assume(use?.type).equals('use');
    assume(use?.props.xlinkHref).equals(`#${root}-reference`);
  });

  it('inherits the width/height and viewbox from the provided SVG', async function props() {
    const { result } = await flushedHook(() =>
      useSVGSprite('another', <svg viewBox="0 0 100 100" width="110" height="111" />)
    );
    const svg = result.current as React.ReactElement | null;
    assume(svg?.props.width).equals('110');
    assume(svg?.props.height).equals('111');
    assume(svg?.props.viewBox).equals('0 0 100 100');
  });

  it('uses the sprite option from environment in xlinkHref', async function spriteOption() {
    const customSprite = 'https://example.com/sprites.svg';
    const { container } = await render(
      <Environment sprite={customSprite}>
        <Icon icon="play" mode="sprite" />
      </Environment>
    );

    const result = container.innerHTML;
    assume(result).includes('https://example.com/sprites.svg#bento-svg-spritesheet-play');
  });

  it('returns an empty svg when no Graphic is provided', async function noGraphic() {
    const { result } = await flushedHook(function hookCall() {
      return useSVGSprite('no-graphic', undefined);
    });

    await act(function ensureRendered() {
      /* Ensure the component is fully rendered */
    });
    const svg = result.current as React.ReactElement | null;
    assume(svg?.type).equals('svg');
    assume(svg?.props.viewBox).equals(undefined);
    assume(svg?.props.width).equals(undefined);
    assume(svg?.props.height).equals(undefined);
    const use = Array.isArray(svg?.props.children) ? svg?.props.children[0] : svg?.props.children;
    assume(use?.type).equals('use');
    assume(use?.props.xlinkHref).equals(`#${root}-no-graphic`);
  });

  it('uses #id in xlinkHref if env.sprite is undefined', async function noEnvSprite() {
    // Render without Environment provider, so env.sprite is undefined
    const { result } = await flushedHook(() => useSVGSprite('plain', <svg />));
    const svg = result.current as React.ReactElement | null;
    const use = Array.isArray(svg?.props.children) ? svg?.props.children[0] : svg?.props.children;
    assume(use?.props.xlinkHref).equals(`#${root}-plain`);
  });
});
