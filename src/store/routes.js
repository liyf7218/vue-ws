/*
* 路由配置
*/
import { routes } from '@/router/routes.js'

export default {
	namespaced: true,
	state: {
		routes: routes,
		activeRoute: routes[0].redirect || '/'
	},
	mutations: {
		SET_ACTIVE_ROUTE: (state, route) => {
			state.activeRoute = route
		}
	},
	actions: {
		setActiveRoute({commit}, route) {
			commit('SET_ACTIVE_ROUTE', route);
		}
	}
}