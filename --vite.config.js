import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	publicDir: 'public', // Use this to serve static assets like images
});
