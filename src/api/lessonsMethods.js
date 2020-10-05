import api from '@/api'

export default {
	createLesson(params) {
		return api().post('/lessons', params)
	},
	getLessons(isAdmin) {
		return api().get(`/lessons${isAdmin ? "?admin=true" : ""}`)
	},
	getLesson(params) {
		return api().get(`/lessons/${params.id}${params.isAdmin || params.isBuyed ? "?video=true" : ""}`)
	},
	deleteLesson(id) {
		return api().delete(`/lessons/${id}`)
	},
	updateLesson(params) {
		return api().put(`/lessons/${params._id}`, params)
	}
}