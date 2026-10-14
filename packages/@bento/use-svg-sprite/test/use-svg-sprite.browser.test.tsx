import { root, useSVGSprite } from '@bento/use-svg-sprite';
import { render } from 'vitest-browser-react';
import { Environment } from '@bento/environment';
import { describe, it, expect } from 'vitest';
import { Icon } from '@bento/icon';
import type React from 'react';
import { act, createContext, useContext, StrictMode } from 'react';
import assume from 'assume';

describe('@bento/use-svg-sprite browser', function bento() {
  const play = (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M3 22v-20l18 10-18 10z"></path>
    </svg>
  );

  async function flushedHook(fn: () => React.ReactElement | null) {
    const result = { current: null as React.ReactElement | null };
    function Sprite() {
      result.current = fn();
      return result.current;
    }
    const res = await render(<Sprite />);
    return { ...res, result };
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

  it('registers a graphic when it becomes available and when its name changes', async function loaded() {
    function Sprite({ name, graphic }: { name: string; graphic?: React.ReactElement }) {
      return useSVGSprite(name, graphic);
    }
    const { rerender } = await render(<Sprite name="loaded" />);
    expect(document.getElementById(`${root}-loaded`)).toBeNull();

    await rerender(<Sprite name="loaded" graphic={play} />);
    expect(document.getElementById(`${root}-loaded`)?.querySelector('path')).toBeTruthy();

    await rerender(<Sprite name="renamed" graphic={play} />);
    expect(document.getElementById(`${root}-renamed`)?.querySelector('path')).toBeTruthy();

    await rerender(<Sprite name="absent" />);
    expect(document.getElementById(`${root}-absent`)).toBeNull();
  });

  it('registers a shared symbol once in StrictMode and keeps it after unmount', async function shared() {
    function Sprite() {
      return useSVGSprite('shared', play);
    }
    const { unmount } = await render(
      <StrictMode>
        <Sprite />
        <Sprite />
      </StrictMode>
    );

    const symbol = document.getElementById(`${root}-shared`);
    expect(symbol?.querySelector('path')).toBeTruthy();
    expect(document.querySelectorAll(`[id="${root}-shared"]`)).toHaveLength(1);

    await unmount();
    expect(document.getElementById(`${root}-shared`)).toBe(symbol);
    expect(symbol?.querySelector('path')).toBeTruthy();
  });

  it('preserves existing symbol nodes when another sprite is added', async function preserved() {
    await flushedHook(() => useSVGSprite('preserved', play));
    const symbol = document.getElementById(`${root}-preserved`);
    await flushedHook(() => useSVGSprite('new-symbol', play));
    expect(document.getElementById(`${root}-preserved`)).toBe(symbol);
  });

  it('renders custom graphics using the host context', async function context() {
    const Color = createContext('red');
    function Graphic() {
      return (
        <svg>
          <path fill={useContext(Color)} d="M0 0h10v10z" />
        </svg>
      );
    }
    function Sprite() {
      return useSVGSprite('context', <Graphic />);
    }
    await render(
      <Color.Provider value="blue">
        <Sprite />
      </Color.Provider>
    );
    expect(document.getElementById(`${root}-context`)?.querySelector('path')).toHaveAttribute('fill', 'blue');
  });

  it('updates the sprite URL when the environment changes', async function environment() {
    function Sprite() {
      return useSVGSprite('environment', play);
    }
    const { container, rerender } = await render(
      <Environment sprite="first.svg">
        <Sprite />
      </Environment>
    );
    await rerender(
      <Environment sprite="second.svg">
        <Sprite />
      </Environment>
    );
    expect(container.querySelector('use')).toHaveAttribute('xlink:href', `second.svg#${root}-environment`);
  });
});
