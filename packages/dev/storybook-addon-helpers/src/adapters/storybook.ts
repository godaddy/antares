import type { StrictInputType } from 'storybook/internal/types';
import type { PropsDoc, StorybookDocs } from '../types.ts';

export function toStorybookArgTypes(doc: PropsDoc): StorybookDocs {
  const argTypes: StorybookDocs['argTypes'] = {};

  for (const prop of doc.props) {
    const argType: StrictInputType = {
      name: prop.name,
      description: prop.description,
      // `type` drives the required indicator; the docs table reads `type.required`.
      // An arbitrary TS type has no scalar SBType, so `other` carries it verbatim.
      type: { name: 'other', value: prop.type, required: prop.required },
      table: {
        // `table.type.summary` is the source of truth for the rendered "Type" column.
        type: { summary: prop.type },
        defaultValue: { summary: prop.defaultValue ?? undefined },
        ...(prop.category ? { category: prop.category } : {})
      }
    };

    argTypes[prop.name] = argType;
  }

  return {
    tags: ['!dev'],
    argTypes
  };
}
