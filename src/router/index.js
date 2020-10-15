import Vue from 'vue'
import Router from 'vue-router'
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import store from '@/store'

Vue.use(Router)

const isLoggedIn = () => {
	let user = store.state.user.user
	return user
}
const isAdmin = () => {
	let user = isLoggedIn()
	if (user && user.permissions == 1) {
		return true
	} else if (user && user.permissions == 0) {
		return false
	} else {
		return false
	}
}

// Views
// -> Admin views
import Admin from '@/views/Admin/Admin'
import AdminLessons from '@/views/Admin/AdminLessons'
import CreateLesson from '@/views/Admin/createLesson'
import EditLesson from '@/views/Admin/editLesson'
import LoginAdmin from '@/views/Admin/loginAdmin'

// -> User views
import HomePage from '@/views/User/HomePage'
import Main from '@/views/User/Main'
import UserLessons from '@/views/User/UserLessons'
import Cart from '@/views/User/Cart'
import Reset from '@/views/User/ResetPassword'

// -> Account views
import Account from '@/views/Account/Account'
import Settings from '@/views/Account/Settings'
import AccountLessons from '@/views/Account/Lessons' 

// Router
let router = new Router({
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
					component: HomePage,
					beforeEnter: (to, from, next) => {
						if (to.name == 'Homepage' && isLoggedIn()) {
							next({ name: 'Клиентские уроки' })
						} else {
							next()
						}
					},
				},
				{
					path: 'reset',
					name: 'ResetPassword',
					meta: {
						title: 'Восстановление пароля'
					},
					component: Reset,
					beforeEnter: (to, from, next) => {
						if (to.name == 'ResetPassword' && isLoggedIn()) {
							next({ name: 'Клиентские уроки' })
						} else {
							next()
						}
					}
				},
				{
					path: 'reset/:token',
					name: 'ChangePassword',
					component: Reset,
					meta: {
						title: 'Изменение пароля'
					},
					props: true,
					beforeEnter: (to, from, next) => {
						if (to.name == 'ResetPassword' && isLoggedIn()) {
							next({ name: 'Клиентские уроки' })
						} else {
							next()
						}
					}
				},
				{
					path: 'lessons',
					name: 'Клиентские уроки',
					component: UserLessons,
					meta: {
						title: 'Уроки'
					},
					beforeEnter: (to, from, next) => {
						if (to.name == 'Клиентские уроки' && isLoggedIn()) {
							next()
						} else {
							next({ name: 'Homepage' })
						}
					},
				},
				{
					path: 'cart',
					name: 'Cart',
					component: Cart,
					meta: {
						title: 'Корзина'
					},
					beforeEnter: (to, from, next) => {
						if (to.name == 'Cart' && isLoggedIn()) {
							next()
						} else {
							next({ name: 'Homepage' })
						}
					},
				},
				{
					path: 'account',
					component: Account,
					children: [
						{
							path: '/',
							component: Settings,
							name: 'Account',
							meta: {
								title: 'Личный кабинет',
								subtitle: 'Изменить данные'
							},
							redirect: { name: 'AccountLessons' }
						},
						{
							path: 'lessons',
							component: AccountLessons,
							name: 'AccountLessons',
							meta: {
								title: 'Личный кабинет',
								subtitle: 'Уроки'
							}
						}
					]
				},
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
						if (to.name == 'LoginAdmin' && isLoggedIn() && isAdmin()) {
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
						if (to.name == 'Уроки' && isLoggedIn() && isAdmin()) {
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
						if (to.name == 'Добавить урок' && isLoggedIn() && isAdmin()) {
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
						if (to.name == 'Редактировать урок' && isLoggedIn() && isAdmin()) {
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

// router.beforeEach(async (to, from, next) => {
// 	if (localStorage.token && localStorage.token !== 'null' && !isLoggedIn()) {
// 		await store.dispatch('user/apiUser', {
// 			byToken: true,
// 			token: localStorage.token
// 		})
// 		next()
// 	} else if (to.name !== 'Homepage' && !isLoggedIn()) {
// 		next({ name: 'Homepage' })
// 	} else {
// 		next()
// 	}
// })

export default router