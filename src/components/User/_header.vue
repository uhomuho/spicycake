<template lang="pug">
	header
		nav.navbar( role="navigation" aria-label="main navigation" )
			.container
				.navbar-brand
					.navbar-item
						router-link( :to='{ name: "Homepage" }' )
							img( src="@/assets/logo.png" )
				.navbar-menu
					.navbar-start(v-if='user')
						.navbar-item
							router-link( :to='{ name: "Клиентские уроки" }') Уроки
					.navbar-end
						.navbar-item.buttons
							.button.is-info.is-light( 
								@click="toggleModal"
								v-if='!user' ) Авторизация
		Auth(
			v-if='!user'
			:class='showModal ? "is-active" : ""'
			@close='toggleModal')
</template>

<script>
import Auth from '@/components/User/_auth'

export default {
	name: "Header",
	data() {
		return {
			showModal: false
		}
	},
	components: {
		Auth
	},
	props: ['user'],
	methods: {
		toggleModal() {
			this.showModal = !this.showModal
		}
	}
}
</script>

<style lang="sass" scoped>
.navbar-brand
	.navbar-item
		img
			max-height: 4rem
.navbar-menu
	.navbar-start
		.navbar-item
			a
				color: $grey
				&:hover
					color: $dark
				&.router-link-exact-active
					color: $dark
</style>