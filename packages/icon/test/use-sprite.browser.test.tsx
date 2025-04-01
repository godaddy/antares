import { root, useSVGSprite } from '../src/use-sprite.tsx';
import { renderHook } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import React, { act } from 'react';
import assume from 'assume';

describe('@bento/icon use-sprite', function bento() {
  const play = (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M3 22v-20l18 10-18 10z"></path>
    </svg>
  );

  async function flushedHook(fn) {
    const res = renderHook(fn);
    await act(() => {
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
    const props = result.current?.props;
    const use = props.children;

    assume(result.current?.type).equals('svg');
    assume(use.type).equals('use');
    assume(use.props.xlinkHref).equals(`#${root}-reference`);
  });

  it('inherits the width/height and viewbox from the provided SVG', async function props() {
    const { result } = await flushedHook(() =>
      useSVGSprite('another', <svg viewBox="0 0 100 100" width="110" height="111" />)
    );
    const svg = result.current;

    assume(svg?.props.width).equals('110');
    assume(svg?.props.height).equals('111');
    assume(svg?.props.viewBox).equals('0 0 100 100');
  });
});
