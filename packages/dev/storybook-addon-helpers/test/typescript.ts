import { afterEach } from 'vitest';
import { openTypeScriptSession, type TypeScriptSession } from '../src/engine/typescript-session.ts';
import { createResolver, type Resolver } from '../src/engine/resolve.ts';

const resources: (TypeScriptSession | Resolver)[] = [];
afterEach(function closeResources() {
  for (const resource of resources.splice(0)) resource.close();
});

export function parseSource(code: string, fileName = 'inline.tsx') {
  const session = openTypeScriptSession({ fileName, code, isolated: true });
  resources.push(session);
  return session.sourceFile;
}

export function testResolver(...args: Parameters<typeof createResolver>) {
  const resolver = createResolver(...args);
  resources.push(resolver);
  return resolver;
}
