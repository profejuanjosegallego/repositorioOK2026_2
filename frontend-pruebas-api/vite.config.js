import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite: el servidor de desarrollo corre en http://localhost:5173.
// Las peticiones van directo al backend (que ya tiene CORS habilitado).
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
