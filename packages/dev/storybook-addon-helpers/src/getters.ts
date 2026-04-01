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
 * Get the story for a component.
 *
 * Returns the component itself as a function story. Storybook renders function
 * stories by calling the component directly; the docs site receives the component
 * reference via RSC and renders it live.
 *
 * The optional `storyObj` is accepted for type-checking purposes (so callers
 * can annotate args/argTypes) but is ignored at runtime — the csf-transformer
 * rewrites these calls into proper Storybook story objects at build time.
 *
 * @param component - The component to use as the story.
 * @param _storyObj - Optional story annotations (ignored at runtime).
 * @returns The component as a function story.
 */
export function getStory<T extends ComponentType<any>>(component: T, _storyObj?: StoryObj<T>): T {
  return component;
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
 * Get the interface docs for a type as a StoryObj.
 *
 * The type parameter `T` specifies the interface whose props the CSF transformer
 * will extract into argTypes at build time.
 *
 * @returns The docs as a StoryObj.
 */
export function getInterfaceDocs<T>() {
  return {} as StoryObj<T>;
}

/**
 * Returns the variants record as-is at runtime.
 *
 * The CSF transformer rewrites `getVariants` calls into separate exported story
 * objects at build time; each key in `variants` becomes its own named export.
 *
 * @param component - The component to render each variant with.
 * @param variants - Map of variant key to StoryObj annotation.
 * @returns The variants object.
 */
export function getVariants<T extends ComponentType<any>>(component: T, variants: Record<string, StoryObj<T>>) {
  return variants;
}
