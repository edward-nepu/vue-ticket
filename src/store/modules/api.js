// import { login } from '_api'
import { setToken, getToken, removeToken } from '@/libs/utils'

const api = {
	state: {
		token: ''
	},
	mutations: {
		setToken (state, token) {
			state.token = token;
			setToken(token);
		},
		refToken (state, token) {
			state.token = getToken();
		},
		removeToken (state, token) {
			state.token = token;
			removeToken();
		}
	},
	actions: {
		login ({ commit }, data) {
			return new Promise((resolve, reject) => {
				commit('setToken', 'test');
				resolve(data);
			})
		},
		logout ({ commit }, data) {
			return new Promise((resolve, reject) => {
				commit('removeToken', '');
				resolve(data);
			})
		}
	}
}

export default api