import API from '../../api/index'

const state = () => ({
	user: {},
	kardex: [],
	carga: [],
	token: null,
})

const getters = {
	getName: (state) => {
		return state.user.fullName
	},
	getUser: (state) => {
		return state.user || {}
	},
	getKardex: (state) => {
		return state.kardex
	},
	getCarga: (state) => {
		return state.carga
	},
	getToken: (state) => {
		return state.token
	},
}

const actions = {
	async login({ commit }, { username, password }) {
		try {
			const user = await API.login({ username, password })
			commit('setUser', user)
			commit('setToken', user.sessionId)
			return user
		} catch (error) {
			commit('setUser', {})
			throw error
		}
	},
	async register({ commit }, { email, username, password }) {
		try {
			await API.register({ email, username, password })
			const user = await API.login(username, password)
			commit('setUser', user)
		} catch (error) {
			commit('setUser', {})
			throw error
		}
	},
	logout({ commit }) {
		commit('logout')
	},
	async update({ commit, state }, user) {
		const newUser = await API.updateUser(user, state.token)
		console.log(newUser)
		commit('updateUser', newUser)
	},

	async getStatus({ commit }, user) {
		const { kardex, carga } = await API.getStatus(user)
		commit('updateKardex', kardex)
		commit('updateCarga', carga)
	},
}

const mutations = {
	setUser(state, user) {
		state.user = user
	},
	setToken(state, token) {
		state.token = token
	},
	logout(state) {
		state.user = {}
		state.token = ''
	},
	updateUser(state, user) {
		state.user = user
	},
	updateKardex(state, kardex) {
		state.kardex = kardex
	},
	updateCarga(state, carga) {
		state.carga = carga
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
