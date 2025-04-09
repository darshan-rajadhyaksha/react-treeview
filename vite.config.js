import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
      plugins: [react()],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.js'),
          name: '@codingflag/react-treeview',
          formats: ['cjs', 'es', 'umd'],
          fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
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
