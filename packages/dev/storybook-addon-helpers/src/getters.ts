import type { ComponentProps, ComponentType } from 'react';
import { type Meta, type StoryObj } from '@storybook/react-vite';

/**
 * Get the meta object for a Story.
 *
 * @param args - The arguments to pass to the meta Story meta object.
 * @returns The meta object.
 */
export function getMeta<T extends ComponentType<any>>(
  args: Omit<Meta<T>, 'component' | 'title'> & {
    title: string;
    component?: T;
    args?: ComponentProps<T>;
  }
) {
  return args;
}

/**
 * Get the story object for a Story.
 *
 * @param component - The component to get the story object for.
 * @param storyObj - The story object to return.
 * @returns The story object.
 */
export function getStory<T extends ComponentType<any>>(component: T, storyObj?: StoryObj<T>) {
  return storyObj;
}

/**
 * Get the component docs for a component as a StoryObj.
 *
 * @param component - The component to get the docs from.
 * @returns The docs as a StoryObj.
 */
export function getComponentDocs<T extends ComponentType<any>>(component: T) {
  return {} as StoryObj<T>;
}

/**
 * Get the interface docs for a component as a StoryObj.
 *
 * @param T - The type of the interface.
 * @returns The docs as a StoryObj.
 */
export function getInterfaceDocs<T>() {
  return {} as StoryObj<T>;
}

/**
 * This is used to generate the variants for a component.
 *
 * @param component - The component to get the variants from.
 * @param variants - The variants object to return.
 * @returns The variants object.
 */
export function getVariants<T extends ComponentType<any>>(component: T, variants: Record<string, StoryObj<T>>) {
  return variants;
}
