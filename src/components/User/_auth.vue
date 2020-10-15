<template lang="pug">
	.modal
		.modal-background(	@click='close' )
		.modal-content
			.box
				.content
					.delete( @click='close' )
				b-tabs( 
					v-model='activeTab' 
					position="is-centered"
					type="is-boxed")
					b-tab-item( 
						label="Вход")
						form.form( @submit.prevent='login' )
							b-field(
								label="Логин (ваш ник инстаграм)"
								:type='!formDataLog.username && countLogin > 0 ? "is-danger" : ""'
								:message='!formDataLog.username && countLogin > 0 ? "Заполните поле!" : ""'
								label-position="on-border")
								b-input(
									v-model='formDataLog.username'
									type="text"
									@change='counterLogin')
							b-field(
								label="Пароль"
								:type='!formDataLog.password && countPwd > 0 ? "is-danger" : ""'
								:message='!formDataLog.password && countPwd > 0 ? "Заполните поле!" : ""'
								label-position="on-border")
								b-input(
									v-model='formDataLog.password'
									type="password"
									@change='counterPwd')
							b-field
								.level
									.level-left
										.level-item
											b-checkbox(v-model='formDataLog.stayIn')
												|Оставаться в системе
									.level-right
										.level-item
											router-link( :to='{ name: "ResetPassword" }' ) Забыли пароль?
							b-field
								button.button Войти
					b-tab-item( label="Регистрация" )
						form.form( @submit.prevent='register' )
							b-field(
								label="Имя и Фамилия"
								:type='!validName && formDataReg.name ? "is-danger" : formDataReg.name ? "is-success" : null'
								:message='!validName && formDataReg.name ? "Введите ваши имя и фамилию через пробел кириллицей" : null'
								label-position='on-border')
								b-input(
									type="text"
									v-model='formDataReg.name')
							b-field(
								label="Номер телефона"
								:type='!validPhone && formDataReg.phone ? "is-danger" : formDataReg.phone ? "is-success" : null'
								:message='!validPhone && formDataReg.phone ? "Допускаются только цифры, телефон должен соответствовать формату +79999999999" : null'
								label-position='on-border')
								b-input(
									type="text"
									v-model='formDataReg.phone')
							b-field(
								label="Почта"
								:type='!validEmail && formDataReg.email ? "is-danger" : formDataReg.email ? "is-success" : null'
								:message='!validEmail && formDataReg.email ? "Email введён неверно" : null'
								label-position='on-border')
								b-input(
									type="text"
									v-model='formDataReg.email')
							b-field(
								label="Инстаграм"
								:type='!validInstagram && formDataReg.instagram ? "is-danger" : formDataReg.instagram ? "is-success" : null'
								:message='!validInstagram && formDataReg.instagram ? "Никнейм инстаграм может содержать буквы латинского алфавита нижнего и верхнего регистра, цифры, символы . _ и быть не меньше 2 и не больше 30 символов" : null'
								label-position='on-border')
								b-input(
									type="text"
									v-model='formDataReg.instagram')
							b-field(
								label="Пароль"
								:type='!validPassword && formDataReg.password ? "is-danger" : formDataReg.password ? "is-success" : ""'
								:message='!validPassword && formDataReg.password ? "Пароль должен содержать хотя бы одну цифру, букву латинского алфавита нижнего и верхнего регистров и быть длинее 6 символов, запрещены символы !@#$%^&* и пробел " : null'
								label-position='on-border')
								b-input(
									type="password"
									v-model='formDataReg.password')
							b-field(
								label="Повторите пароль"
								:type='!comparePassword && formDataReg.passwordRepeat ? "is-danger" : formDataReg.passwordRepeat ? "is-success" : null'
								:message='!comparePassword && formDataReg.passwordRepeat ? "Пароли не совпадают" : ""'
								label-position='on-border')
								b-input(
									type="password"
									v-model='formDataReg.passwordRepeat')
							b-field
								button.button Зарегистрироваться
		b-loading( :is-full-page='true' v-model='loading' )
</template>

<script>
import userMethods from '@/api/userMethods'
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import { mapActions } from 'vuex'

export default {
	name: "Auth",
	data() {
		return {
			formDataReg: {
				name: null,
				phone: null,
				email: null,
				instagram: null,
				password: null,
				passwordRepeat: null
			},
			formDataLog: {
				username: null,
				password: null,
				stayIn: true
			},
			activeTab: 0,
			countLogin: 0,
			countPwd: 0,
			loading: false
		}
	},
	computed: {
		validName() {
			let valid = /^[а-яА-Я]{2,}[\s]{1}[а-яА-Я]{2,}/g
			return valid.test(this.formDataReg.name)
		},
		validPhone() {
			let valid = /^[8+]{1}[0-9]{11}/g
			return valid.test(this.formDataReg.phone)
		},
		validInstagram() {
			let valid = /^[a-zA-Z0-9_.]{2,29}$/g
			return valid.test(this.formDataReg.instagram)
		},
		validEmail() {
			let valid = /^.+@.+\..+$/igm
			return valid.test(this.formDataReg.email)
		},
		validPassword() {
			let valid = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g
			return valid.test(this.formDataReg.password)
		},
		comparePassword() {
			if (this.formDataReg.passwordRepeat !== this.formDataReg.password) return false
			return true 
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
			if (!this.formDataLog.username || !this.formDataLog.password) {
				return Snackbar.open({
					actionText: null,
					message: 'Заполните все поля!'
				})
			}
			this.apiUser({ data: this.formDataLog, stayIn: this.stayIn, isAdmin: false})
		},
		register() {
			for ( let req in this.formData ) {
				if (!this.formData[req]) {
					return Snackbar.open({
						actionText: null,
						duration: 3000,
						message: 'Заполните все поля!'
					})	
				}
			}
			if (!this.validPhone || !this.validName || !this.validInstagram || !this.validEmail || !this.validPassword || !this.comparePassword) {
				return Snackbar.open({
					actionText: null,
					duration: 3000,
					message: 'Заполните правильно все поля!'
				})
			}
			this.loading = true
			userMethods.register(this.formDataReg)
				.then(r => {
					this.loading = false
					this.activeTab = 0
					Snackbar.open({
						actionText: null,
						message: r.data.message
					})
				})
				.catch(err => {
					console.error(err)
					this.loading = false
				})
		},
		close() {
			this.$emit('close')
		}
	}
}
</script>

<style lang="sass" scoped>

.content
	position: relative
	.delete
		position: absolute
		top: 0
		right: .5rem
.modal-background
	cursor: pointer
.modal-content 
	width: 30rem
	form
		padding-top: 1rem
		.level
			.level-right
				a
					text-decoration: underline
					color: $purple
					cursor: pointer
</style>