import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    // Dev config
    return {
      plugins: [react()],
      root: path.resolve(__dirname, 'demo'),
      build: {
        outDir: path.resolve(__dirname, 'dist'),
      },
    };
  } else {
    // Build config
    return {
      plugins: [
        react(),
        cssInjectedByJsPlugin(),
      ],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.js'),
          name: '@neui/react-treeview',
          formats: ['cjs', 'es'],
          fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM'
            }
          }
        }
      },
    };
  }
});
