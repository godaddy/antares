import type { PropsDoc, StorybookDocs } from '../types.ts';

export function toStorybookArgTypes(doc: PropsDoc): StorybookDocs {
  const argTypes: StorybookDocs['argTypes'] = {};

  for (const prop of doc.props) {
    argTypes[prop.name] = {
      name: prop.name,
      description: prop.description,
      required: prop.required,
      type: {
        name: prop.type,
        required: prop.required
      },
      table: {
        defaultValue: { summary: prop.defaultValue ?? null },
        ...(prop.group ? { category: prop.group } : {})
      }
    };
  }

  return {
    tags: ['!dev'],
    argTypes
  };
}
