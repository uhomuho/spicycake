// import lessonsMethods from '@/api/lessonsMethods'

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
					console.log(res.data)
					commit('setLessons', res.data)
				})
		}
	}
}