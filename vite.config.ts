import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': {}
  },
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress "Module level directives cause errors when bundled" warnings
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks: (id) => {
          // Three.js and heavy 3D libraries - completely separate
          if (id.includes('node_modules/three') || id.includes('react-globe.gl')) {
            return 'three';
          }
          // Core React libraries
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor';
          }
          // Router
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
          // UI components  
          if (id.includes('node_modules/@radix-ui')) {
            return 'ui';
          }
          // Supabase
          if (id.includes('node_modules/@supabase')) {
            return 'supabase';
          }
          // Icons and animations
          if (id.includes('node_modules/lucide-react') || 
              id.includes('node_modules/react-icons') || 
              id.includes('node_modules/aos')) {
            return 'icons';
          }
          // Custom Icons component should be with vendor to avoid initialization issues
          if (id.includes('src/components/Icons')) {
            return 'vendor';
          }
          // Utilities
          if (id.includes('node_modules/clsx') || 
              id.includes('node_modules/class-variance-authority') || 
              id.includes('node_modules/tailwind-merge')) {
            return 'utils';
          }
          // All other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
      treeshake: true,
    },
    // Enable gzip compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Optimize chunks
    chunkSizeWarningLimit: 300,
    sourcemap: false,
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-slot',
      'lucide-react',
      'clsx',
      'tailwind-merge'
    ],
    exclude: [],
    force: true,
    esbuildOptions: {
      target: 'esnext'
    }
  },
  // Server configuration for compression
  server: {
    host: true,
    port: 5173,
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
});
