import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'layour',
			component: () => import('../views/tcs/index.jsx'),
			// component: () => import('../views/tcs/index.vue'),
		},
		{
			path: '/video',
			name: 'video',
			component: () => import('../views/video/index.vue'),
		},
	],
})

export default router
