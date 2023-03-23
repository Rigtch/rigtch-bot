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
          '**/*.spec.ts',
          '**/*.d.ts',
          '**/config/**',
          '**/types/**',
          '**/index.ts',
        ],
        include: ['**/src/**/*.ts'],
        reporter: ['text', 'json', 'html'],
        all: true,
      },
    },
    define: {
      global: 'globalThis',
    },
  })
)
