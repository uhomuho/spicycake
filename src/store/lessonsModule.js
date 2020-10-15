import lessonsMethods from "../api/lessonsMethods"

export default {
	namespaced: true,
	state: {
		lessons: null,
		lesson: null
	},
	mutations: {
		setLessons: ( state, payload ) => state.lessons = payload,
		setLesson: ( state, payload ) => state.lesson = payload
	},
	actions: {
		apiLessons({ commit }) {
			lessonsMethods.getLessons()
				.then(res => {
					commit('setLessons', res.data)
				})
		},
		apiLesson({ commit }, params) {
			lessonsMethods.getLesson(params)
				.then(r => {
					commit('setLesson', r.data)
				})
		}
	}
}