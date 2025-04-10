import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
    plugins: [solidPlugin(), svgLoader()],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
    },
});
