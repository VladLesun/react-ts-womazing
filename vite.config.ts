import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom', 'react-router-dom'],
					firebase: ['firebase/auth', 'firebase/firestore'],
					leaflet: ['react-leaflet', 'leaflet'],
				},
			},
		},
	},
});
