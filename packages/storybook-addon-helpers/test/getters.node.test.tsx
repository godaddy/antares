import React from 'react';
import { expectTypeOf, it, describe } from 'vitest';
import type { Meta, StoryObj } from '@storybook/react';
import { getMeta, getStory, getVariants, getComponentDocs, getInterfaceDocs } from '../src/getters.ts';

function TestComponent(props: { size: string; disabled?: boolean }) {
  return <div>Test {JSON.stringify(props)}</div>;
}

describe('getMeta', function getMetaSuite() {
  it('should pass type checking', function typeChecking() {
    getMeta({ title: 'test' });
    getMeta({
      title: 'test',
      component: TestComponent
    });

    getMeta({
      title: 'test',
      component: TestComponent,
      args: {
        size: 'sm',
        disabled: true,
        // @ts-expect-error unexpected prop
        wrong: 'wrong'
      }
    });

    type TestCompMetaArgs = Parameters<typeof getMeta<typeof TestComponent>>[0];

    expectTypeOf<TestCompMetaArgs>().toExtend<Meta<typeof TestComponent>>();

    expectTypeOf<TestCompMetaArgs['args']>().toExtend<{ size: string; disabled?: boolean } | undefined>();

    // @ts-expect-error unexpected prop
    expectTypeOf<TestCompMetaArgs['args']>().toExtend<{ wrong?: string } | undefined>();

    // @ts-expect-error invalid prop type
    expectTypeOf<TestCompMetaArgs['args']>().toExtend<{ size: number } | undefined>();
  });
});

describe('getStory', function getStorySuite() {
  it('should pass type checking', function typeChecking() {
    getStory(TestComponent);
    getStory(TestComponent, {});
    getStory(TestComponent, {
      args: {
        size: 'sm',
        disabled: true,
        // @ts-expect-error unexpected prop
        onClick: () => void 0
      }
    });

    type TestCompStoryObj = Parameters<typeof getStory<typeof TestComponent>>[1];
    type NonNullableTestCompStoryObj = NonNullable<TestCompStoryObj>;

    expectTypeOf<TestCompStoryObj>().toEqualTypeOf<StoryObj<typeof TestComponent> | undefined>();

    expectTypeOf<NonNullableTestCompStoryObj['args']>().toExtend<{ size?: string; disabled?: boolean } | undefined>();

    // @ts-expect-error unexpected prop
    expectTypeOf<NonNullableTestCompStoryObj['args']>().toExtend<{ wrong?: string } | undefined>();

    // @ts-expect-error invalid prop type
    expectTypeOf<NonNullableTestCompStoryObj['args']>().toExtend<{ size: number } | undefined>();
  });
});

describe('getComponentDocs', function getComponentDocsSuite() {
  it('should pass type checking', function typeChecking() {
    getComponentDocs(TestComponent);

    type ReturnTypeTestCompProps = ReturnType<typeof getComponentDocs<typeof TestComponent>>;

    expectTypeOf<ReturnTypeTestCompProps>().toEqualTypeOf<StoryObj<typeof TestComponent>>();
  });
});

describe('getInterfaceDocs', function getInterfaceDocsSuite() {
  it('should pass type checking', function typeChecking() {
    const actual = getInterfaceDocs<{ a: string, b: number }>();

    expectTypeOf<typeof actual>().toEqualTypeOf<StoryObj<{ a: string, b: number }>>();

    // @ts-expect-error invalid type
    expectTypeOf<typeof actual>().toEqualTypeOf<StoryObj<{ a: string, b: string }>>();
  });
});

describe('getVariants', function getVariantsSuite() {
  it('should pass type checking', function typeChecking() {
    getVariants(TestComponent, {
      small: {
        args: {
          size: 'sm',
          disabled: true
        }
      },
      large: {
        args: {
          size: 'lg',
          disabled: false,
          // @ts-expect-error unexpected prop
          wrong: 'wrong'
        }
      }
    });

    // @ts-expect-error missing variants object
    getVariants(TestComponent);

    type VariantsObj = Parameters<typeof getVariants<typeof TestComponent>>[1];

    expectTypeOf<VariantsObj>().toEqualTypeOf<Record<string, StoryObj<typeof TestComponent>>>();
  });
});
