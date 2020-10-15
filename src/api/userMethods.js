import api from '@/api'

export default {
	register(params) {
		return api().post('/user', params)
	},
	login(params) {
		return api().post('/user/auth', params)
	},
	loginbyToken(params) {
		return api().post('/user/authbytoken', params)
	},
	verify(params) {
		return api().put('/user/verify', params)
	},
	reset(params) {
		return api().post('/user/reset', params)
	},
	change(params) {
		return api().put('/user/reset', params)
	}
}