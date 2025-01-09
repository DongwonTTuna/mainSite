import { defineConfig } from 'vitest/config';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/i18n/generated'
		})
	],
	server: {
		port: 3000
	},
	test: {
		include: ['src/__tests__/unit/*.{test,spec}.{js,ts}']
	}
});
