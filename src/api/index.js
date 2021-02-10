import axios from 'axios'
import store from '../store'
import encrypt from '../crypto'

class API {
	constructor() {
		this.api = axios.create({
			baseURL: process.env.VUE_APP_API_BASE_URL,
			headers: {
				'X-API': process.env.VUE_APP_API_KEY_VALUE,
			},
		})
		this.user = null
	}

	updateToken(token) {
		this.token = token || store.getters['user/getToken']
	}

	async login({ username, password }) {
		try {
			const {
				data: { data },
			} = await this.api.post('/login', { login: username, password })

			if (data.sessionId) {
				this.updateToken(data.sessionId)
			}

			return data
		} catch (error) {
			throw { code: error.response.status, message: error.response.data }
		}
	}

	async register({ email, username, password }) {
		try {
			const {
				data: { data },
			} = await this.api.post('/register', {
				email,
				username,
				password,
			})
			return data
		} catch (error) {
			throw { code: error.response.status, message: error.response.data }
		}
	}

	async updateUser(user) {
		try {
			const credentials = encrypt(user, user.publicKey)
			const {
				data: { data },
			} = await this.api.put(`/users`, {
				id: user._id,
				email: user.email,
				username: user.username,
				...credentials,
				sessionId: this.token,
			})
			return data
		} catch (error) {
			throw { code: error.response.status, message: error.response.data }
		}
	}

	async getStatus(user) {
		try {
			const {
				data: { data },
			} = await this.api.get(`/users/status/?id=${user._id}&sessionId=${user.sessionId}`)
			return data
		} catch (error) {
			throw { code: error.response.status, message: error.response.data }
		}
	}
}

export default new API()
