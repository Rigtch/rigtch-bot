import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        '**/node_modules/**',
        '**/coverage/**',
        '**/types/**',
        '**/*.module.ts',
        '**/*.config.ts',
        '**/*.dto.ts',
        '**/*.enum.ts',
        '**/*.cjs',
        '**/index.ts',
        '**/main.ts',
      ],
      all: true,
    },
  },
  resolve: {
    alias: {
      '~': './src',
      '@modules': './src/modules',
      '@common': './src/common',
      '@config': './src/config',
      '@components': './src/components',
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
