import userMethods from '@/api/userMethods'
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import router from '@/router'
import cryptoJS from 'crypto-js'

const encodeText = '2100kFlECmRf9905'

// const encodeData = (data) => {
// 	return cryptoJS.AES.encrypt(data, encodeText).toString()
// }
const decodeData = (data) => {
	let bytes  = cryptoJS.AES.decrypt(data, encodeText)
	bytes = bytes.toString(cryptoJS.enc.Utf8)
	return JSON.parse(bytes)
}

let user = localStorage.user && localStorage.user !== 'null' ? decodeData(localStorage.user) : null

export default {
	namespaced: true,
	state: {
		user: user ? user : null
	},
	mutations: {
		setUser: (state, payload) => state.user = payload
	},
	actions: {
		apiUser({ commit }, params) {
			userMethods.login(params.data)
				.then(r => {
					if (r.data.message) {
						Snackbar.open({
							actionText: null,
							message: r.data.message
						})
					} else {
						if (params.stayIn) localStorage.user = r.data.user

						let user = decodeData(r.data.user) 
						commit('setUser', user)

						if (params.isAdmin) return router.push({ name: 'Уроки' })
						if (!params.isAdmin) return router.push({ name: 'Клиентские уроки' })
					}
				})

		}
	}
}