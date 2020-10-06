import Vue from 'vue'
import Router from 'vue-router'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

Vue.use(Router)

import store from '@/store'
const isLoggedIn = () => {
	let user = store.state.user.user
	return user
}

// Views
// -> Admin views
import Admin from '@/views/Admin/Admin'
import AdminLessons from '@/views/Admin/AdminLessons'
import CreateLesson from '@/views/Admin/createLesson'
import EditLesson from '@/views/Admin/editLesson'
import LoginAdmin from '@/views/Admin/loginAdmin'

// -> User views
import HomePage from '@/views/User/homePage'
import Main from '@/views/User/Main'
import UserLessons from '@/views/User/UserLessons'


// Router
export default new Router({
	base: process.env.BASE_URL,
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Homepage',
			redirect: {path: "/sc"}
		},
		{
			path: '/sc',
			component: Main,
			children: [
				{
					path: '/',
					name: 'Homepage',
					component: HomePage
				},
				{
					path: 'lessons',
					name: 'Клиентские уроки',
					component: UserLessons,
					beforeEnter: (to, from, next) => {
						if (to.name == 'Клиентские уроки' && isLoggedIn()) {
							next()
						} else {
							next({ name: 'Homepage' })
						}
					},
				}
			]
		},
		{
			path: '/admin',
			name: 'AdminPanel',
			component: Admin,
			redirect: {name: "Уроки"},
			children: [
				{
					path: '/',
					name: 'LoginAdmin',
					component: LoginAdmin,
					beforeEnter: (to, from, next) => {
						if (to.name == 'LoginAdmin' && isLoggedIn()) {
							next({name: 'Уроки'})
						} else {
							next()
						}
					},
				},
				{
					path: 'lessons',
					name: 'Уроки',
					component: AdminLessons,
					beforeEnter: (to, from, next) => {
						if (to.name == 'Уроки' && isLoggedIn()) {
							next()
						} else {
							next({name: 'LoginAdmin'})
							Snackbar.open({
								actionText: null,
								duration: 2500,
								message: 'Недостаточно прав доступа!'
							})
						}
					},
				},
				{
					path: 'lessons/create',
					name: 'Добавить урок',
					component: CreateLesson,
					beforeEnter: (to, from, next) => {
						if (to.name == 'Добавить урок' && isLoggedIn()) {
							next()
						} else {
							next({name: 'LoginAdmin'})
							Snackbar.open({
								actionText: null,
								duration: 2500,
								message: 'Недостаточно прав доступа!'
							})
						}
					},
				},
				{
					path: 'lessons/edit/:id',
					name: 'Редактировать урок',
					component: EditLesson,
					props: true,
					beforeEnter: (to, from, next) => {
						if (to.name == 'Редактировать урок' && isLoggedIn()) {
							next()
						} else {
							next({name: 'LoginAdmin'})
							Snackbar.open({
								actionText: null,
								duration: 2500,
								message: 'Недостаточно прав доступа!'
							})
						}
					},
				}
			]
		}
	]
})