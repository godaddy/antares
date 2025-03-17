import { toViewBox, parseViewBox, transformers } from '../src/transformers.tsx';
import { describe, it } from 'node:test';
import assume from 'assume';
import React from 'react';

describe('@bento/illustration/transformers', function bento() {
  describe('#toViewBox', function toViewBoxSuite() {
    it('should convert a viewBox object to a string', function toViewBoxTest() {
      assume(toViewBox({ left: 12, top: 13, width: 25, height: 29 })).equals('12 13 25 29');
    });
  });

  describe('#parseViewBox', function parseViewBoxSuite() {
    it('should convert a viewBox string to an object', function parseViewBoxTest() {
      assume(parseViewBox('12 13 25 29')).deep.equals({ left: 12, top: 13, width: 25, height: 29 });
    });
  });

  describe('#transformers', function transformersSuite() {
    const drawings = <circle cx={0} cy={0} r={10} />;
    it('returns the viewBox and drawings when no transformations are given', function ignore() {
      const { viewBox, drawings: result } = transformers(
        {
          viewBox: '10 12 1200 1300'
        },
        drawings
      );

      assume(viewBox).deep.equals({ left: 10, top: 12, width: 1200, height: 1300 });
      assume(result).equals(drawings);
    });

    it('wraps the drawings in a group when applying transformations', function flipHorizontal() {
      const { drawings: result } = transformers(
        {
          flip: 'horizontal',
          viewBox: '10 12 1200 1300'
        },
        drawings
      );

      const { type, props } = result;

      assume(type).equals('g');
      assume(props).includes('transform');
      assume(props.transform).is.a('string');
      assume(props.children).equals(drawings);
    });
  });

  describe('flip transformations', function flipSuite() {
    it('flips the drawings horizontally', function flipHorizontal() {
      const drawings = <circle cx={0} cy={0} r={10} />;
      const { drawings: result, viewBox } = transformers(
        {
          flip: 'horizontal',
          viewBox: '10 12 1200 1300'
        },
        drawings
      );

      const { props } = result;
      assume(props.transform).equals('translate(1210 -12) scale(-1 1)');
      assume(viewBox).deep.equals({ left: 0, top: 0, width: 1200, height: 1300 });
    });

    it('flips the drawings vertically', function flipVertical() {
      const drawings = <circle cx={0} cy={0} r={10} />;
      const { drawings: result, viewBox } = transformers(
        {
          flip: 'vertical',
          viewBox: '10 12 1200 1300'
        },
        drawings
      );

      const { props } = result;
      assume(props.transform).equals('translate(-10 1312) scale(1 -1)');
      assume(viewBox).deep.equals({ left: 0, top: 0, width: 1200, height: 1300 });
    });
  });

  describe('rotate transformations', function rotateSuite() {
    it('rotates the drawings 90 degrees', function rotate90() {
      const drawings = <circle cx={0} cy={0} r={10} />;
      const { drawings: result, viewBox } = transformers(
        {
          rotate: 90,
          viewBox: '10 12 1200 1300'
        },
        drawings
      );

      const { props } = result;
      assume(props.transform).equals('rotate(90 662 662)');
      assume(viewBox).deep.equals({ left: 12, top: 10, width: 1300, height: 1200 });
    });

    it('rotates the drawings 180 degrees', function rotate180() {
      const drawings = <circle cx={0} cy={0} r={10} />;
      const { drawings: result, viewBox } = transformers(
        {
          rotate: 180,
          viewBox: '10 12 1200 1300'
        },
        drawings
      );

      const { props } = result;
      assume(props.transform).equals('rotate(180 610 662)');
      assume(viewBox).deep.equals({ left: 10, top: 12, width: 1200, height: 1300 });
    });

    it('rotates the drawings 270 degrees', function rotate270() {
      const drawings = <circle cx={0} cy={0} r={10} />;
      const { drawings: result, viewBox } = transformers(
        {
          rotate: 270,
          viewBox: '10 12 1200 1300'
        },
        drawings
      );

      const { props } = result;
      assume(props.transform).equals('rotate(-90 610 610)');
      assume(viewBox).deep.equals({ left: 12, top: 10, width: 1300, height: 1200 });
    });
  });

  describe('combined transformations', function combinedSuite() {
    it('flips and rotates the drawings', function flipAndRotate() {
      const drawings = <circle cx={0} cy={0} r={10} />;
      const { drawings: result, viewBox } = transformers(
        {
          flip: 'horizontal',
          rotate: 90,
          viewBox: '10 12 1200 1300'
        },
        drawings
      );

      const { props } = result;
      assume(props.transform).equals('translate(1210 -12) scale(-1 1) rotate(90 650 650)');
      assume(viewBox).deep.equals({ left: 0, top: 0, width: 1300, height: 1200 });
    });
  });
});
