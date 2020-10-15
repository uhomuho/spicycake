<template lang="pug">
	.hero.is-fullheight
		.hero-body
			.box
				.content
					p.is-size-4.has-text-weight-bold Вход
				hr
				form.form( @submit.prevent='login' )
					b-field(
						label="Логин (ваш ник инстаграм)"
						:type='!formData.username && countLogin > 0 ? "is-danger" : ""'
						:message='!formData.username && countLogin > 0 ? "Заполните поле!" : ""'
						label-position="on-border")
						b-input(
							v-model='formData.username'
							type="text"
							@change='counterLogin')
					b-field(
						label="Пароль"
						:type='!formData.password && countPwd > 0 ? "is-danger" : ""'
						:message='!formData.password && countPwd > 0 ? "Заполните поле!" : ""'
						label-position="on-border")
						b-input(
							v-model='formData.password'
							type="password"
							@change='counterPwd')
					b-field
						b-checkbox(v-model='stayIn')
							|Оставаться в системе
					b-field
						button.button Войти
</template>

<script>
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import { mapActions } from 'vuex'
export default {
	name: 'AdminLogin',
	data() {
		return {
			formData: {
				username: null,
				password: null
			},
			countLogin: 0,
			countPwd: 0,
			stayIn: false
		}
	},
	methods: {
		...mapActions('user', [
			'apiUser'
		]),
		counterLogin() {
			this.countLogin++
		},
		counterPwd() {
			this.countPwd++
		},
		login() {
			if (!this.formData.username || !this.formData.password) {
				return Snackbar.open({
					actionText: null,
					message: 'Заполните все поля!'
				})
			}
			this.apiUser({ data: this.formData, stayIn: this.stayIn, isAdmin: true})
		}
	}
}
</script>

<style lang="sass" scoped>
	.hero-body
		justify-content: center
</style>