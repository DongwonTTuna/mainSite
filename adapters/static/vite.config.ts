import { staticAdapter } from '@builder.io/qwik-city/adapters/static/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ['@qwik-city-plan'],
      },
      minify: 'esbuild',
    },
    plugins: [
      staticAdapter({
        origin: 'https://dongwontuna.net',
        /**
         * The `strict` option enforces that all routes must be static.
         * This is important for true SSG deployments.
         */
        strict: true,
      }),
    ],
  };
});