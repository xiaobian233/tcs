import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'tcs',
			component: () => import('../views/tcs/index.jsx'),
		},
		{
			path: '/flex',
			name: 'flex',
			component: () => import('../views/flex/index.vue'),
			children: [
				{
					path: 'multiseriate',
					name: 'multiseriate',
					component: () => import('../views/flex/multiseriate.vue'),
				},
				{
					path: 'aequilate',
					name: 'aequilate',
					component: () => import('../views/flex/aequilate.vue'),
				},
			],
		},
		{
			path: '/video',
			name: 'video',
			component: () => import('../views/video/index.vue'),
		},
		{
			path: '/utils',
			name: 'utils',
			component: () => import('../views/utils/index.vue'),
		},
	],
})

export default router
