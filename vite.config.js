import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	mode: 'production',
	plugins: [
		vue(),
		vueJsx(),
		Components({
			resolvers: [
				AntDesignVueResolver({
					importStyle: false, // css in js
				}),
			],
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		host: '0.0.0.0',
		port: '8001',
		proxy: {
			'/api': 'http://localhost:5001',
		},
	},
})
