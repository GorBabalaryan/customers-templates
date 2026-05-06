import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'

const isLibraryBuild = process.env.LIB_BUILD === 'true'

export default defineConfig({
  plugins: [
    react(),
    ...(isLibraryBuild
      ? [
          dts({
            include: ['src'],
            exclude: [
              'src/**/*.stories.tsx',
              'src/**/*.test.tsx',
              'src/**/*.test.ts',
            ],
            tsconfigPath: './tsconfig.build.json',
          }),
        ]
      : []),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CustomersTemplates',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es', 'cjs'],
    },
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'framer-motion': 'FramerMotion',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css')
            return 'customers-templates.css'
          return assetInfo.name ?? 'asset'
        },
      },
    },
  },
})
