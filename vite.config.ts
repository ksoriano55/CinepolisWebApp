import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  //base: "/nowa-ts/preview/",  // Use base path for while deploying the project the SSR.
  plugins: [react()],
  base: "/CinepolisWebApp/",
  define: {
    'process.env': {},
  },
  build: {
    chunkSizeWarningLimit: 50000,
    
  },
  server: {
    host: true,
  }
});
