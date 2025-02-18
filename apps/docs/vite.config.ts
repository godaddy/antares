import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    //
    // The custom jsxImportSource option is required for the why-did-you-render
    // plugin to work. This ensure all JSX calls are correctly introspected.
    //
    react({ jsxImportSource: '@welldone-software/why-did-you-render' })
  ]
});
