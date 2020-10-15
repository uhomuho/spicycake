import userMethods from '@/api/userMethods'
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import router from '@/router'
import cryptoJS from 'crypto-js'

const encodeText = '2100kFlECmRf9905'

const decodeData = (data) => {
	let bytes  = cryptoJS.AES.decrypt(data, encodeText)
	bytes = bytes.toString(cryptoJS.enc.Utf8)
	return JSON.parse(bytes)
}

export default {
	namespaced: true,
	state: {
		user: null
	},
	mutations: {
		setUser: (state, payload) => payload ? state.user = decodeData(payload) : state.user = null
	},
	actions: {
		async apiUser({ commit }, params) {
			if (params.byToken) {
				await userMethods.loginbyToken(params.token)
					.then(r => {
						Snackbar.open({
							actionText: null,
							message: r.data.message,
							position: "is-bottom-right"
						})
						commit('setUser', r.data.user)
					})
			} else {
				userMethods.login(params.data)
					.then(r => {
						if (r.data.message) {
							Snackbar.open({
								actionText: null,
								message: r.data.message
							})
						} else {
							let user = r.data.user
	
							if (params.data.stayIn) localStorage.token = user.sessionToken
							commit('setUser', user)
	
							if (params.isAdmin) return router.push({ name: 'Уроки' })
							if (!params.isAdmin) return router.push({ name: 'Клиентские уроки' })
						}
					})
			}
		}
	}
}