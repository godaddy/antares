***REMOVED***@bento/types

A shared TypeScript types package for the Bento library. This package centralizes common type definitions to reduce duplication, improve consistency, and simplify type maintenance across the Bento library.

#***REMOVED***Installation

```bash
npm install @bento/types
```

#***REMOVED***Usage

Import types directly from the package. Eg:

```tsx
import type { UnknownObject } from '@bento/types';

interface Data {
  elements: UnknownObject
}
```

#***REMOVED***Contributing

When adding new types to the library, follow these guidelines:

1. Organize types into appropriate categories
2. Document types with JSDoc comments
3. Add tests for the types in the `test` directory
4. Ensure exported types have descriptive names
5. Export them from the main `src/index.ts` file

#***REMOVED***Testing

Tests are written using [`Vitest's type testing approach`](https://vitest.dev/guide/testing-types). To run the tests for the types, run the following command:

```bash
npm test
```