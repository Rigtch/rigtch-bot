import { defineConfig } from 'vitest/config'
import { mergeConfig } from 'vite'

import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      exclude: ['**/node_modules/**'],
      coverage: {
        exclude: [
          '**/node_modules/**',
          '**/modules/**',
          '**/*.spec.ts',
          '**/*.spec.ts',
        ],
        reporter: ['text', 'json', 'html'],
      },
    },
    define: {
      global: 'globalThis',
    },
  })
)
