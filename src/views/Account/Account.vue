<template lang="pug">
div
	.container
		.section
			slot(name="title-bar")
			.wrapper
				Sidebar
				router-view(v-if='user && user.verify')
					div.hero.subtitle-bar(
						slot="subtitle-bar")
						h3.is-size-4 {{ subtitle }}
						hr
				.container(v-else)
					.content
						h3.is-size-4.has-text-weight-normal Подтверждение аккаунта
						p На вашу почту 
							b {{ user.email }} 
							|было выслано письмо с кодом подтверждения. 
							br
							|Пожалуйста, введите его в поле ниже и нажмите 'Подтвердить'
					form.form( @submit.prevent='verify' )
						.field
							.control
								input.input(
									type="text"
									v-model='code'
									placeholder="Код подтверждения")
						.field
							.control
								button.button Подтвердить
</template>

<script>
import Sidebar from '@/components/Account/_sidebar'
import userMethods from '@/api/userMethods'
import { mapMutations, mapState } from 'vuex'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
	name: 'Account',
	components: {
		Sidebar
	},
	data() {
		return {
			subtitle: this.$route.meta.subtitle,
			code: null
		}
	},
	computed: {
		...mapState('user', {
			user: state => state.user
		})
	},
	watch: {
		$route() {
			this.subtitle = this.$route.meta.subtitle
		}
	},
	methods: {
		...mapMutations('user', [
			'setUser'
		]),
		verify() {
			userMethods.verify({
				code: this.code,
				id: this.user._id
			}).then(r => {
				Snackbar.open({
					message: r.data.message,
					actionText: null
				})
				if ( r.data.user ) {
					this.setUser(r.data.user)
				}
			})
			.catch(err => console.error(err))
		}
	}
}
</script>

<style lang="sass" scoped>

</style>