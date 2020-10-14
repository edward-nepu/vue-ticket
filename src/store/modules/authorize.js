import Layout from '_c/layout/index.vue'
import routesDB from '@/router/routes.json'
// 创建组件对象
const _import = file => () => import(`@/views/${file}`);
// 处理路由，字符串转为组件对象。
let filterRoutes = routesDB => {
	let menuAsyncRoutes = [];
	let menuShowRoutes = [];
	for (let item of routesDB) {
		if (item.component === 'Layout') {
			item.component = Layout;
		} else {
			item.component = _import(item.component);
		}
		for (let els of item.children) {
			els.component = _import(els.component);
		}
		menuAsyncRoutes.push(item);
		if (!item.meta.hideMenu) {
			let chr = [];
			for (let els of item.children) {
				if (!els.meta.hideMenu) {
					chr.push(els);
				}
			}
			item.child = chr;
			menuShowRoutes.push(item);
		}
	}
	return { menuAsyncRoutes, menuShowRoutes }
}

const authorize = {
	state: {
		menuAsyncRoutes: [],
		menuShowRoutes: [],
	},
	mutations: {
		addRoute: (state, obj) => {
			state.menuAsyncRoutes = obj.menuAsyncRoutes;
			state.menuShowRoutes = obj.menuShowRoutes;
		}
	},
	actions: {
		asyncRoutes({ commit }) {
			let { menuAsyncRoutes, menuShowRoutes } = filterRoutes(routesDB);
			return new Promise((resolve, reject) => {
				commit('addRoute', {
					menuAsyncRoutes,
					menuShowRoutes
				});
				resolve();
			})
		}
	}
}
export default authorize