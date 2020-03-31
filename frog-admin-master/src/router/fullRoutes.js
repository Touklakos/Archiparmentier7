import error from './error'
import dynamicRoutes from './dynamicRoutes'

const fullRoutes = [
	{
		path: '/',
		name: 'Home',
		components: {
			default: () => import('@/views/common/Home/index'),
			tip: () => import('@/views/common/Home/tip')
		},
		meta: {
			icon: 'home'
		}
	},

	{
		path: '/playground',
		name: 'playground',
		components: {
			default: () => import('@/views/common/Playground/index'),
			tip: () => import('@/views/common/Playground/tip')
		},
		meta: {
			icon: 'smile',
			sideName: 'Recherche'
		}
	},

	{
		path: '/test',
		name: 'Test',
		components: {
			default: () => import('@/views/common/Test/index'),
		},
		meta: {
			icon: 'earth',
			sideName: 'Map'
		}
	},
	error,
];

export default fullRoutes;
