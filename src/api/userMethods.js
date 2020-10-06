import api from '@/api'

export default {
	register(params) {
		return api().post('/user', params)
	},
	login(params) {
		return api().post('/user/auth', params)
	}
}