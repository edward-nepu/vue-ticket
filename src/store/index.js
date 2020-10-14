import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import authorize from './modules/authorize'
import api from './modules/api'

Vue.use(Vuex)

export default new Vuex.Store({
	state: { },
	mutations: { },
	actions: { },
	getters,
	modules: {
        authorize,
		api
	}
})
