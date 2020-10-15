<template lang="pug">
	div
		.container
			.section
				slot( name="title-bar" )
				form.form( 
					@submit.prevent='change'
					v-if='token')
					b-field(
						label="Введите новый пароль для вашего аккаунта"
						:type='!validPassword && password ? "is-danger" : password ? "is-success" : ""'
						:message='!validPassword && password ? "Пароль должен содержать хотя бы одну цифру, букву латинского алфавита нижнего и верхнего регистров и быть длинее 6 символов, запрещены символы !@#$%^&* и пробел " : null')
						b-input(
							type="password"
							v-model='password'
							placeholder="Новый пароль")
					b-field(
						label="Повторите пароль"
						:type='!comparePassword && passwordRepeat ? "is-danger" : passwordRepeat ? "is-success" : null'
						:message='!comparePassword && passwordRepeat ? "Пароли не совпадают" : ""')
						b-input(
							type="password"
							v-model='passwordRepeat'
							placeholder="Ещё раз")
					b-field
						button.button Изменить
				form.form( 
					@submit.prevent='reset'
					v-else)
					b-field(
						label="Для восстановления вашего пароля введите почту, на неё придут инструкции для его восстановления")
						b-input(
							type="text"
							v-model='email'
							placeholder="Ваша почта")
					b-field
						button.button Восстановить
</template>

<script>
import userMethods from '@/api/userMethods'
import { SnackbarProgrammatic as Snackbar} from 'buefy'
import { mapMutations } from 'vuex'

export default {
	name: 'ResetPwd',
	data() {
		return {
			email: null,
			password: null,
			passwordRepeat: null
		}
	},
	props: ['token'],
	computed: {
		validPassword() {
			let valid = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g
			return valid.test(this.password)
		},
		comparePassword() {
			if (this.passwordRepeat !== this.password) return false
			return true 
		}
	},
	methods: {
		...mapMutations('user', ['setUser']),
		reset() {
			userMethods.reset({ email: this.email })
				.then(r => {
					Snackbar.open({
						message: r.data.message,
						duration: 3000
					})
					if (!r.data.err) {
						this.$router.push({ name: 'Homepage' })
					}
				})
		},
		change() {
			if (!this.validPassword || !this.comparePassword) {
				Snackbar.open({
					message: 'Заполните все поля правильно!',
					actionText: null
				})
			} else {
				userMethods.change({ password: this.password, token: this.token })
					.then(r => {
						Snackbar.open({
							message: r.data.message,
							duration: r.data.user ? 1500 : 3000,
							actionText: null
						})
						if (r.data.user) {
							this.setUser(r.data.user)
							this.$router.push({ name: 'Клиентские уроки' })
						}
					})
			}
		}
	}
}
</script>

<style lang="sass" scoped>

</style>