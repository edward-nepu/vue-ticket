import Cookies from 'js-cookie'
import Store from '@/store/index'

// Cookies
const TOKEN_KEY = 'token';
export const setToken = (token) => {
	Cookies.set(TOKEN_KEY, token, { expires: 1 });
}
export const getToken = () => {
	const token = Cookies.get(TOKEN_KEY);
	if (token) return token
	else return ''
}
export const removeToken = () => {
	Cookies.remove(TOKEN_KEY);
}

// 动态路由
export const storeAsyncRoutes = () => {
	Store.commit('refToken');
	return new Promise((resolve, reject) => {
		Store.dispatch('asyncRoutes').then(() => {
			resolve(Store.getters.mapMenuAsyncRoutes);
		})
	})
}
