import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@redux': path.resolve(__dirname, 'src/redux'),
			'@styles': path.resolve(__dirname, 'src/styles'),
		},
	},
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
