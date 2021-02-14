
const state = () => ({
	language: 'ES',
	languages: ['ES', 'EN']
})

const getters = {
  getLanguage: (state) => {
    return state.language
  },
  getLanguages: (state) => {
    return state.languages
  }
}

const actions = {
	setLanguage({commit}, language) {
    if (typeof language !== 'string') throw Error('Invalid language')
    commit('setLanguage', language)
  }
}

const mutations = {
	setLanguage(state, language) {
		state.language = language
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
