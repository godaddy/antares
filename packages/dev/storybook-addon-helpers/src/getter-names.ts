/**
 * Names of the public getter functions the pipeline recognizes in source. These
 * are matched against call expressions statically (never executed), so they are
 * shared by the neutral resolver (`docs.ts`) and the Storybook glue alike.
 */
export const GET_META = 'getMeta';
export const GET_STORY = 'getStory';
export const GET_VARIANTS = 'getVariants';
export const GET_COMPONENT_DOCS = 'getComponentDocs';
export const GET_TYPE_DOCS = 'getTypeDocs';
